import React, { useState, useCallback } from 'react';
import type { BibleVerse, GenerateVideosOperation } from '../types';
import { getVerse } from '../services/bibleService';
import { startVideoGeneration, getVideosOperation, generateImage as generateImageSvc } from '../services/geminiService';
import ScriptureSearchForm from '../components/ScriptureSearchForm';
import Spinner from '../components/Spinner';

const ExplorerPage: React.FC = () => {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [version, setVersion] = useState('KJV');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<string>('');
  
  const handleSearch = async (book: string, chapter: number, verseNum: number) => {
    setIsLoading(true);
    setError(null);
    setVerse(null);
    setGeneratedImage(null);
    setGeneratedVideo(null);
    try {
      const result = await getVerse(book, chapter, verseNum, version);
      if (result) {
        setVerse(result);
      } else {
        setError('Scripture not found in our current data. Please try another verse.');
      }
    } catch (e) {
      setError('An error occurred while searching.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const createGenerationPrompt = (verse: BibleVerse): string => {
    let basePrompt = `Visualize the following scripture from ${verse.book} ${verse.chapter}:${verse.verse}: "${verse.text}".`;
    
    if (verse.contextualMeaning) {
        basePrompt += `\n\nCRITICAL CONTEXT: The visualization MUST be based on the following original meaning and context, not just the translated text: "${verse.contextualMeaning}".`;
    }

    return basePrompt + ` The depiction must be historically and culturally accurate to the time period, deeply reverent, and faithful to the literal meaning. Avoid modern artistic interpretations, anachronisms, or theological symbolism not explicitly present in the text. The goal is a pure, powerful visualization of the scripture as it was written. Style: Cinematic, Epic, Photorealistic.`;
  };

  const handleGenerateImage = async () => {
    if (!verse) return;
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
      const prompt = createGenerationPrompt(verse);
      const imageUrl = await generateImageSvc({
          id: `${verse.book}-${verse.chapter}-${verse.verse}`,
          prompt: prompt,
          aspectRatio: "16:9"
      });
      setGeneratedImage(imageUrl);
    } catch(e) {
        setError("Failed to generate image.");
        console.error(e);
    } finally {
        setIsGeneratingImage(false);
    }
  };

  const pollVideoOperation = useCallback(async (operation: GenerateVideosOperation) => {
    try {
      const op = await getVideosOperation(operation);
      if (op.done) {
        setVideoStatus('Video generation complete!');
        const downloadLink = op.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          const finalUrl = process.env.API_KEY ? `${downloadLink}&key=${process.env.API_KEY}` : downloadLink;
          setGeneratedVideo(finalUrl);
        } else {
          setError("Video generation finished, but no video URL was returned.");
        }
        setIsGeneratingVideo(false);
      } else {
        const progressPercent = op.metadata?.progressPercent;
        const progress = typeof progressPercent === 'number' ? progressPercent : 0;
        setVideoStatus(`Generating video... ${progress.toFixed(0)}% complete. This can take a few minutes.`);
        setTimeout(() => pollVideoOperation(op), 10000); // Poll every 10 seconds
      }
    } catch (e) {
      setError("An error occurred while checking video status.");
      console.error(e);
      setIsGeneratingVideo(false);
    }
  }, []);


  const handleGenerateVideo = async () => {
    if (!verse) return;
    setIsGeneratingVideo(true);
    setGeneratedVideo(null);
    setError(null);
    try {
      const prompt = createGenerationPrompt(verse);
      setVideoStatus('Starting video generation...');
      const initialOperation = await startVideoGeneration(prompt);
      setVideoStatus('Video generation is in progress. Polling for updates...');
      pollVideoOperation(initialOperation);
    } catch(e) {
        setError("Failed to start video generation.");
        console.error(e);
        setIsGeneratingVideo(false);
    }
  };
  
  const isGeneratorBusy = isLoading || isGeneratingVideo || isGeneratingImage;

  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white mb-4">
          Scripture Explorer
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-light-parchment/80 mb-8">
          Search for a specific verse and bring it to life with AI-powered visual generation.
        </p>
      </section>
      
      <div className="max-w-2xl mx-auto mb-6">
        <label htmlFor="version-select" className="block text-sm font-medium text-gold-accent mb-1">
            Bible Version
        </label>
        <select
            id="version-select"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            disabled={isGeneratorBusy}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
        >
            <option value="KJV">KJV (King James Version)</option>
            <option value="Literal & Contextual">Literal & Contextual (For AI Generation)</option>
        </select>
        <p className="text-xs text-light-parchment/60 mt-2">
            Select 'Literal & Contextual' to provide deeper meaning to the AI for more accurate visualizations.
        </p>
      </div>

      <ScriptureSearchForm onSearch={handleSearch} disabled={isGeneratorBusy} />

      <div className="mt-12 max-w-4xl mx-auto">
        {isLoading && <Spinner />}
        {error && <p className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</p>}
        {verse && (
          <div className="bg-deep-indigo/50 p-6 md:p-8 rounded-lg shadow-lg border border-gold-accent/20 transition-opacity duration-500 animate-fadeIn">
            <h2 className="text-2xl font-serif text-gold-accent">{`${verse.book} ${verse.chapter}:${verse.verse}`} <span className="text-lg text-light-parchment/70">(${verse.version})</span></h2>
            <p className="text-xl font-serif italic text-light-parchment/90 mt-4 leading-relaxed">
              "{verse.text}"
            </p>

            {verse.contextualMeaning && (
                <div className="mt-6 border-t border-gold-accent/20 pt-4">
                    <h3 className="text-lg font-bold font-sans text-gold-accent">Original Context & Meaning</h3>
                    <p className="text-md font-sans text-light-parchment/80 mt-2 leading-relaxed">{verse.contextualMeaning}</p>
                </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={handleGenerateImage} disabled={isGeneratingImage || isGeneratingVideo} className="flex-1 bg-gold-accent text-deep-indigo font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isGeneratingImage ? 'Generating...' : 'Generate Image'}
              </button>
              <button onClick={handleGenerateVideo} disabled={isGeneratingVideo || isGeneratingImage} className="flex-1 bg-transparent border-2 border-gold-accent text-gold-accent font-bold py-3 px-6 rounded-full hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed">
                {isGeneratingVideo ? 'In Progress...' : 'Generate Video'}
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-8">
            {isGeneratingImage && <div className="text-center"><Spinner /> <p className="mt-2">Generating image...</p></div>}
            {generatedImage && (
                <div className="bg-black/20 p-4 rounded-lg animate-fadeIn">
                    <h3 className="text-xl font-serif text-gold-accent mb-4">Generated Image</h3>
                    <img src={generatedImage} alt={`AI generation for ${verse?.book} ${verse?.chapter}:${verse?.verse}`} className="w-full h-auto object-contain rounded-md" />
                </div>
            )}

            {isGeneratingVideo && <div className="text-center mt-4"><Spinner /> <p className="mt-2 text-gold-accent">{videoStatus}</p></div>}
            {generatedVideo && (
                 <div className="bg-black/20 p-4 rounded-lg mt-8 animate-fadeIn">
                    <h3 className="text-xl font-serif text-gold-accent mb-4">Generated Video</h3>
                    <video controls src={generatedVideo} className="w-full h-auto rounded-md" />
                </div>
            )}
        </div>
      </div>
       <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default ExplorerPage;

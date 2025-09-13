// FIX: Implemented the ExplorerPage to provide a scripture search and visualization interface.
import React, { useState, useCallback, useEffect } from 'react';
import ScriptureSearchForm from '../components/ScriptureSearchForm';
import { getVerse } from '../services/bibleService';
import { generateImage, generateFunFacts } from '../services/geminiService';
import type { BibleVerse, FunFact } from '../types';
import Spinner from '../components/Spinner';
import FunFactCard from '../components/FunFactCard';

const ExplorerPage: React.FC = () => {
  const [verseData, setVerseData] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageGenError, setImageGenError] = useState<string | null>(null);
  
  const [selectedVersion, setSelectedVersion] = useState('KJV');
  
  // State for fun facts
  const [funFacts, setFunFacts] = useState<FunFact[]>([]);
  const [isGeneratingFacts, setIsGeneratingFacts] = useState(false);

  const handleSearch = useCallback(async (book: string, chapter: number, verse: number) => {
    setIsLoading(true);
    setError(null);
    setVerseData(null);
    setGeneratedImageUrl(null);
    setImageGenError(null);
    setFunFacts([]); // Clear previous fun facts
    
    try {
      const data = await getVerse(book, chapter, verse, selectedVersion);
      if (data) {
        setVerseData(data);
      } else {
        setError(`Could not find ${book} ${chapter}:${verse} in the ${selectedVersion} version.`);
      }
    } catch (err) {
      console.error("Error fetching verse:", err);
      setError("An error occurred while searching for the scripture.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedVersion]);

  // Effect to generate fun facts when verseData changes
  useEffect(() => {
    if (verseData) {
      const fetchFunFacts = async () => {
        setIsGeneratingFacts(true);
        setFunFacts([]);
        try {
          const facts = await generateFunFacts(verseData);
          setFunFacts(facts);
        } catch (err) {
          console.error("Error generating fun facts:", err);
          // Fail gracefully without showing a user-facing error.
        } finally {
          setIsGeneratingFacts(false);
        }
      };
      fetchFunFacts();
    }
  }, [verseData]);


  const handleGenerateImage = async () => {
    if (!verseData) return;

    setIsGeneratingImage(true);
    setGeneratedImageUrl(null);
    setImageGenError(null);

    try {
      const commentaryInsight = verseData.commentary ? `Thematic insights from commentary suggest: "${verseData.commentary.text}"` : '';
      const contextualPrompt = verseData.contextualMeaning ? ` based on its contextual meaning: "${verseData.contextualMeaning}"` : '';
      const prompt = `Task: Create a reverent, historically and culturally accurate visual for a Bible verse.
      Verse: "${verseData.text}" (${verseData.book} ${verseData.chapter}:${verseData.verse}).
      Critical Context: ${contextualPrompt}.
      Thematic Insights: ${commentaryInsight}.
      Artistic Direction: Cinematic digital painting, epic, beautiful, awe-inspiring. Emphasize realism and emotional depth.
      Strict Constraints: NO modern anachronisms (e.g., modern clothing, architecture). NO text or logos. NO graphic violence. NO nudity. Ensure all figures and settings are appropriate for the ancient Near East/Roman era. The tone must be reverent and faithful to the source material.`;
      
      const url = await generateImage({
        id: `verse-image-${verseData.book}-${verseData.chapter}-${verseData.verse}-${selectedVersion}`,
        prompt: prompt,
        aspectRatio: "16:9",
      });
      setGeneratedImageUrl(url);
    } catch (err) {
      console.error("Failed to generate image for verse:", err);
      setImageGenError("Failed to generate the image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div>
      <section className="text-center pt-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white mb-4">
          Scripture Explorer
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-light-parchment/80">
          Search for any verse in the Bible, read its text, and visualize its meaning.
        </p>
      </section>

      <ScriptureSearchForm onSearch={handleSearch} disabled={isLoading} />
      
      <div className="flex justify-center my-4">
        <div className="flex items-center space-x-4 p-2 bg-deep-indigo/30 rounded-full">
          <span className="text-sm font-medium text-gold-accent pl-2">Translation:</span>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            disabled={isLoading}
            className="bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-full shadow-sm py-1 px-3 focus:outline-none focus:ring-1 focus:ring-gold-accent disabled:opacity-50"
          >
            <option value="KJV">KJV</option>
            <option value="NIV">NIV</option>
            <option value="ESV">ESV</option>
            <option value="AMP">AMP</option>
            <option value="Literal & Contextual">Literal & Contextual</option>
          </select>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        {isLoading && <div className="flex justify-center py-10"><Spinner /></div>}
        {error && <p className="text-center text-red-400 font-bold p-4 bg-red-900/20 rounded-md">{error}</p>}
        
        {verseData && (
          <div className="bg-black/20 rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-serif text-gold-accent mb-4">
              {verseData.book} {verseData.chapter}:{verseData.verse}
              <span className="text-lg text-light-parchment/70 ml-2">({verseData.version})</span>
            </h2>
            <blockquote className="text-xl md:text-2xl font-serif italic text-light-parchment/90 leading-relaxed border-l-4 border-gold-accent/40 pl-6">
              {verseData.text}
            </blockquote>

            {verseData.contextualMeaning && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold text-gold-accent/80 mb-2">Contextual Meaning</h3>
                    <p className="text-light-parchment/80">{verseData.contextualMeaning}</p>
                </div>
            )}

            {verseData.commentary && (
                <div className="mt-6 bg-deep-indigo/40 p-4 rounded-md">
                    <h3 className="text-lg font-bold text-gold-accent/80 mb-2">Commentary from {verseData.commentary.source}</h3>
                    <p className="text-light-parchment/80 text-sm">{verseData.commentary.text}</p>
                </div>
            )}

            <div className="text-center mt-8">
              <button 
                onClick={handleGenerateImage} 
                disabled={isGeneratingImage}
                className="bg-transparent border-2 border-gold-accent text-gold-accent font-bold py-2 px-6 rounded-full hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {isGeneratingImage ? 'Visualizing...' : 'Visualize This Verse'}
              </button>
            </div>
            
            {isGeneratingImage && <div className="flex justify-center py-10"><Spinner /></div>}
            {imageGenError && <p className="text-center text-red-400 mt-4">{imageGenError}</p>}
            
            {generatedImageUrl && (
              <div className="mt-8 aspect-[16/9] bg-black/30 rounded-md overflow-hidden">
                <img src={generatedImageUrl} alt={`Visualization of ${verseData.book} ${verseData.chapter}:${verseData.verse}`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

        {(isGeneratingFacts || funFacts.length > 0) && (
          <div className="mt-12">
            <h3 className="text-3xl font-serif text-gold-accent mb-6 text-center">Related Fun Facts</h3>
            {isGeneratingFacts && <div className="flex justify-center py-10"><Spinner /></div>}
            <div className="grid grid-cols-1 gap-8">
              {funFacts.map((fact) => (
                <FunFactCard key={fact.id} fact={fact} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorerPage;
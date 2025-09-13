
import React, { useState, useEffect, useCallback } from 'react';
import { generateImage, startVideoGeneration, getVideosOperation } from '../services/geminiService';
import type { Scene, GenerateVideosOperation } from '../types';
import Spinner from './Spinner';

interface SceneDisplayProps {
  scene: Scene;
  videoUrl?: string;
  onVideoGenerated: (sceneId: string, url: string) => void;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene, videoUrl, onVideoGenerated }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<string | null>(null);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setImageError(null);
      try {
        const url = await generateImage(scene.visualPrompt);
        setImageUrl(url);
      } catch (err) {
        setImageError('Failed to generate image.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [scene]);

  const pollVideoOperation = useCallback(async (operation: GenerateVideosOperation) => {
    try {
      const op = await getVideosOperation(operation);
      if (op.done) {
        setVideoStatus('Video generation complete!');
        const downloadLink = op.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          const finalUrl = process.env.API_KEY ? `${downloadLink}&key=${process.env.API_KEY}` : downloadLink;
          onVideoGenerated(scene.id, finalUrl);
        } else {
          setVideoError("Video generation finished, but no video URL was returned.");
        }
        setIsGeneratingVideo(false);
      } else {
        const progressPercent = op.metadata?.progressPercent;
        const progress = typeof progressPercent === 'number' ? progressPercent : 0;
        setVideoStatus(`Generating video... ${progress.toFixed(0)}% complete. This can take a few minutes.`);
        setTimeout(() => pollVideoOperation(op), 10000); // Poll every 10 seconds
      }
    } catch (e) {
      setVideoError("An error occurred while checking video status.");
      console.error(e);
      setIsGeneratingVideo(false);
    }
  }, [scene.id, onVideoGenerated]);


  const handleGenerateVideo = async () => {
    setIsGeneratingVideo(true);
    setVideoError(null);
    try {
      setVideoStatus('Starting video generation...');
      const initialOperation = await startVideoGeneration(scene.visualPrompt.prompt);
      setVideoStatus('Video generation is in progress. Polling for updates...');
      pollVideoOperation(initialOperation);
    } catch(e) {
        setVideoError("Failed to start video generation.");
        console.error(e);
        setIsGeneratingVideo(false);
    }
  };

  const aspectRatioClass = {
    "16:9": "aspect-[16/9]",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  }[scene.visualPrompt.aspectRatio || "16:9"];

  return (
    <div className="bg-black/20 rounded-lg shadow-lg overflow-hidden p-4 md:p-6 mb-12">
      <h3 className="text-2xl md:text-3xl font-serif text-gold-accent mb-4">{scene.title}</h3>
      <div className={`w-full ${aspectRatioClass} bg-deep-indigo/50 rounded-md flex items-center justify-center mb-4 relative`}>
        {videoUrl ? (
          <video controls autoPlay loop muted src={videoUrl} className="w-full h-full object-cover rounded-md" />
        ) : (
          <>
            {isLoading && <Spinner />}
            {imageError && <div className="text-red-400 p-4">{imageError}</div>}
            {!isLoading && imageUrl && (
              <img src={imageUrl} alt={scene.title} className="w-full h-full object-cover rounded-md" />
            )}
            {isGeneratingVideo && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-md p-4">
                <Spinner />
                <p className="mt-4 text-gold-accent text-center">{videoStatus}</p>
              </div>
            )}
          </>
        )}
      </div>
      <p className="text-light-parchment/90 font-serif italic text-lg leading-relaxed">{scene.narration}</p>

      {!videoUrl && (
        <div className="mt-4 text-center">
            <button 
                onClick={handleGenerateVideo} 
                disabled={isGeneratingVideo} 
                className="bg-transparent border-2 border-gold-accent text-gold-accent font-bold py-2 px-6 rounded-full hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed">
                {isGeneratingVideo ? 'Generating...' : 'Generate Video'}
            </button>
        </div>
      )}
      {videoError && <p className="text-red-400 text-center mt-2">{videoError}</p>}
    </div>
  );
};

export default SceneDisplay;
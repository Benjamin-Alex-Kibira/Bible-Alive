
import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/geminiService';
import type { Scene } from '../types';
import Spinner from './Spinner';

interface SceneDisplayProps {
  scene: Scene;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = await generateImage(scene.visualPrompt);
        setImageUrl(url);
      } catch (err) {
        setError('Failed to generate image.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [scene]);

  const aspectRatioClass = {
    "16:9": "aspect-[16/9]",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  }[scene.visualPrompt.aspectRatio || "16:9"];

  return (
    <div className="bg-black/20 rounded-lg shadow-lg overflow-hidden p-4 md:p-6 mb-12">
      <h3 className="text-2xl md:text-3xl font-serif text-gold-accent mb-4">{scene.title}</h3>
      <div className={`w-full ${aspectRatioClass} bg-deep-indigo/50 rounded-md flex items-center justify-center mb-4`}>
        {isLoading && <Spinner />}
        {error && <div className="text-red-400 p-4">{error}</div>}
        {!isLoading && imageUrl && (
          <img src={imageUrl} alt={scene.title} className="w-full h-full object-cover rounded-md" />
        )}
      </div>
      <p className="text-light-parchment/90 font-serif italic text-lg leading-relaxed">{scene.narration}</p>
    </div>
  );
};

export default SceneDisplay;

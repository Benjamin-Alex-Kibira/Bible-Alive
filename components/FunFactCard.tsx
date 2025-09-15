
import React, { useState, useEffect } from 'react';
import type { FunFact, BibleVerse } from '../types';
import { generateImage } from '../services/geminiService';
import { getVerse } from '../services/bibleService';
import Spinner from './Spinner';

interface FunFactCardProps {
  fact: FunFact;
}

const FunFactCard: React.FC<FunFactCardProps> = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scripture, setScripture] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisualsAndText = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [url, verse] = await Promise.all([
          generateImage(fact.visualPrompt),
          getVerse(fact.scriptureRef.book, fact.scriptureRef.chapter, fact.scriptureRef.verseStart, 'KJV')
        ]);
        setImageUrl(url);
        setScripture(verse);
      } catch (err) {
        setError('Failed to generate content for the daily fact.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisualsAndText();
  }, [fact]);

  const aspectRatioClass = {
    "16:9": "aspect-[16/9]",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  }[fact.visualPrompt.aspectRatio || "16:9"];

  return (
    <div className="bg-deep-indigo/50 h-full rounded-lg shadow-lg overflow-hidden border border-gold-accent/20 p-4 md:p-6 flex flex-col">
      <h3 className="text-2xl md:text-3xl font-serif text-gold-accent mb-4">{fact.question}</h3>
      
      <div className={`w-full ${aspectRatioClass} bg-black/20 rounded-md flex items-center justify-center mb-4`}>
        {isLoading && <Spinner />}
        {error && <div className="text-red-400 p-4">{error}</div>}
        {!isLoading && imageUrl && (
          <img src={imageUrl} alt={fact.question} loading="lazy" className="w-full h-full object-cover rounded-md" />
        )}
      </div>

      <p className="text-light-parchment/90 font-sans text-base leading-relaxed mb-4">{fact.explanation}</p>

      {scripture && (
         <div className="mt-auto bg-black/20 p-4 rounded-lg border-l-4 border-gold-accent/40">
            <h4 className="text-sm font-bold font-sans text-gold-accent/80">As seen in {scripture.book} {scripture.chapter}:{fact.scriptureRef.verseStart}{fact.scriptureRef.verseEnd ? `-${fact.scriptureRef.verseEnd}` : ''}</h4>
            <blockquote className="text-md font-serif italic text-light-parchment/80 mt-2 leading-relaxed">
                "...{scripture.text}"
            </blockquote>
        </div>
      )}
    </div>
  );
};

export default FunFactCard;

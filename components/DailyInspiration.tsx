
import React, { useState, useEffect } from 'react';
import { getDailyFunFact, getDailyVerse } from '../services/dailyInspirationService';
import type { FunFact, BibleVerse } from '../types';
import FunFactCard from './FunFactCard';
import VerseOfTheDayCard from './VerseOfTheDayCard';
import Spinner from './Spinner';

const DailyInspiration: React.FC = () => {
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyContent = async () => {
      setIsLoading(true);
      try {
        const [fact, verse] = await Promise.all([
          getDailyFunFact(),
          getDailyVerse()
        ]);
        setFunFact(fact);
        setVerse(verse);
      } catch (err) {
        console.error("Failed to load daily inspiration:", err);
        setError("Could not load daily inspiration. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDailyContent();
  }, []);

  return (
    <section id="daily-inspiration" className="py-12">
      <h2 className="text-3xl font-serif font-bold text-center mb-10 text-gold-accent">Daily Inspiration</h2>
      
      {isLoading && <Spinner />}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!isLoading && funFact && verse && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
                <FunFactCard fact={funFact} />
            </div>
            <div className="lg:col-span-2">
                <VerseOfTheDayCard verse={verse} />
            </div>
        </div>
      )}
    </section>
  );
};

export default DailyInspiration;


import { funFacts, versesOfTheDay } from '../data/dailyInspiration';
import { getVerse } from './bibleService';
import type { FunFact, BibleVerse } from '../types';

/**
 * Gets the day of the year (1-366).
 * @returns {number} The current day of the year.
 */
const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

/**
 * Provides a "Fun Fact of the Day" by selecting one from the list based on the current date.
 * This ensures every user gets the same fact on the same day.
 * @returns {FunFact} The fun fact for the current day.
 */
export const getDailyFunFact = (): FunFact => {
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % funFacts.length;
  return funFacts[index];
};

/**
 * Provides a "Verse of the Day" by selecting a reference based on the current date
 * and then fetching its full text.
 * @returns {Promise<BibleVerse | null>} A promise that resolves to the full BibleVerse object or null if it fails.
 */
export const getDailyVerse = async (): Promise<BibleVerse | null> => {
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % versesOfTheDay.length;
  const verseRef = versesOfTheDay[index];
  
  // We'll fetch the KJV version for the verse of the day by default.
  return getVerse(verseRef.book, verseRef.chapter, verseRef.verseStart, 'KJV');
};

import { bibleData, allBookNames, bibleStructure, getVerseCount } from '../data/bible';
import type { BibleVerse } from '../types';
import { generateVerseText } from './geminiService';

export const getVerse = async (book: string, chapter: number, verse: number, version: string): Promise<BibleVerse | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const versionData = bibleData[version];
  if (!versionData) {
      return null;
  }

  const bookData = versionData[book];
  if (bookData) {
    const chapterData = bookData[chapter];
    if (chapterData) {
      const verseData = chapterData[verse];
      if (verseData) {
        // If the text is a placeholder, fetch it from the AI
        if (verseData.text && verseData.text.startsWith('This is the placeholder text')) {
            try {
                const newText = await generateVerseText(book, chapter, verse, version);
                // Cache the fetched text to avoid future API calls for the same verse
                verseData.text = newText; 
            } catch (e) {
                console.error(`Failed to dynamically fetch verse text for ${book} ${chapter}:${verse}`, e);
                // If it fails, we'll just fall through and return the placeholder.
            }
        }

        return {
          book,
          chapter,
          verse,
          text: verseData.text,
          version,
          contextualMeaning: verseData.contextualMeaning,
          commentary: verseData.commentary,
        };
      }
    }
  }
  return null;
};

export const getAvailableBooks = (): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => { // Simulate network delay
            resolve(allBookNames);
        }, 100);
    });
};

export const getChaptersForBook = (book: string): number[] => {
    return bibleStructure[book] || [];
};

export const getVersesForChapter = (book: string, chapter: number): number[] => {
    const verseCount = getVerseCount(book, chapter);
    return Array.from({ length: verseCount }, (_, i) => i + 1);
};
import { bibleData, allBookNames } from '../data/bible';
import type { BibleVerse } from '../types';

export const getVerse = (book: string, chapter: number, verse: number): Promise<BibleVerse | null> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network delay
      const bookData = bibleData[book];
      if (bookData) {
        const chapterData = bookData[chapter];
        if (chapterData) {
          const verseText = chapterData[verse];
          if (verseText) {
            resolve({ book, chapter, verse, text: verseText });
            return;
          }
        }
      }
      resolve(null);
    }, 300);
  });
};

export const getAvailableBooks = (): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => { // Simulate network delay
            resolve(allBookNames);
        }, 100);
    });
};
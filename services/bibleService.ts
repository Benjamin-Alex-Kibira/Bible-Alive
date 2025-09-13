import { bibleData, allBookNames, bibleStructure, getVerseCount } from '../data/bible';
import type { BibleVerse } from '../types';

export const getVerse = (book: string, chapter: number, verse: number, version: string): Promise<BibleVerse | null> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network delay
      const versionData = bibleData[version];
      if (!versionData) {
          resolve(null);
          return;
      }

      const bookData = versionData[book];
      if (bookData) {
        const chapterData = bookData[chapter];
        if (chapterData) {
          const verseData = chapterData[verse];
          if (verseData) {
            resolve({
              book,
              chapter,
              verse,
              text: verseData.text,
              version,
              contextualMeaning: verseData.contextualMeaning,
              commentary: verseData.commentary,
            });
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

export const getChaptersForBook = (book: string): number[] => {
    return bibleStructure[book] || [];
};

export const getVersesForChapter = (book: string, chapter: number): number[] => {
    const verseCount = getVerseCount(book, chapter);
    return Array.from({ length: verseCount }, (_, i) => i + 1);
};
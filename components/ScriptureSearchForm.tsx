import React, { useState, useEffect } from 'react';
import { getAvailableBooks, getChaptersForBook, getVersesForChapter } from '../services/bibleService';

interface ScriptureSearchFormProps {
  onSearch: (book: string, chapter: number, verse: number) => void;
  disabled?: boolean;
}

const ScriptureSearchForm: React.FC<ScriptureSearchFormProps> = ({ onSearch, disabled }) => {
  const [books, setBooks] = useState<string[]>([]);
  const [chapters, setChapters] = useState<number[]>([]);
  const [verses, setVerses] = useState<number[]>([]);
  
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [selectedVerse, setSelectedVerse] = useState('1');

  useEffect(() => {
    getAvailableBooks().then(setBooks);
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const chapterList = getChaptersForBook(selectedBook);
      setChapters(chapterList);
      // Reset chapter and verse if the new book doesn't have the current chapter
      if (!chapterList.includes(parseInt(selectedChapter, 10))) {
        setSelectedChapter('1');
        setSelectedVerse('1');
      }
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
        const verseList = getVersesForChapter(selectedBook, parseInt(selectedChapter, 10));
        setVerses(verseList);
        // Reset verse if the new chapter doesn't have the current verse
        if (!verseList.includes(parseInt(selectedVerse, 10))) {
            setSelectedVerse('1');
        }
    }
  }, [selectedBook, selectedChapter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chapNum = parseInt(selectedChapter, 10);
    const verseNum = parseInt(selectedVerse, 10);
    if (selectedBook && !isNaN(chapNum) && !isNaN(verseNum)) {
      onSearch(selectedBook, chapNum, verseNum);
    } else {
      alert("Please make a valid selection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-deep-indigo/50 rounded-lg border border-gold-accent/20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
          <label htmlFor="book-select" className="block text-sm font-medium text-gold-accent mb-1">
            Book
          </label>
          <select
            id="book-select"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            disabled={disabled}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
          >
            {books.map((book) => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="chapter-select" className="block text-sm font-medium text-gold-accent mb-1">
            Chapter
          </label>
          <select
            id="chapter-select"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={disabled || !selectedBook}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
          >
            {chapters.map((chap) => (
                <option key={chap} value={chap}>{chap}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="verse-select" className="block text-sm font-medium text-gold-accent mb-1">
            Verse
          </label>
           <select
            id="verse-select"
            value={selectedVerse}
            onChange={(e) => setSelectedVerse(e.target.value)}
            disabled={disabled || !selectedChapter}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
          >
            {verses.map((vers) => (
                <option key={vers} value={vers}>{vers}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
            <button
            type="submit"
            disabled={disabled}
            className="w-full bg-gold-accent text-deep-indigo font-bold py-2 px-4 rounded-md text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-gold-accent/20 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
            Search
            </button>
        </div>
      </div>
    </form>
  );
};

export default ScriptureSearchForm;
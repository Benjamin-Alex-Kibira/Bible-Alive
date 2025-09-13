import React, { useState, useEffect } from 'react';
import { getAvailableBooks } from '../services/bibleService';

interface ScriptureSearchFormProps {
  onSearch: (book: string, chapter: number, verse: number) => void;
  disabled?: boolean;
}

const ScriptureSearchForm: React.FC<ScriptureSearchFormProps> = ({ onSearch, disabled }) => {
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [chapter, setChapter] = useState('1');
  const [verse, setVerse] = useState('1');

  useEffect(() => {
    getAvailableBooks().then(setBooks);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chapNum = parseInt(chapter, 10);
    const verseNum = parseInt(verse, 10);
    if (selectedBook && !isNaN(chapNum) && !isNaN(verseNum) && chapNum > 0 && verseNum > 0) {
      onSearch(selectedBook, chapNum, verseNum);
    } else {
      alert("Please enter valid chapter and verse numbers.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-deep-indigo/50 rounded-lg border border-gold-accent/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
          <label htmlFor="chapter-input" className="block text-sm font-medium text-gold-accent mb-1">
            Chapter
          </label>
          <input
            type="number"
            id="chapter-input"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            min="1"
            disabled={disabled}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="verse-input" className="block text-sm font-medium text-gold-accent mb-1">
            Verse
          </label>
          <input
            type="number"
            id="verse-input"
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
            min="1"
            disabled={disabled}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent disabled:opacity-50"
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={disabled}
          className="bg-gold-accent text-deep-indigo font-bold py-3 px-12 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-gold-accent/20 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default ScriptureSearchForm;
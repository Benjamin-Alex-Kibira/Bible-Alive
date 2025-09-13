import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Story } from '../types';

interface ScriptureNavigatorProps {
  stories: Story[];
  currentSlug: string;
}

const ScriptureNavigator: React.FC<ScriptureNavigatorProps> = ({ stories, currentSlug }) => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const storiesByBook = useMemo(() => {
    return stories.reduce((acc, story) => {
      const bookName = story.canonicalRefs[0]?.book || 'Unknown';
      if (!acc[bookName]) {
        acc[bookName] = [];
      }
      acc[bookName].push(story);
      return acc;
    }, {} as Record<string, Story[]>);
  }, [stories]);

  const books = Object.keys(storiesByBook);

  useEffect(() => {
    const currentStory = stories.find(s => s.slug === currentSlug);
    if (currentStory) {
      const currentBook = currentStory.canonicalRefs[0]?.book;
      if (currentBook) {
        setSelectedBook(currentBook);
      }
    }
  }, [currentSlug, stories]);

  const handleBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const book = event.target.value;
    setSelectedBook(book);
    if (book && storiesByBook[book]?.[0]) {
      navigate(`/stories/${storiesByBook[book][0].slug}`);
    }
  };
  
  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = event.target.value;
    if (slug) {
        navigate(`/stories/${slug}`);
    }
  };

  const chaptersForSelectedBook = selectedBook ? storiesByBook[selectedBook] : [];

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-deep-indigo/50 rounded-lg border border-gold-accent/20">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="book-select" className="block text-sm font-medium text-gold-accent mb-1">
            Book
          </label>
          <select
            id="book-select"
            value={selectedBook || ''}
            onChange={handleBookChange}
            className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent"
          >
            <option value="" disabled>Select a Book</option>
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>
        
        {selectedBook && chaptersForSelectedBook.length > 0 && (
          <div className="flex-1">
            <label htmlFor="chapter-select" className="block text-sm font-medium text-gold-accent mb-1">
              Story / Chapter
            </label>
            <select
              id="chapter-select"
              value={currentSlug}
              onChange={handleChapterChange}
              className="w-full bg-deep-indigo border border-gold-accent/50 text-light-parchment rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gold-accent"
            >
              {chaptersForSelectedBook.map((story) => (
                 <option key={story.slug} value={story.slug}>
                    {`Chapter ${story.canonicalRefs[0].chapter}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptureNavigator;
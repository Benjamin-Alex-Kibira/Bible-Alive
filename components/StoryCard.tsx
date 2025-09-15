import React from 'react';
import { Link } from 'react-router-dom';
import type { Story } from '../types';
import Spinner from './Spinner';
import { BookmarkIcon, BookmarkSolidIcon } from './icons';

interface StoryCardProps {
  story: Story;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  imageUrl: string | null;
  isLoading: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isBookmarked, onToggleBookmark, imageUrl, isLoading }) => {

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark(story.slug);
  };

  return (
    <Link to={`/stories/${story.slug}`} className="group block rounded-lg overflow-hidden shadow-lg shadow-black/40 transition-all duration-300 hover:shadow-[0_0_25px_3px_rgba(212,175,55,0.3)] hover:-translate-y-2 bg-deep-indigo/50">
      <div className="relative aspect-[4/3]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <img src={imageUrl || `https://picsum.photos/seed/${story.slug}/500/300`} alt={story.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <button 
          onClick={handleBookmarkClick} 
          className="absolute top-3 right-3 z-20 p-2 bg-black/30 rounded-full text-light-parchment hover:text-gold-accent transition-colors duration-200"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? <BookmarkSolidIcon className="w-5 h-5 text-gold-accent" /> : <BookmarkIcon className="w-5 h-5" />}
        </button>

        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-xl font-serif font-bold text-white">{story.title}</h3>
          <div className="relative h-5 mt-1">
             <p className="absolute bottom-0 text-sm text-gold-accent transition-opacity duration-300 group-hover:opacity-0">{story.tags?.join(', ')}</p>
            <p className="absolute bottom-0 text-md font-serif text-light-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {story.canonicalRefs.map(ref => `${ref.book} ${ref.chapter}`).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;

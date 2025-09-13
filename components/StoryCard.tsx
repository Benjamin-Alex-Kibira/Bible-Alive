
import React from 'react';
import { Link } from 'react-router-dom';
import type { Story } from '../types';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const imageUrl = `https://picsum.photos/seed/${story.slug}/500/300`;
  
  return (
    <Link to={`/stories/${story.slug}`} className="group block rounded-lg overflow-hidden shadow-lg shadow-black/40 transition-all duration-300 hover:shadow-gold-accent/30 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative">
        <img src={imageUrl} alt={story.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-serif font-bold text-white">{story.title}</h3>
          <p className="text-sm text-gold-accent">{story.tags?.join(', ')}</p>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;

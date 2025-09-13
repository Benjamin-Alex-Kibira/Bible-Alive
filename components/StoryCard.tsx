import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Story } from '../types';
import { generateImage } from '../services/geminiService';
import Spinner from './Spinner';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const prompt = `Dramatic and cinematic cover art for the biblical story of "${story.title}". Keywords: ${story.tags?.join(', ')}. Style: digital painting, epic, reverent. Safe for all audiences. Constraints: no text or logos, no graphic violence, no nudity.`;
        
        const url = await generateImage({
          id: `story-cover-${story.slug}`,
          prompt: prompt,
          aspectRatio: "4:3", // A good aspect ratio for a card
        });
        setImageUrl(url);
      } catch (err) {
        console.error(`Failed to generate image for ${story.title}:`, err);
        // Fallback to a static image on error
        setImageUrl(`https://picsum.photos/seed/${story.slug}/500/300`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [story]);

  return (
    <Link to={`/stories/${story.slug}`} className="group block rounded-lg overflow-hidden shadow-lg shadow-black/40 transition-all duration-300 hover:shadow-gold-accent/30 hover:shadow-2xl hover:-translate-y-2 bg-deep-indigo/50">
      <div className="relative aspect-[4/3]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <img src={imageUrl || ''} alt={story.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        )}
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

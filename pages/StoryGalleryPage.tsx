import React, { useState, useEffect } from 'react';
import { getStories } from '../services/storyService';
import type { Story } from '../types';
import StoryCard from '../components/StoryCard';
import Spinner from '../components/Spinner';

const StoryGalleryPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStories().then((data) => {
      setStories(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <section className="text-center pt-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white mb-4">
          Explore the Stories
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-light-parchment/80">
          Discover the foundational narratives of the Bible, each a timeless lesson of faith, struggle, and redemption.
        </p>
      </section>

      <section id="stories">
        {isLoading ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StoryGalleryPage;
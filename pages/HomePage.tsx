
import React, { useState, useEffect } from 'react';
import { getStories } from '../services/storyService';
import type { Story } from '../types';
import StoryCard from '../components/StoryCard';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      const fetchedStories = await getStories();
      setStories(fetchedStories);
      setIsLoading(false);
    };
    fetchStories();
  }, []);

  return (
    <div>
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-white mb-4">
          Experience Scripture Like Never Before
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-light-parchment/80 mb-8">
          Journey through the Bible's most profound stories, brought to life with vivid imagery and cinematic storytelling.
        </p>
        <a href="#story-gallery" className="bg-gold-accent text-deep-indigo font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-gold-accent/20">
          Explore Stories
        </a>
      </section>

      <section id="story-gallery" className="py-12">
        <h2 className="text-3xl font-serif font-bold text-center mb-10 text-gold-accent">Story Gallery</h2>
        {isLoading ? (
          <Spinner />
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

export default HomePage;

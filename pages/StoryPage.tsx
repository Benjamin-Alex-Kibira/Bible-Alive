import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStoryBySlug, getStories } from '../services/storyService';
import type { Story } from '../types';
import Spinner from '../components/Spinner';
import SceneDisplay from '../components/SceneDisplay';
import ImmersiveMode from '../components/ImmersiveMode';
import ScriptureNavigator from '../components/ScriptureNavigator';

const StoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImmersiveMode, setIsImmersiveMode] = useState<boolean>(false);
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchStoryData = async () => {
      if (!slug) return;
      setIsLoading(true);
      setVideoUrls({}); // Reset videos when story changes

      const [fetchedStory, allFetchedStories] = await Promise.all([
        getStoryBySlug(slug),
        getStories()
      ]);

      setStory(fetchedStory || null);
      setAllStories(allFetchedStories);
      setIsLoading(false);
    };
    fetchStoryData();
  }, [slug]);

  const handleVideoGenerated = useCallback((sceneId: string, url: string) => {
    setVideoUrls(prev => ({ ...prev, [sceneId]: url }));
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (!story) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-400">Story not found.</h2>
        <Link to="/" className="text-gold-accent hover:underline mt-4 inline-block">
          &larr; Back to all stories
        </Link>
      </div>
    );
  }

  return (
    <>
      <article>
        <header className="text-center my-12">
          <Link to="/" className="text-gold-accent hover:underline mb-4 inline-block">
            &larr; All Stories
          </Link>
          
          {slug && allStories.length > 0 && (
            <ScriptureNavigator stories={allStories} currentSlug={slug} />
          )}

          <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-white">{story.title}</h1>
          <p className="text-xl text-light-parchment/80 mt-2 font-serif">
            {story.canonicalRefs.map(ref => `${ref.book} ${ref.chapter}:${ref.verseStart}${ref.verseEnd ? `-${ref.verseEnd}` : ''}`).join(', ')}
          </p>
          <button
            onClick={() => setIsImmersiveMode(true)}
            className="mt-8 bg-transparent border-2 border-gold-accent text-gold-accent font-bold py-3 px-8 rounded-full text-lg hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300"
          >
            Enter Immersive Mode
          </button>
        </header>

        <div className="max-w-4xl mx-auto">
          {story.scenes.map((scene) => (
            <SceneDisplay 
              key={scene.id} 
              scene={scene}
              videoUrl={videoUrls[scene.id]}
              onVideoGenerated={handleVideoGenerated} 
            />
          ))}
        </div>
      </article>

      {isImmersiveMode && (
          <ImmersiveMode
            story={story}
            onClose={() => setIsImmersiveMode(false)}
            videoUrls={videoUrls}
          />
      )}
    </>
  );
};

export default StoryPage;
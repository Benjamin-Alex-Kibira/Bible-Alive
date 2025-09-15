import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getStories } from '../services/storyService';
import { generateImage } from '../services/geminiService';
import type { Story } from '../types';
import StoryCard from '../components/StoryCard';
import Spinner from '../components/Spinner';

const StoryGalleryPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'all' | 'bookmarked'>('all');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }

    getStories().then((data) => {
      setStories(data);
      setIsLoading(false);
    });
  }, []);
  
  const fetchImageForStory = useCallback(async (story: Story) => {
    if (imageUrls[story.slug] || imageLoadStates[story.slug]) return;

    setImageLoadStates(prev => ({ ...prev, [story.slug]: true }));
    try {
      const prompt = `Dramatic and cinematic cover art for the biblical story of "${story.title}". Keywords: ${story.tags?.join(', ')}. Style: digital painting, epic, reverent. Safe for all audiences. Constraints: no text or logos, no graphic violence, no nudity.`;
      const url = await generateImage({
        id: `story-cover-${story.slug}`,
        prompt: prompt,
        aspectRatio: "4:3",
      });
      setImageUrls(prev => ({ ...prev, [story.slug]: url }));
    } catch (err) {
      console.error(`Failed to generate image for ${story.title}:`, err);
      // Fallback to a static image on error
      setImageUrls(prev => ({ ...prev, [story.slug]: `https://picsum.photos/seed/${story.slug}/500/300` }));
    } finally {
        setImageLoadStates(prev => ({ ...prev, [story.slug]: false }));
    }
  }, [imageUrls, imageLoadStates]);

  const toggleBookmark = useCallback((slug: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(slug)
        ? prev.filter(b => b !== slug)
        : [...prev, slug];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  }, []);

  const filteredStories = useMemo(() => stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [stories, searchTerm]);

  const bookmarkedStories = useMemo(() => 
    stories.filter(story => bookmarks.includes(story.slug)), 
  [stories, bookmarks]);
  
  const displayedStories = view === 'all' ? filteredStories : bookmarkedStories;

  const viewButtonStyle = (buttonView: 'all' | 'bookmarked') => 
    `px-6 py-2 rounded-full transition-colors duration-300 font-bold ${
      view === buttonView
        ? 'bg-gold-accent text-deep-indigo'
        : 'bg-deep-indigo/40 text-gold-accent hover:bg-deep-indigo/80'
    }`;

  return (
    <div>
      <section className="text-center pt-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white mb-4">
          Explore the Stories
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-light-parchment/80">
          Discover the foundational narratives of the Bible, each a timeless lesson of faith, struggle, and redemption.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search stories by title or tag (e.g., Moses, Creation)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-deep-indigo/60 border-2 border-gold-accent/30 rounded-full py-3 px-6 text-light-parchment placeholder-light-parchment/50 focus:outline-none focus:ring-2 focus:ring-gold-accent transition-all"
            aria-label="Search stories"
          />
        </div>
      </section>

      <div className="flex justify-center items-center gap-4 mb-10 border-b-2 border-gold-accent/10 pb-4">
        <button onClick={() => setView('all')} className={viewButtonStyle('all')}>
          All Stories
        </button>
        <button onClick={() => setView('bookmarked')} className={viewButtonStyle('bookmarked')}>
          My Bookmarks ({bookmarks.length})
        </button>
      </div>

      <section id="stories">
        {isLoading ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : (
          <>
            {displayedStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedStories.map((story) => {
                  // Trigger image fetch if not already loaded/loading
                  if (!imageUrls[story.slug] && !imageLoadStates[story.slug]) {
                    fetchImageForStory(story);
                  }
                  return (
                    <StoryCard 
                      key={story.id} 
                      story={story} 
                      isBookmarked={bookmarks.includes(story.slug)}
                      onToggleBookmark={toggleBookmark}
                      imageUrl={imageUrls[story.slug] || null}
                      isLoading={imageLoadStates[story.slug] === true}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-light-parchment/80">
                  {view === 'bookmarked' ? 'You have no bookmarked stories yet.' : 'No stories found matching your search.'}
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default StoryGalleryPage;

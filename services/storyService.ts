
import { stories } from '../data/stories';
import type { Story } from '../types';

export const getStories = (): Promise<Story[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(stories), 200); // Simulate network delay
  });
};

export const getStoryBySlug = (slug: string): Promise<Story | undefined> => {
  return new Promise((resolve) => {
    const story = stories.find((s) => s.slug === slug);
    setTimeout(() => resolve(story), 200); // Simulate network delay
  });
};


import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Story } from '../types';
import { generateImage } from '../services/geminiService';
import Spinner from './Spinner';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ImmersiveModeProps {
  story: Story;
  onClose: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const ImmersiveMode: React.FC<ImmersiveModeProps> = ({ story, onClose }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sceneIndex = page;

  const paginate = (newDirection: number) => {
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = story.scenes.length - 1;
    } else if (newPage >= story.scenes.length) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };
  
  const fetchAllImages = useCallback(async () => {
    setIsLoading(true);
    const urls = await Promise.all(
      story.scenes.map(scene => generateImage(scene.visualPrompt))
    );
    setImageUrls(urls);
    setIsLoading(false);
  }, [story.scenes]);

  useEffect(() => {
    fetchAllImages();
  }, [fetchAllImages]);
  
  const currentScene = story.scenes[sceneIndex];
  const currentImageUrl = imageUrls[sceneIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-20">
        <XMarkIcon className="w-10 h-10" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="absolute w-full h-full flex items-center justify-center"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {isLoading || !currentImageUrl ? (
              <Spinner />
            ) : (
              <>
                <img
                  src={currentImageUrl}
                  alt={currentScene.title}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-8 text-center">
                    <h3 className="text-2xl md:text-4xl font-serif text-gold-accent mb-2">{currentScene.title}</h3>
                    <p className="text-base md:text-xl text-white font-serif italic max-w-4xl mx-auto">{currentScene.narration}</p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <button onClick={() => paginate(-1)} className="bg-black/30 text-white/70 hover:text-white p-3 rounded-full">
                <ChevronLeftIcon className="w-8 h-8"/>
            </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <button onClick={() => paginate(1)} className="bg-black/30 text-white/70 hover:text-white p-3 rounded-full">
                <ChevronRightIcon className="w-8 h-8"/>
            </button>
        </div>
      </div>
      <div className="absolute bottom-4 text-white/80 z-20">{sceneIndex + 1} / {story.scenes.length}</div>
    </motion.div>
  );
};

export default ImmersiveMode;

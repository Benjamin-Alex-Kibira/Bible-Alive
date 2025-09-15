import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from './icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <footer className="bg-deep-indigo/50 mt-12 py-6 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-light-parchment/70">
        <p>&copy; {currentYear} Bible Stories Alive. All Rights Reserved.</p>
        <p className="text-sm mt-1">Bringing Scripture to Life Through Technology</p>
      </div>
      <div className="absolute bottom-5 right-5">
        <audio 
          ref={audioRef} 
          src="https://assets.mixkit.co/music/preview/mixkit-a-promise-of-a-new-day-584.mp3" 
          loop 
          preload="none" 
        />
        <button 
            onClick={togglePlay} 
            className="bg-deep-indigo/70 backdrop-blur-sm border border-gold-accent/30 p-2 rounded-full text-gold-accent hover:bg-gold-accent hover:text-deep-indigo transition-colors"
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>
      </div>
    </footer>
  );
};

export default Footer;

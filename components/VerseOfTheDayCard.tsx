
import React, { useState } from 'react';
import type { BibleVerse } from '../types';
import { DevicePhoneMobileIcon, XMarkIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

interface VerseOfTheDayCardProps {
  verse: BibleVerse;
}

const VerseOfTheDayCard: React.FC<VerseOfTheDayCardProps> = ({ verse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-deep-indigo/50 h-full rounded-lg shadow-lg border border-gold-accent/20 p-6 md:p-8 flex flex-col justify-center text-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gold-accent/80 mb-4">Verse of the Day</h3>
        <blockquote className="text-2xl font-serif italic text-light-parchment/90 leading-relaxed">
          "{verse.text}"
        </blockquote>
        <p className="text-xl font-serif text-gold-accent mt-4">
          {verse.book} {verse.chapter}:{verse.verse}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 mx-auto flex items-center space-x-2 bg-transparent border border-gold-accent/50 text-gold-accent/90 font-bold py-2 px-6 rounded-full text-base hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300"
          aria-label="Add daily verse to your homescreen"
        >
          <DevicePhoneMobileIcon className="w-5 h-5" />
          <span>Add to Homescreen</span>
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-deep-indigo relative max-w-sm w-full rounded-lg shadow-2xl border border-gold-accent/30 p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-light-parchment/70 hover:text-white"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <DevicePhoneMobileIcon className="w-12 h-12 text-gold-accent mx-auto mb-4" />
              <h3 className="text-xl font-serif text-gold-accent mb-3">Feature Coming Soon!</h3>
              <p className="text-light-parchment/80">
                In a future mobile app version, you'll be able to get the Verse of the Day sent directly to your phone's homescreen as a daily notification or widget!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerseOfTheDayCard;

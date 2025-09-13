import React from 'react';
import { Link } from 'react-router-dom';
import DailyInspiration from '../components/DailyInspiration';

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-white mb-4">
          Experience Scripture Like Never Before
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-light-parchment/80 mb-8">
          Journey through the Bible's most profound stories, brought to life with vivid imagery and cinematic storytelling.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#daily-inspiration" className="w-full sm:w-auto bg-gold-accent text-deep-indigo font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-gold-accent/20">
            See Daily Inspiration
          </a>
          <Link to="/stories" className="w-full sm:w-auto bg-transparent border-2 border-gold-accent text-gold-accent font-bold py-3 px-8 rounded-full text-lg hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300">
            Browse All Stories
          </Link>
        </div>
      </section>

      <DailyInspiration />
    </div>
  );
};

export default HomePage;
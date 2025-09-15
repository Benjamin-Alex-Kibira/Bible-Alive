import React from 'react';
import { Link } from 'react-router-dom';
import DailyInspiration from '../components/DailyInspiration';

const Particles: React.FC = () => {
  const particles = React.useMemo(() => Array.from({ length: 50 }).map((_, i) => {
    const style = {
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      left: `${Math.random() * 100}%`,
      top: '100%',
      animationDuration: `${Math.random() * 20 + 15}s`,
      animationDelay: `${Math.random() * -35}s`,
    };
    return <div key={i} className="particle" style={style}></div>;
  }), []);

  return <div className="absolute inset-0 z-0">{particles}</div>;
};


const HomePage: React.FC = () => {
  return (
    <div>
      <section className="relative text-center py-16 md:py-24 overflow-hidden">
        <Particles />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-white mb-4 opacity-0 animate-fade-in-up">
            Experience Scripture Like Never Before
          </h1>
          <p
            className="max-w-3xl mx-auto text-lg md:text-xl text-light-parchment/80 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Journey through the Bible's most profound stories, brought to life with vivid imagery and cinematic storytelling.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <a href="#daily-inspiration" className="w-full sm:w-auto bg-gold-accent text-deep-indigo font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-gold-accent/20">
              See Daily Inspiration
            </a>
            <Link to="/stories" className="w-full sm:w-auto bg-transparent border-2 border-gold-accent text-gold-accent font-bold py-3 px-8 rounded-full text-lg hover:bg-gold-accent hover:text-deep-indigo transition-colors duration-300">
              Browse All Stories
            </Link>
          </div>
        </div>
      </section>

      <DailyInspiration />
    </div>
  );
};

export default HomePage;

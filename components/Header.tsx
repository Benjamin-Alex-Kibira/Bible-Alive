
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-deep-indigo/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold font-serif text-gold-accent tracking-wider">
            Bible Stories Alive
          </Link>
          <nav>
            <Link to="/" className="text-light-parchment hover:text-gold-accent transition-colors duration-300">
              Explore Stories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

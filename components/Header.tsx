import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const activeLinkStyle = {
    color: '#d4af37',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-deep-indigo/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold font-serif text-gold-accent tracking-wider">
            Bible Stories Alive
          </Link>
          <nav className="flex items-center space-x-6">
            <NavLink 
              to="/" 
              className="text-light-parchment hover:text-gold-accent transition-colors duration-300"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
              Explore Stories
            </NavLink>
            <NavLink 
              to="/explorer" 
              className="text-light-parchment hover:text-gold-accent transition-colors duration-300"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
              Scripture Explorer
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
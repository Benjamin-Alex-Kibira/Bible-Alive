
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-deep-indigo/50 mt-12 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-light-parchment/70">
        <p>&copy; {currentYear} Bible Stories Alive. All Rights Reserved.</p>
        <p className="text-sm mt-1">Bringing Scripture to Life Through Technology</p>
      </div>
    </footer>
  );
};

export default Footer;

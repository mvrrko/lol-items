import React from 'react';
import { Link } from 'react-router-dom';
import { XPBar } from '../gamification/XPBar';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {

  return (
    <nav className="bg-lol-secondary border-b border-lol-accent/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden text-lol-gold hover:text-white mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-lol-accent to-lol-gold bg-clip-text text-transparent">
                LoL Item Master
              </h1>
            </Link>
          </div>
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <XPBar />
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/achievements"
              className="text-lol-gold hover:text-white transition-colors"
            >
              🏆
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

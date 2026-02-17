import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/study', label: 'Study Mode', icon: '📚' },
  { path: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { path: '/crafting', label: 'Crafting Quiz', icon: '🧩' },
  { path: '/pricing', label: 'Pricing Quiz', icon: '💰' },
  { path: '/buildpath', label: 'Build Path Quiz', icon: '🔄' },
  { path: '/daily', label: 'Daily Challenge', icon: '📅' },
  { path: '/achievements', label: 'Achievements', icon: '🏆' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-lol-secondary border-r border-lol-accent/30 z-40 transform transition-transform duration-300 lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-lol-accent text-lol-primary font-semibold'
                    : 'text-lol-gold hover:bg-lol-primary hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

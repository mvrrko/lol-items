import React from 'react';
import { getRankName } from '../../utils/xpUtils';

interface LevelBadgeProps {
  level: number;
  xp: number;
  size?: 'sm' | 'md' | 'lg';
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, xp, size = 'md' }) => {
  const rankName = getRankName(xp);
  
  const sizes = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-lg',
  };

  const getRankColor = (rank: string) => {
    const colors: { [key: string]: string } = {
      'Iron': 'from-gray-600 to-gray-800',
      'Bronze': 'from-amber-700 to-amber-900',
      'Silver': 'from-gray-300 to-gray-500',
      'Gold': 'from-yellow-400 to-yellow-600',
      'Platinum': 'from-cyan-400 to-cyan-600',
      'Diamond': 'from-blue-400 to-blue-600',
      'Master': 'from-purple-500 to-purple-700',
      'Grandmaster': 'from-red-500 to-red-700',
      'Challenger': 'from-blue-300 to-purple-500',
    };
    return colors[rank] || colors['Iron'];
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br ${getRankColor(
          rankName
        )} flex items-center justify-center border-4 border-lol-accent shadow-lg`}
      >
        <span className="font-bold text-white">{level}</span>
      </div>
      <span className="text-lol-accent text-xs mt-1 font-semibold">{rankName}</span>
    </div>
  );
};

import React from 'react';
import type { Item } from '../../types';
import { getItemImageUrl, parseItemStats } from '../../utils/itemUtils';

interface FlashcardProps {
  item: Item;
  version: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ item, version, isFlipped, onFlip }) => {
  const stats = parseItemStats(item.stats);

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={`relative w-full h-96 cursor-pointer transition-transform duration-600 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-lol-secondary to-lol-primary border-2 border-lol-accent rounded-2xl p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-32 h-32 mb-6 rounded-xl overflow-hidden border-4 border-lol-accent shadow-lg">
            <img
              src={getItemImageUrl(version, item.image.full)}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23333" width="128" height="128"/%3E%3C/svg%3E';
              }}
            />
          </div>
          <h2 className="text-3xl font-bold text-lol-gold text-center mb-2">{item.name}</h2>
          <p className="text-lol-accent text-center">{item.gold.total}g</p>
          <p className="text-sm text-gray-400 mt-6">Click to flip</p>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-lol-primary to-lol-secondary border-2 border-lol-accent rounded-2xl p-6 overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <h3 className="text-xl font-bold text-lol-gold mb-4">{item.name}</h3>
          
          {/* Stats */}
          {stats.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lol-accent font-semibold mb-2">Stats:</h4>
              <ul className="space-y-1 text-sm">
                {stats.map((stat, index) => (
                  <li key={index} className="text-lol-gold">
                    {stat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cost */}
          <div className="mb-4">
            <h4 className="text-lol-accent font-semibold mb-2">Cost:</h4>
            <div className="text-sm text-lol-gold">
              <div>Total: {item.gold.total}g</div>
              <div>Recipe: {item.gold.base}g</div>
            </div>
          </div>

          {/* Description */}
          {item.plaintext && (
            <div className="mb-4">
              <h4 className="text-lol-accent font-semibold mb-2">Description:</h4>
              <p className="text-sm text-gray-300">{item.plaintext}</p>
            </div>
          )}

          {/* Tags */}
          <div>
            <h4 className="text-lol-accent font-semibold mb-2">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-lol-primary text-xs text-lol-gold rounded-full border border-lol-accent/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">Click to flip back</p>
        </div>
      </div>
    </div>
  );
};

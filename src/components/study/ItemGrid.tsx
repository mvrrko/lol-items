import React from 'react';
import type { Item } from '../../types';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  items: Item[];
  version: string;
  onItemClick: (item: Item) => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items, version, onItemClick }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          version={version}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

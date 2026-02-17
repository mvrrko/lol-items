import React from 'react';
import type { Item } from '../../types';
import { getItemImageUrl } from '../../utils/itemUtils';
import { Card } from '../common/Card';

interface ItemCardProps {
  item: Item;
  version: string;
  onClick: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, version, onClick }) => {
  return (
    <Card hover onClick={onClick} className="flex flex-col items-center p-4">
      <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden border-2 border-lol-accent/50">
        <img
          src={getItemImageUrl(version, item.image.full)}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23333" width="64" height="64"/%3E%3C/svg%3E';
          }}
        />
      </div>
      <h3 className="text-sm font-semibold text-lol-gold text-center line-clamp-2">
        {item.name}
      </h3>
      <p className="text-xs text-lol-accent mt-1">{item.gold.total}g</p>
    </Card>
  );
};

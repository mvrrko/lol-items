import React from 'react';
import type { Item } from '../../types';
import { Modal } from '../common/Modal';
import { getItemImageUrl, parseItemStats } from '../../utils/itemUtils';
import { getItemComponents, getItemUpgrades } from '../../utils/quizUtils';

interface ItemDetailProps {
  item: Item | null;
  version: string;
  allItems: { [key: string]: Item };
  onClose: () => void;
}

export const ItemDetail: React.FC<ItemDetailProps> = ({ item, version, allItems, onClose }) => {
  if (!item) return null;

  const components = getItemComponents(item.id, allItems);
  const upgrades = getItemUpgrades(item.id, allItems);
  const stats = parseItemStats(item.stats);

  return (
    <Modal isOpen={!!item} onClose={onClose} title={item.name}>
      <div className="space-y-6">
        {/* Item Image and Basic Info */}
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-lol-accent">
            <img
              src={getItemImageUrl(version, item.image.full)}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23333" width="96" height="96"/%3E%3C/svg%3E';
              }}
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-300 mb-2">{item.plaintext}</p>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-gray-400">Total Cost:</span>
                <span className="text-lol-accent font-bold ml-2">{item.gold.total}g</span>
              </div>
              <div>
                <span className="text-gray-400">Recipe Cost:</span>
                <span className="text-lol-gold font-bold ml-2">{item.gold.base}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div>
            <h3 className="text-lol-gold font-bold mb-2">Stats</h3>
            <div className="bg-lol-primary rounded-lg p-4">
              <ul className="space-y-1">
                {stats.map((stat, index) => (
                  <li key={index} className="text-lol-gold">
                    {stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Description */}
        {item.description && (
          <div>
            <h3 className="text-lol-gold font-bold mb-2">Description</h3>
            <div
              className="bg-lol-primary rounded-lg p-4 text-gray-300"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        )}

        {/* Build From (Components) */}
        {components.length > 0 && (
          <div>
            <h3 className="text-lol-gold font-bold mb-2">Builds From</h3>
            <div className="flex flex-wrap gap-2">
              {components.map((component) => (
                <div
                  key={component.id}
                  className="flex items-center gap-2 bg-lol-primary rounded-lg p-2 border border-lol-accent/30"
                >
                  <img
                    src={getItemImageUrl(version, component.image.full)}
                    alt={component.name}
                    className="w-8 h-8 rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect fill="%23333" width="32" height="32"/%3E%3C/svg%3E';
                    }}
                  />
                  <span className="text-sm text-lol-gold">{component.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Builds Into */}
        {upgrades.length > 0 && (
          <div>
            <h3 className="text-lol-gold font-bold mb-2">Builds Into</h3>
            <div className="flex flex-wrap gap-2">
              {upgrades.map((upgrade) => (
                <div
                  key={upgrade.id}
                  className="flex items-center gap-2 bg-lol-primary rounded-lg p-2 border border-lol-accent/30"
                >
                  <img
                    src={getItemImageUrl(version, upgrade.image.full)}
                    alt={upgrade.name}
                    className="w-8 h-8 rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect fill="%23333" width="32" height="32"/%3E%3C/svg%3E';
                    }}
                  />
                  <span className="text-sm text-lol-gold">{upgrade.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <h3 className="text-lol-gold font-bold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-lol-primary text-lol-accent text-sm rounded-full border border-lol-accent/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

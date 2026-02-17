import React, { useState, useMemo } from 'react';
import { useItems } from '../hooks/useItems';
import type { Item } from '../types';
import { ItemGrid } from '../components/study/ItemGrid';
import { FilterBar } from '../components/study/FilterBar';
import { ItemDetail } from '../components/study/ItemDetail';

export const StudyMode: React.FC = () => {
  const { items, itemsById, loading, error, version } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(10000);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);
      const matchesCost = item.gold.total >= minCost && item.gold.total <= maxCost;
      return matchesSearch && matchesTag && matchesCost;
    });
  }, [items, searchTerm, selectedTag, minCost, maxCost]);

  if (loading) {
    return (
      <div className="min-h-screen bg-lol-primary flex items-center justify-center">
        <div className="text-lol-gold text-2xl">Loading items...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-lol-gold mb-2">Study Mode</h1>
        <p className="text-gray-400 mb-8">Browse and learn all League of Legends items</p>

        {error && (
          <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-6">
            <p className="text-yellow-400">⚠️ {error}</p>
          </div>
        )}

        <FilterBar
          onSearchChange={setSearchTerm}
          onTagFilter={setSelectedTag}
          onCostFilter={(min, max) => {
            setMinCost(min);
            setMaxCost(max);
          }}
        />

        <div className="mb-4">
          <p className="text-gray-400">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        <ItemGrid items={filteredItems} version={version} onItemClick={setSelectedItem} />

        <ItemDetail
          item={selectedItem}
          version={version}
          allItems={itemsById}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </div>
  );
};

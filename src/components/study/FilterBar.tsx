import React, { useState } from 'react';
import { ITEM_TAGS } from '../../data/constants';

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onTagFilter: (tag: string | null) => void;
  onCostFilter: (min: number, max: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearchChange,
  onTagFilter,
  onCostFilter,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(10000);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleTagChange = (tag: string) => {
    const newTag = tag === selectedTag ? null : tag;
    setSelectedTag(newTag);
    onTagFilter(newTag);
  };

  const handleCostChange = (min: number, max: number) => {
    setMinCost(min);
    setMaxCost(max);
    onCostFilter(min, max);
  };

  return (
    <div className="bg-lol-secondary border border-lol-accent/30 rounded-lg p-4 mb-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search items..."
          className="w-full px-4 py-2 bg-lol-primary border border-lol-accent/50 rounded-lg text-lol-gold placeholder-gray-500 focus:outline-none focus:border-lol-accent"
        />
      </div>

      {/* Cost Range */}
      <div className="mb-4">
        <label className="text-lol-gold text-sm font-semibold mb-2 block">
          Cost Range: {minCost}g - {maxCost}g
        </label>
        <div className="flex gap-4">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={minCost}
            onChange={(e) => handleCostChange(Number(e.target.value), maxCost)}
            className="flex-1"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={maxCost}
            onChange={(e) => handleCostChange(minCost, Number(e.target.value))}
            className="flex-1"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="text-lol-gold text-sm font-semibold mb-2 block">Filter by Tag</label>
        <div className="flex flex-wrap gap-2">
          {ITEM_TAGS.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-lol-accent text-lol-primary font-semibold'
                  : 'bg-lol-primary text-lol-gold border border-lol-accent/30 hover:border-lol-accent'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

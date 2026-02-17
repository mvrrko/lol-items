import React, { useState } from 'react';
import type { Item } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { getItemImageUrl } from '../../utils/itemUtils';

interface CraftingQuizProps {
  targetItem: Item;
  components: Item[];
  distractors: Item[];
  version: string;
  onAnswer: (correct: boolean, timeToAnswer: number) => void;
}

export const CraftingQuiz: React.FC<CraftingQuizProps> = ({
  targetItem,
  components,
  distractors,
  version,
  onAnswer,
}) => {
  const [startTime] = useState(Date.now());
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);

  const allItems = [...components, ...distractors];
  const requiredCount = components.length;

  const handleItemClick = (itemId: string) => {
    if (answered) return;

    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else if (selectedItems.length < requiredCount) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSubmit = () => {
    if (answered) return;
    
    const timeToAnswer = (Date.now() - startTime) / 1000;
    const correctIds = components.map((c) => c.id).sort();
    const selectedIds = [...selectedItems].sort();
    const correct = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
    
    setAnswered(true);
    setTimeout(() => {
      onAnswer(correct, timeToAnswer);
    }, 1000);
  };

  const isCorrect = () => {
    const correctIds = components.map((c) => c.id).sort();
    const selectedIds = [...selectedItems].sort();
    return JSON.stringify(correctIds) === JSON.stringify(selectedIds);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        {/* Target Item */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-lol-gold mb-4">Craft This Item:</h2>
          <div className="inline-flex flex-col items-center p-4 bg-lol-primary rounded-xl border-2 border-lol-accent">
            <div className="w-24 h-24 mb-2 rounded-lg overflow-hidden border-2 border-lol-gold">
              <img
                src={getItemImageUrl(version, targetItem.image.full)}
                alt={targetItem.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23333" width="96" height="96"/%3E%3C/svg%3E';
                }}
              />
            </div>
            <p className="text-lg font-bold text-lol-gold">{targetItem.name}</p>
          </div>
        </div>

        {/* Crafting Slots */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-lol-accent mb-4 text-center">
            Select {requiredCount} Components:
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {Array.from({ length: requiredCount }).map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-lg border-2 border-dashed border-lol-accent/50 flex items-center justify-center bg-lol-primary"
              >
                {selectedItems[index] ? (
                  <img
                    src={getItemImageUrl(
                      version,
                      allItems.find((item) => item.id === selectedItems[index])?.image.full || ''
                    )}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-4xl text-gray-600">?</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Item Pool */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-lol-accent mb-4 text-center">
            Available Items:
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {allItems.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              const isCorrectComponent = components.find((c) => c.id === item.id);
              const showCorrect = answered && isCorrectComponent;
              const showIncorrect = answered && isSelected && !isCorrectComponent;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  disabled={answered}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    answered
                      ? showCorrect
                        ? 'border-lol-green bg-lol-green/20 animate-glow'
                        : showIncorrect
                        ? 'border-lol-red bg-lol-red/20 animate-shake'
                        : 'border-lol-accent/30 opacity-50'
                      : isSelected
                      ? 'border-lol-accent bg-lol-accent/20'
                      : 'border-lol-accent/30 hover:border-lol-accent hover:bg-lol-accent/10'
                  } disabled:cursor-not-allowed`}
                >
                  <div className="w-12 h-12 mx-auto rounded overflow-hidden">
                    <img
                      src={getItemImageUrl(version, item.image.full)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect fill="%23333" width="48" height="48"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <p className="text-xs text-lol-gold mt-1 truncate">{item.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        {!answered && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={selectedItems.length !== requiredCount}
            className="w-full"
          >
            Craft Item ({selectedItems.length}/{requiredCount})
          </Button>
        )}

        {/* Result */}
        {answered && (
          <div
            className={`text-center p-4 rounded-lg ${
              isCorrect() ? 'bg-lol-green/20 text-lol-green' : 'bg-lol-red/20 text-lol-red'
            }`}
          >
            <p className="text-xl font-bold">
              {isCorrect() ? '✓ Perfect Craft!' : '✗ Incorrect Components!'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

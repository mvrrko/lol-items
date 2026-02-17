import { useState, useCallback } from 'react';
import type { Item } from '../types';
import { useXP } from './useXP';

export function useFlashcards(items: Item[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { progress, updateItemMastery } = useXP();

  const currentItem = items[currentIndex] || null;

  const next = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const markAs = useCallback(
    (difficulty: 'easy' | 'medium' | 'hard') => {
      if (currentItem) {
        updateItemMastery(currentItem.id, difficulty === 'easy', difficulty);
        next();
      }
    },
    [currentItem, updateItemMastery, next]
  );

  const getMasteryStatus = useCallback(() => {
    if (!currentItem) return null;
    return progress.itemMastery[currentItem.id] || null;
  }, [currentItem, progress.itemMastery]);

  const getProgress = useCallback(() => {
    const masteredCount = Object.values(progress.itemMastery).filter(
      (mastery) => mastery.timesCorrect >= 3
    ).length;
    return {
      mastered: masteredCount,
      total: items.length,
      percentage: items.length > 0 ? (masteredCount / items.length) * 100 : 0,
    };
  }, [progress.itemMastery, items.length]);

  return {
    currentItem,
    currentIndex,
    isFlipped,
    next,
    previous,
    flip,
    markAs,
    getMasteryStatus,
    getProgress,
    totalCards: items.length,
  };
}

import { useLocalStorage } from './useLocalStorage';
import type { UserProgress } from '../types';
import { STORAGE_KEYS } from '../utils/storageUtils';
import { calculateLevel, calculateXPReward } from '../utils/xpUtils';
import { useState, useCallback } from 'react';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  achievements: [],
  itemMastery: {},
};

export function useXP() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    STORAGE_KEYS.USER_PROGRESS,
    DEFAULT_PROGRESS
  );
  const [leveledUp, setLeveledUp] = useState(false);

  const addXP = useCallback(
    (
      correct: boolean,
      timeToAnswer: number,
      difficulty: 'easy' | 'medium' | 'hard'
    ): number => {
      let xpGained = 0;
      
      setProgress((prev) => {
        const newStreak = correct ? prev.currentStreak + 1 : 0;
        xpGained = calculateXPReward(correct, timeToAnswer, difficulty, prev.currentStreak);
        const newXP = prev.xp + xpGained;
        const oldLevel = calculateLevel(prev.xp);
        const newLevel = calculateLevel(newXP);

        // Check if leveled up
        if (newLevel > oldLevel) {
          setLeveledUp(true);
          setTimeout(() => setLeveledUp(false), 3000); // Reset after animation
        }

        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
          correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
          incorrectAnswers: correct ? prev.incorrectAnswers : prev.incorrectAnswers + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
        };
      });
      
      return xpGained;
    },
    [setProgress]
  );

  const updateItemMastery = useCallback(
    (itemId: string, correct: boolean, difficulty: 'easy' | 'medium' | 'hard') => {
      setProgress((prev) => {
        const currentMastery = prev.itemMastery[itemId] || {
          difficulty,
          lastReviewed: new Date().toISOString(),
          timesCorrect: 0,
          timesIncorrect: 0,
        };

        return {
          ...prev,
          itemMastery: {
            ...prev.itemMastery,
            [itemId]: {
              ...currentMastery,
              lastReviewed: new Date().toISOString(),
              timesCorrect: correct
                ? currentMastery.timesCorrect + 1
                : currentMastery.timesCorrect,
              timesIncorrect: correct
                ? currentMastery.timesIncorrect
                : currentMastery.timesIncorrect + 1,
            },
          },
        };
      });
    },
    [setProgress]
  );

  const unlockAchievement = useCallback(
    (achievementId: string) => {
      setProgress((prev) => {
        if (prev.achievements.includes(achievementId)) {
          return prev;
        }
        return {
          ...prev,
          achievements: [...prev.achievements, achievementId],
        };
      });
    },
    [setProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, [setProgress]);

  return {
    progress,
    addXP,
    updateItemMastery,
    unlockAchievement,
    resetProgress,
    leveledUp,
  };
}

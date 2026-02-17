import { XP_THRESHOLDS, XP_REWARDS } from '../data/constants';

export const calculateLevel = (xp: number): number => {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i].xp) {
      return XP_THRESHOLDS[i].level;
    }
  }
  return 1;
};

export const getXPForNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  const nextLevelThreshold = XP_THRESHOLDS.find(
    (threshold) => threshold.level === currentLevel + 1
  );
  return nextLevelThreshold ? nextLevelThreshold.xp : XP_THRESHOLDS[XP_THRESHOLDS.length - 1].xp;
};

export const getXPForCurrentLevel = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  const currentLevelThreshold = XP_THRESHOLDS.find(
    (threshold) => threshold.level === currentLevel
  );
  return currentLevelThreshold ? currentLevelThreshold.xp : 0;
};

export const calculateXPReward = (
  correct: boolean,
  timeToAnswer: number,
  difficulty: 'easy' | 'medium' | 'hard',
  currentStreak: number
): number => {
  if (!correct) return 0;

  let baseXP = XP_REWARDS.CORRECT_ANSWER;

  // Apply difficulty multiplier
  baseXP *= XP_REWARDS.DIFFICULTY_MULTIPLIERS[difficulty];

  // Apply speed bonus (if answered in under 5 seconds)
  if (timeToAnswer < 5) {
    baseXP *= XP_REWARDS.SPEED_BONUS_MULTIPLIER;
  }

  // Apply streak multiplier
  const streakBonus = Math.floor(baseXP * currentStreak * XP_REWARDS.STREAK_MULTIPLIER);
  
  return Math.floor(baseXP + streakBonus);
};

export const getRankName = (xp: number): string => {
  const currentLevel = calculateLevel(xp);
  const threshold = XP_THRESHOLDS.find((t) => t.level === currentLevel);
  return threshold ? threshold.name : 'Iron';
};

export const getProgressPercentage = (currentXP: number): number => {
  const currentLevelXP = getXPForCurrentLevel(currentXP);
  const nextLevelXP = getXPForNextLevel(currentXP);
  const xpInCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  
  return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
};

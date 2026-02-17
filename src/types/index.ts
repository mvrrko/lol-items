// League of Legends Item Types

export interface ItemStats {
  FlatHPPoolMod?: number;
  FlatMPPoolMod?: number;
  FlatArmorMod?: number;
  FlatSpellBlockMod?: number;
  FlatPhysicalDamageMod?: number;
  FlatMagicDamageMod?: number;
  PercentAttackSpeedMod?: number;
  PercentMovementSpeedMod?: number;
  FlatCritChanceMod?: number;
  PercentLifeStealMod?: number;
  FlatHPRegenMod?: number;
  PercentHPRegenMod?: number;
  FlatMPRegenMod?: number;
  PercentMPRegenMod?: number;
  [key: string]: number | undefined;
}

export interface ItemGold {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  plaintext?: string;
  from?: string[];
  into?: string[];
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: ItemGold;
  tags: string[];
  stats: ItemStats;
  depth?: number;
  inStore?: boolean;
  maps?: { [key: string]: boolean };
}

// Data Dragon API Response
export interface DataDragonResponse {
  type: string;
  version: string;
  data: {
    [itemId: string]: Item;
  };
}

// User Progress & Gamification
export interface UserProgress {
  xp: number;
  level: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentStreak: number;
  bestStreak: number;
  achievements: string[];
  itemMastery: {
    [itemId: string]: {
      difficulty: 'easy' | 'medium' | 'hard';
      lastReviewed: string;
      timesCorrect: number;
      timesIncorrect: number;
    };
  };
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  type: 'pricing' | 'crafting' | 'buildpath';
  item: Item;
  correctAnswer: string | string[];
  options?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  correct: boolean;
  xpGained: number;
  timeToAnswer: number;
  bonusPoints: number;
}

// Flashcard
export interface FlashcardData {
  item: Item;
  isFlipped: boolean;
  markedAs?: 'known' | 'difficult';
}

// Achievement
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xpReward: number;
}

// Leaderboard Entry
export interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  xp: number;
  totalScore: number;
}

// Game Settings
export interface GameSettings {
  soundEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  theme: 'dark' | 'light';
}

// Daily Challenge
export interface DailyChallenge {
  date: string;
  questions: QuizQuestion[];
  completed: boolean;
  score: number;
  xpReward: number;
}

// Score Entry
export interface ScoreEntry {
  date: string;
  mode: string;
  score: number;
  accuracy: number;
}

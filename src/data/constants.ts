export const XP_THRESHOLDS = [
  { level: 1, xp: 0, name: 'Iron' },
  { level: 2, xp: 100, name: 'Iron' },
  { level: 3, xp: 250, name: 'Bronze' },
  { level: 4, xp: 450, name: 'Bronze' },
  { level: 5, xp: 700, name: 'Silver' },
  { level: 6, xp: 1000, name: 'Silver' },
  { level: 7, xp: 1400, name: 'Gold' },
  { level: 8, xp: 1900, name: 'Gold' },
  { level: 9, xp: 2500, name: 'Platinum' },
  { level: 10, xp: 3200, name: 'Platinum' },
  { level: 11, xp: 4000, name: 'Diamond' },
  { level: 12, xp: 5000, name: 'Diamond' },
  { level: 13, xp: 6200, name: 'Master' },
  { level: 14, xp: 7600, name: 'Master' },
  { level: 15, xp: 9200, name: 'Grandmaster' },
  { level: 16, xp: 11000, name: 'Grandmaster' },
  { level: 17, xp: 13000, name: 'Challenger' },
  { level: 18, xp: 15500, name: 'Challenger' },
  { level: 19, xp: 18500, name: 'Challenger' },
  { level: 20, xp: 22000, name: 'Challenger' },
];

export const XP_REWARDS = {
  CORRECT_ANSWER: 10,
  SPEED_BONUS_MULTIPLIER: 1.5, // Bonus if answered in < 5 seconds
  STREAK_MULTIPLIER: 0.1, // 10% bonus per streak count
  DIFFICULTY_MULTIPLIERS: {
    easy: 1,
    medium: 1.5,
    hard: 2,
  },
};

export const QUIZ_TIMER = {
  DEFAULT: 15, // seconds
  EASY: 20,
  MEDIUM: 15,
  HARD: 10,
};

export const ITEM_TAGS = [
  'Damage',
  'SpellDamage',
  'Armor',
  'SpellBlock',
  'Health',
  'Mana',
  'HealthRegen',
  'ManaRegen',
  'CriticalStrike',
  'AttackSpeed',
  'LifeSteal',
  'SpellVamp',
  'Movement',
  'Trinket',
  'Consumable',
  'Active',
  'Boots',
  'Legendary',
  'Mythic',
];

export const SUMMONERS_RIFT_MAP_ID = '11';

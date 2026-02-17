// Local Storage utility functions

const STORAGE_KEYS = {
  USER_PROGRESS: 'lol_item_master_progress',
  SETTINGS: 'lol_item_master_settings',
  DAILY_CHALLENGE: 'lol_item_master_daily',
  SCORE_HISTORY: 'lol_item_master_scores',
  ACHIEVEMENTS: 'lol_item_master_achievements',
};

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearAllStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export { STORAGE_KEYS };

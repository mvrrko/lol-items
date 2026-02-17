import { Item } from '../types';

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate multiple choice options for pricing quiz
export const generatePricingOptions = (correctPrice: number): number[] => {
  const options = [correctPrice];
  const variance = 0.3; // 30% variance

  while (options.length < 4) {
    const offset = Math.floor(Math.random() * (correctPrice * variance * 2)) - correctPrice * variance;
    const option = Math.max(100, Math.floor((correctPrice + offset) / 50) * 50);
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  return shuffleArray(options);
};

// Generate distractors for crafting quiz
export const generateCraftingDistractors = (
  correctComponents: string[],
  allItems: Item[],
  difficulty: 'easy' | 'medium' | 'hard'
): Item[] => {
  const distractorCount = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 3 : 6;
  const availableItems = allItems.filter(
    (item) => !correctComponents.includes(item.id) && item.inStore !== false
  );

  const distractors: Item[] = [];
  const shuffled = shuffleArray(availableItems);

  for (let i = 0; i < Math.min(distractorCount, shuffled.length); i++) {
    distractors.push(shuffled[i]);
  }

  return distractors;
};

// Generate multiple choice options for build path quiz
export const generateBuildPathOptions = (
  correctAnswers: string[],
  allItems: Item[]
): string[] => {
  const options = [...correctAnswers];
  const availableItems = allItems.filter(
    (item) => !correctAnswers.includes(item.name)
  );

  while (options.length < 4 && availableItems.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    options.push(availableItems[randomIndex].name);
    availableItems.splice(randomIndex, 1);
  }

  return shuffleArray(options);
};

// Get random items for quiz
export const getRandomItems = (items: Item[], count: number): Item[] => {
  return shuffleArray(items).slice(0, count);
};

// Filter items by tag
export const filterItemsByTag = (items: Item[], tag: string): Item[] => {
  return items.filter((item) => item.tags.includes(tag));
};

// Get items that build into a specific item
export const getItemComponents = (itemId: string, allItems: { [key: string]: Item }): Item[] => {
  const item = allItems[itemId];
  if (!item || !item.from) return [];

  return item.from
    .map((componentId) => allItems[componentId])
    .filter((component) => component !== undefined);
};

// Get items that this item builds into
export const getItemUpgrades = (itemId: string, allItems: { [key: string]: Item }): Item[] => {
  const item = allItems[itemId];
  if (!item || !item.into) return [];

  return item.into
    .map((upgradeId) => allItems[upgradeId])
    .filter((upgrade) => upgrade !== undefined);
};

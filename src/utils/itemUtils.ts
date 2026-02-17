import type { Item } from '../types';
import { SUMMONERS_RIFT_MAP_ID } from '../data/constants';

// Transform Data Dragon item data to our Item interface
export const transformDataDragonItem = (itemId: string, rawItem: any): Item => {
  return {
    id: itemId,
    name: rawItem.name || '',
    description: rawItem.description || '',
    plaintext: rawItem.plaintext || '',
    from: rawItem.from || [],
    into: rawItem.into || [],
    image: rawItem.image || {
      full: `${itemId}.png`,
      sprite: 'item0.png',
      group: 'item',
      x: 0,
      y: 0,
      w: 48,
      h: 48,
    },
    gold: rawItem.gold || {
      base: 0,
      purchasable: false,
      total: 0,
      sell: 0,
    },
    tags: rawItem.tags || [],
    stats: rawItem.stats || {},
    depth: rawItem.depth,
    inStore: rawItem.gold?.purchasable ?? true,
    maps: rawItem.maps || {},
  };
};

// Filter items that are valid for Summoner's Rift
export const filterValidItems = (items: { [key: string]: Item }): Item[] => {
  return Object.values(items).filter((item) => {
    // Must be purchasable in shop
    if (item.inStore === false) return false;
    
    // Must be available on Summoner's Rift
    if (item.maps && !item.maps[SUMMONERS_RIFT_MAP_ID]) return false;
    
    // Filter out consumables and trinkets for main quizzes
    if (item.tags.includes('Consumable') || item.tags.includes('Trinket')) return false;
    
    return true;
  });
};

// Get stat display name
export const getStatDisplayName = (statKey: string): string => {
  const statNames: { [key: string]: string } = {
    FlatHPPoolMod: 'Health',
    FlatMPPoolMod: 'Mana',
    FlatArmorMod: 'Armor',
    FlatSpellBlockMod: 'Magic Resist',
    FlatPhysicalDamageMod: 'Attack Damage',
    FlatMagicDamageMod: 'Ability Power',
    PercentAttackSpeedMod: 'Attack Speed',
    PercentMovementSpeedMod: 'Movement Speed',
    FlatMovementSpeedMod: 'Movement Speed',
    FlatCritChanceMod: 'Critical Strike Chance',
    PercentLifeStealMod: 'Life Steal',
    FlatHPRegenMod: 'Health Regen',
    PercentHPRegenMod: 'Health Regen %',
    FlatMPRegenMod: 'Mana Regen',
    PercentMPRegenMod: 'Mana Regen %',
  };
  return statNames[statKey] || statKey;
};

// Format stat value for display
export const formatStatValue = (statKey: string, value: number): string => {
  if (statKey.startsWith('Percent')) {
    return `${(value * 100).toFixed(0)}%`;
  }
  if (statKey.includes('Crit')) {
    return `${(value * 100).toFixed(0)}%`;
  }
  return value.toFixed(0);
};

// Get item image URL
export const getItemImageUrl = (version: string, imageName: string): string => {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${imageName}`;
};

// Parse item stats into readable format
export const parseItemStats = (stats: { [key: string]: number | undefined }): string[] => {
  return Object.entries(stats)
    .filter(([_, value]) => value !== undefined && value > 0)
    .map(([key, value]) => `+${formatStatValue(key, value as number)} ${getStatDisplayName(key)}`);
};

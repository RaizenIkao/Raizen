export type RarityId = 'C' | 'UC' | 'R' | 'SP' | 'UR' | 'E' | 'L';
export type VariantId = 'standard' | 'mythic' | 'alternative' | 'secret' | 'shiny' | 'rainbow' | 'gold' | 'manga';

export type Rarity = {
  id: RarityId;
  name: string;
  weight: number;
  color: string;
};

export type Variant = {
  id: VariantId;
  name: string;
  cosmetic: boolean;
};

export type Universe = {
  id: string;
  name: string;
  description: string;
  cards: number;
};

export type Card = {
  id: string;
  name: string;
  universe: string;
  rarity: RarityId;
  variant: VariantId;
  edition: string;
  image: string;
  power: number;
  hp: number;
};

export type GameState = {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpGoal: number;
  coins: number;
  boosters: number;
  maxBoosters: number;
  nextBoosterAt: number;
  playTimeMinutes: number;
  cards: Card[];
  accountMode: 'local' | 'online';
  profile: {
    bio: string;
    banner: string;
  };
  preferences: {
    theme: 'dark' | 'light' | 'system';
    reduceMotion: boolean;
    privacy: 'public' | 'friends' | 'private';
  };
  decks: Array<{ id: string; name: string; cards: string[]; active: boolean }>;
  rankings: Array<{ name: string; level: number; uniqueCards: number; wins: number; activity: string }>;
  market: Array<{ id: string; cardId: string; seller: string; price: number; rarity: string; title: string }>;
};

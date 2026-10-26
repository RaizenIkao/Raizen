import { RARITIES } from './catalog';

export const STORAGE_KEY = 'raizen-demo-state';

export const DEFAULT_STATE = {
  username: 'Raizen',
  avatar: 'R',
  level: 12,
  xp: 780,
  xpGoal: 1000,
  coins: 2450,
  boosters: 3,
  maxBoosters: 12,
  nextBoosterAt: Date.now() + 300000,
  playTimeMinutes: 126,
  cards: [
    { id: 'card-1', name: 'Luffy', universe: 'One Piece', rarity: 'L', variant: 'standard', edition: 'Ext. 1', image: '', power: 97, hp: 140 },
    { id: 'card-2', name: 'Zoro', universe: 'One Piece', rarity: 'SP', variant: 'shiny', edition: 'Ext. 1', image: '', power: 89, hp: 126 },
    { id: 'card-3', name: 'Naruto', universe: 'Naruto', rarity: 'UR', variant: 'alternative', edition: 'Ext. 2', image: '', power: 93, hp: 135 },
    { id: 'card-4', name: 'Sasuke', universe: 'Naruto', rarity: 'R', variant: 'standard', edition: 'Ext. 2', image: '', power: 79, hp: 112 },
    { id: 'card-5', name: 'Gojo', universe: 'Jujutsu Kaisen', rarity: 'E', variant: 'rainbow', edition: 'Ext. 3', image: '', power: 88, hp: 120 }
  ],
  accountMode: 'local',
  profile: {
    bio: 'Fan de manga, anime et univers de cartes.',
    banner: 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(67,137,255,0.6))'
  },
  preferences: {
    theme: 'dark',
    reduceMotion: false,
    privacy: 'public'
  },
  decks: [
    { id: 'deck-1', name: 'Atlas Duel', cards: ['card-1', 'card-2', 'card-3'], active: true },
    { id: 'deck-2', name: 'Shadow Storm', cards: ['card-4', 'card-5'], active: false }
  ],
  rankings: [
    { name: 'Raizen', level: 12, uniqueCards: 136, wins: 48, activity: 'aujourd’hui' },
    { name: 'Astra', level: 11, uniqueCards: 127, wins: 42, activity: 'ce soir' },
    { name: 'Kaito', level: 10, uniqueCards: 118, wins: 39, activity: 'hier' }
  ],
  market: [
    { id: 'm-1', cardId: 'card-2', seller: 'Astra', price: 170, rarity: 'Rare', title: 'Zoro — rare edition' },
    { id: 'm-2', cardId: 'card-5', seller: 'Kaito', price: 260, rarity: 'Épique', title: 'Gojo — cadre premium' }
  ]
} as const;

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile ?? {}) },
      preferences: { ...DEFAULT_STATE.preferences, ...(parsed.preferences ?? {}) }
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

export function saveGameState(nextState: typeof DEFAULT_STATE) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function getRandomRarity() {
  const entries = Object.entries(RARITIES);
  const total = entries.reduce((sum, [, item]) => sum + Number(item.weight), 0);
  let roll = Math.random() * total;

  for (const [rarityId, rarity] of entries) {
    roll -= Number(rarity.weight);
    if (roll <= 0) return rarityId;
  }

  return entries[entries.length - 1][0];
}

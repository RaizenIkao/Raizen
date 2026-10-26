export const RARITIES = [
  { id: 'C', name: 'Commun', weight: 48, color: '#94a3b8' },
  { id: 'UC', name: 'Peu commun', weight: 27, color: '#5eead4' },
  { id: 'R', name: 'Rare', weight: 15, color: '#60a5fa' },
  { id: 'SP', name: 'Super Rare', weight: 7, color: '#c084fc' },
  { id: 'UR', name: 'Ultra Rare', weight: 2, color: '#fbbf24' },
  { id: 'E', name: 'Épique', weight: 0.8, color: '#f87171' },
  { id: 'L', name: 'Légendaire', weight: 0.2, color: '#facc15' }
] as const;

export const VARIANTS = [
  { id: 'standard', name: 'Standard', cosmetic: false },
  { id: 'mythic', name: 'Mythique', cosmetic: true },
  { id: 'alternative', name: 'Alternative', cosmetic: true },
  { id: 'secret', name: 'Secrète', cosmetic: true },
  { id: 'shiny', name: 'Shiny', cosmetic: true },
  { id: 'rainbow', name: 'Rainbow', cosmetic: true },
  { id: 'gold', name: 'Gold', cosmetic: true },
  { id: 'manga', name: 'Manga', cosmetic: true }
] as const;

export const UNIVERSES = [
  { id: 'one-piece', name: 'One Piece', description: 'Pirates, légendes et aventures océaniques.', cards: 128 },
  { id: 'naruto', name: 'Naruto', description: 'Ninja, clans et jutsus légendaires.', cards: 114 },
  { id: 'bleach', name: 'Bleach', description: 'Soul Reaper et pouvoirs spirituels.', cards: 94 },
  { id: 'dragon-ball', name: 'Dragon Ball', description: 'Saiyans, combats cosmiques et puissance brute.', cards: 135 },
  { id: 'my-hero', name: 'My Hero Academia', description: 'Héros, quirks et forces extraordinaires.', cards: 96 },
  { id: 'snk', name: 'Attack on Titan', description: 'Mur, titans et survie humaine.', cards: 88 },
  { id: 'jujutsu', name: 'Jujutsu Kaisen', description: 'Cursed techniques et duels intenses.', cards: 101 },
  { id: 'slime', name: 'Reincarnated as a Slime', description: 'Royaumes, magie et domination.', cards: 74 }
];

export const DEMO_CATALOG = [
  { id: 'card-1', name: 'Luffy', universe: 'One Piece', rarity: 'L', variant: 'standard', edition: 'Ext. 1', image: '', power: 97, hp: 140 },
  { id: 'card-2', name: 'Zoro', universe: 'One Piece', rarity: 'SP', variant: 'shiny', edition: 'Ext. 1', image: '', power: 89, hp: 126 },
  { id: 'card-3', name: 'Naruto', universe: 'Naruto', rarity: 'UR', variant: 'alternative', edition: 'Ext. 2', image: '', power: 93, hp: 135 },
  { id: 'card-4', name: 'Sasuke', universe: 'Naruto', rarity: 'R', variant: 'standard', edition: 'Ext. 2', image: '', power: 79, hp: 112 },
  { id: 'card-5', name: 'Gojo', universe: 'Jujutsu Kaisen', rarity: 'E', variant: 'rainbow', edition: 'Ext. 3', image: '', power: 88, hp: 120 },
  { id: 'card-6', name: 'Goku', universe: 'Dragon Ball', rarity: 'SP', variant: 'manga', edition: 'Ext. 4', image: '', power: 91, hp: 132 },
  { id: 'card-7', name: 'Vegeta', universe: 'Dragon Ball', rarity: 'R', variant: 'standard', edition: 'Ext. 4', image: '', power: 81, hp: 118 },
  { id: 'card-8', name: 'Ichigo', universe: 'Bleach', rarity: 'UR', variant: 'secret', edition: 'Ext. 5', image: '', power: 87, hp: 125 },
  { id: 'card-9', name: 'Eren', universe: 'Attack on Titan', rarity: 'SP', variant: 'gold', edition: 'Ext. 6', image: '', power: 76, hp: 109 },
  { id: 'card-10', name: 'Midoriya', universe: 'My Hero Academia', rarity: 'UC', variant: 'standard', edition: 'Ext. 7', image: '', power: 72, hp: 101 }
];

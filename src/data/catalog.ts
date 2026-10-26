import { RARITIES } from '../data/catalog';

export type BoosterConfig = {
  cardsPerBooster: number;
  rarityWeights: Record<string, number>;
};

export const BOOSTER_CONFIG: BoosterConfig = {
  cardsPerBooster: 5,
  rarityWeights: Object.fromEntries(RARITIES.map((rarity) => [rarity.id, rarity.weight]))
};

export function drawRarity() {
  const entries = Object.entries(BOOSTER_CONFIG.rarityWeights);
  const total = entries.reduce((sum, [, weight]) => sum + Number(weight), 0);
  let roll = Math.random() * total;

  for (const [rarity, weight] of entries) {
    roll -= Number(weight);
    if (roll <= 0) return rarity;
  }

  return entries[entries.length - 1][0];
}

export function openBooster(cards: Array<{ id: string; rarity: string; name: string; universe: string }>) {
  const results = [] as Array<{ id: string; name: string; rarity: string; universe: string; }>;
  for (let i = 0; i < BOOSTER_CONFIG.cardsPerBooster; i += 1) {
    const rarity = drawRarity();
    const eligible = cards.filter((card) => card.rarity === rarity);
    const next = eligible[Math.floor(Math.random() * eligible.length)] ?? cards[0];
    results.push({ ...next, rarity });
  }
  return results;
}

export function resolveBattle(playerDeck: string[], enemyDeck: string[]) {
  const playerPower = playerDeck.reduce((sum, card) => sum + Number(card || 0), 0);
  const enemyPower = enemyDeck.reduce((sum, card) => sum + Number(card || 0), 0);
  const winner = playerPower >= enemyPower ? 'player' : 'enemy';

  return {
    winner,
    playerScore: playerPower,
    enemyScore: enemyPower,
    summary: winner === 'player' ? 'Victoire maîtrisée.' : 'Défaite, mais un retour est possible.'
  };
}

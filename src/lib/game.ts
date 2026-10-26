import { DEMO_CATALOG, RARITIES } from '../data/catalog';

export function drawRarity() {
  const entries = Object.entries(RARITIES);
  const total = entries.reduce((sum, [, rarity]) => sum + Number(rarity.weight), 0);
  let roll = Math.random() * total;

  for (const [rarityId, rarity] of entries) {
    roll -= Number(rarity.weight);
    if (roll <= 0) return rarityId;
  }

  return entries[entries.length - 1][0];
}

export function openBooster(cards = DEMO_CATALOG) {
  const results: Array<{ id: string; name: string; rarity: string; universe: string }> = [];

  for (let i = 0; i < 5; i += 1) {
    const rarity = drawRarity();
    const eligible = cards.filter((card) => card.rarity === rarity);
    const card = eligible[Math.floor(Math.random() * eligible.length)] ?? cards[0];
    results.push({ id: card.id, name: card.name, rarity, universe: card.universe });
  }

  return results;
}

export function resolveBattle(playerDeck: string[], enemyDeck: string[]) {
  const playerPower = playerDeck.reduce((sum, value) => sum + Number(value || 0), 0);
  const enemyPower = enemyDeck.reduce((sum, value) => sum + Number(value || 0), 0);
  const winner = playerPower >= enemyPower ? 'player' : 'enemy';

  return {
    winner,
    playerScore: playerPower,
    enemyScore: enemyPower,
    summary: winner === 'player' ? 'Victoire maîtrisée.' : 'Défaite, mais un retour est possible.'
  };
}

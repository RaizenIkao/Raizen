import { RARITIES } from "./catalog.js";

// Configuration provisoire de test.
// Remplacer par les probabilités officielles de Fandom Master
// une fois qu'elles seront confirmées et publiées.
export const BOOSTER_CONFIG = {
  cardsPerBooster: 5,
  rarityWeights: Object.fromEntries(
    RARITIES.map((rarity) => [rarity.id, rarity.weight])
  ),
  duplicatePolicy: "allow",
  pity: {
    enabled: false,
    minRarity: "SR",
    afterBoostersWithoutHit: 10
  }
};

export function drawRarity(config = BOOSTER_CONFIG) {
  const entries = Object.entries(config.rarityWeights);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);

  if (total <= 0 || entries.some(([, weight]) => !Number.isFinite(weight) || weight < 0)) {
    throw new Error("Configuration de probabilités invalide.");
  }

  let roll = Math.random() * total;

  for (const [rarityId, weight] of entries) {
    roll -= weight;
    if (roll < 0) return rarityId;
  }

  return entries[entries.length - 1][0];
}

export function openDemoBooster(cards, config = BOOSTER_CONFIG) {
  const results = [];

  for (let i = 0; i < config.cardsPerBooster; i += 1) {
    const rarityId = drawRarity(config);
    const eligible = cards.filter(
      (card) => card.rarityId === rarityId && card.obtainable && card.imageStatus !== "disabled"
    );

    if (eligible.length === 0) {
      throw new Error(`Aucune carte disponible pour la rareté ${rarityId}.`);
    }

    const card = eligible[Math.floor(Math.random() * eligible.length)];
    results.push({ ...card, pullIndex: i + 1 });
  }

  return results;
}

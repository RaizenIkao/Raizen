/*
 * RAIZEN — Catalogue initial
 * Les chemins d'images sont des emplacements à remplir.
 * Ne pas télécharger automatiquement des images protégées.
 */

export const PLACEHOLDER_CARD_IMAGE = "/assets/cards/raizen-placeholder.svg";

export const RARITIES = [
  { id: "C", name: "Commun", rank: 1, weight: 6000 },
  { id: "UC", name: "Peu commun", rank: 2, weight: 2500 },
  { id: "R", name: "Rare", rank: 3, weight: 1000 },
  { id: "SR", name: "Super rare", rank: 4, weight: 400 },
  { id: "UR", name: "Ultra rare", rank: 5, weight: 90 },
  { id: "E", name: "Épique", rank: 6, weight: 9 },
  { id: "L", name: "Légendaire", rank: 7, weight: 1 }
];

export const VARIANTS = [
  { id: "standard", name: "Standard", cosmetic: false },
  { id: "shiny", name: "Shiny", cosmetic: true },
  { id: "alternative", name: "Alternative", cosmetic: true },
  { id: "secret", name: "Secret", cosmetic: true },
  { id: "gold", name: "Gold", cosmetic: true },
  { id: "rainbow", name: "Rainbow", cosmetic: true },
  { id: "manga", name: "Manga", cosmetic: true }
];

export const UNIVERSES = [
  {
    id: "one-piece",
    name: "One Piece",
    characters: [
      "Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp",
      "Sanji", "Tony Tony Chopper", "Nico Robin", "Franky",
      "Brook", "Jinbe", "Portgas D. Ace", "Shanks",
      "Trafalgar Law", "Boa Hancock", "Sabo", "Kaido"
    ]
  },
  {
    id: "naruto",
    name: "Naruto",
    characters: [
      "Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno",
      "Kakashi Hatake", "Itachi Uchiha", "Madara Uchiha",
      "Hinata Hyuga", "Gaara", "Jiraiya", "Minato Namikaze",
      "Obito Uchiha", "Shikamaru Nara"
    ]
  },
  {
    id: "bleach",
    name: "Bleach",
    characters: [
      "Ichigo Kurosaki", "Rukia Kuchiki", "Orihime Inoue",
      "Uryu Ishida", "Renji Abarai", "Byakuya Kuchiki",
      "Toshiro Hitsugaya", "Kenpachi Zaraki", "Sosuke Aizen",
      "Yoruichi Shihouin", "Kisuke Urahara"
    ]
  },
  {
    id: "dragon-ball",
    name: "Dragon Ball",
    characters: [
      "Son Goku", "Vegeta", "Son Gohan", "Piccolo",
      "Trunks", "Son Goten", "Bulma", "Freezer",
      "Cell", "Majin Buu", "Broly", "Beerus"
    ]
  },
  {
    id: "my-hero-academia",
    name: "My Hero Academia",
    characters: [
      "Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki",
      "Ochaco Uraraka", "Tenya Iida", "All Might",
      "Shota Aizawa", "Endeavor", "Tomura Shigaraki",
      "Himiko Toga"
    ]
  },
  {
    id: "attack-on-titan",
    name: "SNK / Attack on Titan",
    characters: [
      "Eren Yeager", "Mikasa Ackerman", "Armin Arlert",
      "Levi Ackerman", "Erwin Smith", "Hange Zoe",
      "Reiner Braun", "Annie Leonhart", "Jean Kirstein"
    ]
  },
  {
    id: "jujutsu-kaisen",
    name: "Jujutsu Kaisen",
    characters: [
      "Yuji Itadori", "Satoru Gojo", "Megumi Fushiguro",
      "Nobara Kugisaki", "Yuta Okkotsu", "Ryomen Sukuna",
      "Maki Zenin", "Kento Nanami", "Suguru Geto"
    ]
  },
  {
    id: "chainsaw-man",
    name: "Chainsaw Man",
    characters: [
      "Denji", "Power", "Aki Hayakawa", "Makima",
      "Kobeni Higashiyama", "Himeno", "Reze", "Asa Mitaka"
    ]
  },
  {
    id: "kingdom",
    name: "Kingdom",
    characters: [
      "Xin / Shin", "Ying Zheng / Ei Sei", "Kyou Kai",
      "Wang Qi / Ou Ki", "Li Mu / Ri Boku", "Wang Ben",
      "Meng Tian", "Hyou"
    ]
  },
  {
    id: "jojo",
    name: "JoJo's Bizarre Adventure",
    characters: [
      "Jonathan Joestar", "Joseph Joestar", "Jotaro Kujo",
      "Josuke Higashikata", "Giorno Giovanna", "Jolyne Cujoh",
      "Dio Brando", "Bruno Bucciarati"
    ]
  },
  {
    id: "hunter-x-hunter",
    name: "Hunter × Hunter",
    characters: [
      "Gon Freecss", "Killua Zoldyck", "Kurapika",
      "Leorio Paradinight", "Hisoka Morow", "Chrollo Lucilfer",
      "Meruem", "Biscuit Krueger"
    ]
  },
  {
    id: "slime",
    name: "That Time I Got Reincarnated as a Slime",
    characters: [
      "Rimuru Tempest", "Benimaru", "Shuna", "Shion",
      "Souei", "Diablo", "Milim Nava", "Veldora"
    ]
  },
  {
    id: "sailor-moon",
    name: "Sailor Moon",
    characters: [
      "Usagi Tsukino", "Ami Mizuno", "Rei Hino",
      "Makoto Kino", "Minako Aino", "Mamoru Chiba",
      "Chibiusa", "Haruka Tenoh", "Michiru Kaioh"
    ]
  },
  {
    id: "demon-slayer",
    name: "Demon Slayer",
    characters: [
      "Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma",
      "Inosuke Hashibira", "Giyu Tomioka", "Shinobu Kocho",
      "Kyojuro Rengoku", "Muzan Kibutsuji"
    ]
  }
];

/*
 * Génère une fiche de carte par personnage et par rareté.
 * Chaque rareté dispose de son propre emplacement d'illustration.
 * Les variantes cosmétiques seront des éditions supplémentaires,
 * pas des raretés.
 */
export function buildCardCatalog() {
  const cards = [];

  for (const universe of UNIVERSES) {
    for (const character of universe.characters) {
      const slug = character
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      for (const rarity of RARITIES) {
        cards.push({
          id: `${universe.id}-${slug}-${rarity.id.toLowerCase()}`,
          universeId: universe.id,
          universeName: universe.name,
          characterName: character,
          rarityId: rarity.id,
          rarityName: rarity.name,
          rarityRank: rarity.rank,
          variantId: "standard",
          image: PLACEHOLDER_CARD_IMAGE,
          imageStatus: "placeholder",
          edition: "standard",
          obtainable: true
        });
      }
    }
  }

  return cards;
}

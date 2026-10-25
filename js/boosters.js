class RaizenBoosterEngine {
  constructor() {
    this.pool = [
      { name: 'Kael, Dragon royal', rarity: 'Légendaire' },
      { name: 'Ren, Ombre vive', rarity: 'Épique' },
      { name: 'Mira, Flux astral', rarity: 'Rare' },
      { name: 'Aeron, Tempête', rarity: 'Épique' },
      { name: 'Yuna, Gardienne lunaire', rarity: 'Rare' },
      { name: 'Sora, Sceau du vent', rarity: 'Rare' },
      { name: 'Kairo, Lame du silence', rarity: 'Épique' },
      { name: 'Liane, Vague de cristal', rarity: 'Légendaire' }
    ];
  }

  getState() {
    try {
      return JSON.parse(localStorage.getItem('raizen_state') || '{}');
    } catch {
      return {};
    }
  }

  saveState(nextState) {
    localStorage.setItem('raizen_state', JSON.stringify(nextState));
  }

  claimBooster() {
    const state = this.getState();
    const now = Date.now();
    const nextBoosterAt = Number(state.nextBoosterAt || now + 300000);

    if (state.boosters >= 12) {
      alert('Tu as déjà atteint le maximum de boosters stockés.');
      return;
    }

    if (nextBoosterAt > now) {
      alert('Le prochain booster est encore en recharge.');
      return;
    }

    const updated = {
      ...state,
      boosters: Number(state.boosters || 0) + 1,
      nextBoosterAt: now + 300000
    };

    this.saveState(updated);
    this.refresh();
  }

  openPack(count = 1) {
    const state = this.getState();
    const available = Number(state.boosters || 0);
    const openingCount = Math.min(count, available);

    if (openingCount <= 0) {
      alert('Tu n’as plus de boosters à ouvrir.');
      return;
    }

    const rewards = Array.from({ length: openingCount * 5 }, () => {
      const rolled = this.pool[Math.floor(Math.random() * this.pool.length)];
      return { ...rolled };
    });

    const updated = {
      ...state,
      boosters: Math.max(0, available - openingCount),
      xp: Number(state.xp || 0) + rewards.length * 25,
      cards: [...(state.cards || []), ...rewards],
      playTimeMinutes: Number(state.playTimeMinutes || 0) + Math.ceil(rewards.length / 2)
    };

    this.saveState(updated);
    this.refresh();

    const summary = rewards.map((reward) => `${reward.name} (${reward.rarity})`).join(', ');
    alert(`Tu as obtenu : ${summary}`);
  }

  refresh() {
    const state = this.getState();
    const timer = document.getElementById('boosterTimer');
    const count = document.getElementById('boosterCount');
    if (timer) {
      const remaining = Math.max(0, Number(state.nextBoosterAt || Date.now() + 300000) - Date.now());
      const totalSeconds = Math.ceil(remaining / 1000);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      timer.textContent = `${minutes}:${seconds}`;
    }
    if (count) {
      count.textContent = `${Number(state.boosters || 0)} booster(s)`;
    }
  }
}

const boosterEngine = new RaizenBoosterEngine();

document.addEventListener('DOMContentLoaded', () => {
  const claimBtn = document.getElementById('claimBoosterBtn');
  const openOneBtn = document.getElementById('openOneBtn');
  const openAllBtn = document.getElementById('openAllBtn');

  if (claimBtn) claimBtn.addEventListener('click', () => boosterEngine.claimBooster());
  if (openOneBtn) openOneBtn.addEventListener('click', () => boosterEngine.openPack(1));
  if (openAllBtn) {
    openAllBtn.addEventListener('click', () => {
      const state = boosterEngine.getState();
      boosterEngine.openPack(Math.min(Number(state.boosters || 0), 5));
    });
  }

  boosterEngine.refresh();
});

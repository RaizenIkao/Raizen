const STORAGE_KEY = 'raizen_state';

const defaultState = {
  username: 'Raizen',
  level: 12,
  xp: 780,
  xpGoal: 1000,
  boosters: 3,
  maxBoosters: 12,
  nextBoosterAt: Date.now() + 300000,
  playTimeMinutes: 126,
  cards: [
    { name: 'Kael, Dragon royal', rarity: 'Légendaire' },
    { name: 'Ren, Ombre vive', rarity: 'Épique' },
    { name: 'Mira, Flux astral', rarity: 'Rare' },
    { name: 'Aeron, Tempête', rarity: 'Épique' }
  ],
  profile: {
    banner: '',
    avatar: '',
    bio: 'Fan de manga, anime et univers de cartes.',
    email: 'raizen@example.com'
  }
};

const rarities = ['Rare', 'Épique', 'Légendaire'];
const cardPool = [
  'Kael, Dragon royal',
  'Ren, Ombre vive',
  'Mira, Flux astral',
  'Aeron, Tempête',
  'Yuna, Gardienne lunaire',
  'Sora, Sceau du vent',
  'Kairo, Lame du silence',
  'Liane, Vague de cristal',
  'Shin, Feu du temple',
  'Neris, Ombre solaire'
];

const getState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }
};

const saveState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

const updateDisplay = () => {
  const state = getState();

  const usernameEls = document.querySelectorAll('#sidebarUsername, [data-user-name]');
  usernameEls.forEach((el) => {
    el.textContent = state.username;
  });

  const levelEls = document.querySelectorAll('#sidebarLevel, [data-user-level]');
  levelEls.forEach((el) => {
    el.textContent = state.level;
  });

  const boosterCountEl = document.getElementById('boosterCount');
  if (boosterCountEl) {
    boosterCountEl.textContent = `${state.boosters} booster${state.boosters > 1 ? 's' : ''}`;
  }

  const cardCountBadge = document.getElementById('cardCountBadge');
  if (cardCountBadge) {
    cardCountBadge.textContent = `${state.cards.length} cartes`;
  }

  const statCards = document.getElementById('statCards');
  if (statCards) statCards.textContent = state.cards.length;

  const statBoosters = document.getElementById('statBoosters');
  if (statBoosters) statBoosters.textContent = state.boosters;

  const statPlayTime = document.getElementById('statPlayTime');
  if (statPlayTime) statPlayTime.textContent = `${state.playTimeMinutes}m`;

  const statExp = document.getElementById('statExp');
  if (statExp) statExp.textContent = state.xp;

  const timerEl = document.getElementById('boosterTimer');
  if (timerEl) {
    const remaining = Math.max(0, state.nextBoosterAt - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);
    const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const sec = String(totalSeconds % 60).padStart(2, '0');
    timerEl.textContent = `${min}:${sec}`;
  }
};

const grantBooster = () => {
  const state = getState();
  if (state.boosters >= state.maxBoosters) {
    alert('Tu as déjà le nombre maximum de boosters.');
    return;
  }

  state.boosters += 1;
  saveState(state);
  updateDisplay();
};

const claimBooster = () => {
  const state = getState();
  const now = Date.now();

  if (state.nextBoosterAt > now) {
    alert('Le prochain booster est encore en cours de recharge.');
    return;
  }

  if (state.boosters >= state.maxBoosters) {
    alert('Tu as déjà atteint le maximum de boosters stockés.');
    return;
  }

  state.boosters += 1;
  state.nextBoosterAt = now + 300000;
  saveState(state);
  updateDisplay();
};

const openBooster = (count = 1) => {
  const state = getState();
  if (state.boosters <= 0) {
    alert('Tu n’as plus de boosters à ouvrir.');
    return;
  }

  const packSize = Math.min(state.boosters, count);
  const opened = [];

  for (let i = 0; i < packSize; i += 1) {
    const randomName = cardPool[Math.floor(Math.random() * cardPool.length)];
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
    opened.push({ name: randomName, rarity: randomRarity });
  }

  state.cards = [...state.cards, ...opened];
  state.boosters -= packSize;
  state.xp += packSize * 30;
  state.playTimeMinutes += packSize * 2;
  saveState(state);
  updateDisplay();

  const openedText = opened.map((card) => `${card.name} (${card.rarity})`).join(', ');
  alert(`Tu as obtenu : ${openedText}`);
};

const attachHomeInteractions = () => {
  const search = document.getElementById('globalSearch');
  if (search) {
    search.addEventListener('input', (event) => {
      const q = event.target.value.trim().toLowerCase();
      document.querySelectorAll('[data-cards] .card').forEach((card) => {
        const name = (card.dataset.name || '').toLowerCase();
        const searchText = (card.dataset.search || '').toLowerCase();
        const match = !q || name.includes(q) || searchText.includes(q);
        card.style.display = match ? 'block' : 'none';
      });
    });
  }

  const claimBtn = document.getElementById('claimBoosterBtn');
  if (claimBtn) claimBtn.addEventListener('click', claimBooster);

  const openOne = document.getElementById('openOneBtn');
  if (openOne) openOne.addEventListener('click', () => openBooster(1));

  const openAll = document.getElementById('openAllBtn');
  if (openAll) openAll.addEventListener('click', () => openBooster(Math.min(5, getState().boosters)));
};

const renderProfile = () => {
  const state = getState();
  const profileTitle = document.querySelector('[data-user-name]');
  if (profileTitle) profileTitle.textContent = state.username;

  const profileBio = document.querySelector('[data-user-bio]');
  if (profileBio) profileBio.textContent = state.profile.bio;

  const banner = document.querySelector('[data-profile-banner]');
  if (banner) {
    if (state.profile.banner) {
      banner.style.background = `linear-gradient(135deg, ${state.profile.banner}, rgba(67,137,255,0.8))`;
    }
  }

  const avatar = document.querySelector('[data-profile-avatar]');
  if (avatar && state.profile.avatar) {
    avatar.textContent = '✓';
    avatar.style.background = `radial-gradient(circle at 30% 30%, #fff, ${state.profile.avatar})`;
  }

  const expFill = document.querySelector('[data-exp-fill]');
  if (expFill) {
    const percent = (state.xp / state.xpGoal) * 100;
    expFill.style.width = `${Math.min(percent, 100)}%`;
  }

  const profileStats = document.querySelectorAll('[data-stat]');
  profileStats.forEach((el) => {
    const key = el.dataset.stat;
    if (key === 'cards') el.textContent = state.cards.length;
    if (key === 'boosters') el.textContent = state.boosters;
    if (key === 'time') el.textContent = `${state.playTimeMinutes} min`;
    if (key === 'level') el.textContent = `Niv ${state.level}`;
  });
};

const attachProfileInteractions = () => {
  const form = document.getElementById('profileSettingsForm');
  if (!form) return;

  const nameInput = document.getElementById('profileName');
  const bioInput = document.getElementById('profileBio');
  const emailInput = document.getElementById('profileEmail');
  const bannerInput = document.getElementById('profileBanner');
  const avatarInput = document.getElementById('profileAvatar');

  const state = getState();
  if (nameInput) nameInput.value = state.username;
  if (bioInput) bioInput.value = state.profile.bio;
  if (emailInput) emailInput.value = state.profile.email;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const updated = getState();
    updated.username = nameInput.value || updated.username;
    updated.profile.bio = bioInput.value || updated.profile.bio;
    updated.profile.email = emailInput.value || updated.profile.email;
    updated.profile.banner = bannerInput.value || updated.profile.banner;
    updated.profile.avatar = avatarInput.value || updated.profile.avatar;
    saveState(updated);
    renderProfile();
    alert('Profil mis à jour.');
  });
};

const attachSettingsInteractions = () => {
  const form = document.getElementById('settingsForm');
  if (!form) return;

  const state = getState();
  const pseudo = document.getElementById('settingsPseudo');
  const email = document.getElementById('settingsEmail');
  const theme = document.getElementById('settingsTheme');

  if (pseudo) pseudo.value = state.username;
  if (email) email.value = state.profile.email;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const next = getState();
    next.username = pseudo.value || next.username;
    next.profile.email = email.value || next.profile.email;
    if (theme) {
      next.profile.banner = theme.value;
    }
    saveState(next);
    alert('Réglages sauvegardés.');
    updateDisplay();
  });
};

const attachAuthInteractions = () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.querySelector('input[name="email"]')?.value || '';
    const password = form.querySelector('input[name="password"]')?.value || '';

    if (!email || !password) {
      alert('Veuillez remplir les champs requis.');
      return;
    }

    const state = getState();
    state.profile.email = email;
    state.username = email.split('@')[0];
    saveState(state);
    updateDisplay();
    alert('Connexion réussie.');
    window.location.href = 'profile.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  updateDisplay();
  attachHomeInteractions();
  renderProfile();
  attachProfileInteractions();
  attachSettingsInteractions();
  attachAuthInteractions();

  const now = Date.now();
  const state = getState();
  if (state.nextBoosterAt <= now && state.boosters < state.maxBoosters) {
    state.boosters = Math.min(state.maxBoosters, state.boosters + 1);
    state.nextBoosterAt = now + 300000;
    saveState(state);
  }
  updateDisplay();
});

const STORAGE_KEY = 'raizen_state';

function safeReadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function getState() {
  const current = safeReadState();
  const defaults = {
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
      bio: 'Fan de manga, anime et univers de cartes.',
      email: 'raizen@example.com',
      banner: 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(67,137,255,0.6))',
      avatar: 'linear-gradient(135deg, #8b5cf6, #4389ff)'
    },
    preferences: {
      theme: 'dark',
      reduceMotion: false,
      privacy: 'public'
    }
  };

  return {
    ...defaults,
    ...current,
    profile: { ...defaults.profile, ...(current.profile || {}) },
    preferences: { ...defaults.preferences, ...(current.preferences || {}) }
  };
}

function updateDashboard() {
  const state = getState();

  const usernameTargets = document.querySelectorAll('#sidebarUsername, [data-user-name]');
  usernameTargets.forEach((node) => {
    node.textContent = state.username;
  });

  const levelTargets = document.querySelectorAll('#sidebarLevel, [data-user-level]');
  levelTargets.forEach((node) => {
    node.textContent = state.level;
  });

  const boosterCount = document.getElementById('boosterCount');
  if (boosterCount) {
    boosterCount.textContent = `${state.boosters} booster${state.boosters > 1 ? 's' : ''}`;
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

  const timer = document.getElementById('boosterTimer');
  if (timer) {
    const remaining = Math.max(0, state.nextBoosterAt - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
  }

  const profileBio = document.querySelector('[data-user-bio]');
  if (profileBio) {
    profileBio.textContent = state.profile.bio;
  }

  const banner = document.querySelector('[data-profile-banner]');
  if (banner) {
    banner.style.background = state.profile.banner || 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(67,137,255,0.6))';
  }

  const avatar = document.querySelector('[data-profile-avatar]');
  if (avatar) {
    avatar.style.background = state.profile.avatar || 'linear-gradient(135deg, #8b5cf6, #4389ff)';
  }

  const expFill = document.querySelector('[data-exp-fill]');
  if (expFill) {
    const pct = Math.min((state.xp / state.xpGoal) * 100, 100);
    expFill.style.width = `${pct}%`;
  }

  document.querySelectorAll('[data-stat]').forEach((el) => {
    const key = el.dataset.stat;
    if (key === 'cards') el.textContent = state.cards.length;
    if (key === 'boosters') el.textContent = state.boosters;
    if (key === 'time') el.textContent = `${state.playTimeMinutes} min`;
    if (key === 'level') el.textContent = `Niv ${state.level}`;
  });
}

function applyTheme(theme) {
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : theme;

  document.body.setAttribute('data-theme', resolved);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.textContent = resolved === 'dark' ? 'Mode clair' : 'Mode sombre';
  }
}

function applyMotionPreference(force) {
  const reduce = force ?? (getState().preferences.reduceMotion === true);
  document.body.classList.toggle('reduce-motion', reduce);
}

function readyHome() {
  const search = document.getElementById('globalSearch');
  if (search) {
    search.addEventListener('input', (event) => {
      const q = event.target.value.trim().toLowerCase();
      document.querySelectorAll('#cardGrid .card').forEach((card) => {
        const name = (card.dataset.name || '').toLowerCase();
        const searchText = (card.dataset.search || '').toLowerCase();
        const match = !q || name.includes(q) || searchText.includes(q);
        card.style.display = match ? 'block' : 'none';
      });
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const state = getState();
      const nextTheme = state.preferences.theme === 'dark' ? 'light' : 'dark';
      state.preferences.theme = nextTheme;
      writeState(state);
      applyTheme(nextTheme);
    });
  }
}

function init() {
  const state = getState();
  applyTheme(state.preferences.theme);
  applyMotionPreference(state.preferences.reduceMotion);
  updateDashboard();
  readyHome();
}

document.addEventListener('DOMContentLoaded', init);

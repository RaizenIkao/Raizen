const state = JSON.parse(localStorage.getItem('raizen_state') || '{}');

const initProfilePage = () => {
  const userName = document.querySelector('[data-user-name]');
  const userBio = document.querySelector('[data-user-bio]');
  const banner = document.querySelector('[data-profile-banner]');
  const avatar = document.querySelector('[data-profile-avatar]');
  const expFill = document.querySelector('[data-exp-fill]');

  if (userName) userName.textContent = state.username || 'Raizen';
  if (userBio) userBio.textContent = state.profile?.bio || 'Fan de manga, anime et univers de cartes.';

  if (banner) {
    const bg = state.profile?.banner || 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(67,137,255,0.6))';
    banner.style.background = bg;
  }

  if (avatar) {
    const color = state.profile?.avatar || 'linear-gradient(135deg, #8b5cf6, #4389ff)';
    avatar.style.background = color;
  }

  if (expFill) {
    const xp = Number(state.xp || 780);
    const goal = Number(state.xpGoal || 1000);
    expFill.style.width = `${Math.min((xp / goal) * 100, 100)}%`;
  }
};

document.addEventListener('DOMContentLoaded', initProfilePage);

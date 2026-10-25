const profileState = JSON.parse(localStorage.getItem('raizen_state') || '{}');

function refreshProfileView() {
  const userName = document.querySelector('[data-user-name]');
  const userBio = document.querySelector('[data-user-bio]');
  const banner = document.querySelector('[data-profile-banner]');
  const avatar = document.querySelector('[data-profile-avatar]');
  const expFill = document.querySelector('[data-exp-fill]');

  if (userName) {
    userName.textContent = profileState.username || 'Raizen';
  }

  if (userBio) {
    userBio.textContent = profileState.profile?.bio || 'Fan de manga, anime et univers de cartes.';
  }

  if (banner) {
    banner.style.background = profileState.profile?.banner || 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(67,137,255,0.6))';
  }

  if (avatar) {
    avatar.style.background = profileState.profile?.avatar || 'linear-gradient(135deg, #8b5cf6, #4389ff)';
  }

  if (expFill) {
    const xp = Number(profileState.xp || 780);
    const goal = Number(profileState.xpGoal || 1000);
    expFill.style.width = `${Math.min((xp / goal) * 100, 100)}%`;
  }
}

document.addEventListener('DOMContentLoaded', refreshProfileView);

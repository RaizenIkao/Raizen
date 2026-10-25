const settingsForm = document.getElementById('settingsForm');

if (settingsForm) {
  const state = JSON.parse(localStorage.getItem('raizen_state') || '{}');
  const pseudo = document.getElementById('settingsPseudo');
  const email = document.getElementById('settingsEmail');
  const theme = document.getElementById('settingsTheme');
  const reduceMotion = document.getElementById('settingsReduceMotion');
  const privacy = document.getElementById('settingsPrivacy');

  if (pseudo) pseudo.value = state.username || 'Raizen';
  if (email) email.value = state.profile?.email || 'raizen@example.com';
  if (theme) theme.value = state.preferences?.theme || 'dark';
  if (reduceMotion) reduceMotion.checked = state.preferences?.reduceMotion || false;
  if (privacy) privacy.value = state.preferences?.privacy || 'public';

  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const next = {
      ...state,
      username: pseudo.value || 'Raizen',
      profile: {
        ...(state.profile || {}),
        email: email.value || 'raizen@example.com'
      },
      preferences: {
        ...(state.preferences || {}),
        theme: theme.value || 'dark',
        reduceMotion: reduceMotion.checked,
        privacy: privacy.value || 'public'
      }
    };

    localStorage.setItem('raizen_state', JSON.stringify(next));
    document.body.setAttribute('data-theme', next.preferences.theme);
    document.body.classList.toggle('reduce-motion', next.preferences.reduceMotion);
    alert('Réglages sauvegardés localement.');
  });
}

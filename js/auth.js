const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value.trim();
    const password = loginForm.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
      alert('Veuillez remplir les champs requis.');
      return;
    }

    const state = JSON.parse(localStorage.getItem('raizen_state') || '{}');
    const next = {
      ...state,
      username: email.split('@')[0] || 'Raizen',
      profile: {
        ...(state.profile || {}),
        email,
        bio: state.profile?.bio || 'Fan de manga, anime et univers de cartes.'
      }
    };

    localStorage.setItem('raizen_state', JSON.stringify(next));
    alert('Connexion réussie.');
    window.location.href = 'profile.html';
  });
}

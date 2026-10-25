const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value.trim();
    const password = loginForm.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
      alert('Veuillez compléter les champs.');
      return;
    }

    const current = JSON.parse(localStorage.getItem('raizen_state') || '{}');
    current.username = email.split('@')[0] || 'Raizen';
    current.profile = current.profile || {};
    current.profile.email = email;
    localStorage.setItem('raizen_state', JSON.stringify(current));

    alert('Connexion réussie.');
    window.location.href = 'profile.html';
  });
}

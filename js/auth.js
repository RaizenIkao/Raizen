const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    localStorage.setItem('raizenUser', JSON.stringify({ email }));
    alert('Connexion réussie.');
    window.location.href = 'profile.html';
  });
}

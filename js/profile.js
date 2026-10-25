const profileName = document.querySelector('.profile-meta h1');

if (profileName) {
  const savedUser = JSON.parse(localStorage.getItem('raizenUser') || '{}');
  if (savedUser.email) {
    profileName.textContent = savedUser.email.split('@')[0];
  }
}

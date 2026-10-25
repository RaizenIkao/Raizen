const filterButtons = document.querySelectorAll('.filter-chip');
const cards = [...document.querySelectorAll('#cardGrid .card')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((chip) => chip.classList.toggle('active', chip === button));
    const selected = button.dataset.filter;

    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.rarity === selected;
      card.style.display = visible ? 'block' : 'none';
    });
  });
});

const cards = document.querySelectorAll('[data-cards] .card');

if (cards.length) {
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || `Carte ${index + 1}`;
      alert(`${title} a été sélectionnée.`);
    });
  });
}

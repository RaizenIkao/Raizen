const activity = [
  { title: 'Nouvelle carte ajoutée', text: 'Kael, Dragon royal a été ajouté à votre collection.' },
  { title: 'Événement', text: 'Le prochain booster est prévu pour ce week-end.' }
];

if (document.querySelector('[data-activity]')) {
  console.log('RAIZEN activity feed ready:', activity.length);
}

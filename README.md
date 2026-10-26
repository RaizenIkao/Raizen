# RAIZEN

RAIZEN est une plateforme démonstration de cartes anime/manga, conçue pour fonctionner en mode local sur navigateur et être déployée facilement sur GitHub Pages.

## Démarrage

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Tests

```bash
npm run test
```

## Mode local

Le projet utilise `localStorage` pour garder le profil, la collection, les boosters et les statistiques. Les données sont démonstratives et doivent être remplacées par un backend sécurisé en production.

## GitHub Pages

Le projet est configuré avec `base: '/Raizen/'` pour un bon routing sous GitHub Pages.

## Variables d'environnement

Copiez `.env.example` vers `.env.local` ou ajoutez les valeurs directement dans votre environnement local.

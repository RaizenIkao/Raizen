# RAIZEN

RAIZEN est un projet de plateforme communautaire consacrée à la culture manga/anime, aux profils personnalisés, aux cartes, aux boosters et aux collections.

## Structure du projet

```text
Raizen/
├── index.html
├── login.html
├── profile.html
├── settings.html
├── README.md
├── .gitignore
├── assets/
│   ├── avatars/
│   ├── banners/
│   └── logo/
├── css/
│   ├── style.css
│   └── profile.css
└── js/
    ├── app.js
    ├── auth.js
    ├── profile.js
    ├── collection.js
    ├── activity.js
    └── supabase.js
```

## Ce qui est déjà en place

- Page d'accueil premium
- Navigation propre entre accueil / profil / connexion / réglages
- Page profil avec statut, niveau, EXP et statistiques
- Système de boosters sur l'accueil
- Réglages de compte basiques
- Préparation d'intégration Supabase et authentification sociale

## Prochaine étape recommandée

- finaliser les liens entre les pages et l'état global du profil
- ajouter le vrai upload d'avatar / bannière
- relier le système de boosters à une vraie collection de cartes
- brancher Supabase Auth pour Google / Facebook
- mettre en place une vraie base de données utilisateur et de cartes

RAIZEN — Collect · Play · Rise

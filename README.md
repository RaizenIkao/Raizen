# RAIZEN

RAIZEN est un projet de plateforme communautaire de cartes inspirée des univers anime et manga.

## Audit validé

Le dépôt a été audité et les points suivants sont confirmés :
- les pages d'accueil, profil et réglages sont les fondations utiles à conserver ;
- les dossiers `css/css/` et `css/js/` sont des doublons hérités et doivent être évités ;
- les fichiers vides, incomplets et les scripts de démonstration locale doivent être clairement séparés du backend réel ;
- la structure front statique est exploitable pour GitHub Pages ;
- les fonctions Supabase et authentification réelle doivent passer par un backend sécurisé.

## Phase en cours

Le front a été consolidé pour couvrir :
- accueil fonctionnel,
- navigation cohérente,
- collection filtrable,
- booster local démonstration,
- profil personnalisé,
- paramètres de thème et d'interface,
- documentation des données de catalogue.

## Limites connues

- Aucun compte réel n'est branché.
- Les identifiants Google/Facebook ne sont pas configurés.
- Les données ne sont pas synchronisées avec Supabase.
- Les boosters et l'EXP ne doivent pas être présentés comme sécurisés sans backend.

## Prochaine étape recommandée

1. Finaliser la collection avec fiche détaillée et variantes.
2. Ajouter le système d'EXP, niveaux et succès.
3. Préparer Supabase Auth et le schéma SQL.
4. Vérifier le déploiement GitHub Pages / Supabase.

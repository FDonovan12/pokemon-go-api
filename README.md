# Pokémon GO Game Master Parser

Outil de parsing du Game Master de Pokémon GO.

Ce projet est un parser en cours de développement pour :

- télécharger automatiquement le Game Master officiel
- parser les données internes (metadata, mouvements, pokémon, raids, etc.)
- générer des JSON de sortie utilisables par d'autres fonctions ou services
- (à terme) vérifier et mettre à jour automatiquement en cas de changement

> En développement. Utiliser avec prudence. Aucune garantie de production. Respecter les conditions de Niantic sur l'utilisation des data.

## 1) Prérequis

- Node.js 18+ / 20+ (recommandé)
- npm

## 2) Installation (depuis zéro)

```bash
git clone <repo-url>
cd pokemon-go-api
npm install
```

## 3) Commandes utiles

- `npm run build` : compile TypeScript via `tsc`
- `npm run generate` : exécute le script principal de génération (`src/generateRawData.ts`)
- `npm run update` : compile puis exécute `dist/src/checkAndUpdate.js`
- `npm run dev` : exécute `generate` puis `tsx watch src/checkAndUpdate.ts` pour mode dev
- `npm run prepare` : alias pour `npm run generate`

## 4) Structure du projet

- `src/` : code source TypeScript
- `generated/` : résultats générés (données/typings)
- `meta/` : données de configuration méta
- `package.json` : scripts et dépendances

## 5) Notes juridiques (basiques)

Ce dépôt est une implémentation indépendante. Niantic Inc. reste titulaire des droits sur Pokémon GO et sur le Game Master.

Ce projet est fourni « as-is » sans garantie implicite ou explicite.

L'utilisation commerciale ou la distribution non autorisée d'éléments dérivés des données de Pokémon GO peut être soumise à des restrictions légales.

---

⚠️ État actuel : parser partiellement implémenté ; certaines fonctions sont encore en cours de développement.

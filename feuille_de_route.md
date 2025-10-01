# 🏀 BasketStats Assistant

_Application web dédiée au suivi de statistiques pour clubs amateurs de basketball_

---

## 🎯 Vue d'ensemble

**BasketStats Assistant** est une application web conçue pour les clubs amateurs de basketball. Elle permet aux coachs et assistants de :

- ✅ Saisir rapidement les statistiques pendant les matchs
- 📊 Suivre la performance de l'équipe en temps réel
- 📈 Générer des dashboards visuels automatiquement
- 📄 Exporter des rapports PDF ou liens partageables

L'objectif est de rendre le suivi des performances accessible à tous les clubs, avec une interface optimisée pour mobile et tablette.

---

## ⭐ Fonctionnalité principale : Saisie live avec positions

### 🎮 Modes de saisie

- **Manuel** : Formulaire post-match traditionnel
- **Live** : Saisie en temps réel pendant le match

### 🎯 Interface interactive

En mode live, l'utilisateur dispose d'un **terrain de basket interactif** :

1. 🖱️ Clic sur l'emplacement exact de l'action
2. 👤 Sélection du joueur concerné (popup)
3. 🏀 Choix du type d'action (3pts, 2pts, faute, etc.)

### 💾 Stockage intelligent

- Actions stockées côté client pendant le match
- Validation et sauvegarde en base à la fin
- Conservation des coordonnées précises pour analyses futures (heat maps, zones de performance)

---

## ✅ Solution technique implémentée : Système de coordonnées FIBA

### 📱 Problématique initiale résolue

L'application propose un affichage responsive avec :

- **Mobile** : terrain vertical (`viewBox 500x940`)
- **Desktop** : terrain horizontal (`viewBox 940x500`)

**Ancien problème** : Les coordonnées normalisées (0-1) ne correspondaient pas aux mêmes positions physiques entre les orientations.

### 🎯 Solution implémentée : Référence FIBA unifiée

**Système adopté** : Coordonnées en mètres FIBA avec référence horizontale par défaut

```typescript
// Stockage unifié : toujours en référence horizontale (28m × 15m)
const fibaPosition = {
  x: 14.5, // mètres depuis ligne de fond gauche (0-28)
  y: 7.2, // mètres depuis ligne de touche bas (0-15)
};

// Conversion pour affichage selon orientation
function fibaToSvg(position, targetOrientation) {
  if (targetOrientation === "horizontal") {
    return { x: (position.x / 28) * 940, y: (position.y / 15) * 500 };
  } else {
    // Rotation 90° pour affichage vertical
    return {
      x: ((15 - position.y) / 15) * 500,
      y: (position.x / 28) * 940,
    };
  }
}
```

### 🏗️ Architecture technique

**Structure modulaire du composant BasketballCourt :**

```
BasketballCourt/
├── enums/           # CourtSize, CourtTheme, CourtOrientation, ActionType
├── types/           # CourtPosition, CourtClick (interfaces globales)
├── constants/       # Dimensions SVG, couleurs marqueurs, référence FIBA
├── utils/           # Fonctions de conversion fibaToSvg, svgToFiba
├── components/      # CrossMarker (composant croix réutilisable)
├── index.tsx        # Composant principal
├── HorizontalCourt.tsx  # Vue desktop
└── VerticalCourt.tsx    # Vue mobile
```

### 🔧 Avantages de cette solution

- ✅ **Cohérence parfaite** : Un clic au centre = toujours `(14m, 7.5m)`
- ✅ **Standard métier** : Utilise les dimensions officielles FIBA
- ✅ **Maintenabilité** : Code modulaire et réutilisable
- ✅ **Performance** : Conversion uniquement à l'affichage
- ✅ **Debuggable** : Coordonnées en mètres compréhensibles

### 💾 Impact sur les données

Les coordonnées sont maintenant stockées en **référence horizontale FIBA**, indépendamment de l'appareil utilisé.

---

## 🗄️ Schéma de base de données

### 👤 User ✅

| Champ        | Type     | Description                                       |
| ------------ | -------- | ------------------------------------------------- |
| `id`         | uuid     | Identifiant unique                                |
| `firstname`  | string   | Prénom                                            |
| `lastname`   | string   | Nom                                               |
| `email`      | string   | Email de connexion                                |
| `password`   | string   | Mot de passe hashé                                |
| `teams`      | relation | 📊 Un utilisateur peut posséder plusieurs équipes |
| `created_at` | datetime | Date de création                                  |
| `updated_at` | datetime | Date de modification                              |

### 🏀 Team ✅

| Champ        | Type     | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `id`         | uuid     | Identifiant unique                         |
| `name`       | string   | Nom de l'équipe                            |
| `category`   | enum     | `["U13", "U15", "U18", "SENIOR", "OTHER"]` |
| `players`    | relation | 👥 Une équipe possède plusieurs joueurs    |
| `games`      | relation | 🎯 Une équipe possède plusieurs matchs     |
| `created_at` | datetime | Date de création                           |
| `updated_at` | datetime | Date de modification                       |

### 👤 Player ✅

| Champ        | Type     | Description                              |
| ------------ | -------- | ---------------------------------------- |
| `id`         | uuid     | Identifiant unique                       |
| `name`       | string   | Nom du joueur                            |
| `number`     | integer  | Numéro de maillot                        |
| `position`   | enum     | `["PG", "SG", "SF", "PF", "C", "OTHER"]` |
| `team`       | relation | 🏀 Un joueur appartient à une équipe     |
| `created_at` | datetime | Date de création                         |
| `updated_at` | datetime | Date de modification                     |

### 🏆 Competition ✅

| Champ        | Type     | Description                                    |
| ------------ | -------- | ---------------------------------------------- |
| `id`         | uuid     | Identifiant unique                             |
| `name`       | string   | Nom de la compétition                          |
| `games`      | relation | 🎯 Une compétition peut avoir plusieurs matchs |
| `teams`      | relation | Une compétion appartient a une team            |
| `created_at` | datetime | Date de création                               |
| `updated_at` | datetime | Date de modification                           |

### 🎯 Game ✅

| Champ            | Type     | Description                                                 |
| ---------------- | -------- | ----------------------------------------------------------- |
| `id`             | uuid     | Identifiant unique                                          |
| `opponent`       | string   | Équipe adverse                                              |
| `score`          | integer  | Score de l'équipe                                           |
| `opponent_score` | integer  | Score adverse                                               |
| `date`           | datetime | Date du match                                               |
| `location`       | enum     | `["HOME", "AWAY"]`                                          |
| `team`           | relation | 🏀 Un match appartient à une équipe                         |
| `competition`    | relation | 🏆 Un match peut appartenir à une compétition _(optionnel)_ |
| `created_at`     | datetime | Date de création                                            |
| `updated_at`     | datetime | Date de modification                                        |

### ⚡ Action

| Champ        | Type     | Description                                                            |
| ------------ | -------- | ---------------------------------------------------------------------- |
| `id`         | uuid     | Identifiant unique                                                     |
| `type`       | enum     | `["3PTS", "2PTS", "FREE_THROW", "REBOUND", "ASSIST", "STEAL", "FOUL"]` |
| `position_x` | float    | 📍 Coordonnée X en mètres FIBA (0-28, référence horizontale)           |
| `position_y` | float    | 📍 Coordonnée Y en mètres FIBA (0-15, référence horizontale)           |
| `player`     | relation | 👤 Un joueur qui fait l'action                                         |
| `game`       | relation | 🎯 Le match concerné                                                   |
| `created_at` | datetime | Date de création                                                       |
| `updated_at` | datetime | Date de modification                                                   |

---

## 📊 État des features

### 🔐 Authentification (Supabase Auth) ✅

- ✅ **Login email/password** - Formulaire complet relié à Supabase
- ✅ **Login Google** - Bouton fonctionnel avec OAuth et callback
- ✅ **Register** - Page + logique auth context
- ✅ **Forgot password** - Page + logique auth context
- ✅ **Logout** - Bouton dans Header

### 🏀 Terrain interactif

- ✅ **Affichage responsive** - Horizontal/vertical selon écran
- ✅ **Système coordonnées FIBA** - Stockage unifié en mètres
- ✅ **Clics sur terrain** - Capture position précise
- ✅ **Marqueurs actions** - Affichage des tirs/actions précédents

### 👥 Gestion équipes ✅

- ✅ **CRUD équipes** - Création, édition, suppression
- ✅ **Gestion joueurs** - Ajout/retrait joueurs dans équipe
- ✅ **Numéros maillots** - Attribution et validation unicité
- ✅ **Positions joueurs** - PG, SG, SF, PF, C

### 🎯 Gestion matchs

- ✅ **Création match** - Configuration équipe adverse, date, lieu
- ✅ **Sélection d'équipe** - Selection d'équipe pour le match
- ✅ **Compétitions** - Organisation par tournois/championnats
- ✅ **Historique** - Liste des matchs passés

### 📝 Saisie statistiques

- ✅ **Interface sélection joueur** - Popup après clic terrain
- ✅ **Types d'actions** - 3pts, 2pts, rebounds, fautes, passes
- ⏳ **Mode manuel** - Saisie post-match
- ✅ **Mode live** - Saisie temps réel pendant match
- ✅ **Validation actions** - Vérification cohérence données

### 💾 Stockage données (Supabase)

- ✅ **Schéma BDD** - Tables User, Team, Player, Game, Action
- ✅ **Sauvegarde actions** - Stockage coordonnées + métadonnées

### 📊 Statistiques & Analytics

- ✅ **Stats de base** - Points, rebounds, passes par joueur
- ⏳ **Comparaisons** - Joueurs entre eux, matchs précédents

### 🎮 Interface utilisateur

- ✅ **Composants base** - Button, Layout, Toast system
- ✅ **Navigation** - Routing entre pages principales
- ✅ **Dashboard** - Vue d'ensemble équipes/matchs
- ⏳ **Mobile UX** - Optimisation tactile pour saisie live

---

_📝 Cette feuille de route sera mise à jour au fur et à mesure du développement_

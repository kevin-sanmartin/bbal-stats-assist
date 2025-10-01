# 🎨 Coding Style Guide - BasketStats Assistant

Ce document décrit les conventions et bonnes pratiques à suivre pour ce projet Next.js/TypeScript/SCSS.

## 📁 Architecture de fichiers

### Structure des composants

```
src/components/
├── elements/           # Composants de base réutilisables (Button, Badge, etc.)
├── materials/          # Composants plus complexes (Table, etc.)
└── pages/             # Composants spécifiques aux pages
    └── PageName/
        ├── index.tsx
        ├── classes.module.scss
        └── components/    # Sous-composants de la page
            └── ComponentName/
                ├── index.tsx
                └── classes.module.scss
```

### Nommage des fichiers

- **Composants** : PascalCase (`PlayerTable`, `TeamModal`)
- **Fichiers CSS** : `classes.module.scss`
- **Index** : toujours `index.tsx` pour les composants

## 🎨 CSS/SCSS

### Style globale

Moderne, minimalist, clean.

### Variables CSS obligatoires

⚠️ **JAMAIS de valeurs en dur** - toujours utiliser les variables CSS définies dans `src/themes/`

```scss
// ❌ INTERDIT
padding: 16px;
color: #1f2937;
border-radius: 12px;

// ✅ CORRECT
padding: var(--spacing-4);
color: var(--color-text-primary);
border-radius: var(--radius-lg);
```

### Espacement

🚫 **JAMAIS utiliser `margin` ou `padding` entre éléments**
✅ **Toujours utiliser `gap`** pour les espacements

```scss
// ❌ INTERDIT
.actions {
  button {
    margin-right: 8px;
  }
}

// ✅ CORRECT
.actions {
  display: flex;
  gap: var(--spacing-2);
}
```

### Imports SCSS

Utiliser l'alias configuré dans `next.config.ts` :

```scss
// ✅ CORRECT
@use "themes/constants.module.scss";

// ❌ ÉVITER les chemins relatifs longs
@use "../../../../../themes/constants.module.scss";
```

### Responsive design

- Breakpoints définis dans `constants.module.scss`
- Mobile-first approche
- Cacher des colonnes sur mobile plutôt que de tout réorganiser

## ⚛️ React/TypeScript

### Composants

- Toujours TypeScript avec interfaces typées
- Props destructurées dans la signature
- Nommage explicite des handlers

```tsx
interface PlayerTableProps {
  players: TPlayer[];
  onEdit: (player: TPlayer) => void;
  onDelete: (player: TPlayer) => void;
}

export default function PlayerTable({
  players,
  onEdit,
  onDelete,
}: PlayerTableProps) {
  // ...
}
```

### Réutilisation des composants existants

⚠️ **Toujours vérifier les composants existants avant d'en créer de nouveaux**

Priorité :

1. `src/components/elements/` (Button, Badge, etc.)
2. `src/components/materials/` (Table, etc.)
3. Créer nouveau composant seulement si nécessaire

## 🧹 Nettoyage du code

### Suppression des composants inutilisés

- Supprimer immédiatement les composants qui ne sont plus utilisés
- Vérifier les imports avant suppression
- Maintenir un codebase propre

### Organisation

- Un composant = un dossier avec `index.tsx` + `classes.module.scss`
- Regrouper les composants liés dans des sous-dossiers
- Éviter les fichiers CSS trop volumineux

## 🎯 Conventions spécifiques au projet

### Modals

- Réutiliser les modals existants
- Props `isOpen`, `onClose`, `onSubmit`
- Gestion des états loading

### Formulaires

- Validation côté client
- Messages d'erreur avec `toast.error()`
- États de chargement sur les boutons

## 🚀 Performance

- Utiliser les composants existants du design system
- Éviter la duplication de CSS
- Optimiser les images et assets
- Code splitting par page

---

_Ce guide évolue avec le projet. Toujours privilégier la cohérence avec l'existant._

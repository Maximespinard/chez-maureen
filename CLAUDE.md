# Chez Maureen

Site vitrine pour primeur spécialisé fruits & légumes frais.

## Stack Technique

- **Framework** : TanStack Start (React 19 + TanStack Router)
- **Styling** : Tailwind CSS v4 + shadcn/ui
- **Database** : PostgreSQL (Neon) + Prisma ORM
- **State** : Zustand + TanStack Query
- **Deploy** : Cloudflare Workers
- **Dev Tools** : Vite, TypeScript, Vitest, ESLint, Prettier

## Arborescence

```
src/
├── components/        # UI components (shadcn)
├── features/          # Fonctionnalités métier
│   ├── auth/         # Authentification admin
│   ├── categories/   # Gestion catégories
│   ├── contact/      # Formulaire contact
│   ├── dashboard/    # Tableau de bord admin
│   ├── home/         # Page d'accueil
│   ├── products/     # Gestion produits
│   ├── promotions/   # Gestion promotions
│   └── settings/     # Paramètres boutique
├── routes/           # Routes TanStack
├── server/           # API server functions
├── schemas/          # Validation Zod
├── stores/           # Stores Zustand
├── types/            # Types TypeScript
├── lib/              # Utilitaires
└── db.ts             # Config Prisma

prisma/
├── schema.prisma     # Schéma DB
└── seed.ts           # Données initiales
```

## Modèles DB

- **Category** : Catégories de produits (Fruits, Légumes, etc.)
- **Product** : Produits avec prix, origine, image
- **Badge** : Labels (Bio, Local, Saison, etc.)
- **ProductBadge** : Association produits ↔ badges
- **StoreSettings** : Paramètres du commerce (horaires, infos)
- **ContactMessage** : Messages de contact

## Commandes

```bash
# Développement
npm run dev              # Lance le serveur (port 3000)

# Database
npm run db:generate      # Génère le client Prisma
npm run db:push          # Applique le schéma à la DB
npm run db:migrate       # Crée une migration
npm run db:studio        # Interface Prisma Studio
npm run db:seed          # Remplit la DB avec données test

# Build & Deploy
npm run build            # Build production
npm run deploy           # Deploy sur Cloudflare

# Quality
npm run test             # Tests Vitest
npm run lint             # ESLint
npm run format           # Prettier
npm run check            # Lint + Format
```

## Variables d'Environnement

Fichier `.env.local` requis :

```env
DATABASE_URL="postgresql://..."
```

## Conventions

- **Features** : Organisation par domaine métier (`features/`)
- **Components** : shadcn/ui dans `components/ui/`
- **Server** : Fonctions serveur dans `server/functions/`
- **Schemas** : Validation Zod dans `schemas/`
- **Types** : Types centralisés dans `types/`

## Workflow Git

Créer une branche par feature, commit avec message descriptif selon la branche en cours.

---

## Règles de Code - Tailwind CSS

### Classes Tailwind Canoniques (OBLIGATOIRE)

**Toujours utiliser les classes canoniques Tailwind** :

- ✅ `max-w-7xl` → ❌ `max-w-[1280px]`
- ✅ `bg-linear-to-b` → ❌ `bg-gradient-to-b`
- ✅ `p-4` → ❌ `p-[16px]`
- ✅ `h-screen` → ❌ `h-[100vh]`

**Avant d'écrire du code** :

1. Vérifier si une classe standard existe avant d'utiliser des valeurs arbitraires `[]`
2. Consulter la doc Tailwind : https://tailwindcss.com/docs
3. Utiliser l'IntelliSense VSCode pour suggestions

**Validation** :

- Linter ESLint configuré pour bloquer les classes non-canoniques
- Exécuter `npm run lint` avant chaque commit
- Auto-fix disponible : `npm run check` (prettier + eslint --fix)

**Fonctions utilitaires** :

- Toujours utiliser `cn()` de `src/lib/utils.ts` pour merger les classes
- Supporte `class-variance-authority` (cva) pour variants de composants

**Exemples de migration** :

```tsx
// ❌ Avant
<div className="max-w-[1280px] bg-gradient-to-b from-primeur-green">

// ✅ Après
<div className="max-w-7xl bg-linear-to-b from-primeur-green">
```

**Gestion des classes custom** :
Si vous devez vraiment utiliser une valeur arbitraire (cas rare), documenter pourquoi :

```tsx
// Valeur spécifique du design system non couverte par Tailwind
<div className="h-[73px]"> {/* Hauteur exacte du header dans la maquette */}
```

---

### Classes Canoniques vs Arbitraires - Guide Complet

**Quand UTILISER des classes canoniques** :

1. **Z-index** : `z-1`, `z-2`, `z-10`, `z-20`, `z-50` ✅
   - ❌ `z-[1]`, `z-[2]`

2. **Positionnement négatif** : `-top-4`, `-right-8`, `-bottom-20`, `-left-30` ✅
   - ❌ `top-[-16px]`, `bottom-[-80px]`, `left-[-120px]`

3. **Tailles** : `size-3.5`, `h-0.5`, `w-12` ✅
   - ❌ `h-[14px] w-[14px]`, `h-[2px]`
   - ✅ Exceptions : grandes tailles décoratives comme `h-[450px]`

4. **Transformations** : `-translate-y-3`, `scale-105`, `rotate-3` ✅
   - ❌ `translate-y-[-12px]`

5. **Filtres** : `blur-xl`, `blur-2xl`, `hue-rotate-10`, `saturate-150` ✅
   - ❌ `blur-[40px]` (utiliser `blur-2xl`)
   - ❌ `hue-rotate-[10deg]` (utiliser `hue-rotate-10`)

6. **Durées** : `duration-300`, `duration-400`, `duration-500` ✅
   - ❌ `duration-400ms` (syntaxe invalide)
   - ❌ `duration-[400ms]` (utiliser `duration-400`)

7. **Couleurs** : Toujours utiliser les variables du thème
   - ✅ `text-text-body`, `bg-surface-card`, `border-border-subtle`
   - ❌ `text-[oklch(...)]`

**Quand GARDER des valeurs arbitraires** :

1. **Tailles uniques du design** : `h-[73px]`, `w-[450px]`
2. **Border-radius complexes** : `rounded-[40%_60%_70%_30%/...]`
3. **Gradients** : `bg-[radial-gradient(...)]`
4. **Animations custom** : `animate-[slideInUp_0.7s_ease-out]`
5. **Valeurs entre deux canoniques** : `stroke-[1.8]`, `leading-[1.6]`
6. **Ombres spécifiques** : `shadow-[0_4px_20px_rgba(...)]`
7. **Positionnement extrême** : `right-[-150px]` (150px n'a pas de canonical)

**Syntaxe Importante** :

- ✅ Classes canoniques : `blur-2xl`, `duration-400`, `h-0.5`
- ❌ Arbitraires inutiles : `blur-[40px]`, `duration-[400ms]`, `h-[2px]`
- ❌ Syntaxe invalide : `blur-40px`, `duration-400ms` (manque les brackets ET il existe des canonical)

**Exemples de conversions courantes** :

| Arbitraire (avant) | Canonical (après) | Note |
|--------------------|-------------------|------|
| `z-[1]` | `z-1` | Z-index 1-50 disponibles |
| `top-[-16px]` | `-top-4` | 4px = 1 unit |
| `bottom-[-80px]` | `-bottom-20` | 80px = 20 units |
| `h-[2px]` | `h-0.5` | 2px = 0.5 unit |
| `h-[14px]` | `h-3.5` | 14px = 3.5 units |
| `translate-y-[-12px]` | `-translate-y-3` | 12px = 3 units |
| `hue-rotate-[10deg]` | `hue-rotate-10` | Rotation disponible |
| `blur-[40px]` | `blur-2xl` | 40px = blur-2xl |
| `blur-40px` | `blur-2xl` | Fixer syntaxe + utiliser canonical |
| `duration-[400ms]` | `duration-400` | 400ms disponible |
| `duration-400ms` | `duration-400` | Fixer syntaxe invalide |

**Avant chaque commit** :

```bash
npm run lint           # Vérifie les erreurs
npm run lint -- --fix  # Corrige automatiquement
```

---

### Ordre des classes Tailwind (IMPORTANT)

Le projet utilise `prettier-plugin-tailwindcss` pour ordonner automatiquement les classes.

**Règle OBLIGATOIRE avant chaque commit :**

```bash
npm run lint -- --fix  # Auto-fix l'ordre des classes + autres erreurs ESLint
```

**Ordre appliqué automatiquement par le plugin :**

1. **Layout** (display, position, float, clear, isolation, object-fit, overflow, overscroll, z-index)
2. **Flexbox & Grid** (flex, flex-direction, grid, gap, justify, align, place, order)
3. **Spacing** (margin, padding)
4. **Sizing** (width, height, min-*, max-*)
5. **Typography** (font-family, font-size, font-weight, line-height, letter-spacing, text-align, text-color, text-decoration, text-transform, whitespace, word-break)
6. **Backgrounds** (background-color, background-image, background-size, background-position, background-repeat, background-attachment, background-clip)
7. **Borders** (border-width, border-style, border-color, border-radius, border-collapse, border-spacing)
8. **Effects** (box-shadow, opacity, mix-blend-mode, filter, backdrop-filter)
9. **Transitions & Animation** (transition-property, transition-duration, transition-timing-function, transition-delay, animation)
10. **Transforms** (transform, transform-origin, scale, rotate, translate, skew)
11. **Interactivity** (appearance, cursor, caret-color, pointer-events, resize, scroll-behavior, user-select)
12. **SVG** (fill, stroke)
13. **Accessibility** (screen readers)
14. **Pseudo-classes** (hover, focus, active, visited, etc.)
15. **Pseudo-elements** (before, after, placeholder, etc.)
16. **Media queries** (responsive variants)

**Exemple de bon ordre (appliqué automatiquement) :**

```tsx
// ✅ BON (après npm run lint -- --fix)
<div className="relative z-1 mx-auto flex max-w-7xl items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// ❌ MAUVAIS (avant auto-fix)
<div className="hover:shadow-lg p-6 transition-all mx-auto border-gray-200 duration-300 relative flex bg-white max-w-7xl gap-4 items-center z-1 rounded-xl shadow-md border hover:-translate-y-1">
```

**Si ESLint détecte des erreurs d'ordre :**
- Ne PAS réordonner manuellement
- Lancer `npm run lint -- --fix` qui le fait automatiquement
- Vérifier que les changements sont corrects
- Commit

**Note :** L'ordre exact n'est pas à mémoriser, le plugin le gère. L'important est de toujours lancer `--fix` avant commit.

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

# Chez Maureen

Site vitrine pour primeur spécialisé dans les fruits et légumes frais.

## Fonctionnalités

- 🏪 Catalogue produits avec catégories et filtres
- 🏷️ Système de badges (Bio, Local, De saison, etc.)
- 💼 Interface administrateur pour gérer les produits et promotions
- 📧 Formulaire de contact
- ⚙️ Paramètres personnalisables (horaires, infos boutique)
- 📱 Design responsive avec Tailwind CSS

## Installation

```bash
# Cloner le projet
git clone [repository-url]
cd chez-maureen

# Installer les dépendances
npm install

# Configurer la base de données
cp .env.example .env.local
# Éditer .env.local avec votre DATABASE_URL

# Générer le client Prisma
npm run db:generate

# Appliquer le schéma
npm run db:push

# (Optionnel) Remplir avec des données de test
npm run db:seed
```

## Variables d'Environnement

Créer un fichier `.env.local` à la racine :

```env
DATABASE_URL="postgresql://user:password@host/database"
```

Pour obtenir une base de données PostgreSQL gratuite : [Neon](https://neon.tech)

## Développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Scripts Disponibles

| Commande         | Description                       |
| ---------------- | --------------------------------- |
| `npm run dev`    | Lance le serveur de développement |
| `npm run build`  | Build pour la production          |
| `npm run serve`  | Prévisualise le build             |
| `npm test`       | Lance les tests Vitest            |
| `npm run lint`   | Vérifie le code avec ESLint       |
| `npm run format` | Formate le code avec Prettier     |
| `npm run check`  | Lint + Format automatique         |
| `npm run deploy` | Déploie sur Cloudflare Workers    |

### Commandes Database

| Commande              | Description                        |
| --------------------- | ---------------------------------- |
| `npm run db:generate` | Génère le client Prisma            |
| `npm run db:push`     | Synchronise le schéma avec la DB   |
| `npm run db:migrate`  | Crée une nouvelle migration        |
| `npm run db:studio`   | Ouvre Prisma Studio                |
| `npm run db:seed`     | Remplit la DB avec données de test |

## Stack Technique

- **Framework** : [TanStack Start](https://tanstack.com/start) (React 19)
- **Routing** : [TanStack Router](https://tanstack.com/router)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/)
- **Database** : [Neon PostgreSQL](https://neon.tech) + [Prisma](https://prisma.io)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching** : [TanStack Query](https://tanstack.com/query)
- **Deployment** : [Cloudflare Workers](https://workers.cloudflare.com/)
- **Testing** : [Vitest](https://vitest.dev/)

## Structure du Projet

```
chez-maureen/
├── src/
│   ├── components/       # Composants UI réutilisables
│   ├── features/         # Features organisées par domaine
│   │   ├── auth/        # Authentification
│   │   ├── categories/  # Gestion des catégories
│   │   ├── contact/     # Page de contact
│   │   ├── dashboard/   # Tableau de bord admin
│   │   ├── home/        # Page d'accueil
│   │   ├── products/    # Gestion des produits
│   │   ├── promotions/  # Promotions
│   │   └── settings/    # Paramètres
│   ├── routes/          # Routes TanStack Router
│   ├── server/          # Server functions (API)
│   ├── schemas/         # Schémas de validation Zod
│   ├── stores/          # Stores Zustand
│   ├── types/           # Types TypeScript
│   └── lib/             # Utilitaires
├── prisma/
│   ├── schema.prisma    # Schéma de la base de données
│   └── seed.ts          # Script de seed
└── public/              # Assets statiques
```

## Ajouter un Composant shadcn

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

## Déploiement

Le projet est configuré pour Cloudflare Workers :

```bash
npm run build
npm run deploy
```

Configuration dans `wrangler.jsonc`.

## Documentation

- Pour plus de détails sur le projet, voir [CLAUDE.md](./CLAUDE.md)
- [TanStack Start Documentation](https://tanstack.com/start)
- [Prisma Documentation](https://www.prisma.io/docs)

## Licence

Privé - Tous droits réservés

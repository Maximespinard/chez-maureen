import { auth } from '../src/lib/auth'

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!password || !email) {
    console.error(
      'Erreur: Les variables ADMIN_EMAIL et ADMIN_PASSWORD doivent être définies',
    )
    console.error(
      'Usage: ADMIN_EMAIL="email@example.com" ADMIN_PASSWORD="votre-mot-de-passe" npx tsx scripts/create-admin.ts',
    )
    process.exit(1)
  }

  try {
    console.log('Création du compte admin...')

    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: 'Admin',
        username: 'chezmaureen66',
      } as any,
    })

    console.log('✅ Compte admin créé avec succès!', user)
    console.log('Username:', 'chezmaureen66')
    console.log('Email:', 'admin@chezmaureen.local')
    console.log(
      '\n⚠️  Supprimez ce script après utilisation pour des raisons de sécurité',
    )
  } catch (error) {
    console.error('❌ Erreur lors de la création du compte admin:', error)
    process.exit(1)
  }
}

createAdmin()

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to Chez Maureen
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          TanStack Start project with Neon PostgreSQL, Prisma ORM, and TanStack
          Query
        </p>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-left">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">
            Ready to Build
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>✓ TanStack Start with React 19</li>
            <li>✓ TanStack Router for routing</li>
            <li>✓ TanStack Query for data fetching</li>
            <li>✓ Neon PostgreSQL database</li>
            <li>✓ Prisma ORM configured</li>
            <li>✓ Tailwind CSS 4.0 styling</li>
          </ul>
        </div>
        <p className="text-gray-400 text-sm mt-8">
          Edit{' '}
          <code className="px-2 py-1 bg-slate-700 rounded text-cyan-400">
            /src/routes/index.tsx
          </code>{' '}
          to get started
        </p>
      </div>
    </div>
  )
}

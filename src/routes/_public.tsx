import { Outlet, createFileRoute } from '@tanstack/react-router'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ComingSoon } from '@/features/home/components/ComingSoon'
import { MAINTENANCE_MODE } from '@/lib/config'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  // Mode maintenance : affiche la page Coming Soon sans navbar/footer
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (MAINTENANCE_MODE) {
    return <ComingSoon />
  }

  // Mode normal : affiche le layout complet
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

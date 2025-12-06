import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: ComingSoon,
})

function ComingSoon() {
  return (
    <div className="min-h-screen bg-primeur-warm-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primeur-green rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-primeur-terracotta rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-down">
          <img
            src="/logo.png"
            alt="Chez Maureen"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl ring-4 ring-primeur-green/20"
          />
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl md:text-7xl font-bold text-center mb-6 animate-fade-in-up"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            color: 'var(--primeur-green)',
            animationDelay: '0.2s',
          }}
        >
          Chez Maureen
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-primeur-walnut text-center mb-4 animate-fade-in-up"
          style={{
            fontFamily: "'Manrope', sans-serif",
            animationDelay: '0.4s',
          }}
        >
          Fruits & Légumes Frais
        </p>

        {/* Coming soon badge */}
        <div
          className="inline-flex items-center gap-2 px-6 py-3 bg-primeur-green-pale rounded-full mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <span className="text-2xl">🌱</span>
          <span
            className="text-lg font-semibold tracking-wide uppercase"
            style={{
              color: 'var(--primeur-green)',
              fontFamily: "'Manrope', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            Bientôt disponible
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl text-center max-w-2xl mb-16 leading-relaxed animate-fade-in-up"
          style={{
            color: 'var(--primeur-walnut)',
            fontFamily: "'Manrope', sans-serif",
            animationDelay: '0.8s',
          }}
        >
          Du champ à vos paniers, soutenez le local, consommez l'exceptionnel
        </p>

        {/* Footer */}
        <div
          className="mt-16 text-center animate-fade-in-up"
          style={{ animationDelay: '1.8s' }}
        >
          <p
            className="text-sm"
            style={{
              color: 'var(--primeur-walnut)',
              opacity: 0.6,
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            © {new Date().getFullYear()} Chez Maureen. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out backwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out backwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

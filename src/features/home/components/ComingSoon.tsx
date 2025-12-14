export function ComingSoon() {
  return (
    <div className="bg-primeur-warm-white relative min-h-screen overflow-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="animate-pulse-slow bg-primeur-green absolute top-20 right-20 size-96 rounded-full blur-3xl" />
        <div
          className="animate-pulse-slow bg-primeur-terracotta absolute bottom-20 left-20 size-80 rounded-full blur-3xl"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="animate-fade-in-down mb-8">
          <img
            src="/logo.png"
            alt="Chez Maureen"
            className="ring-primeur-green/20 size-32 rounded-full shadow-2xl ring-4 md:size-40"
          />
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-in-up mb-6 text-center text-5xl font-bold md:text-7xl"
          style={{
            animationDelay: '0.2s',
            color: 'var(--primeur-green)',
            fontFamily: "'Crimson Pro', Georgia, serif",
          }}
        >
          Chez Maureen
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up text-primeur-walnut mb-4 text-center text-xl md:text-2xl"
          style={{
            animationDelay: '0.4s',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Fruits & Légumes Frais
        </p>

        {/* Coming soon badge */}
        <div
          className="animate-fade-in-up bg-primeur-green-pale mb-12 inline-flex items-center gap-2 rounded-full px-6 py-3"
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
          className="animate-fade-in-up mb-16 text-center text-lg leading-relaxed md:text-xl"
          style={{
            animationDelay: '0.8s',
            color: 'var(--primeur-walnut)',
            fontFamily: "'Manrope', sans-serif",
            maxWidth: '32rem',
          }}
        >
          Du champ à vos paniers, soutenez le local, consommez l'exceptionnel
        </p>

        {/* Footer */}
        <div
          className="animate-fade-in-up mt-16 text-center"
          style={{ animationDelay: '1.8s' }}
        >
          <p
            className="text-sm"
            style={{
              color: 'var(--primeur-walnut)',
              fontFamily: "'Manrope', sans-serif",
              opacity: 0.6,
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

import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, MessageCircle, Sprout } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[oklch(28%_0.02_152)] to-[oklch(32%_0.03_142)] text-[oklch(88%_0.01_72)] py-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(55%_0.09_152/0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_100%,oklch(62%_0.10_42/0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-10 mb-12 md:mb-10 relative z-[1]">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-primeur-green to-[oklch(60%_0.09_152)] rounded-xl text-white flex-shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-primeur-green-light m-0 -tracking-[0.5px] font-[Crimson_Pro,Georgia,serif]">
                  Chez Maureen
                </h3>
                <p className="text-xs text-[oklch(75%_0.02_42)] m-0">
                  Fruits & légumes frais du marché
                </p>
              </div>
            </div>
            <p className="text-sm text-[oklch(78%_0.015_72)] leading-[1.6] opacity-90">
              Du champ à vos paniers. Nous privilégions les producteurs locaux pour vous
              garantir des fruits et légumes frais, savoureux et authentiques.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.8px] text-primeur-green-light m-0 mb-[-1]">
              Navigation
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="text-[oklch(78%_0.015_72)] no-underline text-sm transition-all duration-200 inline-block hover:text-primeur-green-light hover:translate-x-1"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/produits"
                  className="text-[oklch(78%_0.015_72)] no-underline text-sm transition-all duration-200 inline-block hover:text-primeur-green-light hover:translate-x-1"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[oklch(78%_0.015_72)] no-underline text-sm transition-all duration-200 inline-block hover:text-primeur-green-light hover:translate-x-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.8px] text-primeur-green-light m-0 mb-[-1]">
              Nous suivre
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center bg-[oklch(40%_0.03_152)] rounded-xl text-primeur-green-light no-underline transition-all duration-200 hover:bg-primeur-green hover:text-white hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center bg-[oklch(40%_0.03_152)] rounded-xl text-primeur-green-light no-underline transition-all duration-200 hover:bg-primeur-green hover:text-white hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/33468816411"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center bg-[oklch(40%_0.03_152)] rounded-xl text-primeur-green-light no-underline transition-all duration-200 hover:bg-primeur-green hover:text-white hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(50%_0.03_152/0.3)] to-transparent mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 flex-wrap relative z-[1]">
          <p className="text-xs text-[oklch(65%_0.02_72)] m-0">
            © {new Date().getFullYear()} Chez Maureen. Tous droits réservés.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#"
              className="text-xs text-[oklch(65%_0.02_72)] no-underline transition-colors duration-200 hover:text-primeur-green-light"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="text-xs text-[oklch(65%_0.02_72)] no-underline transition-colors duration-200 hover:text-primeur-green-light"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, MessageCircle, Sprout } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-[oklch(28%_0.02_152)] to-[oklch(32%_0.03_142)] py-16 text-[oklch(88%_0.01_72)]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(55%_0.09_152/0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_100%,oklch(62%_0.10_42/0.05)_0%,transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Grid */}
        <div className="relative z-[1] mb-12 grid grid-cols-1 gap-12 md:mb-10 md:grid-cols-[2fr_1fr_1fr] md:gap-10">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="mb-3 flex items-start gap-3">
              <div className="from-primeur-green flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[oklch(60%_0.09_152)] text-white">
                <Sprout className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-primeur-green-light m-0 font-[Crimson_Pro,Georgia,serif] text-lg font-bold tracking-[-0.5px]">
                  Chez Maureen
                </h3>
                <p className="m-0 text-xs text-[oklch(75%_0.02_42)]">
                  Fruits & légumes frais du marché
                </p>
              </div>
            </div>
            <p className="text-sm leading-[1.6] text-[oklch(78%_0.015_72)] opacity-90">
              Du champ à vos paniers. Nous privilégions les producteurs locaux
              pour vous garantir des fruits et légumes frais, savoureux et
              authentiques.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primeur-green-light m-0 mb-[-1] text-sm font-bold tracking-[0.8px] uppercase">
              Navigation
            </h4>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li>
                <Link
                  to="/"
                  className="hover:text-primeur-green-light inline-block text-sm text-[oklch(78%_0.015_72)] no-underline transition-all duration-200 hover:translate-x-1"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/produits"
                  className="hover:text-primeur-green-light inline-block text-sm text-[oklch(78%_0.015_72)] no-underline transition-all duration-200 hover:translate-x-1"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primeur-green-light inline-block text-sm text-[oklch(78%_0.015_72)] no-underline transition-all duration-200 hover:translate-x-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primeur-green-light m-0 mb-[-1] text-sm font-bold tracking-[0.8px] uppercase">
              Nous suivre
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="text-primeur-green-light hover:bg-primeur-green flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(40%_0.03_152)] no-underline transition-all duration-200 hover:-translate-y-1 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-primeur-green-light hover:bg-primeur-green flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(40%_0.03_152)] no-underline transition-all duration-200 hover:-translate-y-1 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/33468816411"
                aria-label="WhatsApp"
                className="text-primeur-green-light hover:bg-primeur-green flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(40%_0.03_152)] no-underline transition-all duration-200 hover:-translate-y-1 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-linear-to-r from-transparent via-[oklch(50%_0.03_152/0.3)] to-transparent" />

        {/* Footer Bottom */}
        <div className="relative z-[1] flex flex-col flex-wrap items-center justify-between gap-6 sm:flex-row">
          <p className="m-0 text-xs text-[oklch(65%_0.02_72)]">
            © {new Date().getFullYear()} Chez Maureen. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="hover:text-primeur-green-light text-xs text-[oklch(65%_0.02_72)] no-underline transition-colors duration-200"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="hover:text-primeur-green-light text-xs text-[oklch(65%_0.02_72)] no-underline transition-colors duration-200"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

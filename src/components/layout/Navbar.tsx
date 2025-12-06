import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-text-dark/8 bg-primeur-warm-white/92 border-b px-6 py-3 shadow-lg backdrop-blur-xl'
          : 'border-none bg-transparent px-6 py-4 shadow-none backdrop-blur-none'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-3 transition-colors duration-500 ${
            scrolled ? 'text-primeur-green' : isHomePage ? 'text-white' : 'text-primeur-green'
          }`}
        >
          <img
            src="/logo.png"
            alt="Chez Maureen"
            className={`h-[50px] w-[50px] rounded-full object-cover transition-shadow duration-500 ${
              scrolled ? 'shadow-md' : 'shadow-sm'
            }`}
          />
        </Link>

        {/* Centered Navigation Links */}
        <ul className="absolute left-1/2 flex -translate-x-1/2 list-none gap-14">
          <li>
            <Link
              to="/"
              className={`relative text-sm font-semibold transition-colors duration-300 ${
                scrolled
                  ? 'text-text-medium hover:text-primeur-green'
                  : isHomePage
                    ? 'text-white/95 hover:text-white'
                    : 'text-text-medium hover:text-primeur-green'
              }`}
              activeProps={{
                className: `after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-current after:rounded-full ${
                  scrolled ? 'text-primeur-green' : isHomePage ? 'text-white' : 'text-primeur-green'
                }`,
              }}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/produits"
              className={`relative text-sm font-semibold transition-colors duration-300 ${
                scrolled
                  ? 'text-text-medium hover:text-primeur-green'
                  : isHomePage
                    ? 'text-white/95 hover:text-white'
                    : 'text-text-medium hover:text-primeur-green'
              }`}
              activeProps={{
                className: `after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-current after:rounded-full ${
                  scrolled ? 'text-primeur-green' : isHomePage ? 'text-white' : 'text-primeur-green'
                }`,
              }}
            >
              Produits
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`relative text-sm font-semibold transition-colors duration-300 ${
                scrolled
                  ? 'text-text-medium hover:text-primeur-green'
                  : isHomePage
                    ? 'text-white/95 hover:text-white'
                    : 'text-text-medium hover:text-primeur-green'
              }`}
              activeProps={{
                className: `after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-current after:rounded-full ${
                  scrolled ? 'text-primeur-green' : isHomePage ? 'text-white' : 'text-primeur-green'
                }`,
              }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'sticky top-0 bg-primeur-warm-white/92 backdrop-blur-xl border-b border-text-dark/8 shadow-lg mx-6 mt-4 rounded-[28px] px-8 py-3'
          : 'bg-transparent backdrop-blur-none border-none shadow-none px-6 py-4'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-3 transition-colors duration-500 ${
            scrolled ? 'text-primeur-green' : 'text-white'
          }`}
        >
          <img
            src="/logo.png"
            alt="Chez Maureen"
            className={`w-[50px] h-[50px] rounded-full object-cover transition-shadow duration-500 ${
              scrolled ? 'shadow-md' : 'shadow-sm'
            }`}
          />
        </Link>

        {/* Centered Navigation Links */}
        <ul className="absolute left-1/2 -translate-x-1/2 flex gap-14 list-none">
          <li>
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors duration-300 relative ${
                scrolled
                  ? 'text-text-medium hover:text-primeur-green'
                  : 'text-white/95 hover:text-white'
              }`}
              activeProps={{
                className: `after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-current after:rounded-full ${
                  scrolled ? 'text-primeur-green' : 'text-white'
                }`,
              }}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/produits"
              className={`text-sm font-semibold transition-colors duration-300 relative ${
                scrolled
                  ? 'text-text-medium hover:text-primeur-green'
                  : 'text-white/95 hover:text-white'
              }`}
              activeProps={{
                className: `after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-current after:rounded-full ${
                  scrolled ? 'text-primeur-green' : 'text-white'
                }`,
              }}
            >
              Produits
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors duration-300 relative ${
                scrolled
                  ? 'text-text-medium hover:text-primeur-green'
                  : 'text-white/95 hover:text-white'
              }`}
              activeProps={{
                className: `after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-current after:rounded-full ${
                  scrolled ? 'text-primeur-green' : 'text-white'
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

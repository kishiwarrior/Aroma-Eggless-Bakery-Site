import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { openWhatsAppOrder } from '../lib/whatsapp'
import Cart from './Cart'

const Header = ({ theme = 'light', onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const menuItems = [
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Best Sellers', href: '#bestsellers' },
    { name: 'Contact', href: '#contact' },
  ]

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleWhatsApp = () => openWhatsAppOrder()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Scroll to products and pass search term (can be enhanced later for filtering)
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
      setIsSearchOpen(false)
      setSearchTerm('')
    }
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            <img src="/assets/logo-aroma.jpg" alt="Aroma Bakery Logo" className="h-10 sm:h-12 md:h-14 w-auto flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-primary-600 dark:text-primary-400 truncate">
                Aroma Bakery
              </h1>
              <span className="text-[10px] sm:text-xs font-semibold text-green-700 dark:text-green-400">PURE VEG</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors text-sm lg:text-base"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
            {/* Cart */}
            <Cart />

            {/* Search */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                setIsMenuOpen(false)
              }}
              className="p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 active:scale-95 transition-all touch-manipulation"
              aria-label="Search"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 active:scale-95 transition-all touch-manipulation"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707 8.001 8.001 0 1017.293 13.293z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M8.05 8.05L6.636 6.636m10.728 0l-1.414 1.414M8.05 15.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>

            {/* Order Online Button - Desktop */}
            <button className="hidden sm:block btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3" onClick={handleWhatsApp}>
              ORDER ONLINE
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setIsSearchOpen(false)
              }}
              className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 active:scale-95 transition-all touch-manipulation"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden top-[73px] sm:top-[81px]"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 relative z-50"
              >
                <nav className="px-4 py-4 space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-3 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors touch-manipulation min-h-[44px] flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                    className="w-full mt-4 btn-primary text-base py-3 min-h-[44px] touch-manipulation active:scale-98"
                    onClick={() => { handleWhatsApp(); setIsMenuOpen(false) }}
                  >
                    ORDER ONLINE
                  </motion.button>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Search Bar with Animation */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3 sm:py-4 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  autoFocus
                  className="flex-1 px-4 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                />
                <button
                  onClick={handleSearch}
                  className="px-5 sm:px-6 py-3 sm:py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 active:bg-primary-800 transition-colors min-h-[44px] text-base sm:text-sm font-medium touch-manipulation active:scale-98"
                >
                  Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header


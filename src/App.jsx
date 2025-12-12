import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import BestSellers from './components/BestSellers'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ChristmasTheme from './components/ChristmasTheme'

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Toaster position="top-right" />
      <ChristmasTheme />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About />
      <Products />
      <BestSellers />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App


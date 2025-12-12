import React from 'react'
import { openWhatsAppOrder } from '../lib/whatsapp'

const Hero = ({ theme = 'light' }) => {
  const overlay =
    theme === 'dark'
      ? 'linear-gradient(rgba(17, 24, 39, 0.82), rgba(17, 24, 39, 0.82))'
      : 'linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94))'

  const bgUrl = '/assets/hero-bg.jpg' // place provided image at public/assets/hero-bg.jpg

  return (
    <section
      className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      style={{
        backgroundImage: `${overlay}, url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/80 dark:bg-gray-900/70 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-primary-100 dark:border-gray-800">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">Fresh • Pure Veg • Since 2021</span>
              <span className="h-2 w-2 bg-primary-500 rounded-full" />
              <span className="text-sm text-gray-600 dark:text-gray-300">10:00 AM – 8:00 PM</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
              Food of the Gods,<br />
              Freshly Baked Everyday
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl">
              Pure vegetarian delights crafted with authentic recipes, honest pricing, and the aroma of fresh bakes you'll love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg" onClick={() => openWhatsAppOrder()}>
                Order Online
              </button>
              <button className="btn-secondary text-lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                View Menu
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🥐</span>
                <span>Pure Veg</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⏰</span>
                <span>Daily 10 AM - 8 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <a href="tel:9932006049" className="hover:text-primary-600 dark:hover:text-primary-300">9932006049</a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-primary-100 dark:border-gray-800">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-400 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/assets/signature-bread-1.jpg" 
                  alt="Signature Bread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-bold text-lg text-primary-700 dark:text-primary-300">100%</p>
                  <p className="text-gray-700 dark:text-gray-300">Veg</p>
                </div>
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-bold text-lg text-primary-700 dark:text-primary-300">4+</p>
                  <p className="text-gray-700 dark:text-gray-300">Years</p>
                </div>
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-bold text-lg text-primary-700 dark:text-primary-300">Fresh</p>
                  <p className="text-gray-700 dark:text-gray-300">Daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container-custom py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl">🥖</span>
              </div>
              <h3 className="font-serif font-semibold text-xs sm:text-sm md:text-base lg:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Authentic Recipes</h3>
              <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs md:text-sm hidden sm:block">
                Home-style bakes using fresh, honest ingredients.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl">❤️</span>
              </div>
              <h3 className="font-serif font-semibold text-xs sm:text-sm md:text-base lg:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Baked with Love</h3>
              <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs md:text-sm hidden sm:block">
                Every tray crafted with care for smiles and celebrations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl">⭐</span>
              </div>
              <h3 className="font-serif font-semibold text-xs sm:text-sm md:text-base lg:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs md:text-sm hidden sm:block">
                Ingredients, processes, and service held to high standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl">💰</span>
              </div>
              <h3 className="font-serif font-semibold text-xs sm:text-sm md:text-base lg:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Honestly Priced</h3>
              <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs md:text-sm hidden sm:block">
                Great bakes at the right prices for every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

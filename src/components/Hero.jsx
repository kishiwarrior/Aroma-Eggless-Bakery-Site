import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
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
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 bg-white/80 dark:bg-gray-900/70 backdrop-blur px-3 sm:px-4 py-2 rounded-full shadow-sm border border-primary-100 dark:border-gray-800">
              <span className="text-xs sm:text-sm font-semibold text-primary-700 dark:text-primary-300">Fresh • Pure Veg • Since 2022</span>
              <span className="hidden sm:inline h-2 w-2 bg-primary-500 rounded-full" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">10:00 AM – 8:00 PM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
              Food of the Gods,<br />
              Freshly Baked Everyday
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl">
              Pure vegetarian delights crafted with authentic recipes, honest pricing, and the aroma of fresh bakes you'll love.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-primary text-base sm:text-lg py-3 sm:py-3 min-h-[52px] touch-manipulation active:scale-98 w-full sm:w-auto" onClick={() => openWhatsAppOrder()}>
                Order Online
              </button>
              <button className="btn-secondary text-base sm:text-lg py-3 sm:py-3 min-h-[52px] touch-manipulation active:scale-98 w-full sm:w-auto" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                View Menu
              </button>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">🥐</span>
                <span>Pure Veg</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">⏰</span>
                <span className="whitespace-nowrap">Daily 10 AM - 8 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">📞</span>
                <a href="tel:9932006049" className="hover:text-primary-600 dark:hover:text-primary-300 touch-manipulation">9932006049</a>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-primary-100 dark:border-gray-800">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-400 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center relative overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  loop
                  className="w-full h-full"
                >
                  <SwiperSlide>
                    <img src="/assets/signature-bread-1.jpg" alt="Signature Bread 1" className="w-full h-full object-cover" loading="eager" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="/assets/signature-bread-2.jpg" alt="Signature Bread 2" className="w-full h-full object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="/assets/signature-bread-3.jpg" alt="Signature Bread 3" className="w-full h-full object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="/assets/signature-bread-4.jpg" alt="Signature Bread 4" className="w-full h-full object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="/assets/signature-bread-5.jpg" alt="Signature Bread 5" className="w-full h-full object-cover" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                  <p className="font-bold text-base sm:text-lg text-primary-700 dark:text-primary-300">100%</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Veg</p>
                </div>
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                  <p className="font-bold text-base sm:text-lg text-primary-700 dark:text-primary-300">2+</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Years</p>
                </div>
                <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                  <p className="font-bold text-base sm:text-lg text-primary-700 dark:text-primary-300">Fresh</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container-custom py-8 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">🥖</span>
              </div>
              <h3 className="font-serif font-semibold text-base sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Authentic Recipes</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm px-2">
                Home-style bakes using fresh, honest ingredients.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">❤️</span>
              </div>
              <h3 className="font-serif font-semibold text-base sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Baked with Love</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm px-2">
                Every tray crafted with care for smiles and celebrations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">⭐</span>
              </div>
              <h3 className="font-serif font-semibold text-base sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm px-2">
                Ingredients, processes, and service held to high standards.
              </p>
            </div>
            <div className="text-center col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">💰</span>
              </div>
              <h3 className="font-serif font-semibold text-base sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">Honestly Priced</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm px-2">
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


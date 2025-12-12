import React from 'react'
import { CakeSketcher, CupcakeSketcher, TeapotSketcher } from './DecorativeIllustrations'

const About = () => {
  return (
    <section id="about" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-10 h-10 text-primary-300 dark:text-gray-700 opacity-60 -rotate-12 pointer-events-none">
        <CakeSketcher />
      </div>
      <div className="absolute top-12 right-10 w-12 h-12 text-orange-300 dark:text-gray-700 opacity-50 rotate-12 pointer-events-none">
        <CupcakeSketcher />
      </div>
      <div className="absolute bottom-10 left-10 w-12 h-12 text-pink-300 dark:text-gray-700 opacity-60 -rotate-6 pointer-events-none">
        <TeapotSketcher />
      </div>
      <div className="absolute bottom-12 right-8 w-10 h-10 text-primary-300 dark:text-gray-700 opacity-50 rotate-6 pointer-events-none">
        <CakeSketcher />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            About Aroma Bakery
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-3">
              Our Story
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm sm:text-base">
              Aroma Bakery is a pure vegetarian bakery that has been spreading sweetness 
              and smiles for over 4 years. We welcome you to partake in our delectable 
              offerings, crafted with love and care.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm sm:text-base">
              At Aroma Bakery, you're treated to a wide range of baked delicacies, from 
              exquisite cakes to artisanal breads and everything in between. Our curated 
              collection of baked goods has something for everyone and every mood!
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              We are committed to providing the best quality pure vegetarian bakery products 
              to our customers, using only the freshest ingredients and traditional recipes.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-xl aspect-square overflow-hidden shadow-xl">
              <img 
                src="/assets/shop_pic.jpg" 
                alt="Aroma Bakery Shop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-2 sm:p-3 md:p-4 text-center transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">🌱</div>
            <h4 className="font-serif font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-gray-900 dark:text-white">Pure Vegetarian</h4>
            <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs hidden sm:block">
              100% vegetarian products made with fresh, quality ingredients
            </p>
          </div>
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-2 sm:p-3 md:p-4 text-center transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">⏰</div>
            <h4 className="font-serif font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-gray-900 dark:text-white">Open Daily</h4>
            <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs hidden sm:block">
              10:00 AM - 8:00 PM<br />Fresh baked goods every day
            </p>
          </div>
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-2 sm:p-3 md:p-4 text-center transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">🏆</div>
            <h4 className="font-serif font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-gray-900 dark:text-white">4+ Years Strong</h4>
            <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs hidden sm:block">
              Serving our community with dedication and passion
            </p>
          </div>
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-2 sm:p-3 md:p-4 text-center transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">📞</div>
            <h4 className="font-serif font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-gray-900 dark:text-white">Easy Ordering</h4>
            <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs hidden sm:block">
              Call us at 9932006049<br />or order online
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


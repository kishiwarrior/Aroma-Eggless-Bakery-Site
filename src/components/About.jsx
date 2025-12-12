import React from 'react'
import { CakeSketcher, CupcakeSketcher, TeapotSketcher } from './DecorativeIllustrations'

const About = () => {
  return (
    <section id="about" className="relative section-padding bg-gradient-to-br from-primary-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-12 left-8 w-12 h-12 text-primary-300 dark:text-gray-700 opacity-60 -rotate-12 pointer-events-none">
        <CakeSketcher />
      </div>
      <div className="absolute top-20 right-12 w-14 h-14 text-orange-300 dark:text-gray-700 opacity-50 rotate-12 pointer-events-none">
        <CupcakeSketcher />
      </div>
      <div className="absolute bottom-16 left-12 w-14 h-14 text-pink-300 dark:text-gray-700 opacity-60 -rotate-6 pointer-events-none">
        <TeapotSketcher />
      </div>
      <div className="absolute bottom-20 right-8 w-12 h-12 text-primary-300 dark:text-gray-700 opacity-50 rotate-6 pointer-events-none">
        <CakeSketcher />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            About Aroma Bakery
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
              Our Story
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Aroma Bakery is a pure vegetarian bakery that has been spreading sweetness 
              and smiles for over 2 years. We welcome you to partake in our delectable 
              offerings, crafted with love and care.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              At Aroma Bakery, you're treated to a wide range of baked delicacies, from 
              exquisite cakes to artisanal breads and everything in between. Our curated 
              collection of baked goods has something for everyone and every mood!
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We are committed to providing the best quality pure vegetarian bakery products 
              to our customers, using only the freshest ingredients and traditional recipes.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🥐</div>
                <p className="text-2xl font-serif font-semibold text-gray-800 dark:text-white">Pure Veg</p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">2 Years in Business</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
            <div className="text-4xl mb-3">🌱</div>
            <h4 className="font-serif font-semibold text-lg mb-2 text-gray-900 dark:text-white">Pure Vegetarian</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              100% vegetarian products made with fresh, quality ingredients
            </p>
          </div>
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
            <div className="text-4xl mb-3">⏰</div>
            <h4 className="font-serif font-semibold text-lg mb-2 text-gray-900 dark:text-white">Open Daily</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              10:00 AM - 8:00 PM<br />Fresh baked goods every day
            </p>
          </div>
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
            <div className="text-4xl mb-3">🏆</div>
            <h4 className="font-serif font-semibold text-lg mb-2 text-gray-900 dark:text-white">2 Years Strong</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Serving our community with dedication and passion
            </p>
          </div>
          <div className="bg-primary-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
            <div className="text-4xl mb-3">📞</div>
            <h4 className="font-serif font-semibold text-lg mb-2 text-gray-900 dark:text-white">Easy Ordering</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Call us at 9932006049<br />or order online
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


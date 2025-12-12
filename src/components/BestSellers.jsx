import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { getProducts } from '../lib/sheetApi'
import { useCartStore } from '../lib/cartStore'
import { CakeSketcher, CupcakeSketcher, TeapotSketcher } from './DecorativeIllustrations'

const formatPrice = (product) => {
  if (product.price_500g) return `₹ ${product.price_500g} / 500g`
  if (product.price_1kg) return `₹ ${product.price_1kg} / 1kg`
  if (product.price_2kg) return `₹ ${product.price_2kg} / 2kg`
  return 'Price on request'
}

const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const addItem = useCartStore((state) => state.addItem)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts()
      setProducts(data.slice(0, 8))
    } catch (err) {
      setError(err.message || 'Failed to load products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600 dark:text-gray-300">Loading best-sellers...</p>
    }

    if (error) {
      return (
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="mb-4">{error}</p>
          <button className="btn-primary" onClick={fetchData}>Retry</button>
        </div>
      )
    }

    if (!products.length) {
      return <p className="text-center text-gray-600 dark:text-gray-300">No products available right now. Please check back soon.</p>
    }

    return (
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: '.bestsellers-next',
          prevEl: '.bestsellers-prev',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="bestsellers-carousel"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id || product.name}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-800"
            >
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 p-8 flex items-center justify-center aspect-square">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-7xl transform group-hover:scale-110 transition-transform duration-300">🍰</div>
                )}
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">{product.category}</p>
                <h3 className="font-serif font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 min-h-[32px] sm:min-h-[40px] line-clamp-2">
                  {product.description || 'Delicious bakery item'}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(product)}
                  </span>
                  <button
                    className="btn-primary text-xs sm:text-sm py-2.5 sm:py-2 px-3 sm:px-4 min-h-[44px] touch-manipulation active:scale-98 w-full sm:w-auto"
                    onClick={() => addItem(product, '500g')}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }

  return (
    <section id="bestsellers" className="relative section-padding bg-gradient-to-br from-pink-50 via-orange-50 to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-16 left-10 w-12 h-12 text-orange-300 dark:text-gray-700 opacity-60 -rotate-12 pointer-events-none">
        <CupcakeSketcher />
      </div>
      <div className="absolute top-12 right-16 w-14 h-14 text-pink-300 dark:text-gray-700 opacity-50 rotate-6 pointer-events-none">
        <TeapotSketcher />
      </div>
      <div className="absolute bottom-20 right-10 w-12 h-12 text-primary-300 dark:text-gray-700 opacity-60 rotate-12 pointer-events-none">
        <CakeSketcher />
      </div>
      <div className="absolute bottom-12 left-16 w-14 h-14 text-orange-300 dark:text-gray-700 opacity-50 -rotate-6 pointer-events-none">
        <CupcakeSketcher />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Our Best-Sellers
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-4">
            Customer favorites that keep them coming back for more
          </p>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        {renderContent()}

        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-3 sm:mb-4">
            Like Our Products?
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            Treat yourself to your favourite Aroma Bakery products or surprise your loved ones with an edible gift.
          </p>
          <button className="btn-primary text-base sm:text-lg py-3 min-h-[52px] touch-manipulation active:scale-98 w-full sm:w-auto px-8" onClick={() => document.querySelector('button[aria-label="Cart"]')?.click()}>
            VIEW CART
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            className="bestsellers-prev w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="bestsellers-next w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <style>{`
          .bestsellers-carousel {
            padding: 0 20px;
          }

          @media (min-width: 640px) {
            .bestsellers-carousel {
              padding: 0 40px;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default BestSellers


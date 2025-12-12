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
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
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
              <div className="p-6">
                <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-2">{product.category}</p>
                <h3 className="font-serif font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 min-h-[40px]">
                  {product.description || 'Delicious bakery item'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(product)}
                  </span>
                  <button
                    className="btn-primary text-sm py-2 px-4"
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
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Our Best-Sellers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Customer favorites that keep them coming back for more
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        {renderContent()}

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            Like Our Products?
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Treat yourself to your favourite Aroma Bakery products or surprise your loved ones with an edible gift.
          </p>
          <button className="btn-primary text-lg" onClick={() => document.querySelector('button[aria-label="Cart"]')?.click()}>
            VIEW CART
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="bestsellers-prev w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="bestsellers-next w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <style>{`
          .bestsellers-carousel {
            padding: 0 40px;
          }

          @media (max-width: 640px) {
            .bestsellers-carousel {
              padding: 0 20px;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default BestSellers


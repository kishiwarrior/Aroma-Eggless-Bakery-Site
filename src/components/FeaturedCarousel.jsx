import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getProducts } from '../lib/sheetApi'
import { useCartStore } from '../lib/cartStore'

const FeaturedCarousel = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data.slice(0, 6))
      } catch (err) {
        console.error('Failed to load featured products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return null

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Swipe to see our latest delicious creations
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="featured-carousel"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id || index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-7xl">🍰</span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {product.description || 'Delicious bakery item'}
                  </p>
                  <button
                    onClick={() => addItem(product, '500g')}
                    className="w-full btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .featured-carousel .swiper-button-next,
        .featured-carousel .swiper-button-prev {
          color: #d97706;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .featured-carousel .swiper-button-next:after,
        .featured-carousel .swiper-button-prev:after {
          font-size: 18px;
        }

        .featured-carousel .swiper-pagination-bullet {
          background-color: #d97706;
          opacity: 0.5;
        }

        .featured-carousel .swiper-pagination-bullet-active {
          opacity: 1;
        }

        :root.dark .featured-carousel .swiper-button-next,
        :root.dark .featured-carousel .swiper-button-prev {
          background: #1f2937;
          color: #fcd34d;
        }
      `}</style>
    </section>
  )
}

export default FeaturedCarousel

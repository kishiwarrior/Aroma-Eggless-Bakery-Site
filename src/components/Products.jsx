import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getProducts } from '../lib/sheetApi'
import { useCartStore } from '../lib/cartStore'
import { CakeSketcher, CupcakeSketcher, TeapotSketcher } from './DecorativeIllustrations'

const formatPrice = (product) => {
  if (product.price_500g) return `₹ ${product.price_500g} / 500g`
  if (product.price_1kg) return `₹ ${product.price_1kg} / 1kg`
  if (product.price_2kg) return `₹ ${product.price_2kg} / 2kg`
  return 'Price on request'
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const addItem = useCartStore((state) => state.addItem)

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'flavor-wise', label: 'Flavor Wise' },
    { id: 'occasion-wise', label: 'Occasion Wise' },
    { id: 'customer-cake', label: 'Custom Cakes' },
  ]

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts()
      setProducts(data)
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

  const getFilteredProducts = () => {
    if (selectedFilter === 'all') return products
    
    return products.filter(product => {
      switch (selectedFilter) {
        case 'flavor-wise':
          return product.flavor_type === true
        case 'occasion-wise':
          return product.occasion_type === true
        case 'customer-cake':
          return product.is_customer_cake === true
        default:
          return true
      }
    })
  }

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600 dark:text-gray-300">Loading products...</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {getFilteredProducts().map((product, index) => (
          <motion.div
            key={product.id || product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 active:scale-98 touch-manipulation"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl sm:text-6xl"
                >
                  🍰
                </motion.span>
              )}
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-[10px] sm:text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">{product.category}</p>
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 min-h-[36px] sm:min-h-[48px] line-clamp-2">
                {product.description || 'Delicious bakery item'}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-base sm:text-lg font-bold text-primary-600 dark:text-primary-400">
                  {formatPrice(product)}
                </span>
                <button
                  className="btn-primary text-xs sm:text-sm py-2.5 sm:py-2 px-4 min-h-[44px] touch-manipulation active:scale-98 w-full sm:w-auto"
                  onClick={() => addItem(product, '500g')}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section id="products" className="relative section-padding bg-gradient-to-br from-orange-50 via-primary-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-8 right-12 w-12 h-12 text-primary-300 dark:text-gray-700 opacity-50 rotate-12 pointer-events-none">
        <CakeSketcher />
      </div>
      <div className="absolute top-24 left-8 w-14 h-14 text-orange-300 dark:text-gray-700 opacity-60 -rotate-6 pointer-events-none">
        <CupcakeSketcher />
      </div>
      <div className="absolute bottom-20 right-16 w-12 h-12 text-pink-300 dark:text-gray-700 opacity-50 -rotate-12 pointer-events-none">
        <TeapotSketcher />
      </div>
      <div className="absolute bottom-12 left-12 w-14 h-14 text-primary-300 dark:text-gray-700 opacity-60 rotate-6 pointer-events-none">
        <CakeSketcher />
      </div>
      
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Our Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-4">
            Explore our wide range of pure vegetarian bakery products
          </p>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 px-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm min-h-[40px] sm:min-h-[44px] touch-manipulation active:scale-95 ${
                selectedFilter === cat.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-primary-600 dark:hover:border-primary-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </section>
  )
}

export default Products


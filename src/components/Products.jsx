import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getProducts } from '../lib/sheetApi'
import { useCartStore } from '../lib/cartStore'
import { CakeSketcher, CupcakeSketcher, TeapotSketcher } from './DecorativeIllustrations'

const hasDiscount = (product) => {
  // Check new structure first
  if (product.discount_price_per_pound) return true
  // Check legacy structure
  return !!(product.discount_price_500g || product.discount_price_1kg || product.discount_price_2kg)
}

const formatPrice = (product) => {
  // New structure: price per pound
  if (product.price_per_pound) {
    if (product.discount_price_per_pound) {
      return (
        <>
          <span className="line-through text-gray-400 text-sm mr-2">₹ {product.price_per_pound}</span>
          <span className="text-red-600 dark:text-red-400">₹ {product.discount_price_per_pound}</span>
          <span className="text-gray-600 dark:text-gray-400"> / pound</span>
        </>
      )
    }
    return `₹ ${product.price_per_pound} / pound`
  }
  
  // Legacy structure (for backward compatibility)
  if (product.discount_price_500g) {
    return (
      <>
        <span className="line-through text-gray-400 text-sm mr-2">₹ {product.price_500g}</span>
        <span className="text-red-600 dark:text-red-400">₹ {product.discount_price_500g}</span>
        <span className="text-gray-600 dark:text-gray-400"> / 500g</span>
      </>
    )
  }
  if (product.discount_price_1kg) {
    return (
      <>
        <span className="line-through text-gray-400 text-sm mr-2">₹ {product.price_1kg}</span>
        <span className="text-red-600 dark:text-red-400">₹ {product.discount_price_1kg}</span>
        <span className="text-gray-600 dark:text-gray-400"> / 1kg</span>
      </>
    )
  }
  if (product.discount_price_2kg) {
    return (
      <>
        <span className="line-through text-gray-400 text-sm mr-2">₹ {product.price_2kg}</span>
        <span className="text-red-600 dark:text-red-400">₹ {product.discount_price_2kg}</span>
        <span className="text-gray-600 dark:text-gray-400"> / 2kg</span>
      </>
    )
  }
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

  // Dynamic categories - automatically creates filters from unique category values
  const getCategories = () => {
    const baseCategories = [{ id: 'all', label: 'All Products' }]
    
    if (products.length === 0) {
      // Default categories if no products loaded yet
      return [
        ...baseCategories,
        { id: 'flavor-wise', label: 'Flavor Wise' },
        { id: 'occasion-wise', label: 'Occasion Wise' },
        { id: 'customer-cake', label: 'Custom Cakes' },
      ]
    }
    
    // Get all unique category values from products
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))]
    
    // Convert category values to filter buttons
    const categoryFilters = uniqueCategories.map(cat => {
      // Convert category value to readable label
      // e.g., "flavor_wise" -> "Flavor Wise", "occasion_wise" -> "Occasion Wise"
      const label = cat
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      // Convert to URL-friendly ID (e.g., "flavor_wise" -> "flavor-wise")
      const id = cat.toLowerCase().replace(/_/g, '-')
      
      return { id, label, categoryValue: cat }
    })
    
    return [...baseCategories, ...categoryFilters]
  }
  
  // Use useMemo to recalculate categories when products change
  const categories = useMemo(() => getCategories(), [products])

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
    
    // Find the category config for the selected filter
    const categoryConfig = categories.find(cat => cat.id === selectedFilter)
    if (!categoryConfig) return products
    
    // Filter by category value
    if (categoryConfig.categoryValue) {
      return products.filter(product => 
        product.category && product.category.toLowerCase() === categoryConfig.categoryValue.toLowerCase()
      )
    }
    
    return products
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {getFilteredProducts().map((product, index) => (
          <motion.div
            key={product.id || product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 relative"
          >
            {hasDiscount(product) && (
              <div className="absolute top-2 right-2 z-10 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                🔥 OFFER
              </div>
            )}
            <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden relative">
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
                  className="text-6xl"
                >
                  🍰
                </motion.span>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-2">{product.category}</p>
              <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 min-h-[48px]">
                {product.description || 'Delicious bakery item'}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {formatPrice(product)}
                </div>
                <button
                  className="btn-primary text-sm py-2 px-4"
                  onClick={() => addItem(product, product.price_per_pound ? 'pound' : '500g')}
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
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Explore our wide range of pure vegetarian bakery products
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
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

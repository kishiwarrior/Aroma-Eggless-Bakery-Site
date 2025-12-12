import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getTestimonials } from '../lib/sheetApi'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (err) {
      setError(err.message || 'Failed to load testimonials')
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Testimonials
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-4">
            What our customers say about us
          </p>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full text-sm sm:text-base">Loading testimonials...</p>
          ) : error ? (
            <p className="text-center text-red-600 dark:text-red-400 col-span-full text-sm sm:text-base">{error}</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full text-sm sm:text-base">No testimonials yet. Check back soon!</p>
          ) : (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-lg p-5 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex mb-3 sm:mb-4 flex-wrap">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg sm:text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  — {testimonial.name}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials


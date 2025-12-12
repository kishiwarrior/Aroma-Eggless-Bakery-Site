import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../lib/cartStore'
import { openWhatsAppOrder } from '../lib/whatsapp'

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getCount } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  const total = getTotal()
  const count = getCount()

  const handleCheckout = () => {
    if (items.length === 0) return

    const cartLines = items.map(
      (item) => {
        const sizeLabel = item.size === 'pound' ? 'per pound' : item.size
        return `${item.name} (${sizeLabel}) × ${item.quantity} = ₹${item.price * item.quantity}`
      }
    )
    const cartTotal = `\nTotal: ₹${total}`

    openWhatsAppOrder([...cartLines, cartTotal])
    clearCart()
    setIsOpen(false)
  }

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        aria-label="Cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {count > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {count}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl flex flex-col z-50"
            >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.size === 'pound' ? 'Per pound' : item.size} - ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-2 text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-800 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ₹{total}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary"
                >
                  Order on WhatsApp
                </button>

                <button
                  onClick={() => {
                    clearCart()
                    setIsOpen(false)
                  }}
                  className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Cart

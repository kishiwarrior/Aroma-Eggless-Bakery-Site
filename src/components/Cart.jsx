import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../lib/cartStore'
import { openWhatsAppOrder } from '../lib/whatsapp'

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getCount } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when cart is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const total = getTotal()
  const count = getCount()

  const handleCheckout = () => {
    if (items.length === 0) return

    const cartLines = items.map(
      (item) =>
        `${item.name} (${item.size}) × ${item.quantity} = ₹${item.price * item.quantity}`
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
        className="relative p-2.5 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 active:scale-95 transition-all touch-manipulation"
        aria-label="Cart"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {count > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 text-[10px] sm:text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
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
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full sm:max-w-sm bg-white dark:bg-gray-900 shadow-2xl flex flex-col z-50"
            >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white">
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 active:scale-95 transition-all touch-manipulation rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-center text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                    Your cart is empty
                  </p>
                  <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-2">
                    Add some delicious items!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {item.size} - ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm sm:text-base font-medium px-2 py-1 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 transition-all touch-manipulation flex-shrink-0"
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 px-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity - 1)
                            }
                            className="px-3 py-2 sm:px-4 sm:py-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all touch-manipulation rounded"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="flex-1 text-center font-semibold text-base sm:text-lg min-w-[30px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            className="px-3 py-2 sm:px-4 sm:py-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all touch-manipulation rounded"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-800 p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white dark:bg-gray-900 sticky bottom-0">
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold pb-2">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-primary-600 dark:text-primary-400 text-xl sm:text-2xl">
                    ₹{total}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary text-base sm:text-lg py-3 sm:py-3 min-h-[52px] touch-manipulation active:scale-98 font-semibold"
                >
                  Order on WhatsApp
                </button>

                <button
                  onClick={() => {
                    clearCart()
                    setIsOpen(false)
                  }}
                  className="w-full py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-all min-h-[44px] touch-manipulation active:scale-98 font-medium text-sm sm:text-base"
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

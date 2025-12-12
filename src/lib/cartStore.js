import { create } from 'zustand'
import toast from 'react-hot-toast'

export const useCartStore = create((set, get) => ({
  items: [],
  
  // Add item to cart
  addItem: (product, size = '500g') => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.size === size
      )
      
      if (existingItem) {
        toast.success(`${product.name} quantity updated! 📦`)
        return {
          items: state.items.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      
      toast.success(`${product.name} added to cart! 🎉`)
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            size: size,
            price: getPriceForSize(product, size),
            quantity: 1,
          },
        ],
      }
    })
  },
  
  // Remove item from cart
  removeItem: (id, size) => {
    set((state) => {
      toast.success('Item removed from cart')
      return {
        items: state.items.filter((item) => !(item.id === id && item.size === size)),
      }
    })
  },
  
  // Update quantity
  updateQuantity: (id, size, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter((item) => item.quantity > 0),
    }))
  },
  
  // Clear cart
  clearCart: () => {
    set({ items: [] })
    toast.success('Cart cleared!')
  },
  
  // Get cart total
  getTotal: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  
  // Get cart count
  getCount: () => {
    const state = get()
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
}))

const getPriceForSize = (product, size) => {
  switch (size) {
    case '1kg':
      return product.price_1kg
    case '2kg':
      return product.price_2kg
    case '500g':
    default:
      return product.price_500g
  }
}

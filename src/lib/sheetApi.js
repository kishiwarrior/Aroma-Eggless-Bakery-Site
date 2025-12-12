const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes
let cache = { data: null, timestamp: 0, testimonials: null, testimonialTimestamp: 0 }

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.toLowerCase() === 'true'
  return false
}

const parseNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

export async function getProducts(force = false) {
  const now = Date.now()
  if (!force && cache.data && now - cache.timestamp < CACHE_TTL_MS) {
    return cache.data
  }

  const sheetId = import.meta.env.VITE_SHEET_ID
  if (!sheetId) {
    throw new Error('Missing VITE_SHEET_ID environment variable')
  }

  const url = `https://opensheet.elk.sh/${sheetId}/Products`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`)
  }

  const rows = await res.json()
  const products = (Array.isArray(rows) ? rows : []).map((row) => {
    // Handle both old and new column naming conventions
    const pricePerPound = parseNumber(row['price/pound'] || row.price_per_pound || row.price_pound)
    const discountPricePerPound = parseNumber(row['price/pound_discount'] || row.price_per_pound_discount || row.price_pound_discount)
    
    // Legacy support for old column names
    const price_500g = parseNumber(row.price_500g)
    const price_1kg = parseNumber(row.price_1kg)
    const price_2kg = parseNumber(row.price_2kg)
    const discount_price_500g = parseNumber(row.discount_price_500g)
    const discount_price_1kg = parseNumber(row.discount_price_1kg)
    const discount_price_2kg = parseNumber(row.discount_price_2kg)
    
    return {
      id: row.id ?? '',
      name: row.name ?? 'Untitled',
      category: row.category ?? 'Misc',
      description: row.description ?? '',
      image_url: row.image_url ?? '',
      // New structure (price per pound)
      price_per_pound: pricePerPound,
      discount_price_per_pound: discountPricePerPound,
      // Legacy structure (for backward compatibility)
      price_500g: price_500g,
      price_1kg: price_1kg,
      price_2kg: price_2kg,
      discount_price_500g: discount_price_500g,
      discount_price_1kg: discount_price_1kg,
      discount_price_2kg: discount_price_2kg,
      // Filter fields (supports both old and new field names)
      flavor_type: parseBoolean(row.flavor_type),
      occasion_type: parseBoolean(row.occasion_type),
      is_customer_cake: parseBoolean(row.is_customer_cake),
      // Allow any additional filter fields from Excel to be passed through
      // You can add new fields like: seasonal, bestseller, new_arrival, etc.
      // Just add them as columns in Excel and they'll be available here
      ...Object.keys(row).reduce((acc, key) => {
        // Include any boolean fields that might be used for filtering
        // Skip known fields to avoid duplicates
        const knownFields = ['id', 'name', 'category', 'description', 'image_url', 
          'price_500g', 'price_1kg', 'price_2kg', 'discount_price_500g', 'discount_price_1kg', 'discount_price_2kg',
          'price/pound', 'price_per_pound', 'price_pound', 'price/pound_discount', 'price_per_pound_discount', 'price_pound_discount',
          'flavor_type', 'occasion_type', 'is_customer_cake', 'available']
        if (!knownFields.includes(key.toLowerCase()) && typeof row[key] !== 'undefined') {
          // Try to parse as boolean if it looks like a boolean field
          const boolValue = parseBoolean(row[key])
          if (boolValue !== false || row[key] === 'false' || row[key] === false) {
            acc[key] = boolValue
          }
        }
        return acc
      }, {}),
      available: parseBoolean(row.available),
    }
  }).filter((p) => p.available === true)

  cache = { data: products, timestamp: Date.now() }
  return products
}

export async function getTestimonials(force = false) {
  const now = Date.now()
  if (!force && cache.testimonials && now - cache.testimonialTimestamp < CACHE_TTL_MS) {
    return cache.testimonials
  }

  const sheetId = import.meta.env.VITE_SHEET_ID
  if (!sheetId) {
    throw new Error('Missing VITE_SHEET_ID environment variable')
  }

  const url = `https://opensheet.elk.sh/${sheetId}/Testimonials`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch testimonials (${res.status})`)
  }

  const rows = await res.json()
  const testimonials = (Array.isArray(rows) ? rows : []).map((row) => ({
    name: row.name ?? 'Anonymous',
    text: row.text ?? '',
    rating: parseNumber(row.rating) || 5,
  })).filter((t) => t.text && t.text.trim() !== '')

  cache = { ...cache, testimonials, testimonialTimestamp: Date.now() }
  return testimonials
}



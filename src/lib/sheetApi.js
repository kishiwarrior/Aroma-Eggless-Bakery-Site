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
  const products = (Array.isArray(rows) ? rows : []).map((row) => ({
    id: row.id ?? '',
    name: row.name ?? 'Untitled',
    category: row.category ?? 'Misc',
    description: row.description ?? '',
    image_url: row.image_url ?? '',
    price_500g: parseNumber(row.price_500g),
    price_1kg: parseNumber(row.price_1kg),
    price_2kg: parseNumber(row.price_2kg),
    flavor_type: parseBoolean(row.flavor_type),
    occasion_type: parseBoolean(row.occasion_type),
    is_customer_cake: parseBoolean(row.is_customer_cake),
    available: parseBoolean(row.available),
  })).filter((p) => p.available === true)

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


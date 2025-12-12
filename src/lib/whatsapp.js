const DEFAULT_NUMBER = '9932006049'

const getNumber = () => {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_NUMBER
  return (raw || '').replace(/[^0-9]/g, '') || DEFAULT_NUMBER
}

const baseTemplate = [
  'New order request:',
  'Name:',
  'Phone:',
  'Pickup or Delivery (choose one):',
  'Address (if delivery):',
  'Products chosen (name / size / qty / price):',
  '-',
  'CUSTOM order? Describe design/theme, size (500g/1kg/2kg), servings, and date/time needed.',
  'Total price:',
  'Notes:',
]

export const openWhatsAppOrder = (presetLines = []) => {
  const number = getNumber()
  const lines = [
    ...baseTemplate,
    ...(presetLines.length ? ['', 'Preset:', ...presetLines] : []),
  ]
  const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`
  window.open(url, '_blank')
}



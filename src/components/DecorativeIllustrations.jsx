import React from 'react'

export const CakeSketcher = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 100 120" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Cake layers */}
    <rect x="20" y="60" width="60" height="20" rx="2" />
    <rect x="15" y="40" width="70" height="20" rx="2" />
    <rect x="10" y="20" width="80" height="20" rx="2" />
    {/* Frosting */}
    <path d="M 15 20 Q 30 5, 50 5 Q 70 5, 85 20" />
    {/* Cherry on top */}
    <circle cx="50" cy="5" r="3" fill="currentColor" />
  </svg>
)

export const CupcakeSketcher = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 100 120" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Wrapper */}
    <path d="M 25 50 L 20 80 Q 20 95, 35 100 Q 50 105, 65 100 Q 80 95, 80 80 L 75 50 Z" />
    {/* Wrapper lines */}
    <line x1="30" y1="60" x2="28" y2="85" />
    <line x1="50" y1="50" x2="50" y2="100" />
    <line x1="70" y1="60" x2="72" y2="85" />
    {/* Frosting swirl */}
    <path d="M 25 50 Q 35 20, 50 15 Q 65 20, 75 50" />
    <path d="M 30 45 Q 40 30, 50 25 Q 60 30, 70 45" />
    {/* Cherry */}
    <circle cx="50" cy="20" r="3" fill="currentColor" />
  </svg>
)

export const TeapotSketcher = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Body */}
    <ellipse cx="50" cy="55" rx="28" ry="25" />
    {/* Spout */}
    <path d="M 22 55 Q 10 50, 8 60" />
    {/* Handle */}
    <path d="M 78 45 Q 92 45, 92 65 Q 92 75, 78 75" />
    {/* Lid */}
    <ellipse cx="50" cy="30" rx="18" ry="8" />
    {/* Lid knob */}
    <circle cx="50" cy="25" r="3" />
    {/* Steam */}
    <path d="M 40 20 Q 38 10, 40 5" strokeLinecap="round" />
    <path d="M 50 18 Q 48 8, 50 3" strokeLinecap="round" />
    <path d="M 60 20 Q 62 10, 60 5" strokeLinecap="round" />
  </svg>
)

export const DecorativeBorder = ({ children, position = 'top' }) => {
  const positionStyles = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
  }

  return (
    <div className={`absolute ${positionStyles[position]} pointer-events-none`}>
      {children}
    </div>
  )
}

export default { CakeSketcher, CupcakeSketcher, TeapotSketcher, DecorativeBorder }

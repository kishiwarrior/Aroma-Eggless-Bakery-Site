import React from 'react'

const ChristmasTheme = () => {
  // Check if today is before December 28th
  const today = new Date()
  const currentMonth = today.getMonth() + 1 // JavaScript months are 0-indexed
  const currentDate = today.getDate()
  
  // Only show if in December and before 29th
  if (currentMonth !== 12 || currentDate > 28) {
    return null
  }

  return (
    <>
      {/* Christmas Banner */}
      <div className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white py-3 text-center animate-pulse">
        <p className="text-lg sm:text-xl font-bold tracking-wider">
          🎄 CHRISTMAS OFFER ACTIVE! 🎄 Limited Time Only Till Dec 28th
        </p>
      </div>

      {/* Decorative Lights Container */}
      <div className="fixed top-0 left-0 w-full pointer-events-none z-40">
        {/* Top lights */}
        <div className="flex justify-around py-4 px-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={`top-${i}`}
              className={`w-3 h-3 rounded-full shadow-lg animate-pulse ${
                i % 3 === 0
                  ? 'bg-red-500 shadow-red-500'
                  : i % 3 === 1
                  ? 'bg-green-500 shadow-green-500'
                  : 'bg-yellow-400 shadow-yellow-400'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Side lights - left */}
      <div className="fixed left-0 top-32 h-96 flex flex-col justify-around pointer-events-none z-40">
        {[...Array(8)].map((_, i) => (
          <div
            key={`left-${i}`}
            className={`w-3 h-3 rounded-full shadow-lg animate-pulse ml-2 ${
              i % 3 === 0
                ? 'bg-red-500 shadow-red-500'
                : i % 3 === 1
                ? 'bg-green-500 shadow-green-500'
                : 'bg-yellow-400 shadow-yellow-400'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Side lights - right */}
      <div className="fixed right-0 top-32 h-96 flex flex-col justify-around pointer-events-none z-40">
        {[...Array(8)].map((_, i) => (
          <div
            key={`right-${i}`}
            className={`w-3 h-3 rounded-full shadow-lg animate-pulse mr-2 ${
              i % 3 === 0
                ? 'bg-red-500 shadow-red-500'
                : i % 3 === 1
                ? 'bg-green-500 shadow-green-500'
                : 'bg-yellow-400 shadow-yellow-400'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Floating snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={`snowflake-${i}`}
            className="absolute text-2xl opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animation: `fall ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </>
  )
}

export default ChristmasTheme

import React from 'react'

const Certifications = () => {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Certifications & Licenses:
          </h3>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <a 
              href="/assets/fssai.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/assets/fssai.jpg" 
                alt="FSSAI Certification" 
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </a>
            <a 
              href="/assets/form11.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/assets/form11.jpg" 
                alt="Form 11 Certification" 
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications



import React, { useState, useEffect } from 'react'
import './header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  // Slider images array - using 6 attractive food images
  const sliderImages = [
    assets.food_1,
    assets.food_5,
    assets.food_12,
    assets.food_18,
    assets.food_25,
    assets.food_32
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotate slider every 4 seconds unless hovered
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered, sliderImages.length])

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div 
      className='header'
      style={{
        backgroundImage: `url(${sliderImages[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p> 
        <button>View Menu</button>
      </div>

      {/* Navigation dots */}
      <div className="header-dots">
        {sliderImages.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDotClick(index)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Header
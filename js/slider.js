/**
 * JavaScript for SeatReserve.lk homepage
 * Handles hero slideshow functionality
 */

document.addEventListener("DOMContentLoaded", () => {
    // ---------- Hero Slideshow Variables ----------
    const slides = document.querySelectorAll(".slide")
    const indicators = document.querySelectorAll(".indicator")
    const prevBtn = document.querySelector(".slide-prev")
    const nextBtn = document.querySelector(".slide-next")
  
    let currentSlide = 0
    let slideInterval
    let isTransitioning = false
    const progressBars = []
    let progressIntervals = []
    let ambientLight = null
    let ambientGlow = null
  
    // ---------- Ambient Light Functions ----------
    
    // Create ambient light elements for slideshow
    function createAmbientLight() {
      const slideshowContainer = document.querySelector(".hero-slideshow")
      if (slideshowContainer) {
        const ambientContainer = document.createElement("div")
        ambientContainer.className = "slideshow-ambient-container"
  
        ambientGlow = document.createElement("div")
        ambientGlow.className = "ambient-glow"
  
        ambientContainer.appendChild(ambientGlow)
        slideshowContainer.insertBefore(ambientContainer, slideshowContainer.firstChild)
  
        // Create local ambient light for slideshow
        ambientLight = document.createElement("div")
        ambientLight.className = "ambient-light"
        slideshowContainer.appendChild(ambientLight)
      }
    }
  
    // Update ambient light color based on current slide
    function updateAmbientLight(index) {
      if (!ambientLight || !ambientGlow) return
  
      // Predefined colors for each slide based on their images
      const slideColors = [
        "rgba(212, 127, 0, 0.89)", // Rani - reddish
        "rgba(30, 60, 100, 0.6)",  // Ape Principal - bluish
        "rgb(255, 72, 0)",         // Oppenheimer - brownish
        "rgb(255, 196, 0)",        // Kasi Wasi - teal
      ]
  
      ambientLight.style.backgroundColor = slideColors[index]
      ambientGlow.style.backgroundColor = slideColors[index]
    }
  
    // ---------- Progress Bar Functions ----------
    
    // Create progress bars for each slide
    function createProgressBars() {
      const heroSlideshow = document.querySelector(".hero-slideshow")
      if (!heroSlideshow) return
  
      // Create container for progress bars
      const progressContainer = document.createElement("div")
      progressContainer.className = "slide-progress-container"
  
      // Create a progress bar for each slide
      slides.forEach((_, index) => {
        const progressItem = document.createElement("div")
        progressItem.className = "slide-progress-item"
        if (index === 0) progressItem.classList.add("active")
  
        const progressBar = document.createElement("div")
        progressBar.className = "slide-progress-bar"
  
        progressItem.appendChild(progressBar)
        progressContainer.appendChild(progressItem)
  
        progressBars.push(progressBar)
      })
  
      heroSlideshow.appendChild(progressContainer)
    }
  
    // Update progress bars
    function updateProgressBars(activeIndex) {
      // Reset all progress bars and intervals
      resetAllProgressBars()
  
      // Update progress bar classes
      const progressItems = document.querySelectorAll(".slide-progress-item")
      progressItems.forEach((item, index) => {
        item.classList.remove("active", "completed")
        if (index < activeIndex) {
          item.classList.add("completed")
        } else if (index === activeIndex) {
          item.classList.add("active")
        }
      })
  
      // Start the active progress bar
      startProgressBar(activeIndex)
    }
  
    // Reset all progress bars
    function resetAllProgressBars() {
      // Clear all intervals
      progressIntervals.forEach((interval) => clearInterval(interval))
      progressIntervals = []
  
      // Reset all progress bar widths
      progressBars.forEach((bar) => {
        bar.style.width = "0%"
      })
    }
  
    // Start progress bar animation for active slide
    function startProgressBar(index) {
      if (!progressBars[index]) return
  
      let width = 0
      const duration = 5000 // 5 seconds
      const interval = 50   // Update every 50ms for smooth animation
      const increment = (interval / duration) * 100
  
      const progressInterval = setInterval(() => {
        width += increment
        progressBars[index].style.width = width + "%"
  
        if (width >= 100) {
          clearInterval(progressInterval)
  
          // Move to next slide if not transitioning
          if (!isTransitioning) {
            nextSlide()
          }
        }
      }, interval)
  
      progressIntervals.push(progressInterval)
    }
  
    // ---------- Slide Navigation Functions ----------
    
    // Show a specific slide
    function showSlide(index) {
      // Don't change slides if currently transitioning
      if (isTransitioning) return
  
      isTransitioning = true
  
      // Calculate previous and next indices
      const prevIndex = (index - 1 + slides.length) % slides.length
      const nextIndex = (index + 1) % slides.length
  
      // Remove all classes from all slides
      slides.forEach((slide) => {
        slide.classList.remove("active", "prev", "next")
      })
  
      // Add appropriate classes to slides
      slides[index].classList.add("active")
      slides[prevIndex].classList.add("prev")
      slides[nextIndex].classList.add("next")
  
      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index)
      })
  
      // Update progress bars
      updateProgressBars(index)
  
      // Update ambient light
      updateAmbientLight(index)
  
      // Update current slide index
      currentSlide = index
  
      // Reset transition flag after animation completes
      setTimeout(() => {
        isTransitioning = false
      }, 1200) // Match this with the CSS transition duration
    }
  
    // Show next slide
    function nextSlide() {
      let nextIndex = currentSlide + 1
      if (nextIndex >= slides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }
  
    // Show previous slide
    function prevSlide() {
      let prevIndex = currentSlide - 1
      if (prevIndex < 0) {
        prevIndex = slides.length - 1
      }
      showSlide(prevIndex)
    }
  
    // Start automatic slideshow
    function startSlideshow() {
      // Clear any existing interval
      if (slideInterval) {
        clearInterval(slideInterval)
      }
  
      // Set new interval - change slide every 5 seconds
      slideInterval = setInterval(() => {
        if (!isTransitioning) {
          nextSlide()
        }
      }, 5000)
    }
  
    // ---------- Event Listeners ----------
    
    // Add event listeners to navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide()
        // Restart the interval when manually changing slides
        startSlideshow()
      })
    }
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide()
        // Restart the interval when manually changing slides
        startSlideshow()
      })
    }
  
    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index)
        // Restart the interval when manually changing slides
        startSlideshow()
      })
    })
  
    // Pause slideshow when hovering over the slideshow
    const heroSlideshow = document.querySelector(".hero-slideshow")
    if (heroSlideshow) {
      heroSlideshow.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
  
        // Also pause progress bars
        progressIntervals.forEach((interval) => {
          clearInterval(interval)
        })
      })
  
      heroSlideshow.addEventListener("mouseleave", () => {
        startSlideshow()
  
        // Restart progress bar from current position
        startProgressBar(currentSlide)
      })
    }
  
    // ---------- Initialization ----------
    
    // Initialize slideshow
    function initSlideshow() {
      // Create ambient light effect
      createAmbientLight()
  
      // Create progress bars
      createProgressBars()
  
      // Set initial slide positions
      const initialIndex = 0
      const prevIndex = slides.length - 1
      const nextIndex = 1
  
      slides[initialIndex].classList.add("active")
      slides[prevIndex].classList.add("prev")
      slides[nextIndex].classList.add("next")
  
      // Update current slide index
      currentSlide = initialIndex
  
      // Start progress bar
      startProgressBar(initialIndex)
  
      // Update ambient light
      updateAmbientLight(initialIndex)
  
      // Start the automatic slideshow
      startSlideshow()
    }
  
    // Initialize slideshow
    initSlideshow()
  })
  
/**
 * Optimized JavaScript for SeatReserve.lk homepage slideshow*/

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Hero Slideshow Variables ----------
  const slides = document.querySelectorAll(".slide") || []
  const indicators = document.querySelectorAll(".indicator") || []
  const prevBtn = document.querySelector(".slide-prev")
  const nextBtn = document.querySelector(".slide-next")

  // Check if slider elements exist before initializing
  if (slides.length === 0) {
    console.warn("No slides found for the slideshow")
    return
  }

  let currentSlide = 0
  let slideInterval
  let isTransitioning = false
  const progressBars = []
  let progressAnimationIds = []
  let ambientLight = null
  let ambientGlow = null

  // ---------- Ambient Light Functions ----------
  function createAmbientLight() {
    const slideshowContainer = document.querySelector(".hero-slideshow")
    if (!slideshowContainer) return

    const ambientContainer = document.createElement("div")
    ambientContainer.className = "slideshow-ambient-container"

    ambientGlow = document.createElement("div")
    ambientGlow.className = "ambient-glow"

    ambientContainer.appendChild(ambientGlow)
    slideshowContainer.insertBefore(ambientContainer, slideshowContainer.firstChild)

    ambientLight = document.createElement("div")
    ambientLight.className = "ambient-light"
    slideshowContainer.appendChild(ambientLight)
  }

  function updateAmbientLight(index) {
    if (!ambientLight || !ambientGlow) return

    const slideColors = [
      "rgba(212, 127, 0, 0.89)", // Rani
      "rgba(30, 60, 100, 0.6)", // Ape Principal
      "rgb(255, 72, 0)", // Oppenheimer
      "rgb(255, 196, 0)", // Kasi Wasi
    ]

    const colorIndex = index < slideColors.length ? index : 0
    ambientLight.style.backgroundColor = slideColors[colorIndex]
    ambientGlow.style.backgroundColor = slideColors[colorIndex]
  }

  // ---------- Progress Bar Functions ----------
  function createProgressBars() {
    const heroSlideshow = document.querySelector(".hero-slideshow")
    if (!heroSlideshow) return

    const progressContainer = document.createElement("div")
    progressContainer.className = "slide-progress-container"
    progressContainer.setAttribute("aria-hidden", "true")

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

  function updateProgressBars(activeIndex) {
    resetAllProgressBars()

    const progressItems = document.querySelectorAll(".slide-progress-item")
    if (!progressItems.length) return

    progressItems.forEach((item, index) => {
      item.classList.remove("active", "completed")
      if (index < activeIndex) {
        item.classList.add("completed")
      } else if (index === activeIndex) {
        item.classList.add("active")
      }
    })

    startProgressBar(activeIndex)
  }

  function resetAllProgressBars() {
    progressAnimationIds.forEach((id) => cancelAnimationFrame(id))
    progressAnimationIds = []

    progressBars.forEach((bar) => {
      if (bar) bar.style.width = "0%"
    })
  }

  function startProgressBar(index) {
    if (!progressBars[index]) return

    const duration = 5000 // 5 seconds
    const startTime = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(100, (elapsed / duration) * 100)

      progressBars[index].style.width = `${progress}%`

      if (progress < 100) {
        progressAnimationIds[index] = requestAnimationFrame(animate)
      } else if (!isTransitioning) {
        nextSlide()
      }
    }

    progressAnimationIds[index] = requestAnimationFrame(animate)
  }

  // ---------- Slide Navigation Functions ----------
  // Optimize animation performance
  function showSlide(index) {
    if (isTransitioning) return

    if (index < 0 || index >= slides.length) {
      console.warn("Invalid slide index:", index)
      return
    }

    isTransitioning = true

    const prevIndex = (index - 1 + slides.length) % slides.length
    const nextIndex = (index + 1) % slides.length

    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      // Remove all classes first
      slides.forEach((slide) => {
        slide.classList.remove("active", "prev", "next")
      })

      // Then add the appropriate classes
      slides[index].classList.add("active")
      slides[prevIndex].classList.add("prev")
      slides[nextIndex].classList.add("next")

      if (indicators.length > 0) {
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle("active", i === index)
          indicator.setAttribute("aria-current", i === index ? "true" : "false")
        })
      }

      updateProgressBars(index)
      updateAmbientLight(index)
      currentSlide = index
      updateAriaAttributes(index)

      // Use the transitionend event to determine when transition is complete
      const activeSlide = slides[index]
      const transitionEndHandler = () => {
        isTransitioning = false
        activeSlide.removeEventListener("transitionend", transitionEndHandler)
      }

      activeSlide.addEventListener("transitionend", transitionEndHandler)

      // Fallback in case the transitionend event doesn't fire
      setTimeout(() => {
        isTransitioning = false
      }, 1200)
    })
  }

  function nextSlide() {
    let nextIndex = currentSlide + 1
    if (nextIndex >= slides.length) {
      nextIndex = 0
    }
    showSlide(nextIndex)
  }

  function prevSlide() {
    let prevIndex = currentSlide - 1
    if (prevIndex < 0) {
      prevIndex = slides.length - 1
    }
    showSlide(prevIndex)
  }

  function startSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval)
    }

    slideInterval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 5000)
  }

  // ---------- Accessibility Enhancements ----------
  function setupAriaAttributes() {
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true")
      slide.setAttribute("role", "tabpanel")
      slide.setAttribute("id", `slide-${index}`)

      const slideTitle = slide.querySelector("h1")?.textContent || `Slide ${index + 1}`
      slide.setAttribute("aria-label", slideTitle)
    })

    if (prevBtn) {
      prevBtn.setAttribute("aria-label", "Previous slide")
      prevBtn.setAttribute("role", "button")
    }

    if (nextBtn) {
      nextBtn.setAttribute("aria-label", "Next slide")
      nextBtn.setAttribute("role", "button")
    }

    indicators.forEach((indicator, index) => {
      indicator.setAttribute("role", "tab")
      indicator.setAttribute("aria-controls", `slide-${index}`)
      indicator.setAttribute("aria-label", `Slide ${index + 1}`)
      indicator.setAttribute("aria-selected", index === 0 ? "true" : "false")
      indicator.setAttribute("tabindex", "0")
    })

    const heroSlideshow = document.querySelector(".hero-slideshow")
    if (heroSlideshow) {
      const liveRegion = document.createElement("div")
      liveRegion.className = "sr-only"
      liveRegion.setAttribute("aria-live", "polite")
      liveRegion.id = "slideshow-live-region"
      heroSlideshow.appendChild(liveRegion)
    }
  }

  function updateAriaAttributes(index) {
    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", i === index ? "false" : "true")
    })

    const liveRegion = document.getElementById("slideshow-live-region")
    if (liveRegion) {
      const slideTitle = slides[index].querySelector("h1")?.textContent || `Slide ${index + 1}`
      liveRegion.textContent = `Now showing: ${slideTitle}`
    }

    indicators.forEach((indicator, i) => {
      indicator.setAttribute("aria-selected", i === index ? "true" : "false")
    })
  }

  // ---------- Event Listeners ----------
  function setupEventListeners() {
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide()
        startSlideshow()
      })

      prevBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          prevBtn.click()
        }
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide()
        startSlideshow()
      })

      nextBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          nextBtn.click()
        }
      })
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index)
        startSlideshow()
      })

      indicator.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          indicator.click()
        }
      })
    })

    const heroSlideshow = document.querySelector(".hero-slideshow")
    if (heroSlideshow) {
      heroSlideshow.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
        progressAnimationIds.forEach((id) => {
          cancelAnimationFrame(id)
        })
      })

      heroSlideshow.addEventListener("mouseleave", () => {
        startSlideshow()
        startProgressBar(currentSlide)
      })

      heroSlideshow.setAttribute("tabindex", "0")
      heroSlideshow.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          prevSlide()
          startSlideshow()
        } else if (e.key === "ArrowRight") {
          nextSlide()
          startSlideshow()
        }
      })

      // Touch support for mobile devices
      let touchStartX = 0
      let touchEndX = 0

      heroSlideshow.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX
        },
        { passive: true },
      )

      heroSlideshow.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX
          handleSwipe()
        },
        { passive: true },
      )

      function handleSwipe() {
        const swipeThreshold = 50
        if (touchEndX < touchStartX - swipeThreshold) {
          nextSlide()
          startSlideshow()
        } else if (touchEndX > touchStartX + swipeThreshold) {
          prevSlide()
          startSlideshow()
        }
      }
    }
  }

  // ---------- Initialization ----------
  function initSlideshow() {
    if (slides.length === 0) {
      console.warn("No slides to initialize")
      return
    }

    createAmbientLight()
    createProgressBars()
    setupAriaAttributes()

    const initialIndex = 0
    const prevIndex = slides.length - 1
    const nextIndex = 1

    slides[initialIndex].classList.add("active")
    slides[prevIndex].classList.add("prev")
    slides[nextIndex].classList.add("next")

    currentSlide = initialIndex
    updateAriaAttributes(initialIndex)
    startProgressBar(initialIndex)
    updateAmbientLight(initialIndex)
    setupEventListeners()
    startSlideshow()
  }

  // Initialize slideshow with error handling
  try {
    initSlideshow()
  } catch (error) {
    console.error("Error initializing slideshow:", error)
    // Fallback to static display if slideshow fails
    slides.forEach((slide, index) => {
      slide.style.position = "static"
      slide.style.opacity = index === 0 ? "1" : "0"
      slide.style.display = index === 0 ? "block" : "none"
    })
  }
})


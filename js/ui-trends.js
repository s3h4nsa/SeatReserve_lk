/**
 * JavaScript file for modern UI trends and interactions
 * This file contains:
 * - Smooth scrolling
 * - Parallax effects
 * - Micro-interactions
 * - Skeleton loading
 * - Intersection Observer for animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Smooth Scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    })
  })

  // ---------- Parallax Effect for Movie Banners ----------
  const parallaxElements = document.querySelectorAll(".parallax")

  function updateParallax() {
    parallaxElements.forEach((element) => {
      const scrollPosition = window.pageYOffset
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight

      // Check if element is in viewport
      if (scrollPosition + window.innerHeight > elementTop && scrollPosition < elementTop + elementHeight) {
        const distance = scrollPosition - elementTop
        const speed = element.dataset.speed || 0.5

        element.style.transform = `translateY(${distance * speed}px)`
      }
    })
  }

  window.addEventListener("scroll", updateParallax)

  // ---------- Micro-interactions for Movie Cards ----------
  const movieCards = document.querySelectorAll(".movie-card-3d")

  movieCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenterX = cardRect.left + cardRect.width / 2
      const cardCenterY = cardRect.top + cardRect.height / 2

      const mouseX = e.clientX - cardCenterX
      const mouseY = e.clientY - cardCenterY

      // Calculate rotation based on mouse position
      const rotateY = mouseX / 10
      const rotateX = -mouseY / 10

      // Apply rotation
      card.querySelector(".card-inner").style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    })

    // Reset rotation when mouse leaves
    card.addEventListener("mouseleave", () => {
      card.querySelector(".card-inner").style.transform = "rotateY(0) rotateX(0)"
    })
  })

  // ---------- Skeleton Loading ----------
  function showSkeletonLoaders() {
    const skeletonElements = document.querySelectorAll(".skeleton-loader")

    skeletonElements.forEach((element) => {
      element.innerHTML = ""
      element.classList.add("skeleton")
    })
  }

  function hideSkeletonLoaders() {
    const skeletonElements = document.querySelectorAll(".skeleton-loader")

    skeletonElements.forEach((element) => {
      element.classList.remove("skeleton")
    })
  }

  // Example usage for loading content
  function loadContent() {
    showSkeletonLoaders()

    // Simulate loading delay
    setTimeout(() => {
      hideSkeletonLoaders()
      // Load actual content here
    }, 1500)
  }

  // ---------- Intersection Observer for Animations ----------
  const fadeElements = document.querySelectorAll(".fade-in")

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          fadeObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  fadeElements.forEach((element) => {
    fadeObserver.observe(element)
  })

  // ---------- Custom Cursor Effect ----------
  function setupCustomCursor() {
    const cursor = document.createElement("div")
    cursor.className = "custom-cursor"
    document.body.appendChild(cursor)

    const cursorDot = document.createElement("div")
    cursorDot.className = "cursor-dot"
    document.body.appendChild(cursorDot)

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
    })

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .movie-card, input, select, .interactive")

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover")
        cursorDot.classList.add("dot-hover")
      })

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover")
        cursorDot.classList.remove("dot-hover")
      })
    })
  }

  // Only setup custom cursor on non-touch devices
  if (!("ontouchstart" in window)) {
    // Uncomment to enable custom cursor
    // setupCustomCursor();
  }

  // ---------- Tooltip Initialization ----------
  function initTooltips() {
    const tooltips = document.querySelectorAll(".tooltip")

    tooltips.forEach((tooltip) => {
      const text = tooltip.getAttribute("data-tooltip")
      if (!text) return

      const tooltipText = document.createElement("span")
      tooltipText.className = "tooltip-text"
      tooltipText.textContent = text

      tooltip.appendChild(tooltipText)
    })
  }

  initTooltips()
})

// Add CSS for fade-in animation and custom cursor
const style = document.createElement("style")
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .custom-cursor {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        z-index: 9999;
    }
    
    .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 10000;
        transition: width 0.3s, height 0.3s, background-color 0.3s;
    }
    
    .cursor-hover {
        width: 50px;
        height: 50px;
        border-color: rgba(229, 9, 20, 0.5);
        background-color: rgba(229, 9, 20, 0.1);
    }
    
    .dot-hover {
        width: 4px;
        height: 4px;
    }
`

document.head.appendChild(style)


/**
 * Main JavaScript file for the SeatReserve.lk homepage
 * This file handles:
 * - Mobile menu toggle
 * - Search form submission
 * - Newsletter form submission
 * - Trailer preview functionality
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Add click event to movie cards for navigation
  const movieCards = document.querySelectorAll(".movie-card")

  movieCards.forEach((card) => {
    const bookBtn = card.querySelector(".book-btn")

    if (bookBtn) {
      bookBtn.addEventListener("click", (e) => {
        // Prevent default only if it's a link
        if (bookBtn.tagName.toLowerCase() === "a") {
          e.preventDefault()
        }

        // Get movie ID from href or data attribute
        let movieId
        if (bookBtn.href) {
          const url = new URL(bookBtn.href, window.location.origin)
          movieId = url.searchParams.get("id")
        } else if (bookBtn.dataset.movieId) {
          movieId = bookBtn.dataset.movieId
        }

        if (!movieId) {
          console.error("No movie ID found for booking button")
          return
        }

        // Navigate to movie details page
        window.location.href = `movie-details.html?id=${movieId}`
      })
    }
  })
  // ---------- Mobile Menu Toggle ----------
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  // Check if mobile menu button exists
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      // Toggle mobile menu visibility
      navLinks.classList.toggle("show")

      // Toggle active class on menu icon spans for animation
      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => {
        span.classList.toggle("active")
      })
    })
  }

  // ---------- Search Form Submission ----------
  const searchForm = document.getElementById("search-form")

  // Check if search form exists
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault() // Prevent the form from submitting normally

      // Get form values
      const movie = document.getElementById("movie")?.value || ""
      const location = document.getElementById("location")?.value || ""
      const date = document.getElementById("date")?.value || ""

      // Log the search parameters (in a real app, this would send to a server)
      console.log("Search Parameters:", { movie, location, date })

      // Redirect to movies page with search parameters
      // In a real application, this would use proper URL parameters
      window.location.href = `movies.html?movie=${encodeURIComponent(movie)}&location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`
    })
  }

  // ---------- Newsletter Form Submission ----------
  const newsletterForm = document.getElementById("newsletter-form")

  // Check if newsletter form exists
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault() // Prevent the form from submitting normally

      // Get email value
      const email = document.getElementById("email").value

      // Validate email (simple validation)
      if (!validateEmail(email)) {
        alert("Please enter a valid email address")
        return
      }

      // Log the email (in a real app, this would send to a server)
      console.log("Newsletter Subscription:", email)

      // Show success message
      alert("Thank you for subscribing to our newsletter!")

      // Reset the form
      newsletterForm.reset()
    })
  }

  // ---------- Trailer Preview Functionality ----------
  const trailerButtons = document.querySelectorAll(".play-trailer")

  // Add click event to all trailer buttons
  trailerButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // Get the movie title from the card
      const movieCard = this.closest(".movie-card")
      const movieTitle = movieCard.querySelector("h3").textContent

      // In a real application, this would open a modal with the trailer
      // For this example, we'll just show an alert
      alert(`Playing trailer for ${movieTitle}`)

      // Prevent the click from bubbling up to the card
      event.stopPropagation()
    })
  })

  // ---------- Helper Functions ----------

  /**
   * Validates an email address format
   * @param {string} email - The email address to validate
   * @return {boolean} - True if valid, false otherwise
   */
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  // Add styles for mobile menu if they don't exist
  if (!document.getElementById("mobile-menu-styles")) {
    const style = document.createElement("style")
    style.id = "mobile-menu-styles"
    style.textContent = `
     .nav-links.show {
       display: flex;
       flex-direction: column;
       position: absolute;
       top: 70px;
       left: 0;
       right: 0;
       background-color: rgba(0, 0, 0, 0.95);
       padding: 1rem;
       z-index: 100;
     }
     .menu-toggle span.active:nth-child(1) {
       transform: rotate(45deg) translate(5px, 5px);
     }
     .menu-toggle span.active:nth-child(2) {
       opacity: 0;
     }
     .menu-toggle span.active:nth-child(3) {
       transform: rotate(-45deg) translate(5px, -5px);
     }
   `
    document.head.appendChild(style)
  }
})


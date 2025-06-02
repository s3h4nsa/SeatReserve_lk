/* JavaScript file for the SeatReserve.lk homepage */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  try {
    // ---------- Movie Card Interactions ----------
    function setupMovieCards() {
      const movieCards = document.querySelectorAll(".movie-card")

      movieCards.forEach((card) => {
        // Make cards keyboard focusable
        if (!card.getAttribute("tabindex")) {
          card.setAttribute("tabindex", "0")
        }

        // Add click event to book buttons
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

        // Add keyboard event for Enter key
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            const bookBtn = card.querySelector(".book-btn")
            if (bookBtn) bookBtn.click()
          }
        })

        // Add hover effects
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-5px)"
          card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)"
        })

        card.addEventListener("mouseleave", () => {
          card.style.transform = ""
          card.style.boxShadow = ""
        })
      })
    }

    // ---------- Trailer Preview Functionality ----------
    function setupTrailerPreviews() {
      const trailerButtons = document.querySelectorAll(".play-trailer")

      // Add click event to all trailer buttons
      trailerButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
          // Get the movie title from the card
          const movieCard = this.closest(".movie-card")
          const movieTitle = movieCard.querySelector("h3").textContent

          // Create a modal for the trailer
          const modal = document.createElement("div")
          modal.className = "trailer-modal"
          modal.innerHTML = `
            <div class="trailer-modal-content">
              <span class="close-trailer">&times;</span>
              <div class="trailer-placeholder">
                <h3>Trailer for ${movieTitle}</h3>
                <p>This is where the trailer would play in a production environment.</p>
              </div>
            </div>
          `

          document.body.appendChild(modal)

          // Add close functionality
          const closeBtn = modal.querySelector(".close-trailer")
          closeBtn.addEventListener("click", () => {
            document.body.removeChild(modal)
          })

          // Close when clicking outside content
          modal.addEventListener("click", (e) => {
            if (e.target === modal) {
              document.body.removeChild(modal)
            }
          })

          // Prevent the click from bubbling up to the card
          event.stopPropagation()
        })
      })
    }

    // ---------- Search Form Submission ----------
    function setupSearchForm() {
      const searchForm = document.getElementById("search-form")

      // Check if search form exists
      if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
          e.preventDefault() // Prevent the form from submitting normally

          // Get form values
          const movie = document.getElementById("movie")?.value || ""
          const location = document.getElementById("location")?.value || ""
          const date = document.getElementById("date")?.value || ""

          // Validate inputs
          let isValid = true

          if (!movie.trim()) {
            const movieField = document.getElementById("movie")
            if (movieField && window.SeatReserve) {
              window.SeatReserve.showErrorMessage(movieField, "Please enter a movie title")
              isValid = false
            }
          }

          if (!isValid) return

          // Redirect to movies page with search parameters
          window.location.href = `movies.html?movie=${encodeURIComponent(movie)}&location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`
        })
      }
    }

    // ---------- Newsletter Form Submission ----------
    function setupNewsletterForm() {
      const newsletterForm = document.getElementById("newsletter-form")

      // Check if newsletter form exists
      if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
          e.preventDefault() // Prevent the form from submitting normally

          // Get email value
          const emailField = document.getElementById("email")
          const email = emailField.value

          // Validate email
          if (!window.SeatReserve?.validateEmail(email)) {
            if (window.SeatReserve) {
              window.SeatReserve.showErrorMessage(emailField, "Please enter a valid email address")
            } else {
              alert("Please enter a valid email address")
            }
            return
          }

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.textContent = "Thank you for subscribing to our newsletter!"

          // Insert after form
          newsletterForm.parentNode.insertBefore(successMessage, newsletterForm.nextSibling)

          // Remove message after 5 seconds
          setTimeout(() => {
            if (successMessage.parentNode) {
              successMessage.parentNode.removeChild(successMessage)
            }
          }, 5000)

          // Reset the form
          newsletterForm.reset()
        })
      }
    }

    // ---------- Initialize Homepage ----------
    function init() {
      setupMovieCards()
      setupTrailerPreviews()
      setupSearchForm()
      setupNewsletterForm()

      // Add fade-in animation to hero content
      const heroContent = document.querySelector(".hero-content")
      if (heroContent) {
        heroContent.classList.add("fade-in")
        setTimeout(() => {
          heroContent.classList.add("visible")
        }, 100)
      }
    }

    // Call the initialization function
    init()
  } catch (error) {
    console.error("Error in home page initialization:", error)
  }
})


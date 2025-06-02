/**
 * JavaScript file for the SeatReserve.lk movies page*/

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Add click event to all book buttons
  const bookButtons = document.querySelectorAll(".book-btn")

  bookButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Prevent default if it's a link
      if (this.tagName.toLowerCase() === "a") {
        e.preventDefault()
      }

      // Get movie ID from href or data attribute
      let movieId
      if (this.href) {
        const url = new URL(this.href, window.location.origin)
        movieId = url.searchParams.get("id")
      } else if (this.dataset.movieId) {
        movieId = this.dataset.movieId
      }

      if (!movieId) {
        console.error("No movie ID found for booking button")
        return
      }

      // Navigate to movie details page
      window.location.href = `movie-details.html?id=${movieId}`

      // Log the navigation for debugging
      console.log("Navigating to movie details:", { movieId })
    })
  })
  // ---------- Tab Switching ----------
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  // Add click event to all tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the tab to show
      const tabToShow = this.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show the corresponding tab content
      document.getElementById(`${tabToShow}-content`).classList.add("active")
    })
  })

  // ---------- Movie Filtering and Search ----------
  const filterGenre = document.getElementById("filter-genre")
  const filterRating = document.getElementById("filter-rating")
  const filterLanguage = document.getElementById("filter-language")
  const searchInput = document.getElementById("search-movies")

  // Function to filter movies based on current filter values
  function filterMovies() {
    const genreValue = filterGenre?.value.toLowerCase() || ""
    const ratingValue = filterRating?.value || ""
    const languageValue = filterLanguage?.value.toLowerCase() || ""
    const searchValue = searchInput?.value.toLowerCase() || ""

    // Track if we have any visible movies
    let visibleMovies = 0

    // Get the active tab content
    const activeTabContent = document.querySelector(".tab-content.active")
    if (!activeTabContent) return

    // Get movies only from the active tab
    const movieCards = activeTabContent.querySelectorAll(".movie-card")

    // Loop through all movie cards in the active tab
    movieCards.forEach((card) => {
      // Get movie details for filtering
      const movieTitle = card.querySelector("h3").textContent.toLowerCase()
      const movieGenre = card.querySelector(".movie-genre")?.textContent.toLowerCase() || ""
      const movieRating = card.querySelector(".movie-rating")?.textContent || ""

      // Check if movie matches all filter criteria
      const matchesGenre = !genreValue || movieGenre.includes(genreValue)
      const matchesRating = !ratingValue || movieRating === ratingValue
      const matchesLanguage = !languageValue || true // Simplified for demo
      const matchesSearch = !searchValue || movieTitle.includes(searchValue)

      // Show or hide the card based on filter matches
      if (matchesGenre && matchesRating && matchesLanguage && matchesSearch) {
        card.style.display = "block"
        visibleMovies++
      } else {
        card.style.display = "none"
      }
    })

    // Show a message if no movies match the filters
    let noResultsMessage = activeTabContent.querySelector(".no-results-message")

    if (visibleMovies === 0) {
      if (!noResultsMessage) {
        noResultsMessage = document.createElement("div")
        noResultsMessage.className = "no-results-message"
        noResultsMessage.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <i class="fa-solid fa-film" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>No movies found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button class="btn btn-secondary reset-filters" style="margin-top: 1rem;">Reset Filters</button>
          </div>
        `
        activeTabContent.appendChild(noResultsMessage)

        // Add event listener to reset button
        noResultsMessage.querySelector(".reset-filters").addEventListener("click", resetFilters)
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove()
    }
  }

  // Function to reset all filters
  function resetFilters() {
    if (filterGenre) filterGenre.value = ""
    if (filterRating) filterRating.value = ""
    if (filterLanguage) filterLanguage.value = ""
    if (searchInput) searchInput.value = ""

    filterMovies()
  }

  // Add event listeners to all filter inputs
  if (filterGenre) filterGenre.addEventListener("change", filterMovies)
  if (filterRating) filterRating.addEventListener("change", filterMovies)
  if (filterLanguage) filterLanguage.addEventListener("change", filterMovies)
  if (searchInput) searchInput.addEventListener("input", filterMovies)

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

  // ---------- URL Parameter Handling ----------

  // Check if there are search parameters in the URL
  function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search)
    const movieParam = urlParams.get("movie")
    const locationParam = urlParams.get("location")
    const dateParam = urlParams.get("date")

    // If we have search parameters, apply them to the filters
    if (movieParam && searchInput) {
      searchInput.value = movieParam
    }

    // In a real app, you would handle location and date parameters as well
    console.log("URL Parameters:", { movieParam, locationParam, dateParam })

    // Apply filters based on URL parameters
    if (movieParam || locationParam || dateParam) {
      filterMovies()
    }
  }

  // for mobile menu
  if (!document.getElementById("movies-styles")) {
    const style = document.createElement("style")
    style.id = "movies-styles"
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

  // Call the function to handle URL parameters
  handleURLParams()
})


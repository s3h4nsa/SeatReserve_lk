/**
 * JavaScript file for the SeatReserve.lk movie details pagr*/

// Replace the hardcoded movie data with references to the shared data module

// ---------- Declare variables ----------
const moviesData = {} // Initialize moviesData
const theaters = [] // Initialize theaters
const similarMovies = [] // Initialize similarMovies

// ---------- Get Movie ID from URL ----------
const urlParams = new URLSearchParams(window.location.search)
const movieId = urlParams.get("id")

// If no movie ID is provided, redirect to movies page
if (!movieId) {
  window.location.href = "movies.html"
}

// ---------- Load Movie Details ----------
function loadMovieDetails() {
  try {
    // Get the movie data from the shared data module if available
    let movie
    if (window.SeatReserveData && window.SeatReserveData.getMovie) {
      movie = window.SeatReserveData.getMovie(movieId)
    } else {
      // Fallback to local data if shared module isn't available
      movie = moviesData[movieId]
    }

    // If movie doesn't exist, show error and provide fallback
    if (!movie) {
      console.error("Movie not found:", movieId)

      // Instead of redirecting, show error message and fallback content
      const movieBanner = document.getElementById("movie-banner")
      if (movieBanner) {
        movieBanner.innerHTML = `
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <div class="container">
              <h1>Movie information unavailable</h1>
              <p>Sorry, we couldn't load the details for this movie. Please try another selection.</p>
              <a href="movies.html" class="action-btn primary">Browse Movies</a>
            </div>
          </div>
        `
      }

      // Add fallback movie data
      movie = {
        title: "Movie Not Found",
        image: "/placeholder.svg?height=375&width=250",
        banner: "/placeholder.svg?height=500&width=1000",
        rating: "N/A",
        duration: "N/A",
        genre: "N/A",
        synopsis: "Movie information is not available at this time.",
        director: "N/A",
        releaseDate: "N/A",
        cast: ["N/A"],
        trailerUrl: "",
      }
    }

    // Set page title
    document.title = `${movie.title} - SeatReserve.lk`

    // Create and populate the movie banner
    const bannerHTML = `
      <div class="banner-overlay"></div>
      <img class="banner-image" src="${movie.banner || "/placeholder.svg?height=500&width=1000"}" alt="${movie.title} banner" loading="lazy" onerror="this.src='${movie.image || "/placeholder.svg?height=500&width=1000"}'; this.onerror=null;">
      <div class="banner-content">
        <div class="container">
          <div class="movie-poster-container">
            <div class="movie-poster">
              <img src="${movie.image || "/placeholder.svg?height=375&width=250"}" alt="${movie.title} poster" onerror="this.src='/placeholder.svg?height=375&width=250'; this.onerror=null;">
            </div>
          </div>
          <div class="movie-info">
            <div class="movie-badges">
              <span class="badge">${movie.rating || "Not Rated"}</span>
              <span class="badge outline">${movie.duration || "N/A"}</span>
              <span class="badge outline">${movie.genre || "N/A"}</span>
            </div>
            <h1 class="movie-title">${movie.title}</h1>
            <div class="movie-rating">
              <i class="fa-solid fa-star"></i>
              <span class="rating-score">${movie.imdbRating || "N/A"}/10</span>
              <span class="rating-source">IMDb</span>
            </div>
            <div class="movie-actions">
              <button class="action-btn primary" id="book-tickets-btn">
                <i class="fa-solid fa-calendar"></i>
                Book Tickets
              </button>
              <button class="action-btn secondary">
                <i class="fa-solid fa-heart"></i>
                Add to Watchlist
              </button>
              <button class="action-btn secondary">
                <i class="fa-solid fa-share"></i>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    // Insert the banner HTML
    const movieBanner = document.getElementById("movie-banner")
    if (movieBanner) {
      movieBanner.innerHTML = bannerHTML
    }

    // Populate movie details with fallbacks for missing data
    const movieSynopsis = document.getElementById("movie-synopsis")
    const movieDirector = document.getElementById("movie-director")
    const movieRelease = document.getElementById("movie-release")
    const movieCast = document.getElementById("movie-cast")
    const movieGenre = document.getElementById("movie-genre")
    const trailerThumbnail = document.getElementById("trailer-thumbnail")

    if (movieSynopsis) movieSynopsis.textContent = movie.synopsis || "Synopsis not available"
    if (movieDirector) movieDirector.textContent = movie.director || "Director information not available"
    if (movieRelease) movieRelease.textContent = movie.releaseDate || "Release date not available"
    if (movieCast) movieCast.textContent = movie.cast ? movie.cast.join(", ") : "Cast information not available"
    if (movieGenre) movieGenre.textContent = movie.genre || "Genre information not available"

    // Set trailer thumbnail with fallback
    if (trailerThumbnail) {
      trailerThumbnail.src = movie.banner || movie.image || "/placeholder.svg?height=500&width=1000"
      trailerThumbnail.alt = `${movie.title} trailer thumbnail`
      trailerThumbnail.onerror = function () {
        this.src = movie.image || "/placeholder.svg?height=375&width=250"
        this.onerror = null
      }
    }

    // Add event listener to book tickets button
    const bookTicketsBtn = document.getElementById("book-tickets-btn")
    if (bookTicketsBtn) {
      bookTicketsBtn.addEventListener("click", () => {
        // Scroll to showtimes section
        const showtimesCard = document.querySelector(".showtimes-card")
        if (showtimesCard) {
          showtimesCard.scrollIntoView({ behavior: "smooth" })
        }
      })
    }
  } catch (error) {
    console.error("Error loading movie details:", error)
    // Show a user-friendly error message
    const movieBanner = document.getElementById("movie-banner")
    if (movieBanner) {
      movieBanner.innerHTML = `
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <div class="container">
            <h1>Movie information unavailable</h1>
            <p>Sorry, we couldn't load the details for this movie. Please try again later.</p>
            <a href="movies.html" class="action-btn primary">Return to Movies</a>
          </div>
        </div>
      `
    }
  }
}

// ---------- Load Theaters and Showtimes ----------
function loadTheaters() {
  const theaterList = document.getElementById("theater-list")
  if (!theaterList) return

  // Get theaters from shared data module if available
  let theaterData
  if (window.SeatReserveData && window.SeatReserveData.getAllTheaters) {
    theaterData = window.SeatReserveData.getAllTheaters()
  } else {
    // Fallback to local data if shared module isn't available
    theaterData = theaters
  }

  const theaterListHTML = theaterData
    .map((theater, index) => {
      // Create showtime buttons
      const showtimeButtons = theater.showtimes
        .map(
          (time) => `<button class="showtime-btn" data-time="${time}" data-theater="${theater.name}">${time}</button>`,
        )
        .join("")

      // Create theater item
      return `
        <div class="theater-item">
          <h3 class="theater-name">${theater.name}</h3>
          <div class="theater-address">
            <i class="fa-solid fa-location-dot"></i>
            <span>${theater.address}</span>
          </div>
          <div class="theater-distance">${theater.distance} away</div>
          <div class="showtime-list">
            ${showtimeButtons}
          </div>
          ${index < theaterData.length - 1 ? '<div class="separator"></div>' : ""}
        </div>
      `
    })
    .join("")

  // Insert the theater list HTML
  theaterList.innerHTML = theaterListHTML

  // Add event listeners to showtime buttons
  const showtimeButtons = document.querySelectorAll(".showtime-btn")
  showtimeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const time = this.getAttribute("data-time")
      const theater = this.getAttribute("data-theater")

      // Redirect to seat selection page with all necessary parameters
      window.location.href = `seat-selection.html?id=${movieId}&theater=${encodeURIComponent(theater)}&time=${encodeURIComponent(time)}&date=${encodeURIComponent(new Date().toISOString().split("T")[0])}`
    })

    // Add keyboard event
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })

    // Add proper ARIA attributes
    button.setAttribute("role", "button")
    button.setAttribute("aria-label", `Book for ${button.textContent} at ${button.getAttribute("data-theater")}`)
  })
}

// ---------- Load Similar Movies ----------
function loadSimilarMovies() {
  const similarMoviesGrid = document.querySelector(".similar-movies .movie-grid")
  if (!similarMoviesGrid) return

  // Filter out the current movie from similar movies
  const filteredSimilarMovies = similarMovies.filter((movie) => movie.id !== movieId)

  // Create HTML for similar movies
  const similarMoviesHTML = filteredSimilarMovies
    .slice(0, 4)
    .map(
      (movie) => `
             <div class="movie-card">
                 <div class="movie-poster">
                     <img src="${movie.image}" alt="${movie.title}" onerror="this.src='/placeholder.svg?height=375&width=250'; this.onerror=null;">
                 </div>
                 <div class="movie-info">
                     <h3>${movie.title}</h3>
                     <div class="movie-duration">
                         <i class="fa-regular fa-clock"></i>
                         <span>${movie.duration}</span>
                     </div>
                     <a href="movie-details.html?id=${movie.id}" class="book-btn">
                         <i class="fa-solid fa-film"></i>
                         View Details
                     </a>
                 </div>
             </div>
         `,
    )
    .join("")

  // Insert the similar movies HTML
  similarMoviesGrid.innerHTML = similarMoviesHTML
}

// ---------- Handle Date Selection ----------
function setupDateSelection() {
  const dateButtons = document.querySelectorAll(".date-btn")

  dateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      dateButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // In a real app, this would reload showtimes for the selected date
      console.log("Selected date:", this.textContent)
    })
  })
}

// ---------- Handle Trailer Playback ----------
function setupTrailerPlayback() {
  const playTrailerBtn = document.querySelector(".play-trailer-btn")
  if (!playTrailerBtn) return

  playTrailerBtn.addEventListener("click", () => {
    const movie = moviesData[movieId]
    if (!movie || !movie.trailerUrl) return

    // Create modal for trailer playback
    const trailerModal = document.createElement("div")
    trailerModal.className = "trailer-modal"

    // Convert YouTube watch URL to embed URL if needed
    let embedUrl = movie.trailerUrl
    if (embedUrl.includes("watch?v=")) {
      embedUrl = embedUrl.replace("watch?v=", "embed/")
    }

    trailerModal.innerHTML = `
         <div class="trailer-modal-content">
           <span class="close-trailer">&times;</span>
           <iframe width="100%" height="100%" src="${embedUrl}" 
             frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div>
       `

    // Add modal to body
    document.body.appendChild(trailerModal)

    // Add close functionality
    const closeTrailer = document.querySelector(".close-trailer")
    closeTrailer.addEventListener("click", () => {
      document.body.removeChild(trailerModal)
    })

    // Also close when clicking outside the content
    trailerModal.addEventListener("click", (e) => {
      if (e.target === trailerModal) {
        document.body.removeChild(trailerModal)
      }
    })
  })
}

// ---------- Initialize Page ----------
function init() {
  loadMovieDetails()
  loadTheaters()
  loadSimilarMovies()
  setupDateSelection()
  setupTrailerPlayback()

  // Use the shared mobile menu function
  if (window.SeatReserve && window.SeatReserve.setupMobileMenu) {
    window.SeatReserve.setupMobileMenu()
  } else {
    console.warn("SeatReserve utilities not available, falling back to basic setup")
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show")
      })
    }
  }
}

// Add styles for mobile menu and trailer modal if they don't exist
if (!document.getElementById("movie-details-styles")) {
  const style = document.createElement("style")
  style.id = "movie-details-styles"
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
     .trailer-modal {
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background-color: rgba(0, 0, 0, 0.9);
       display: flex;
       align-items: center;
       justify-content: center;
       z-index: 1000;
     }
     .trailer-modal-content {
       position: relative;
       width: 80%;
       height: 80%;
       max-width: 900px;
     }
     .close-trailer {
       position: absolute;
       top: -40px;
       right: 0;
       color: white;
       font-size: 30px;
       cursor: pointer;
     }
   `
  document.head.appendChild(style)
}

// Call the initialization function
document.addEventListener("DOMContentLoaded", init)


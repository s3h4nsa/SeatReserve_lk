/**
 * JavaScript file for the SeatReserve.lk movie details page
 * This file handles:
 * - Loading movie details based on URL parameters
 * - Displaying showtimes and theaters
 * - Handling date selection for showtimes
 * - Playing movie trailer
 * - Loading similar movies
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Get Movie ID from URL ----------
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get("id")

  // If no movie ID is provided, redirect to movies page
  if (!movieId) {
    window.location.href = "movies.html"
    return
  }

  // ---------- Movie Data (In a real app, this would come from a server) ----------
  const moviesData = {
    1: {
      title: "Rani",
      director: "Asoka Handagama",
      cast: [
        "Swarna Mallawarachchi",
        "Sanath Gunathilake",
        "Rehan Amaratunga",
        "Sajitha Anthony",
        "Bimal Jayakody",
        "Ashan Dias",
        "Mayura Kanchana",
        "Rithika Kodithuvakku",
      ],
      rating: "Not Rated",
      duration: "133 min",
      genre: "Biographical Drama Thriller",
      releaseDate: "January 30, 2025",
      image: "assets/posters/Rani.jpg",
      banner: "assets/banners/Rani-banner.jpg",
      synopsis:
        "Rani is a biographical drama based on the true story of Dr. Manorani Saravanamuttu's relentless pursuit of justice after the abduction and murder of her son, journalist Richard de Zoysa, in 1990. Directed by Asoka Handagama, the film portrays a mother's unwavering courage against political oppression.",
      trailerUrl: "https://www.youtube.com/watch?v=A5pTGe2Z9mI",
      imdbRating: "7.5",
    },
    2: {
      title: "Ape Principal",
      director: "Chris Antony",
      cast: ["Dilhani Ekanayake", "Roger Seneviratne", "Jagath Chamila", "Shyam Fernando", "Samantha Kumara Gamage"],
      rating: "Not Rated",
      duration: "106 min",
      genre: "Drama",
      releaseDate: "December 14, 2023",
      image: "assets/posters/Ape-Principal",
      banner: "assets/banners/Ape-Principal.jpg",
      synopsis:
        "A new female principal's efforts to combat drug abuse and corruption within a struggling village school, Mihinpura Vidyalaya, with the help of villagers and students, facing opposition from drug lords and politicians.",
      trailerUrl: "https://www.youtube.com/watch?v=wYwIlq3t3gw",
      imdbRating: "6.8",
    },
    3: {
      title: "Kasi Wasi",
      director: "Jayaprakash Sivagurunadan",
      cast: ["Giriraj Kaushalya", "Sarath Kothalawala", "Rodney Warnakula", "Gihan Fernando", "Priyantha Seneviratne"],
      rating: "Not Rated",
      duration: "115 min",
      genre: "Comedy",
      releaseDate: "2025",
      image: "assets/posters/Kasi-wasi.jpg",
      banner: "assets/banners/Kasi-Wasi.jpg",
      synopsis:
        "Mr. Amarabandu is a funeral director who manages his business with the help of three assistants. However, these assistants frequently create challenges for the business. Meanwhile, Vishwakarma joins Mr.            Amarabandu's team with the aim of improving and developing the funeral service operations.",
      trailerUrl: "https://www.youtube.com/watch?v=ZDGHSLAtPg0",
      imdbRating: "4.5",
    },
    4: {
      title: "Oppenheimer",
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
      rating: "R",
      duration: "180 min",
      genre: "Biography/Drama",
      releaseDate: "July 21, 2023",
      image: "assets/posters/Oppenheimer.jpg",
      banner: "assets/banners/oppenheimer-banner.jpg",
      synopsis:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, exploring the moral complexities and consequences of his work.",
      trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
      imdbRating: "8.9",
    },
    5: {
      title: "Dune: Part II",
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
      rating: "Not Rated",
      duration: "Not available",
      genre: "Adventure/Drama/Sci-Fi",
      releaseDate: "November 20, 2025",
      image: "assets/posters/Part-Two.jpg",
      banner: "assets/banners/dune-two-banner.jpg", 
      synopsis:
        "The sequel to the 2021 film 'Dune,' continuing the adaptation of Frank Herbert's science fiction novel, focusing on Paul Atreides' journey among the Fremen and his rise against the galactic empire.",
      trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
      imdbRating: "8.5",
    },
    6: {
      title: "Godzilla x Kong: The New Empire",
      director: "Adam Wingard",
      cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"],
      rating: "PG-13",
      duration: "115 min",
      genre: "Action/Sci-Fi",
      releaseDate: "March 15, 2025",
      image: "assets/posters/godzilla_x_kong.jpg",
      banner: "assets/banners/godzilla-x-kong-banner.jpg", // Assumed consistent format
      synopsis:
        "The epic next chapter in the cinematic Monsterverse pits the almighty Kong and the fearsome Godzilla against a colossal undiscovered threat hidden within our world, challenging their very existence—and our own.",
      trailerUrl: "https://www.youtube.com/embed/vi2055259673", // Fixed trailer URL format
      imdbRating: "7.7",
    },
  }

  // Theater data (In a real app, this would come from a server)
  const theaters = [
    {
      name: "SCOPE CINEMAS MULTIPLEX - Havelock City Mall",
      address: "Havelock City Mall 324 Havelock Road, Colombo 05",
      distance: "2.5 miles",
      showtimes: ["10:30 AM", "1:15 PM", "4:00 PM", "7:30 PM", "10:45 PM"],
    },
    {
      name: "SCOPE CINEMAS MULTIPLEX - Colombo City Centre",
      address: "137 Sir James Pieris Mawatha, Colombo 2",
      distance: "5.1 miles",
      showtimes: ["11:00 AM", "2:00 PM", "5:15 PM", "8:30 PM", "11:15 PM"],
    },
    {
      name: "LIBERTY BY SCOPE CINEMAS - Colpetty",
      address: "No.35 Srimath Anagarika Dharmapala Mawatha, Colombo 03",
      distance: "3.8 miles",
      showtimes: ["12:30 PM", "3:45 PM", "6:30 PM", "9:15 PM"],
    },
  ]

  // Similar movies (In a real app, this would be dynamically generated)
  const similarMovies = [
    {
      id: "2",
      title: "Ape Principal",
      duration: "106 min",
      image: "assets/posters/Ape-Principal.png",
    },
    {
      id: "3",
      title: "Kaasi Waasi",
      duration: "115 min",
      image: "assets/posters/Kasi-wasi.jpg",
    },
    {
      id: "4",
      title: "Oppenheimer",
      duration: "180 min",
      image: "assets/posters/Oppenheimer.jpg", // Consistent with the path in moviesData
    },
    {
      id: "5",
      title: "Dune: Part II",
      duration: "142 min",
      image: "assets/posters/Part Two.jpg",
    },
  ]

  // ---------- Load Movie Details ----------
  function loadMovieDetails() {
    // Get the movie data
    const movie = moviesData[movieId]

    // If movie doesn't exist, redirect to movies page
    if (!movie) {
      window.location.href = "movies.html"
      return
    }

    // Set page title
    document.title = `${movie.title} - SeatReserve.lk`

    // Create and populate the movie banner
    const bannerHTML = `
             <div class="banner-overlay"></div>
             <img class="banner-image" src="${movie.banner}" alt="${movie.title} banner" onerror="this.src='assets/image/${movie.image}'; this.onerror=null;">
             <div class="banner-content">
                 <div class="container">
                     <div class="movie-poster-container">
                         <div class="movie-poster">
                             <img src="${movie.image}" alt="${movie.title} poster" onerror="this.src='/placeholder.svg?height=375&width=250'; this.onerror=null;">
                         </div>
                     </div>
                     <div class="movie-info">
                         <div class="movie-badges">
                             <span class="badge">${movie.rating}</span>
                             <span class="badge outline">${movie.duration}</span>
                             <span class="badge outline">${movie.genre}</span>
                         </div>
                         <h1 class="movie-title">${movie.title}</h1>
                         <div class="movie-rating">
                             <i class="fa-solid fa-star"></i>
                             <span class="rating-score">${movie.imdbRating}/10</span>
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

    // Populate movie details
    const movieSynopsis = document.getElementById("movie-synopsis")
    const movieDirector = document.getElementById("movie-director")
    const movieRelease = document.getElementById("movie-release")
    const movieCast = document.getElementById("movie-cast")
    const movieGenre = document.getElementById("movie-genre")
    const trailerThumbnail = document.getElementById("trailer-thumbnail")

    if (movieSynopsis) movieSynopsis.textContent = movie.synopsis
    if (movieDirector) movieDirector.textContent = movie.director
    if (movieRelease) movieRelease.textContent = movie.releaseDate
    if (movieCast) movieCast.textContent = movie.cast.join(", ")
    if (movieGenre) movieGenre.textContent = movie.genre

    // Set trailer thumbnail
    if (trailerThumbnail) {
      trailerThumbnail.src = movie.banner
      trailerThumbnail.onerror = function () {
        this.src = movie.image
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
  }

  // ---------- Load Theaters and Showtimes ----------
  function loadTheaters() {
    const theaterList = document.getElementById("theater-list")
    if (!theaterList) return

    const theaterListHTML = theaters
      .map((theater, index) => {
        // Create showtime buttons
        const showtimeButtons = theater.showtimes
          .map(
            (time) =>
              `<button class="showtime-btn" data-time="${time}" data-theater="${theater.name}">${time}</button>`,
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
                     ${index < theaters.length - 1 ? '<div class="separator"></div>' : ""}
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

        // Log the navigation for debugging
        console.log("Navigating to seat selection with:", {
          movieId,
          theater,
          time,
          date: new Date().toISOString().split("T")[0],
        })
      })
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

  // ---------- Mobile Menu Toggle ----------
  function setupMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")

    // Check if mobile menu button exists
    if (menuToggle && navLinks) {
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

  // ---------- Initialize Page ----------
  function init() {
    loadMovieDetails()
    loadTheaters()
    loadSimilarMovies()
    setupDateSelection()
    setupTrailerPlayback()
    setupMobileMenu()
  }

  // Call the initialization function
  init()
})


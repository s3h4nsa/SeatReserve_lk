document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const contactSection = document.getElementById("contact-info-section")
  const paymentSection = document.getElementById("payment-section")
  const confirmationSection = document.getElementById("confirmation-section")
  const continueToPaymentBtn = document.getElementById("continue-to-payment")
  const backToContactBtn = document.getElementById("back-to-contact")
  const completePurchaseBtn = document.getElementById("complete-purchase")
  const applyPromoBtn = document.getElementById("apply-promo")
  const promoInput = document.getElementById("promo-input")

  // Progress Steps
  const progressSteps = document.querySelectorAll(".progress-step")
  const progressLines = document.querySelectorAll(".progress-line")

  // Form Elements
  const firstNameInput = document.getElementById("first-name")
  const lastNameInput = document.getElementById("last-name")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const cardNumberInput = document.getElementById("card-number")
  const expiryDateInput = document.getElementById("expiry-date")
  const cvvInput = document.getElementById("cvv")
  const cardNameInput = document.getElementById("card-name")

  // Error Elements
  const firstNameError = document.getElementById("first-name-error")
  const lastNameError = document.getElementById("last-name-error")
  const emailError = document.getElementById("email-error")
  const phoneError = document.getElementById("phone-error")
  const cardNumberError = document.getElementById("card-number-error")
  const expiryDateError = document.getElementById("expiry-date-error")
  const cvvError = document.getElementById("cvv-error")
  const cardNameError = document.getElementById("card-name-error")

  // Order Summary Elements
  const movieTitleElement = document.getElementById("movie-title")
  const movieDateElement = document.getElementById("movie-date")
  const movieTheaterElement = document.getElementById("movie-theater")
  const moviePosterElement = document.getElementById("movie-poster-img")
  const selectedSeatsElement = document.getElementById("selected-seats")
  const totalElement = document.getElementById("total")
  const confirmationEmailElement = document.getElementById("confirmation-email")
  const bookingReferenceElement = document.getElementById("booking-reference")
  const ticketDetailsElement = document.querySelector(".ticket-details")

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const authButtons = document.querySelector(".auth-buttons")

  // Movie data (using the same structure as your site)
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
      image: "assets/image/Rani.jpg",
      banner: "assets/banners/Rani.jpg",
      synopsis:
        "Rani is a biographical drama based on the true story of Dr. Manorani Saravanamuttu's relentless pursuit of justice after the abduction and murder of her son, journalist Richard de Zoysa, in 1990. Directed by Asoka Handagama, the film portrays a mother's unwavering courage against political oppression.",
      trailerUrl: "https://www.youtube.com/watch?v=A5pTGe2Z9mI",
      imdbRating: "7.5",
      adultPrice: 600,
      childPrice: 400,
    },
    2: {
      title: "Ape Principal",
      director: "Chris Antony",
      cast: ["Dilhani Ekanayake", "Roger Seneviratne", "Jagath Chamila", "Shyam Fernando", "Samantha Kumara Gamage"],
      rating: "Not Rated",
      duration: "106 min",
      genre: "Drama",
      releaseDate: "December 14, 2023",
      image: "assets/image/Ape-Principal.png",
      banner: "assets/banners/Ape-Principal.jpg",
      synopsis:
        "A new female principal's efforts to combat drug abuse and corruption within a struggling village school, Mihinpura Vidyalaya, with the help of villagers and students, facing opposition from drug lords and politicians.",
      trailerUrl: "https://www.youtube.com/watch?v=wYwIlq3t3gw",
      imdbRating: "6.8",
      adultPrice: 650,
      childPrice: 450,
    },
    3: {
      title: "Kaasi Waasi",
      director: "Jayaprakash Sivagurunadan",
      cast: ["Giriraj Kaushalya", "Sarath Kothalawala", "Rodney Warnakula", "Gihan Fernando", "Priyantha Seneviratne"],
      rating: "Not Rated",
      duration: "115 min",
      genre: "Comedy",
      releaseDate: "2025",
      image: "assets/image/Kasi-wasi.jpg",
      banner: "Kasi-Wasi.jpg",
      synopsis:
        "Mr. Amarabandu is a funeral director who manages his business with the help of three assistants. However, these assistants frequently create challenges for the business. Meanwhile, Vishwakarma joins Mr. Amarabandu's team with the aim of improving and developing the funeral service operations.",
      trailerUrl: "#",
      imdbRating: "4.5",
      adultPrice: 550,
      childPrice: 350,
    },
    4: {
      title: "Oppenheimer",
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
      rating: "R",
      duration: "180 min",
      genre: "Biography/Drama",
      releaseDate: "July 21, 2023",
      image: "assets/image/Oppenheimer.jpg",
      banner: "images/banner4.jpg",
      synopsis:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, exploring the moral complexities and consequences of his work.",
      trailerUrl: "#",
      imdbRating: "8.9",
      adultPrice: 700,
      childPrice: 500,
    },
    5: {
      title: "Dune: Part II",
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
      rating: "Not Rated",
      duration: "Not available",
      genre: "Adventure/Drama/Sci-Fi",
      releaseDate: "November 20, 2025",
      image: "assets/poster/Dune-part2.jpg",
      banner: "images/banner5.jpg",
      synopsis:
        "The sequel to the 2021 film 'Dune,' continuing the adaptation of Frank Herbert's science fiction novel, focusing on Paul Atreides' journey among the Fremen and his rise against the galactic empire.",
      trailerUrl: "#",
      imdbRating: "8.5",
      adultPrice: 700,
      childPrice: 500,
    },
    6: {
      title: "Godzilla x Kong: The New Empire",
      director: "Adam Wingard",
      cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"],
      rating: "PG-13",
      duration: "115 min",
      genre: "Action/Sci-Fi",
      releaseDate: "March 15, 2025",
      image: "assets/image/godzilla_x_kong.jpg",
      banner: "images/banner6.jpg",
      synopsis:
        "The epic next chapter in the cinematic Monsterverse pits the almighty Kong and the fearsome Godzilla against a colossal undiscovered threat hidden within our world, challenging their very existence—and our own.",
      trailerUrl: "https://www.imdb.com/video/vi2055259673/?playlistId=tt14539740&ref_=tt_ov_pr_ov_vi",
      imdbRating: "7.7",
      adultPrice: 750,
      childPrice: 550,
    },
  }

  // Theater data (using the same structure as your site)
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

  // Current booking data
  const currentBooking = {
    movie: null,
    theater: null,
    showtime: null,
    adultTickets: 1,
    childTickets: 0,
    seniorTickets: 0,
    selectedSeats: [],
    bookingFee: 100,
    promoApplied: false,
    promoDiscount: 0,
    total: 0,
  }

  // Check if there's movie data in URL parameters
  function loadSelectedMovie() {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    const movieId = urlParams.get("id")
    const theater = urlParams.get("theater")
    const time = urlParams.get("time")
    const adultTickets = urlParams.get("adults") || 2
    const childTickets = urlParams.get("children") || 1
    const seniorTickets = urlParams.get("seniors") || 0
    const selectedSeats = urlParams.get("seats") ? urlParams.get("seats").split(",") : []

    // If we have movie data in the URL
    if (movieId && moviesData[movieId]) {
      currentBooking.movie = moviesData[movieId]
      currentBooking.adultTickets = Number.parseInt(adultTickets)
      currentBooking.childTickets = Number.parseInt(childTickets)
      currentBooking.seniorTickets = Number.parseInt(seniorTickets)
      currentBooking.selectedSeats = selectedSeats

      // If we have theater and time data
      if (theater && time) {
        currentBooking.theater = theater
        currentBooking.showtime = time
      } else {
        // Default to first theater and showtime
        currentBooking.theater = theaters[0].name
        currentBooking.showtime = theaters[0].showtimes[0]
      }

      updateOrderSummary()

      // Log the booking details to verify they're loaded correctly
      console.log("Booking details:", {
        movie: currentBooking.movie.title,
        theater: currentBooking.theater,
        showtime: currentBooking.showtime,
        adultTickets: currentBooking.adultTickets,
        childTickets: currentBooking.childTickets,
        seniorTickets: currentBooking.seniorTickets,
        selectedSeats: currentBooking.selectedSeats,
      })
    } else {
      // Default to the first movie if nothing is selected
      const firstMovieId = Object.keys(moviesData)[0]
      currentBooking.movie = moviesData[firstMovieId]
      currentBooking.theater = theaters[0].name
      currentBooking.showtime = theaters[0].showtimes[0]
      updateOrderSummary()
    }
  }

  // Initialize the page
  function init() {
    // Load selected movie data
    loadSelectedMovie()

    // Set up event listeners
    continueToPaymentBtn.addEventListener("click", goToPaymentStep)
    backToContactBtn.addEventListener("click", goToContactStep)
    completePurchaseBtn.addEventListener("click", completeCheckout)
    applyPromoBtn.addEventListener("click", applyPromoCode)

    // Format inputs
    cardNumberInput.addEventListener("input", formatCardNumber)
    expiryDateInput.addEventListener("input", formatExpiryDate)
    cvvInput.addEventListener("input", validateNumericInput)
    phoneInput.addEventListener("input", formatPhoneNumber)

    // Mobile menu toggle
    menuToggle.addEventListener("click", toggleMobileMenu)

    // Add movie selection UI (for demo purposes)
    addMovieSelectionUI()
  }

  // Add movie selection UI for demo purposes
  function addMovieSelectionUI() {
    const checkoutHeader = document.querySelector(".checkout-header")

    // Create movie selection container
    const movieSelectionContainer = document.createElement("div")
    movieSelectionContainer.className = "movie-selection-container"
    movieSelectionContainer.innerHTML = `
    <div class="movie-selection">
      <h3>Your Selected Movie</h3>
      <div class="selected-movie">
        <div class="selected-movie-poster">
          <img src="${currentBooking.movie.image}" alt="${currentBooking.movie.title}">
        </div>
        <div class="selected-movie-info">
          <h4>${currentBooking.movie.title}</h4>
          <div class="movie-badges">
            <span class="badge">${currentBooking.movie.rating || "Not Rated"}</span>
            <span class="badge outline">${currentBooking.movie.duration || "N/A"}</span>
          </div>
          <div class="movie-genre">${currentBooking.movie.genre || "N/A"}</div>
        </div>
      </div>
      
      <div class="booking-details">
        <h3>Booking Details</h3>
        <div class="booking-info-card">
          <div class="booking-info-item">
            <div class="info-label">
              <i class="fa-solid fa-calendar"></i>
              <span>Date & Time:</span>
            </div>
            <div class="info-value">${currentBooking.showtime}</div>
          </div>
          <div class="booking-info-item">
            <div class="info-label">
              <i class="fa-solid fa-location-dot"></i>
              <span>Theater:</span>
            </div>
            <div class="info-value">${currentBooking.theater}</div>
          </div>
          <div class="booking-info-item">
            <div class="info-label">
              <i class="fa-solid fa-ticket"></i>
              <span>Selected Seats:</span>
            </div>
            <div class="info-value">${currentBooking.selectedSeats.join(", ") || "None"}</div>
          </div>
        </div>
      </div>
      
      <div class="ticket-selection">
        <h3>Select Tickets</h3>
        <div class="ticket-selection-row">
          <div class="ticket-type">
            <span>Adult</span>
            <span class="ticket-price">Rs. ${currentBooking.movie.adultPrice}</span>
          </div>
          <div class="ticket-quantity">
            <button class="quantity-btn minus" data-ticket-type="adult">-</button>
            <span class="quantity" id="adult-quantity">${currentBooking.adultTickets}</span>
            <button class="quantity-btn plus" data-ticket-type="adult">+</button>
          </div>
        </div>
        <div class="ticket-selection-row">
          <div class="ticket-type">
            <span>Child</span>
            <span class="ticket-price">Rs. ${currentBooking.movie.childPrice}</span>
          </div>
          <div class="ticket-quantity">
            <button class="quantity-btn minus" data-ticket-type="child">-</button>
            <span class="quantity" id="child-quantity">${currentBooking.childTickets}</span>
            <button class="quantity-btn plus" data-ticket-type="child">+</button>
          </div>
        </div>
      </div>
    </div>
  `

    // Insert after checkout header
    checkoutHeader.parentNode.insertBefore(movieSelectionContainer, checkoutHeader.nextSibling)

    // Add event listeners for ticket quantity
    const quantityBtns = document.querySelectorAll(".quantity-btn")
    quantityBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const type = this.dataset.ticketType
        const isPlus = this.classList.contains("plus")

        if (type === "adult") {
          if (isPlus) {
            currentBooking.adultTickets = Math.min(10, currentBooking.adultTickets + 1)
          } else {
            currentBooking.adultTickets = Math.max(0, currentBooking.adultTickets - 1)
          }
          document.getElementById("adult-quantity").textContent = currentBooking.adultTickets
        } else if (type === "child") {
          if (isPlus) {
            currentBooking.childTickets = Math.min(10, currentBooking.childTickets + 1)
          } else {
            currentBooking.childTickets = Math.max(0, currentBooking.childTickets - 1)
          }
          document.getElementById("child-quantity").textContent = currentBooking.childTickets
        }

        updateOrderSummary()
      })
    })
  }

  // Navigation Functions
  function goToPaymentStep() {
    if (validateContactForm()) {
      contactSection.classList.add("hidden")
      paymentSection.classList.remove("hidden")
      updateProgressSteps(1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function goToContactStep() {
    paymentSection.classList.add("hidden")
    contactSection.classList.remove("hidden")
    updateProgressSteps(0)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function completeCheckout() {
    if (validatePaymentForm()) {
      paymentSection.classList.add("hidden")
      confirmationSection.classList.remove("hidden")
      updateProgressSteps(2)

      // Set confirmation details
      confirmationEmailElement.textContent = emailInput.value
      generateBookingReference()

      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Update progress steps
  function updateProgressSteps(activeStep) {
    progressSteps.forEach((step, index) => {
      if (index < activeStep) {
        step.classList.add("completed")
        step.classList.remove("active")
      } else if (index === activeStep) {
        step.classList.add("active")
        step.classList.remove("completed")
      } else {
        step.classList.remove("active", "completed")
      }
    })

    progressLines.forEach((line, index) => {
      if (index < activeStep) {
        line.classList.add("active")
      } else {
        line.classList.remove("active")
      }
    })
  }

  // Form Validation
  function validateContactForm() {
    let isValid = true

    // Reset error messages
    firstNameError.textContent = ""
    lastNameError.textContent = ""
    emailError.textContent = ""
    phoneError.textContent = ""

    // Validate first name
    if (!firstNameInput.value.trim()) {
      firstNameError.textContent = "First name is required"
      isValid = false
    }

    // Validate last name
    if (!lastNameInput.value.trim()) {
      lastNameError.textContent = "Last name is required"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required"
      isValid = false
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address"
      isValid = false
    }

    // Validate phone
    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneInput.value.trim()) {
      phoneError.textContent = "Phone number is required"
      isValid = false
    } else if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ""))) {
      phoneError.textContent = "Please enter a valid phone number"
      isValid = false
    }

    return isValid
  }

  function validatePaymentForm() {
    let isValid = true

    // Reset error messages
    cardNumberError.textContent = ""
    expiryDateError.textContent = ""
    cvvError.textContent = ""
    cardNameError.textContent = ""

    // Validate card number
    const cardNumberValue = cardNumberInput.value.replace(/\s/g, "")
    if (!cardNumberValue) {
      cardNumberError.textContent = "Card number is required"
      isValid = false
    } else if (!/^\d{16}$/.test(cardNumberValue)) {
      cardNumberError.textContent = "Please enter a valid 16-digit card number"
      isValid = false
    }

    // Validate expiry date
    const expiryValue = expiryDateInput.value
    if (!expiryValue) {
      expiryDateError.textContent = "Expiry date is required"
      isValid = false
    } else if (!/^\d{2}\/\d{2}$/.test(expiryValue)) {
      expiryDateError.textContent = "Please use MM/YY format"
      isValid = false
    } else {
      const [month, year] = expiryValue.split("/")
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100
      const currentMonth = currentDate.getMonth() + 1

      if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
        expiryDateError.textContent = "Invalid month"
        isValid = false
      } else if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
      ) {
        expiryDateError.textContent = "Card has expired"
        isValid = false
      }
    }

    // Validate CVV
    if (!cvvInput.value) {
      cvvError.textContent = "CVV is required"
      isValid = false
    } else if (!/^\d{3,4}$/.test(cvvInput.value)) {
      cvvError.textContent = "CVV must be 3 or 4 digits"
      isValid = false
    }

    // Validate card name
    if (!cardNameInput.value.trim()) {
      cardNameError.textContent = "Name on card is required"
      isValid = false
    }

    return isValid
  }

  // Input Formatting Functions
  function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, "")
    value = value.substring(0, 16)

    // Add spaces after every 4 digits
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
    e.target.value = formattedValue
  }

  function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4)
    }

    e.target.value = value
  }

  function validateNumericInput(e) {
    e.target.value = e.target.value.replace(/\D/g, "")
  }

  function formatPhoneNumber(e) {
    let value = e.target.value.replace(/[^\d+]/g, "")

    // Keep the + sign if it's at the beginning
    if (e.target.value.startsWith("+") && !value.startsWith("+")) {
      value = "+" + value
    }

    e.target.value = value
  }

  // Order Summary Functions
  function updateOrderSummary() {
    if (!currentBooking.movie) return

    // Calculate total
    const adultTotal = currentBooking.adultTickets * currentBooking.movie.adultPrice
    const childTotal = currentBooking.childTickets * currentBooking.movie.childPrice
    const seniorTotal =
      currentBooking.seniorTickets * (currentBooking.movie.seniorPrice || currentBooking.movie.adultPrice * 0.8)
    const subtotal = adultTotal + childTotal + seniorTotal

    // Apply discount if promo code was used
    let discountAmount = 0
    if (currentBooking.promoApplied) {
      discountAmount = currentBooking.promoDiscount
    }

    // Calculate final total
    currentBooking.total = subtotal + currentBooking.bookingFee - discountAmount

    // Update UI elements
    movieTitleElement.textContent = currentBooking.movie.title
    movieDateElement.textContent = `${currentBooking.showtime}`
    movieTheaterElement.textContent = currentBooking.theater

    // Update selected seats display
    if (selectedSeatsElement && currentBooking.selectedSeats && currentBooking.selectedSeats.length > 0) {
      selectedSeatsElement.textContent = currentBooking.selectedSeats.join(", ")
    } else if (selectedSeatsElement) {
      selectedSeatsElement.textContent = "None selected"
    }

    // Set movie poster if available
    if (currentBooking.movie.image) {
      moviePosterElement.src = currentBooking.movie.image
      moviePosterElement.alt = currentBooking.movie.title
    }

    totalElement.textContent = `Rs. ${currentBooking.total.toFixed(2)}`

    // Update ticket details
    ticketDetailsElement.innerHTML = ""

    if (currentBooking.adultTickets > 0) {
      const adultTicketElement = document.createElement("div")
      adultTicketElement.className = "summary-item"
      adultTicketElement.innerHTML = `
      <span>Adult Tickets (${currentBooking.adultTickets})</span>
      <span>Rs. ${adultTotal.toFixed(2)}</span>
    `
      ticketDetailsElement.appendChild(adultTicketElement)
    }

    if (currentBooking.childTickets > 0) {
      const childTicketElement = document.createElement("div")
      childTicketElement.className = "summary-item"
      childTicketElement.innerHTML = `
      <span>Child Tickets (${currentBooking.childTickets})</span>
      <span>Rs. ${childTotal.toFixed(2)}</span>
    `
      ticketDetailsElement.appendChild(childTicketElement)
    }

    if (currentBooking.seniorTickets > 0) {
      const seniorTicketElement = document.createElement("div")
      seniorTicketElement.className = "summary-item"
      seniorTicketElement.innerHTML = `
      <span>Senior Tickets (${currentBooking.seniorTickets})</span>
      <span>Rs. ${seniorTotal.toFixed(2)}</span>
    `
      ticketDetailsElement.appendChild(seniorTicketElement)
    }

    // Add booking fee
    const bookingFeeElement = document.createElement("div")
    bookingFeeElement.className = "summary-item"
    bookingFeeElement.innerHTML = `
    <span>Booking Fee</span>
    <span>Rs. ${currentBooking.bookingFee.toFixed(2)}</span>
  `
    ticketDetailsElement.appendChild(bookingFeeElement)

    // Add discount if applied
    if (currentBooking.promoApplied && currentBooking.promoDiscount > 0) {
      const discountElement = document.createElement("div")
      discountElement.className = "summary-item"
      discountElement.innerHTML = `
      <span>Discount (10%)</span>
      <span>-Rs. ${currentBooking.promoDiscount.toFixed(2)}</span>
    `
      ticketDetailsElement.appendChild(discountElement)
    }
  }

  function applyPromoCode() {
    const promoCode = promoInput.value.trim().toUpperCase()

    if (promoCode === "MOVIE10") {
      // Apply 10% discount
      const subtotal =
        currentBooking.adultTickets * currentBooking.movie.adultPrice +
        currentBooking.childTickets * currentBooking.movie.childPrice +
        currentBooking.seniorTickets * (currentBooking.movie.seniorPrice || currentBooking.movie.adultPrice * 0.8)
      const discountAmount = Math.round(subtotal * 0.1)

      currentBooking.promoApplied = true
      currentBooking.promoDiscount = discountAmount

      // Update the UI
      updateOrderSummary()

      // Disable promo code input
      promoInput.disabled = true
      applyPromoBtn.disabled = true
      applyPromoBtn.textContent = "Applied"

      // Show success message
      promoInput.value = "Promo code applied!"
      promoInput.style.color = "green"
    } else {
      // Show error message
      promoInput.value = "Invalid promo code"
      promoInput.style.color = "red"

      // Reset after 2 seconds
      setTimeout(() => {
        promoInput.value = ""
        promoInput.style.color = ""
      }, 2000)
    }
  }

  // Generate a random booking reference
  function generateBookingReference() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let reference = "SR-"

    for (let i = 0; i < 8; i++) {
      reference += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    bookingReferenceElement.textContent = reference

    // Update QR code with the new reference
    const qrCodeImg = document.querySelector(".qr-code img")
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${reference}`
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    navLinks.classList.toggle("show")
    if (authButtons) authButtons.classList.toggle("show")

    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll("span")
    spans.forEach((span) => span.classList.toggle("active"))
  }

  // Initialize the page
  init()
})


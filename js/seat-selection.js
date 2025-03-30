/**
 * JavaScript file for the SeatReserve.lk seat selection page
 * This file handles:
 * - Loading movie and showtime details
 * - Generating the seating chart
 * - Seat selection functionality
 * - Ticket quantity management
 * - Price calculation
 * - Countdown timer
 * - Checkout process
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Get URL Parameters ----------
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get("id")
  const theater = urlParams.get("theater")
  const time = urlParams.get("time")

  // If required parameters are missing, redirect to movies page
  if (!movieId || !theater || !time) {
    console.error("Missing required parameters for seat selection")
    window.location.href = "movies.html"
    return
  }

  // ---------- Movie Data (In a real app, this would come from a server) ----------
  const moviesData = {
    1: {
      title: "Rani",
      price: 600,
      childPrice: 400,
      seniorPrice: 500,
    },
    2: {
      title: "Ape Principal",
      price: 650,
      childPrice: 450,
      seniorPrice: 550,
    },
    3: {
      title: "Kaasi Waasi",
      price: 550,
      childPrice: 350,
      seniorPrice: 450,
    },
    4: {
      title: "Oppenheimer",
      price: 700,
      childPrice: 500,
      seniorPrice: 600,
    },
    5: {
      title: "Dune: Part II",
      price: 700,
      childPrice: 500,
      seniorPrice: 600,
    },
    6: {
      title: "Godzilla x Kong: The New Empire",
      price: 750,
      childPrice: 550,
      seniorPrice: 650,
    },
  }

  // ---------- Ticket Prices ----------
  const ticketPrices = {
    adult: 600,
    child: 400,
    senior: 500,
  }

  // ---------- State Variables ----------
  let selectedSeats = []
  const ticketQuantities = {
    adult: 0,
    child: 0,
    senior: 0,
  }
  let countdownInterval

  // ---------- Load Movie Details ----------
  function loadMovieDetails() {
    const movie = moviesData[movieId]

    // If movie doesn't exist, redirect to movies page
    if (!movie) {
      console.error("Movie not found:", movieId)
      window.location.href = "movies.html"
      return
    }

    // Update ticket prices based on the selected movie
    ticketPrices.adult = movie.price || 600
    ticketPrices.child = movie.childPrice || 400
    ticketPrices.senior = movie.seniorPrice || 500

    // Set page title
    document.title = `Select Seats - ${movie.title} - SeatReserve.lk`

    // Update movie info in the header
    const movieTitleElement = document.getElementById("movie-title")
    const theaterNameElement = document.getElementById("theater-name")
    const showtimeElement = document.getElementById("showtime")
    const movieDateElement = document.getElementById("movie-date")

    if (movieTitleElement) movieTitleElement.textContent = movie.title
    if (theaterNameElement) theaterNameElement.textContent = theater
    if (showtimeElement) showtimeElement.textContent = time

    // Set current date (in a real app, this would be the selected date)
    const today = new Date()
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    if (movieDateElement) movieDateElement.textContent = today.toLocaleDateString("en-US", options)

    // Update ticket price display
    updateTicketPriceDisplay()

    // Log the loaded movie details for debugging
    console.log("Loaded movie details:", {
      title: movie.title,
      theater: theater,
      time: time,
      prices: ticketPrices,
    })
  }

  // ---------- Update Ticket Price Display ----------
  function updateTicketPriceDisplay() {
    const adultPriceElement = document.querySelector(".ticket-type:nth-child(1) .ticket-price")
    const childPriceElement = document.querySelector(".ticket-type:nth-child(2) .ticket-price")
    const seniorPriceElement = document.querySelector(".ticket-type:nth-child(3) .ticket-price")

    if (adultPriceElement) adultPriceElement.textContent = `Rs. ${ticketPrices.adult.toFixed(2)}`
    if (childPriceElement) childPriceElement.textContent = `Rs. ${ticketPrices.child.toFixed(2)}`
    if (seniorPriceElement) seniorPriceElement.textContent = `Rs. ${ticketPrices.senior.toFixed(2)}`
  }

  // ---------- Generate Seating Chart ----------
  function generateSeatingChart() {
    const seatingChart = document.getElementById("seating-chart")
    if (!seatingChart) {
      console.error("Seating chart element not found")
      return
    }

    const rows = 8
    const seatsPerRow = 12

    // Clear existing content
    seatingChart.innerHTML = ""

    // Generate rows and seats
    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i) // A, B, C, etc.

      // Create row element
      const rowElement = document.createElement("div")
      rowElement.className = "seat-row"

      // Add row label
      const rowLabel = document.createElement("div")
      rowLabel.className = "row-label"
      rowLabel.textContent = rowLetter
      rowElement.appendChild(rowLabel)

      // Generate seats for this row
      for (let j = 0; j < seatsPerRow; j++) {
        const seatNumber = j + 1
        const seatId = `${rowLetter}${seatNumber}`

        // Create seat element
        const seat = document.createElement("div")
        seat.className = "seat"
        seat.id = seatId
        seat.dataset.row = rowLetter
        seat.dataset.number = seatNumber
        seat.textContent = seatNumber

        // Randomly assign seat types for demonstration
        // In a real app, this data would come from the server
        const random = Math.random()
        if (random < 0.1) {
          seat.classList.add("occupied")
        } else if (random < 0.3 && (i < 2 || i > 5)) {
          seat.classList.add("premium")
          seat.classList.add("available")
        } else {
          seat.classList.add("available")
        }

        // Add click event listener
        seat.addEventListener("click", handleSeatClick)

        // Add seat to row
        rowElement.appendChild(seat)
      }

      // Add row to seating chart
      seatingChart.appendChild(rowElement)
    }
  }

  // ---------- Handle Seat Click ----------
  function handleSeatClick(event) {
    const seat = event.target

    // Ignore if seat is occupied
    if (seat.classList.contains("occupied")) {
      return
    }

    const seatId = seat.id
    const seatType = seat.classList.contains("premium") ? "premium" : "standard"

    // Check if seat is already selected
    if (seat.classList.contains("selected")) {
      // Remove seat from selected seats
      seat.classList.remove("selected")
      selectedSeats = selectedSeats.filter((s) => s.id !== seatId)
    } else {
      // Add seat to selected seats
      seat.classList.add("selected")
      selectedSeats.push({
        id: seatId,
        type: seatType,
        row: seat.dataset.row,
        number: seat.dataset.number,
      })
    }

    // Update selected seats display
    updateSelectedSeatsDisplay()

    // Update ticket quantities to match selected seats
    updateTicketQuantities()

    // Update totals
    updateTotals()

    // Enable/disable continue button
    updateContinueButton()
  }

  // ---------- Update Selected Seats Display ----------
  function updateSelectedSeatsDisplay() {
    const selectedSeatsList = document.getElementById("selected-seats-list")
    if (!selectedSeatsList) return

    // Clear existing content
    selectedSeatsList.innerHTML = ""

    // If no seats selected, show message
    if (selectedSeats.length === 0) {
      const noSeats = document.createElement("p")
      noSeats.className = "no-seats"
      noSeats.textContent = "No seats selected"
      selectedSeatsList.appendChild(noSeats)
      return
    }

    // Sort seats by row and number
    const sortedSeats = [...selectedSeats].sort((a, b) => {
      if (a.row === b.row) {
        return Number.parseInt(a.number) - Number.parseInt(b.number)
      }
      return a.row.localeCompare(b.row)
    })

    // Add each selected seat
    sortedSeats.forEach((seat) => {
      const seatBadge = document.createElement("div")
      seatBadge.className = "selected-seat-badge"
      seatBadge.innerHTML = `
                  ${seat.id} 
                  <i class="fa-solid fa-xmark" data-seat-id="${seat.id}"></i>
              `

      // Add click event to remove icon
      seatBadge.querySelector("i").addEventListener("click", function () {
        const seatId = this.dataset.seatId
        const seatElement = document.getElementById(seatId)

        // Trigger click on the seat to deselect it
        if (seatElement) {
          seatElement.click()
        }
      })

      selectedSeatsList.appendChild(seatBadge)
    })
  }

  // ---------- Ticket Quantity Management ----------
  function setupTicketQuantityButtons() {
    const quantityButtons = document.querySelectorAll(".quantity-btn")

    quantityButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const type = this.dataset.type // adult, child, senior
        const action = this.classList.contains("plus") ? "increase" : "decrease"

        // Update quantity
        if (action === "increase") {
          // Only allow increasing if there are enough selected seats
          const totalTickets = getTotalTickets()
          if (totalTickets < selectedSeats.length) {
            ticketQuantities[type]++
          }
        } else {
          // Don't allow decreasing below 0
          if (ticketQuantities[type] > 0) {
            ticketQuantities[type]--
          }
        }

        // Update display
        updateTicketQuantityDisplay()

        // Update totals
        updateTotals()

        // Enable/disable continue button
        updateContinueButton()
      })
    })
  }

  // ---------- Update Ticket Quantities ----------
  function updateTicketQuantities() {
    const totalSeats = selectedSeats.length

    // If no seats are selected, reset all quantities
    if (totalSeats === 0) {
      ticketQuantities.adult = 0
      ticketQuantities.child = 0
      ticketQuantities.senior = 0
      updateTicketQuantityDisplay()
      return
    }

    // Keep existing distribution if possible
    const currentTotal = getTotalTickets()

    if (currentTotal > totalSeats) {
      // Too many tickets, need to reduce
      // Reduce in order: senior, child, then adult
      while (getTotalTickets() > totalSeats) {
        if (ticketQuantities.senior > 0) {
          ticketQuantities.senior--
        } else if (ticketQuantities.child > 0) {
          ticketQuantities.child--
        } else if (ticketQuantities.adult > 0) {
          ticketQuantities.adult--
        }
      }
    } else if (currentTotal < totalSeats) {
      // Too few tickets, add adult tickets
      ticketQuantities.adult += totalSeats - currentTotal
    }

    // Update display
    updateTicketQuantityDisplay()

    // Log the updated ticket quantities for debugging
    console.log("Updated ticket quantities:", ticketQuantities)
  }

  // ---------- Update Ticket Quantity Display ----------
  function updateTicketQuantityDisplay() {
    const adultQuantityElement = document.getElementById("adult-quantity")
    const childQuantityElement = document.getElementById("child-quantity")
    const seniorQuantityElement = document.getElementById("senior-quantity")

    if (adultQuantityElement) adultQuantityElement.textContent = ticketQuantities.adult
    if (childQuantityElement) childQuantityElement.textContent = ticketQuantities.child
    if (seniorQuantityElement) seniorQuantityElement.textContent = ticketQuantities.senior
  }

  // ---------- Get Total Tickets ----------
  function getTotalTickets() {
    return ticketQuantities.adult + ticketQuantities.child + ticketQuantities.senior
  }

  // ---------- Update Totals ----------
  function updateTotals() {
    // Calculate subtotal
    const subtotal =
      ticketQuantities.adult * ticketPrices.adult +
      ticketQuantities.child * ticketPrices.child +
      ticketQuantities.senior * ticketPrices.senior

    // Calculate convenience fee (in a real app, this might be more complex)
    const fee = getTotalTickets() * 1.5

    // Calculate total
    const total = subtotal + fee

    // Update display
    const subtotalElement = document.getElementById("subtotal")
    const feeElement = document.getElementById("fee")
    const totalElement = document.getElementById("total")

    if (subtotalElement) subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`
    if (feeElement) feeElement.textContent = `Rs. ${fee.toFixed(2)}`
    if (totalElement) totalElement.textContent = `Rs. ${total.toFixed(2)}`
  }

  // ---------- Update Continue Button ----------
  function updateContinueButton() {
    const continueBtn = document.getElementById("continue-btn")
    if (!continueBtn) return

    const totalTickets = getTotalTickets()

    // Enable button if there are selected seats and ticket quantities match
    if (selectedSeats.length > 0 && totalTickets === selectedSeats.length) {
      continueBtn.disabled = false
    } else {
      continueBtn.disabled = true
    }
  }

  // ---------- Setup Countdown Timer ----------
  function setupCountdownTimer() {
    let timeLeft = 10 * 60 // 10 minutes in seconds
    const countdownElement = document.getElementById("countdown")
    if (!countdownElement) return

    // Update timer display
    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60)
      const seconds = timeLeft % 60
      countdownElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      // If time is up, redirect to movies page
      if (timeLeft <= 0) {
        clearInterval(countdownInterval)
        alert("Your reservation time has expired. You will be redirected to the movies page.")
        window.location.href = "movies.html"
      }

      timeLeft--
    }

    // Initial update
    updateTimer()

    // Start countdown
    countdownInterval = setInterval(updateTimer, 1000)
  }

  // ---------- Setup Checkout Process ----------
  function setupCheckoutProcess() {
    const continueBtn = document.getElementById("continue-btn")
    if (!continueBtn) return

    continueBtn.addEventListener("click", () => {
      // Validate that we have all required data
      if (!movieId || !theater || !time || selectedSeats.length === 0) {
        console.error("Missing required data for checkout:", {
          movieId,
          theater,
          time,
          selectedSeats,
        })
        alert("Something went wrong. Please try selecting your seats again.")
        return
      }

      // Prepare data for checkout
      const checkoutData = {
        movieId,
        theater,
        time,
        seats: selectedSeats,
        tickets: ticketQuantities,
        total: document.getElementById("total")?.textContent || "Rs. 0.00",
      }

      // Store data in sessionStorage for checkout page
      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData))

      // Create a string of seat IDs for URL parameter
      const seatIds = selectedSeats.map((seat) => seat.id).join(",")

      // Redirect to checkout page with query parameters
      window.location.href = `checkout.html?id=${movieId}&theater=${encodeURIComponent(theater)}&time=${encodeURIComponent(time)}&adults=${ticketQuantities.adult}&children=${ticketQuantities.child}&seniors=${ticketQuantities.senior}&seats=${encodeURIComponent(seatIds)}`

      // Log the checkout data for debugging
      console.log("Proceeding to checkout with data:", checkoutData)
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

  // Add styles for mobile menu if they don't exist
  if (!document.getElementById("seat-selection-styles")) {
    const style = document.createElement("style")
    style.id = "seat-selection-styles"
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

  // ---------- Initialize Page ----------
  function init() {
    loadMovieDetails()
    generateSeatingChart()
    setupTicketQuantityButtons()
    setupCountdownTimer()
    setupCheckoutProcess()
    setupMobileMenu()

    // Initial updates
    updateSelectedSeatsDisplay()
    updateTicketQuantityDisplay()
    updateTotals()
    updateContinueButton()
  }

  // Call the initialization function
  init()
})


/**
 * JavaScript file for the SeatReserve.lk theaters page*/

document.addEventListener("DOMContentLoaded", () => {
  const theaters = [
    {
      id: 1,
      name: "SCOPE CINEMAS - Havelock City Mall",
      address: "Havelock City Mall 324 Havelock Road, Colombo 05",
      phone: "0112590814",
      image: "assets/theaters/60ee8ca3-e8ee-448d-a5bd-ebbc768bf3b7.jpg",
      amenities: ["IMAX", "Dolby Cinema", "Recliners", "Wheelchair Accessible"],
    },
    {
      id: 2,
      name: "SCOPE CINEMAS MULTIPLEX- CCC",
      address: "137 Sir James Pieris Mawatha, Colombo 02 ,Sri lanka",
      phone: "0112083064",
      image: "assets/theaters/c615697a-fd01-48bf-b40b-4067badf0189.jpeg",
      amenities: ["RPX", "Recliners", "Dine-In", "Wheelchair Accessible"],
    },
    {
      id: 3,
      name: "LIBERTY CINEMAS - Colpetty",
      address: "No.35 Srimath Anagarika Dharmapala Mawatha, Colombo 03",
      phone: "0112326266",
      image: "assets/theaters/17d0d2b3-02c3-4fe3-9c0d-8b16241480ae.jpg",
      amenities: ["Indie Films", "Recliners", "Hearing Devices", "Doloby Cinema"],
    },
    {
      id: 4,
      name: "LIBERTY CINEMAS - Kiribathgoda",
      address: "No.94 Makola Road, Kiribathgoda",
      phone: "0112269005",
      image: "assets/theaters/7f3ad000-a850-43d8-81f6-af2520b2605a.png",
      amenities: ["IMAX", "Historic Venue", "Wheelchair Accessible"],
    },
  ]

  // ---------- Load Theaters ----------
  function loadTheaters() {
    const theatersGrid = document.getElementById("theaters-grid")
    if (!theatersGrid) {
      console.error("Theaters grid element not found")
      return
    }

    theatersGrid.innerHTML = ""

    theaters.forEach((theater) => {
      // Check if theater has required properties
      if (!theater.name || !theater.address || !theater.amenities) {
        console.warn("Theater missing required properties:", theater)
        return
      }

      const amenityTags = theater.amenities.map((amenity) => `<span class="amenity-tag">${amenity}</span>`).join("")
      const theaterCard = document.createElement("div")
      theaterCard.className = "theater-card"

      // Use a default image path that's guaranteed to exist
      const defaultImage = "assets/theaters/default-theater.jpg"
      const imagePath = theater.image || defaultImage

      theaterCard.innerHTML = `
    <div class="theater-image">
        <img src="${imagePath}" alt="${theater.name}" 
             onerror="this.src='/placeholder.svg?height=200&width=300'; this.onerror=null;">
        ${theater.badge ? `<span class="theater-badge">${theater.badge}</span>` : ""}
    </div>
    <div class="theater-info">
        <h3>${theater.name}</h3>
        <div class="theater-meta">
            <div class="theater-meta-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>${theater.address}</span>
            </div>
            <div class="theater-meta-item">
                <i class="fa-solid fa-phone"></i>
                <span>${theater.phone || "N/A"}</span>
            </div>
        </div>
        <div class="theater-amenities">
            ${amenityTags}
        </div>
        <a href="movies.html?theater=${theater.id}" class="view-btn">
            <i class="fa-solid fa-ticket"></i>
            View Showtimes
        </a>
    </div>
  `
      theatersGrid.appendChild(theaterCard)
    })
  }

  // ---------- Mobile Menu Toggle ----------
  function setupMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
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
  if (!document.getElementById("theaters-styles")) {
    const style = document.createElement("style")
    style.id = "theaters-styles"
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
    loadTheaters()
    setupMobileMenu()

    // Add error handling for image loading
    document.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName.toLowerCase() === "img") {
          console.warn("Image failed to load:", e.target.src)
          e.target.src = "/placeholder.svg?height=200&width=300"
        }
      },
      true,
    )
  }

  init()
})


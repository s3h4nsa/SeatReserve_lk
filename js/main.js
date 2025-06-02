/**
 * Main JavaScript file for the SeatReserve.lk website*/

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  
  // ---------- Mobile Menu Toggle ----------
  /**
   * Sets up the mobile menu toggle functionality
   * @param {string} menuSelector - Selector for the menu toggle button
   * @param {string} navSelector - Selector for the navigation links container
   * @return {void}
   */
  function setupMobileMenu(menuSelector = ".menu-toggle", navSelector = ".nav-links") {
    const menuToggle = document.querySelector(menuSelector)
    const navLinks = document.querySelector(navSelector)

    if (!menuToggle || !navLinks) {
      console.warn("Mobile menu elements not found")
      return
    }

    // Remove any existing event listeners (to prevent duplicates)
    const newMenuToggle = menuToggle.cloneNode(true)
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle)

    newMenuToggle.addEventListener("click", () => {
      // Toggle mobile menu visibility
      navLinks.classList.toggle("show")

      // Toggle active class on menu icon spans for animation
      const spans = newMenuToggle.querySelectorAll("span")
      spans.forEach((span) => {
        span.classList.toggle("active")
      })

      // Toggle aria-expanded attribute for accessibility
      const isExpanded = navLinks.classList.contains("show")
      newMenuToggle.setAttribute("aria-expanded", isExpanded.toString())
    })

    // Add this style once to the document if it doesn't exist
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
  }

  // ---------- Form Validation ----------
  /**
   * Validates an email address format
   * @param {string} email - The email address to validate
   * @return {boolean} - True if valid, false otherwise
   */
  function validateEmail(email) {
    if (!email) return false
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  /**
   * Validates a phone number format
   * @param {string} phone - The phone number to validate
   * @return {boolean} - True if valid, false otherwise
   */
  function validatePhone(phone) {
    if (!phone) return false
    // Basic validation for international phone numbers
    const re = /^\+?[0-9]{10,15}$/
    return re.test(phone.replace(/\s/g, ""))
  }

  /**
   * Shows an error message for a form field
   * @param {HTMLElement} field - The form field element
   * @param {string} message - The error message to display
   */
  function showErrorMessage(field, message) {
    // Add error class to field
    field.classList.add("error")

    // Find the error message element
    const errorId = field.id + "-error"
    const errorElement = document.getElementById(errorId)

    if (errorElement) {
      errorElement.textContent = message
    } else {
      // Create error message element if it doesn't exist
      const newErrorElement = document.createElement("div")
      newErrorElement.className = "error-message"
      newErrorElement.id = errorId
      newErrorElement.textContent = message

      // Add error message after the field
      field.parentNode.appendChild(newErrorElement)
    }

    // Add input event to remove error when user types
    field.addEventListener("input", function () {
      removeErrorMessage(this)
    })

    // For select elements, also listen for change events
    if (field.tagName === "SELECT") {
      field.addEventListener("change", function () {
        removeErrorMessage(this)
      })
    }
  }

  /**
   * Removes an error message from a form field
   * @param {HTMLElement} field - The form field element
   */
  function removeErrorMessage(field) {
    // Remove error class
    field.classList.remove("error")

    // Find the error message element
    const errorId = field.id + "-error"
    const errorElement = document.getElementById(errorId)

    if (errorElement) {
      errorElement.textContent = ""
    }
  }

  // ---------- UI Animations ----------
  /**
   * Adds fade-in animation to elements as they enter the viewport
   */
  function setupFadeInAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in")

    if (fadeElements.length === 0) return

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
  }

  /**
   * Adds parallax effect to elements
   */
  function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll(".parallax")

    if (parallaxElements.length === 0) return

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

    window.addEventListener("scroll", () => {
      requestAnimationFrame(updateParallax)
    })
  }

  // ---------- Utility Functions ----------
  /**
   * Formats a number as currency
   * @param {number} amount - The amount to format
   * @param {string} currency - The currency code (default: 'LKR')
   * @return {string} - Formatted currency string
   */
  function formatCurrency(amount, currency = "LKR") {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  /**
   * Debounces a function to limit how often it can be called
   * @param {Function} func - The function to debounce
   * @param {number} wait - The time to wait in milliseconds
   * @return {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // ---------- Initialize Common Functionality ----------
  function init() {
    setupMobileMenu()
    setupFadeInAnimations()
    setupParallaxEffects()

    // Add keyboard navigation for interactive elements
    document.querySelectorAll(".card, .btn, .movie-card").forEach((element) => {
      if (!element.getAttribute("tabindex") && !element.tagName.match(/^(button|a|input|select|textarea)$/i)) {
        element.setAttribute("tabindex", "0")
      }
    })
  }

  // Initialize the common functionality
  init()

  // Add this form validation module to main.js

  /**
   * Form validation module with common validation functions
   */
  const FormValidator = {
    /**
     * Validates a complete form
     * @param {HTMLFormElement} form - The form to validate
     * @param {Object} rules - Validation rules for each field
     * @return {boolean} - True if valid, false otherwise
     */
    validateForm(form, rules = {}) {
      if (!form) return false

      let isValid = true
      const formData = new FormData(form)

      // Process each field in the form
      for (const [name, value] of formData.entries()) {
        const field = form.elements[name]
        const fieldRules = rules[name] || {}

        // Clear previous errors
        this.removeError(field)

        // Check if required
        if (fieldRules.required && !value.trim()) {
          this.showError(field, fieldRules.requiredMessage || "This field is required")
          isValid = false
          continue
        }

        // Check email format
        if (fieldRules.email && value.trim() && !this.isValidEmail(value)) {
          this.showError(field, fieldRules.emailMessage || "Please enter a valid email address")
          isValid = false
          continue
        }

        // Check phone format
        if (fieldRules.phone && value.trim() && !this.isValidPhone(value)) {
          this.showError(field, fieldRules.phoneMessage || "Please enter a valid phone number")
          isValid = false
          continue
        }

        // Check minimum length
        if (fieldRules.minLength && value.length < fieldRules.minLength) {
          this.showError(field, fieldRules.minLengthMessage || `Must be at least ${fieldRules.minLength} characters`)
          isValid = false
          continue
        }

        // Check pattern match
        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
          this.showError(field, fieldRules.patternMessage || "Invalid format")
          isValid = false
          continue
        }

        // Custom validation function
        if (fieldRules.validate && typeof fieldRules.validate === "function") {
          const customValid = fieldRules.validate(value, form)
          if (!customValid) {
            this.showError(field, fieldRules.validateMessage || "Invalid value")
            isValid = false
            continue
          }
        }
      }

      return isValid
    },

    /**
     * Shows an error message for a form field
     * @param {HTMLElement} field - The form field element
     * @param {string} message - The error message to display
     */
    showError(field, message) {
      // Add error class to field
      field.classList.add("error")
      field.setAttribute("aria-invalid", "true")

      // Find or create the error message element
      const errorId = field.id + "-error"
      let errorElement = document.getElementById(errorId)

      if (!errorElement) {
        errorElement = document.createElement("div")
        errorElement.className = "error-message"
        errorElement.id = errorId
        errorElement.setAttribute("role", "alert")

        // Add error message after the field
        field.parentNode.appendChild(errorElement)
      }

      errorElement.textContent = message

      // Add input event to remove error when user types
      field.addEventListener("input", () => this.removeError(field), { once: true })

      // For select elements, also listen for change events
      if (field.tagName === "SELECT") {
        field.addEventListener("change", () => this.removeError(field), { once: true })
      }
    },

    /**
     * Removes an error message from a form field
     * @param {HTMLElement} field - The form field element
     */
    removeError(field) {
      // Remove error class
      field.classList.remove("error")
      field.setAttribute("aria-invalid", "false")

      // Find and clear the error message element
      const errorId = field.id + "-error"
      const errorElement = document.getElementById(errorId)

      if (errorElement) {
        errorElement.textContent = ""
      }
    },

    /**
     * Validates an email address format
     * @param {string} email - The email address to validate
     * @return {boolean} - True if valid, false otherwise
     */
    isValidEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },

    /**
     * Validates a phone number format
     * @param {string} phone - The phone number to validate
     * @return {boolean} - True if valid, false otherwise
     */
    isValidPhone(phone) {
      // Basic validation for international phone numbers
      const re = /^\+?[0-9]{10,15}$/
      return re.test(phone.replace(/\s/g, ""))
    },

    /**
     * Formats a credit card number with spaces
     * @param {Event} e - The input event
     */
    formatCardNumber(e) {
      let value = e.target.value.replace(/\D/g, "")
      value = value.substring(0, 16)

      // Add spaces after every 4 digits
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
      e.target.value = formattedValue
    },

    /**
     * Formats an expiry date with slash
     * @param {Event} e - The input event
     */
    formatExpiryDate(e) {
      let value = e.target.value.replace(/\D/g, "")

      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }

      e.target.value = value
    },

    /**
     * Ensures input contains only numbers
     * @param {Event} e - The input event
     */
    validateNumericInput(e) {
      e.target.value = e.target.value.replace(/\D/g, "")
    },

    /**
     * Formats a phone number
     * @param {Event} e - The input event
     */
    formatPhoneNumber(e) {
      let value = e.target.value.replace(/[^\d+]/g, "")

      // Keep the + sign if it's at the beginning
      if (e.target.value.startsWith("+") && !value.startsWith("+")) {
        value = "+" + value
      }

      e.target.value = value
    },
  }

  // Add FormValidator to the SeatReserve object
  window.SeatReserve = {
    validateEmail,
    validatePhone,
    showErrorMessage,
    removeErrorMessage,
    formatCurrency,
    debounce,
    setupMobileMenu,
    FormValidator, // Add the form validation module
  }
})


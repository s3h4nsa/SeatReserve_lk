/**
 * JavaScript file for the SeatReserve.lk contact page
 * This file handles:
 * - Contact form submission and validation
 * - FAQ accordion functionality
 * - Live chat button
 * - Mobile menu toggle
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Contact Form Submission ----------
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault() // Prevent the form from submitting normally

      // Validate the form
      if (validateForm()) {
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value

        // Create form data object
        const formData = {
          name,
          email,
          phone,
          subject,
          message,
          timestamp: new Date().toISOString(),
        }

        // Log the form data (in a real app, this would be sent to a server)
        console.log("Form Submission:", formData)

        // Show success message
        showFormMessage("success", "Thank you for your message! We will get back to you soon.")

        // Reset the form
        contactForm.reset()
      }
    })
  }

  // ---------- Form Validation ----------
  function validateForm() {
    let isValid = true

    // Get all required fields
    const requiredFields = contactForm.querySelectorAll("[required]")

    // Check each required field
    requiredFields.forEach((field) => {
      // Remove any existing error messages
      removeErrorMessage(field)

      // Check if field is empty
      if (!field.value.trim()) {
        showErrorMessage(field, "This field is required")
        isValid = false
      }

      // Additional validation for email
      if (field.type === "email" && field.value.trim()) {
        if (!isValidEmail(field.value)) {
          showErrorMessage(field, "Please enter a valid email address")
          isValid = false
        }
      }

      // Additional validation for select
      if (field.tagName === "SELECT" && field.value === "") {
        showErrorMessage(field, "Please select an option")
        isValid = false
      }
    })

    return isValid
  }

  // ---------- Show Error Message ----------
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

  // ---------- Remove Error Message ----------
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

  // ---------- Show Form Message ----------
  function showFormMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create message element
    const messageElement = document.createElement("div")
    messageElement.className = `form-message ${type}`
    messageElement.textContent = message

    // Add message before the form
    contactForm.parentNode.insertBefore(messageElement, contactForm)

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove()
    }, 5000)
  }

  // ---------- Validate Email ----------
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Toggle active class on clicked item
      item.classList.toggle("active")

      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })
    })
  })

  // ---------- Live Chat Button ----------
  const chatBtn = document.querySelector(".chat-btn")

  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      // In a real app, this would open a chat widget
      alert("Live chat feature coming soon! Please contact us via phone or email for now.")
    })
  }

  // ---------- Mobile Menu Toggle ----------
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

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

  // Add styles for form messages if they don't exist
  if (!document.getElementById("form-message-styles")) {
    const style = document.createElement("style")
    style.id = "form-message-styles"
    style.textContent = `
       .form-message {
         padding: 1rem;
         margin-bottom: 1rem;
         border-radius: 0.5rem;
       }
       .form-message.success {
         background-color: rgba(39, 174, 96, 0.2);
         color: #27ae60;
         border: 1px solid #27ae60;
       }
       .form-message.error {
         background-color: rgba(231, 76, 60, 0.2);
         color: #e74c3c;
         border: 1px solid #e74c3c;
       }
       .error-message {
         color: #e74c3c;
         font-size: 0.875rem;
         margin-top: 0.25rem;
       }
       input.error, textarea.error, select.error {
         border-color: #e74c3c !important;
       }
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


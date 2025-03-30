/**
 * JavaScript file for the SeatReserve.lk legal pages
 * This file handles:
 * - Smooth scrolling for sidebar navigation
 * - Mobile menu toggle
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Smooth Scrolling for Sidebar Navigation ----------
  const sidebarLinks = document.querySelectorAll(".legal-sidebar a")

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Get the target section
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      // Scroll to the target section
      if (targetSection) {
        // Calculate offset to account for fixed header
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ---------- Highlight Active Section on Scroll ----------
  function highlightActiveSection() {
    const sections = document.querySelectorAll(".legal-text section")
    const sidebarLinks = document.querySelectorAll(".legal-sidebar a")

    // Get current scroll position
    const scrollPosition = window.scrollY

    // Loop through sections to find the one in view
    sections.forEach((section) => {
      // Calculate section position
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      // Check if section is in view
      if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
        // Get the corresponding sidebar link
        const sectionId = section.getAttribute("id")
        const correspondingLink = document.querySelector(`.legal-sidebar a[href="#${sectionId}"]`)

        // Remove active class from all links
        sidebarLinks.forEach((link) => link.classList.remove("active"))

        // Add active class to current link
        if (correspondingLink) {
          correspondingLink.classList.add("active")
        }
      }
    })
  }

  // Add scroll event listener
  window.addEventListener("scroll", highlightActiveSection)

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

  // Call highlightActiveSection on page load to set initial active link
  highlightActiveSection()
})


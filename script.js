/* --------------------------------------------------------------- */
/* Functions to active nav links*/
/* --------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Function to remove 'active' class from all nav links
  function removeActiveClasses() {
    navLinks.forEach((link) => link.classList.remove("active"));
  }

  // Function to add 'active' class to the nav link corresponding to the visible section
  function addActiveClass(linkId) {
    document.getElementById(linkId).classList.add("active");
  }

  // Observer options
  const observerOptions = {
    root: null, // use the viewport
    rootMargin: "0px",
    threshold: 0.6, // 60% of the section should be visible
  };

  // Observer callback
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const linkId = `link-${entry.target.id.split("_")[0]}`;

      if (entry.isIntersecting) {
        removeActiveClasses(); // Clear all active classes
        addActiveClass(linkId); // Add active class to the current section link
      }
    });
  };

  // Create an observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each section
  sections.forEach((section) => observer.observe(section));
});

/* --------------------------------------------------------------- */
/* Functions to add animation to each section */
/* --------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Function to reset animations
  function resetAnimations() {
    const animatedElements = document.querySelectorAll("[data-animation]");
    animatedElements.forEach((element) => {
      const animationClass = element.dataset.animation;
      element.classList.remove("animate__animated", animationClass); // Remove animation classes initially
    });
  }

  // Function to add animation classes to all children of a section
  function animateSection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get all elements within the section that should be animated
        const elementsToAnimate =
          entry.target.querySelectorAll("[data-animation]");

        elementsToAnimate.forEach((element) => {
          const animationClass = element.dataset.animation;
          element.classList.add("animate__animated", animationClass); // Add the animation classes

          // Optional: Remove animation classes after animation ends for re-trigger
          element.addEventListener(
            "animationend",
            () => {
              element.classList.remove("animate__animated", animationClass);
            },
            { once: true }
          );
        });

        //observer.unobserve(entry.target); // Stop observing after the animation has started
      }
    });
  }

  // Observer options
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 0px -100px 0px", // Trigger 100px before the section is fully in view
    threshold: 0.1, // Trigger when 10% of the section is in view
  };

  // Create a new IntersectionObserver instance
  const observerAnim = new IntersectionObserver(animateSection, options);

  // Observe each section
  const sections = document.querySelectorAll("[data-section]");
  sections.forEach((section) => {
    observerAnim.observe(section);
  });

  // Reset animations on page load
  resetAnimations();
});

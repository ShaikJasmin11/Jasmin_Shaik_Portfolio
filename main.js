document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav__link");
  const backdrop = document.querySelector(".nav__backdrop");

  // Toggle menu
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      document.body.style.overflow = navMenu.classList.contains("show") ? "hidden" : "auto";
    });
  }

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      document.body.style.overflow = "auto";
    });
  });

  // Backdrop click closes menu
  backdrop.addEventListener("click", () => {
    navMenu.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  // Smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });

  // Animate skill bars
  window.addEventListener("scroll", () => {
    const skillBars = document.querySelectorAll(".skill .progress-bar");
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        const percent = bar.dataset.percent || bar.style.width;
        bar.style.setProperty("--target-width", percent);
        bar.style.width = percent;
      }
    });
  });
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
            alert('✅ Your message was sent successfully!');
            document.getElementById('contactForm').reset(); // clear the form
        } else {
            alert('⚠️ There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('⚠️ Network error. Please try again later.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});


});

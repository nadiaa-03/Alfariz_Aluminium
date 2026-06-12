document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const heroSection = document.querySelector(".hero");
  const logo = document.querySelector(".logo-icon");

  const navLinks = document.querySelectorAll(".nav a");
  const originalActiveLink = document.querySelector(".nav a.active");

  const handleScroll = () => {
    const heroBottom = heroSection ? heroSection.offsetHeight - 30 : 80;
    if (window.scrollY > heroBottom) {
      header.classList.add("scrolled");
      if (logo) logo.style.filter = "none";
    } else {
      header.classList.remove("scrolled");
      if (logo) logo.style.filter = "brightness(0) invert(1)";
    }

    const footer = document.getElementById("kontak");
    const contactLink = document.querySelector('.nav a[href="#kontak"]');

    if (footer && contactLink) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < window.innerHeight - 50) {
        navLinks.forEach((link) => link.classList.remove("active"));
        contactLink.classList.add("active");
      } else {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (originalActiveLink) {
          originalActiveLink.classList.add("active");
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");

      const icon = navToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "ph ph-x";
      } else {
        icon.className = "ph ph-list";
      }
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        if (icon) icon.className = "ph ph-list";
      }
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        if (icon) icon.className = "ph ph-list";
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const revealElements = document.querySelectorAll(
    ".service-card, .why-item, .portfolio-card, .about-content, .about-img-box, .testimonial-container",
  );

  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition =
      "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    revealOnScroll.observe(el);
  });
});

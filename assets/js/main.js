/**
 * Template Name: JedidiahFolio - v4.9.1*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

// Contact form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    messageBox.textContent = "";
    messageBox.className = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "custom_form_submit",
          form_id: "contact-form",
        });

        messageBox.classList.add("text-success");
        messageBox.style.textAlign = "center";
        messageBox.textContent = "Message sent successfully! Thank you.";
        form.reset();
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          messageBox.classList.add("text-danger");
          messageBox.style.textAlign = "center";
          messageBox.textContent = errorData.errors
            .map((error) => error.message)
            .join(", ");
        } else {
          messageBox.classList.add("text-danger");
          messageBox.style.textAlign = "center";
          messageBox.textContent =
            "Oops! There was a problem submitting your form.";
        }
      }

      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "";
      }, 3000);
    } catch (err) {
      console.log(err);
      messageBox.classList.add("text-danger");
      messageBox.style.textAlign = "center";
      messageBox.textContent = "Network error. Please try again.";

      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "";
      }, 3000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});

// Year
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const copyYearEl = document.getElementById("copy-year");
  if (copyYearEl) {
    copyYearEl.textContent = currentYear;
  }
});

// Workflow Carousel Navigation
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".workflow-carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const workflowItems = document.querySelectorAll(".workflow-item");
  const itemWidth = workflowItems[0].offsetWidth + 20;

  prevBtn.addEventListener("click", function () {
    carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function () {
    carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
  });

  // Hide/show buttons based on scroll position
  carousel.addEventListener("scroll", function () {
    prevBtn.style.display = carousel.scrollLeft <= 10 ? "none" : "flex";
    nextBtn.style.display =
      carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 10
        ? "none"
        : "flex";
  });

  // Initial state
  prevBtn.style.display = "none";
  if (carousel.scrollWidth <= carousel.clientWidth) {
    nextBtn.style.display = "none";
  }
});

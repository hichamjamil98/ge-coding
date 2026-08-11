/* ==========================================================================
   GE — HOME PAGE

   Requires:
   Swiper
========================================================================== */

(() => {
    "use strict";
  
  
    /* ==========================================================================
       INIT
    ========================================================================== */
  
    document.addEventListener("DOMContentLoaded", () => {
  
      initSchoolCards();
  
      initMetierCards();
  
      initMediaSlider();
  
    });
  
  
  
    /* ==========================================================================
       1. SCHOOL CARDS
  
       .groupe--ecole-item
         .formation--image-wrapper
         .ecole--list-hover
    ========================================================================== */
  
    function initSchoolCards() {
  
      const cards = document.querySelectorAll(
        ".is--home-subhero .groupe--ecole-item"
      );
  
  
      cards.forEach((card) => {
  
        const hoverContent = card.querySelector(
          ".ecole--list-hover"
        );
  
  
        if (!hoverContent) return;
  
  
        /*
          Accessibility:
          if links exist inside the overlay,
          focus-within from CSS will reveal it.
        */
  
        const links = hoverContent.querySelectorAll(
          "a"
        );
  
  
        links.forEach((link) => {
  
          link.addEventListener("focus", () => {
            card.classList.add("is--keyboard-active");
          });
  
  
          link.addEventListener("blur", () => {
            card.classList.remove("is--keyboard-active");
          });
  
        });
  
      });
  
    }
  
  
  
    /* ==========================================================================
       2. METIER CARDS
  
       The CMS "Colors" value already appears as an inline background-color
       on the button.
  
       Example:
  
       <a
         style="background-color:#ffdde4"
         class="btn is--blak"
       >
    ========================================================================== */
  
    function initMetierCards() {
  
      const cards = document.querySelectorAll(
        ".metier--card"
      );
  
  
      cards.forEach((card) => {
  
        /*
          Primary source:
          the colored CMS button.
        */
  
        const button = card.querySelector(
          ".metier--card-text .btn"
        );
  
  
        /*
          Fallback:
          the title currently also contains
          the CMS Colors value inline.
        */
  
        const title = card.querySelector(
          ".metier--card-text h3"
        );
  
  
        let color = "";
  
  
        /* ----------------------------------------------------------------------
           BUTTON COLOR
        ---------------------------------------------------------------------- */
  
        if (button) {
  
          color =
            button.style.backgroundColor ||
            window.getComputedStyle(button).backgroundColor;
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           TITLE COLOR FALLBACK
        ---------------------------------------------------------------------- */
  
        if (
          !color ||
          color === "transparent" ||
          color === "rgba(0, 0, 0, 0)"
        ) {
  
          if (title) {
  
            color =
              title.style.color ||
              window.getComputedStyle(title).color;
  
          }
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           CSS VARIABLE
        ---------------------------------------------------------------------- */
  
        if (color) {
  
          card.style.setProperty(
            "--metier-color",
            color
          );
  
        }
  
  
  
        /*
          Title should always remain white,
          including before hover.
        */
  
        if (title) {
  
          title.style.setProperty(
            "color",
            "#ffffff",
            "important"
          );
  
        }
  
      });
  
    }
  
  
  
    /* ==========================================================================
       3. MEDIA SLIDER
  
       Existing structure:
  
       .swiper.is--media
         .swiper-wrapper
           .swiper-slide
    ========================================================================== */
  
    function initMediaSlider() {
  
      const sliders = document.querySelectorAll(
        ".swiper.is--media"
      );
  
  
      if (!sliders.length) return;
  
  
      if (typeof Swiper === "undefined") {
  
        console.warn(
          "GE Home: Swiper is missing."
        );
  
        return;
  
      }
  
  
      sliders.forEach((slider) => {
  
        /*
          Prevent duplicate initialization.
        */
  
        if (slider.swiper) return;
  
  
  
        new Swiper(
          slider,
          {
  
            /* --------------------------------------------------------------
               CORE
            -------------------------------------------------------------- */
  
            slidesPerView: 1.15,
  
            spaceBetween: 16,
  
            speed: 700,
  
            grabCursor: true,
  
            watchOverflow: true,
  
            resistanceRatio: 0.65,
  
  
            /* --------------------------------------------------------------
               TOUCH / MOUSE
            -------------------------------------------------------------- */
  
            simulateTouch: true,
  
            touchRatio: 1,
  
            touchAngle: 45,
  
            threshold: 5,
  
  
            /* --------------------------------------------------------------
               SLIDE BEHAVIOUR
            -------------------------------------------------------------- */
  
            slidesPerGroup: 1,
  
            centeredSlides: false,
  
            loop: false,
  
  
            /* --------------------------------------------------------------
               BREAKPOINTS
            -------------------------------------------------------------- */
  
            breakpoints: {
  
  
              /* Mobile landscape */
  
              480: {
  
                slidesPerView: 1.4,
  
                spaceBetween: 16
  
              },
  
  
              /* Tablet */
  
              768: {
  
                slidesPerView: 2.1,
  
                spaceBetween: 20
  
              },
  
  
              /* Desktop */
  
              992: {
  
                slidesPerView: 3,
  
                spaceBetween: 24
  
              },
  
  
              /* Large desktop */
  
              1440: {
  
                slidesPerView: 3,
  
                spaceBetween: 24
  
              }
  
            }
  
          }
        );
  
      });
  
    }
  
  
  })();
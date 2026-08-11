/* ==========================================================================
   GE — HOME PAGE INTERACTIONS

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
    ========================================================================== */
  
    function initSchoolCards() {
  
      const cards = document.querySelectorAll(
        ".is--home-subhero .groupe--ecole-item"
      );
  
  
      if (!cards.length) return;
  
  
      cards.forEach((card) => {
  
        const overlay = card.querySelector(
          ".ecole--list-hover"
        );
  
  
        if (!overlay) return;
  
  
        /*
          CSS handles the actual hover animation.
  
          This JS section is intentionally minimal so
          Webflow keeps complete control over positioning,
          sizing and visual variants.
        */
  
  
        /* ------------------------------------------------------------
           Accessibility
        ------------------------------------------------------------ */
  
        const links = overlay.querySelectorAll("a");
  
  
        links.forEach((link) => {
  
          link.addEventListener("focus", () => {
  
            card.classList.add(
              "is--keyboard-active"
            );
  
          });
  
  
          link.addEventListener("blur", () => {
  
            /*
              Wait until browser updates activeElement.
            */
  
            requestAnimationFrame(() => {
  
              if (!card.contains(document.activeElement)) {
  
                card.classList.remove(
                  "is--keyboard-active"
                );
  
              }
  
            });
  
          });
  
        });
  
      });
  
    }
  
  
  
    /* ==========================================================================
       2. METIER CARDS
  
       Existing structure:
  
       .metier--card
  
         img.image--absolute100
  
         .mask--82
  
         .metier--card-text
  
           .max--304
             h3.heading-style-46
  
           .btn
    ========================================================================== */
  
    function initMetierCards() {
  
      const cards = document.querySelectorAll(
        ".metier--card"
      );
  
  
      if (!cards.length) return;
  
  
      cards.forEach((card) => {
  
        const button = card.querySelector(
          ".metier--card-text .btn"
        );
  
  
        const title = card.querySelector(
          ".metier--card-text .heading-style-46"
        );
  
  
        if (!button) return;
  
  
  
        /* ----------------------------------------------------------------------
           GET CMS COLOR
  
           The CMS "Colors" field is already injected by Webflow
           as background-color on the button.
        ---------------------------------------------------------------------- */
  
        let color = button.style.backgroundColor;
  
  
  
        /* ----------------------------------------------------------------------
           FALLBACK TO COMPUTED STYLE
        ---------------------------------------------------------------------- */
  
        if (!color) {
  
          color =
            window
              .getComputedStyle(button)
              .backgroundColor;
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           SET CARD COLOR VARIABLE
        ---------------------------------------------------------------------- */
  
        if (
          color &&
          color !== "transparent" &&
          color !== "rgba(0, 0, 0, 0)"
        ) {
  
          card.style.setProperty(
            "--metier-color",
            color
          );
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           TITLE ALWAYS WHITE
  
           We change only its color.
           Nothing related to position/layout is modified.
        ---------------------------------------------------------------------- */
  
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
  
       Structure already present in Webflow:
  
       .swiper.is--media
  
         .swiper-wrapper
  
           .swiper-slide
           .swiper-slide
           ...
    ========================================================================== */
  
    function initMediaSlider() {
  
      const sliders = document.querySelectorAll(
        ".swiper.is--media"
      );
  
  
      if (!sliders.length) return;
  
  
  
      /* ------------------------------------------------------------------------
         SWIPER CHECK
      ------------------------------------------------------------------------ */
  
      if (typeof Swiper === "undefined") {
  
        console.warn(
          "GE Home: Swiper is missing."
        );
  
        return;
  
      }
  
  
  
      /* ------------------------------------------------------------------------
         INIT EACH SLIDER
      ------------------------------------------------------------------------ */
  
      sliders.forEach((slider) => {
  
        /*
          Avoid duplicate initialization.
        */
  
        if (slider.swiper) return;
  
  
  
        new Swiper(
          slider,
          {
  
            /* ================================================================
               BASIC
            ================================================================ */
  
            slidesPerView: 1.15,
  
            slidesPerGroup: 1,
  
            spaceBetween: 16,
  
            speed: 700,
  
  
            /* ================================================================
               POSITION
            ================================================================ */
  
            centeredSlides: false,
  
            loop: false,
  
  
            /* ================================================================
               INTERACTION
            ================================================================ */
  
            grabCursor: true,
  
            simulateTouch: true,
  
            allowTouchMove: true,
  
            touchRatio: 1,
  
            touchAngle: 45,
  
            threshold: 5,
  
            resistance: true,
  
            resistanceRatio: 0.65,
  
  
            /* ================================================================
               BEHAVIOUR
            ================================================================ */
  
            watchOverflow: true,
  
            observer: true,
  
            observeParents: true,
  
            resizeObserver: true,
  
  
            /* ================================================================
               BREAKPOINTS
            ================================================================ */
  
            breakpoints: {
  
  
              /* --------------------------------------------------------------
                 Mobile landscape
              -------------------------------------------------------------- */
  
              480: {
  
                slidesPerView: 1.4,
  
                spaceBetween: 16
  
              },
  
  
              /* --------------------------------------------------------------
                 Tablet
              -------------------------------------------------------------- */
  
              768: {
  
                slidesPerView: 2.1,
  
                spaceBetween: 20
  
              },
  
  
              /* --------------------------------------------------------------
                 Desktop
              -------------------------------------------------------------- */
  
              992: {
  
                slidesPerView: 3,
  
                spaceBetween: 24
  
              },
  
  
              /* --------------------------------------------------------------
                 Large desktop
              -------------------------------------------------------------- */
  
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
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
  
  
        const links = overlay.querySelectorAll(
          "a"
        );
  
  
        links.forEach((link) => {
  
          link.addEventListener(
            "focus",
            () => {
  
              card.classList.add(
                "is--keyboard-active"
              );
  
            }
          );
  
  
          link.addEventListener(
            "blur",
            () => {
  
              requestAnimationFrame(() => {
  
                if (
                  !card.contains(
                    document.activeElement
                  )
                ) {
  
                  card.classList.remove(
                    "is--keyboard-active"
                  );
  
                }
  
              });
  
            }
          );
  
        });
  
      });
  
    }
  
  
  
    /* ==========================================================================
       2. METIER CARDS
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
           CMS COLOR
  
           Webflow injects the CMS Colors value
           as background-color on the button.
        ---------------------------------------------------------------------- */
  
        let color = button.style.backgroundColor;
  
  
  
        /* ----------------------------------------------------------------------
           Fallback
        ---------------------------------------------------------------------- */
  
        if (!color) {
  
          color =
            window
              .getComputedStyle(button)
              .backgroundColor;
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           Apply CMS color as CSS variable
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
           Title initial state
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
    ========================================================================== */
  
    function initMediaSlider() {
  
      const sliders = document.querySelectorAll(
        ".swiper.is--media"
      );
  
  
      if (!sliders.length) return;
  
  
  
      /* ------------------------------------------------------------------------
         Swiper check
      ------------------------------------------------------------------------ */
  
      if (typeof Swiper === "undefined") {
  
        console.warn(
          "GE Home: Swiper is missing."
        );
  
        return;
  
      }
  
  
  
      /* ------------------------------------------------------------------------
         Init
      ------------------------------------------------------------------------ */
  
      sliders.forEach((slider) => {
  
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
               OBSERVERS
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
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
  
  
        const links = overlay.querySelectorAll("a");
  
  
        links.forEach((link) => {
  
          link.addEventListener("focus", () => {
  
            card.classList.add(
              "is--keyboard-active"
            );
  
          });
  
  
          link.addEventListener("blur", () => {
  
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
  
          });
  
        });
  
      });
  
    }
  
  
  
    /* ==========================================================================
       2. METIER CARDS
  
       Existing Webflow structure:
  
       .metier--card
  
         img.image--absolute100
  
         .mask--82
  
         .metier--card-text
  
           .max--304
             h3.heading-style-46
  
           .btn
  
       IMPORTANT:
  
       We only read the CMS color.
       We do not modify image or mask.
    ========================================================================== */
  
    function initMetierCards() {
  
      const cards = document.querySelectorAll(
        ".metier--card"
      );
  
  
      if (!cards.length) return;
  
  
      cards.forEach((card) => {
  
        const title = card.querySelector(
          ".metier--card-text .heading-style-46"
        );
  
  
        const button = card.querySelector(
          ".metier--card-text .btn"
        );
  
  
        if (!button && !title) return;
  
  
  
        /* ======================================================================
           1. READ CMS COLOR
  
           Priority:
           button inline background-color
           then title inline color
        ====================================================================== */
  
        let cmsColor = "";
  
  
  
        /* Button CMS color */
  
        if (
          button &&
          button.style.backgroundColor
        ) {
  
          cmsColor =
            button.style.backgroundColor;
  
        }
  
  
  
        /* Title fallback */
  
        if (
          !cmsColor &&
          title &&
          title.style.color
        ) {
  
          cmsColor =
            title.style.color;
  
        }
  
  
  
        /* Computed style fallback */
  
        if (
          !cmsColor &&
          button
        ) {
  
          const computedBackground =
            window
              .getComputedStyle(button)
              .backgroundColor;
  
  
          if (
            computedBackground &&
            computedBackground !== "transparent" &&
            computedBackground !== "rgba(0, 0, 0, 0)"
          ) {
  
            cmsColor =
              computedBackground;
  
          }
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           Validate
        ---------------------------------------------------------------------- */
  
        if (
          !cmsColor ||
          cmsColor === "transparent" ||
          cmsColor === "rgba(0, 0, 0, 0)"
        ) {
  
          return;
  
        }
  
  
  
        /* ======================================================================
           2. STORE CMS COLOR
  
           Example:
  
           --metier-color: rgb(255, 221, 228);
        ====================================================================== */
  
        card.style.setProperty(
          "--metier-color",
          cmsColor
        );
  
  
  
        /* ======================================================================
           3. REMOVE CMS INLINE COLORS
  
           Important:
  
           We already stored the CMS value.
  
           The initial state should now be controlled
           entirely by Webflow.
  
           CMS color appears ONLY on hover.
        ====================================================================== */
  
        if (title) {
  
          title.style.removeProperty(
            "color"
          );
  
        }
  
  
        if (button) {
  
          button.style.removeProperty(
            "background-color"
          );
  
          button.style.removeProperty(
            "border-color"
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
  
  
  
      /* ==========================================================================
         SWIPER CHECK
      ========================================================================== */
  
      if (typeof Swiper === "undefined") {
  
        console.warn(
          "GE Home: Swiper is missing."
        );
  
        return;
  
      }
  
  
  
      /* ==========================================================================
         INIT
      ========================================================================== */
  
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
  
  
  
            /* ================================================================
               RESISTANCE
            ================================================================ */
  
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
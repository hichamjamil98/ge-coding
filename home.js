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
  
       Important:
  
       JS DOES NOT modify:
       - title color
       - button background
       - title transform
       - button transform
       - image
       - mask
  
       It ONLY reads the CMS color
       and stores it in CSS variables.
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
  
  
        if (!button) return;
  
  
  
        /* ======================================================================
           GET CMS COLOR
  
           Existing Webflow example:
  
           style="background-color:#ffdde4"
        ====================================================================== */
  
        let color =
          button.style.backgroundColor;
  
  
  
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
           Validate
        ---------------------------------------------------------------------- */
  
        if (
          !color ||
          color === "transparent" ||
          color === "rgba(0, 0, 0, 0)"
        ) {
  
          return;
  
        }
  
  
  
        /* ======================================================================
           CSS VARIABLE — CMS COLOR
        ====================================================================== */
  
        card.style.setProperty(
          "--metier-color",
          color
        );
  
  
  
        /* ======================================================================
           SHADOW COLOR
  
           Same CMS color with exactly 20% opacity,
           matching the Webflow shadow opacity.
        ====================================================================== */
  
        const shadowColor =
          createTransparentColor(
            color,
            0.2
          );
  
  
        if (shadowColor) {
  
          card.style.setProperty(
            "--metier-shadow-color",
            shadowColor
          );
  
        }
  
      });
  
    }
  
  
  
    /* ==========================================================================
       COLOR NORMALIZER
    ========================================================================== */
  
    function createTransparentColor(
      color,
      alpha = 0.2
    ) {
  
      if (!color) return null;
  
  
      const temp =
        document.createElement("span");
  
  
      temp.style.color = color;
  
      temp.style.position = "absolute";
  
      temp.style.visibility = "hidden";
  
      temp.style.pointerEvents = "none";
  
  
      document.body.appendChild(temp);
  
  
      const computedColor =
        window
          .getComputedStyle(temp)
          .color;
  
  
      temp.remove();
  
  
  
      /* ------------------------------------------------------------------------
         Extract RGB
      ------------------------------------------------------------------------ */
  
      const values =
        computedColor.match(
          /[\d.]+/g
        );
  
  
      if (
        !values ||
        values.length < 3
      ) {
  
        return null;
  
      }
  
  
      const r =
        Math.round(
          Number(values[0])
        );
  
  
      const g =
        Math.round(
          Number(values[1])
        );
  
  
      const b =
        Math.round(
          Number(values[2])
        );
  
  
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  
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
         Check Swiper
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
  
  
              480: {
  
                slidesPerView: 1.4,
  
                spaceBetween: 16
  
              },
  
  
              768: {
  
                slidesPerView: 2.1,
  
                spaceBetween: 20
  
              },
  
  
              992: {
  
                slidesPerView: 3,
  
                spaceBetween: 24
  
              },
  
  
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
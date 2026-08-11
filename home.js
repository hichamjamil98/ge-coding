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
  
  
          /* ------------------------------------------------------------------
             Focus
          ------------------------------------------------------------------ */
  
          link.addEventListener(
            "focus",
            () => {
  
              card.classList.add(
                "is--keyboard-active"
              );
  
            }
          );
  
  
          /* ------------------------------------------------------------------
             Blur
          ------------------------------------------------------------------ */
  
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
  
       Existing Webflow structure:
  
       .metier--card
  
         img.image--absolute100
  
         .mask--82
  
         .metier--card-text
  
           .max--304
             h3.heading-style-46
  
           .btn
  
       IMPORTANT:
       .mask--82 is never modified.
       The image is never transformed.
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
  
  
  
        /* ======================================================================
           GET CMS COLOR
  
           Webflow injects the CMS Colors value
           directly as the button background-color.
  
           Example:
  
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
           CMS MAIN COLOR
        ====================================================================== */
  
        card.style.setProperty(
          "--metier-color",
          color
        );
  
  
  
        /* ======================================================================
           CMS SHADOW COLOR
  
           Webflow original shadow color:
           rgba(0, 0, 0, 0.2)
  
           We preserve the exact 20% alpha
           and only replace black with the CMS color.
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
  
  
  
        /* ======================================================================
           TITLE INITIAL STATE
  
           White before hover.
        ====================================================================== */
  
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
       COLOR → RGBA
  
       Examples:
  
       #ffdde4
       rgb(255, 221, 228)
       hsl(...)
       hsla(...)
  
       become:
  
       rgba(255, 221, 228, 0.2)
    ========================================================================== */
  
    function createTransparentColor(
      color,
      alpha = 0.2
    ) {
  
      if (!color) return null;
  
  
      const temporary =
        document.createElement("span");
  
  
      temporary.style.color = color;
  
      temporary.style.display = "none";
  
  
      document.body.appendChild(
        temporary
      );
  
  
      const computedColor =
        window
          .getComputedStyle(temporary)
          .color;
  
  
      temporary.remove();
  
  
  
      /* ------------------------------------------------------------------------
         Extract RGB values
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
  
  
      const red =
        Math.round(
          Number(values[0])
        );
  
  
      const green =
        Math.round(
          Number(values[1])
        );
  
  
      const blue =
        Math.round(
          Number(values[2])
        );
  
  
      return (
        `rgba(${red}, ${green}, ${blue}, ${alpha})`
      );
  
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
         INIT SLIDERS
      ========================================================================== */
  
      sliders.forEach((slider) => {
  
  
        /* Avoid duplicate initialization */
  
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
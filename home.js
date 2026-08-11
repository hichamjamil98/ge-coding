/* ==========================================================================
   GE — HOME PAGE INTERACTIONS

   Requires:
   - GSAP
   - Swiper
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
  
      initFAQ();
  
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
  
       Color source:
  
       background-color of .metier--card
  
       Used for:
       - shadow
       - title on hover
       - button on hover
    ========================================================================== */
  
    function initMetierCards() {
  
      const cards = document.querySelectorAll(
        ".metier--card"
      );
  
  
      if (!cards.length) return;
  
  
      cards.forEach((card) => {
  
        const styles =
          window.getComputedStyle(card);
  
  
        const color =
          styles.backgroundColor;
  
  
        if (
          !color ||
          color === "transparent" ||
          color === "rgba(0, 0, 0, 0)"
        ) {
  
          console.warn(
            "GE Home: missing background-color on .metier--card",
            card
          );
  
          return;
  
        }
  
  
        card.style.setProperty(
          "--metier-color",
          color
        );
  
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
  
            /* ================================================================
               BASIC
            ================================================================ */
  
            slidesPerView: 1.15,
  
            slidesPerGroup: 1,
  
            spaceBetween: 16,
  
            speed: 750,
  
  
  
            /* ================================================================
               LOOP
            ================================================================ */
  
            loop: true,
  
            loopAdditionalSlides: 2,
  
  
  
            /* ================================================================
               AUTOPLAY
            ================================================================ */
  
            autoplay: {
  
              delay: 2800,
  
              disableOnInteraction: false,
  
              pauseOnMouseEnter: true
  
            },
  
  
  
            /* ================================================================
               POSITION
            ================================================================ */
  
            centeredSlides: false,
  
  
  
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
  
            observeSlideChildren: true,
  
            resizeObserver: true,
  
  
  
            /* ================================================================
               BREAKPOINTS
            ================================================================ */
  
            breakpoints: {
  
  
              /* Mobile */
  
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
  
  
  
    /* ==========================================================================
       4. FAQ
    ========================================================================== */
  
    function initFAQ() {
  
      const items = [
        ...document.querySelectorAll(
          ".faq--item"
        )
      ];
  
  
      if (!items.length) return;
  
  
      if (typeof gsap === "undefined") {
  
        console.warn(
          "GE Home: GSAP is missing for FAQ."
        );
  
        return;
  
      }
  
  
      items.forEach((item) => {
  
        const question = item.querySelector(
          ".faq--question"
        );
  
  
        const answer = item.querySelector(
          ".faq--answer"
        );
  
  
        const arrow = item.querySelector(
          ".faq--arrow"
        );
  
  
        if (!question || !answer) return;
  
  
  
        /* ----------------------------------------------------------------------
           Accessibility
        ---------------------------------------------------------------------- */
  
        question.setAttribute(
          "role",
          "button"
        );
  
  
        question.setAttribute(
          "tabindex",
          "0"
        );
  
  
        question.setAttribute(
          "aria-expanded",
          "false"
        );
  
  
  
        /* ----------------------------------------------------------------------
           Initial state
        ---------------------------------------------------------------------- */
  
        gsap.set(
          answer,
          {
  
            height: 0,
  
            opacity: 0,
  
            overflow: "hidden",
  
            pointerEvents: "none"
  
          }
        );
  
  
        if (arrow) {
  
          gsap.set(
            arrow,
            {
              rotate: 0
            }
          );
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           Click
        ---------------------------------------------------------------------- */
  
        question.addEventListener(
          "click",
          () => {
  
            toggleFAQ(item);
  
          }
        );
  
  
  
        /* ----------------------------------------------------------------------
           Keyboard
        ---------------------------------------------------------------------- */
  
        question.addEventListener(
          "keydown",
          (event) => {
  
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
  
              event.preventDefault();
  
              toggleFAQ(item);
  
            }
  
  
            if (
              event.key === "Escape"
            ) {
  
              closeFAQ(item);
  
            }
  
          }
        );
  
      });
  
  
  
      /* ========================================================================
         TOGGLE
      ======================================================================== */
  
      function toggleFAQ(item) {
  
        const isOpen =
          item.classList.contains(
            "is--open"
          );
  
  
        if (isOpen) {
  
          closeFAQ(item);
  
          return;
  
        }
  
  
        /*
          Only one FAQ open.
        */
  
        items.forEach((otherItem) => {
  
          if (
            otherItem !== item
          ) {
  
            closeFAQ(otherItem);
  
          }
  
        });
  
  
        openFAQ(item);
  
      }
  
  
  
      /* ========================================================================
         OPEN
      ======================================================================== */
  
      function openFAQ(item) {
  
        const question = item.querySelector(
          ".faq--question"
        );
  
  
        const answer = item.querySelector(
          ".faq--answer"
        );
  
  
        const arrow = item.querySelector(
          ".faq--arrow"
        );
  
  
        if (!answer) return;
  
  
        gsap.killTweensOf(answer);
  
  
        if (arrow) {
  
          gsap.killTweensOf(arrow);
  
        }
  
  
        /*
          Add this BEFORE animation.
  
          This is what activates the shadow.
        */
  
        item.classList.add(
          "is--open"
        );
  
  
        question?.setAttribute(
          "aria-expanded",
          "true"
        );
  
  
  
        /* ----------------------------------------------------------------------
           Measure content height
        ---------------------------------------------------------------------- */
  
        gsap.set(
          answer,
          {
  
            height: "auto",
  
            opacity: 1,
  
            pointerEvents: "auto"
  
          }
        );
  
  
        const targetHeight =
          answer.scrollHeight;
  
  
  
        /* ----------------------------------------------------------------------
           Animate
        ---------------------------------------------------------------------- */
  
        gsap.fromTo(
          answer,
  
          {
  
            height: 0,
  
            opacity: 0
  
          },
  
          {
  
            height: targetHeight,
  
            opacity: 1,
  
            duration: 0.5,
  
            ease: "power3.out",
  
            overwrite: true,
  
            onComplete: () => {
  
              gsap.set(
                answer,
                {
                  height: "auto"
                }
              );
  
            }
  
          }
        );
  
  
  
        /* ----------------------------------------------------------------------
           Arrow
        ---------------------------------------------------------------------- */
  
        if (arrow) {
  
          gsap.to(
            arrow,
            {
  
              rotate: 180,
  
              duration: 0.4,
  
              ease: "power3.out",
  
              overwrite: true
  
            }
          );
  
        }
  
      }
  
  
  
      /* ========================================================================
         CLOSE
      ======================================================================== */
  
      function closeFAQ(item) {
  
        if (
          !item.classList.contains(
            "is--open"
          )
        ) {
  
          return;
  
        }
  
  
        const question = item.querySelector(
          ".faq--question"
        );
  
  
        const answer = item.querySelector(
          ".faq--answer"
        );
  
  
        const arrow = item.querySelector(
          ".faq--arrow"
        );
  
  
        if (!answer) return;
  
  
        question?.setAttribute(
          "aria-expanded",
          "false"
        );
  
  
        gsap.killTweensOf(answer);
  
  
        if (arrow) {
  
          gsap.killTweensOf(arrow);
  
        }
  
  
  
        /* ----------------------------------------------------------------------
           Close answer
        ---------------------------------------------------------------------- */
  
        gsap.to(
          answer,
          {
  
            height: 0,
  
            opacity: 0,
  
            duration: 0.4,
  
            ease: "power2.inOut",
  
            overwrite: true,
  
            onComplete: () => {
  
              /*
                Remove is--open AFTER closing.
  
                The shadow therefore stays visible
                during the close animation and disappears
                once the FAQ is fully closed.
              */
  
              item.classList.remove(
                "is--open"
              );
  
  
              gsap.set(
                answer,
                {
                  pointerEvents: "none"
                }
              );
  
            }
  
          }
        );
  
  
  
        /* ----------------------------------------------------------------------
           Arrow
        ---------------------------------------------------------------------- */
  
        if (arrow) {
  
          gsap.to(
            arrow,
            {
  
              rotate: 0,
  
              duration: 0.35,
  
              ease: "power2.inOut",
  
              overwrite: true
  
            }
          );
  
        }
  
      }
  
    }
  
  
  
  })();
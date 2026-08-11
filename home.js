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
  
      initActualitesFilter();
  
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
  
       Source color:
       background-color of .metier--card
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
  
        if (slider.swiper) return;
  
  
        new Swiper(
          slider,
          {
  
            /* ================================================================
               WIDTH
            ================================================================ */
  
            slidesPerView: "auto",
  
            slidesPerGroup: 1,
  
            spaceBetween: 0,
  
  
            /* ================================================================
               SPEED
            ================================================================ */
  
            speed: 850,
  
  
            /* ================================================================
               TRUE INFINITE LOOP
            ================================================================ */
  
            loop: true,
  
            loopAdditionalSlides: 6,
  
  
            /* ================================================================
               AUTOPLAY
            ================================================================ */
  
            autoplay: {
  
              delay: 2500,
  
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
  
            allowTouchMove: true,
  
            simulateTouch: true,
  
            touchRatio: 1,
  
            touchAngle: 45,
  
            threshold: 5,
  
  
            /* ================================================================
               RESISTANCE
            ================================================================ */
  
            resistance: true,
  
            resistanceRatio: 0.65,
  
  
            /* ================================================================
               STABILITY
            ================================================================ */
  
            watchOverflow: false,
  
            observer: true,
  
            observeParents: true,
  
            observeSlideChildren: true,
  
            resizeObserver: true
  
          }
        );
  
      });
  
    }
  
  
  
    /* ==========================================================================
       4. ACTUALITES FILTER
    ========================================================================== */
  
    function initActualitesFilter() {
  
      const filters = document.querySelectorAll(
        ".faq--filter"
      );
  
  
      if (!filters.length) return;
  
  
      filters.forEach((filter) => {
  
        const trigger = filter.querySelector(
          ".actualite--filter-trigger"
        );
  
  
        const dropdown = filter.querySelector(
          ".actualites--filter-drop"
        );
  
  
        const filterText = filter.querySelector(
          ".filter--text"
        );
  
  
        if (!trigger || !dropdown) return;
  
  
  
        /* ----------------------------------------------------------------------
           Accessibility
        ---------------------------------------------------------------------- */
  
        trigger.setAttribute(
          "role",
          "button"
        );
  
  
        trigger.setAttribute(
          "tabindex",
          "0"
        );
  
  
        trigger.setAttribute(
          "aria-expanded",
          "false"
        );
  
  
  
        /* ----------------------------------------------------------------------
           Toggle
        ---------------------------------------------------------------------- */
  
        const toggle = () => {
  
          const isOpen =
            filter.classList.contains(
              "is--open"
            );
  
  
          filters.forEach((otherFilter) => {
  
            if (
              otherFilter !== filter
            ) {
  
              closeFilter(otherFilter);
  
            }
  
          });
  
  
          if (isOpen) {
  
            closeFilter(filter);
  
          }
  
          else {
  
            openFilter(filter);
  
          }
  
        };
  
  
  
        /* ----------------------------------------------------------------------
           Trigger click
        ---------------------------------------------------------------------- */
  
        trigger.addEventListener(
          "click",
          (event) => {
  
            event.preventDefault();
  
            event.stopPropagation();
  
            toggle();
  
          }
        );
  
  
  
        /* ----------------------------------------------------------------------
           Keyboard
        ---------------------------------------------------------------------- */
  
        trigger.addEventListener(
          "keydown",
          (event) => {
  
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
  
              event.preventDefault();
  
              toggle();
  
            }
  
  
            if (
              event.key === "Escape"
            ) {
  
              closeFilter(filter);
  
            }
  
          }
        );
  
  
  
        /* ----------------------------------------------------------------------
           Filter links
        ---------------------------------------------------------------------- */
  
        const links = dropdown.querySelectorAll(
          ".filter--link"
        );
  
  
        links.forEach((link) => {
  
          link.addEventListener(
            "click",
            (event) => {
  
              event.preventDefault();
  
  
              const selectedLabel =
                link.textContent.trim();
  
  
  
              /* ==============================================================
                 UPDATE TRIGGER TEXT
              ============================================================== */
  
              if (filterText) {
  
                filterText.textContent =
                  selectedLabel;
  
              }
  
  
  
              /* ==============================================================
                 ACTIVE STATE
              ============================================================== */
  
              links.forEach((item) => {
  
                item.classList.remove(
                  "is--active"
                );
  
              });
  
  
              link.classList.add(
                "is--active"
              );
  
  
  
              /* ==============================================================
                 CLOSE DROPDOWN
              ============================================================== */
  
              closeFilter(filter);
  
            }
          );
  
        });
  
      });
  
  
  
      /* ========================================================================
         CLICK OUTSIDE
      ======================================================================== */
  
      document.addEventListener(
        "click",
        (event) => {
  
          filters.forEach((filter) => {
  
            if (
              !filter.contains(
                event.target
              )
            ) {
  
              closeFilter(filter);
  
            }
  
          });
  
        }
      );
  
  
  
      /* ========================================================================
         ESCAPE
      ======================================================================== */
  
      document.addEventListener(
        "keydown",
        (event) => {
  
          if (
            event.key !== "Escape"
          ) {
  
            return;
  
          }
  
  
          filters.forEach((filter) => {
  
            closeFilter(filter);
  
          });
  
        }
      );
  
  
  
      /* ========================================================================
         OPEN
      ======================================================================== */
  
      function openFilter(filter) {
  
        const trigger = filter.querySelector(
          ".actualite--filter-trigger"
        );
  
  
        filter.classList.add(
          "is--open"
        );
  
  
        trigger?.setAttribute(
          "aria-expanded",
          "true"
        );
  
      }
  
  
  
      /* ========================================================================
         CLOSE
      ======================================================================== */
  
      function closeFilter(filter) {
  
        const trigger = filter.querySelector(
          ".actualite--filter-trigger"
        );
  
  
        filter.classList.remove(
          "is--open"
        );
  
  
        trigger?.setAttribute(
          "aria-expanded",
          "false"
        );
  
      }
  
    }
  
  
  
    /* ==========================================================================
       5. FAQ
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
  
  
        item.classList.add(
          "is--open"
        );
  
  
        question?.setAttribute(
          "aria-expanded",
          "true"
        );
  
  
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
  
  
        gsap.to(
          answer,
          {
  
            height: 0,
  
            opacity: 0,
  
            duration: 0.4,
  
            ease: "power2.inOut",
  
            overwrite: true,
  
            onComplete: () => {
  
              item.classList.remove(
                "is--open"
              );
  
  
              gsap.set(
                answer,
                {
  
                  height: 0,
  
                  pointerEvents: "none"
  
                }
              );
  
            }
  
          }
        );
  
  
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
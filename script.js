/* ==========================================================================
   GE — INTERACTIONS & ANIMATIONS
   Requires GSAP + ScrollTrigger
========================================================================== */

(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
      console.warn("GE: GSAP is missing.");
      return;
    }

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const EASE = "power4.out";

    initLoadAnimations(EASE);
    initScrollAnimations(EASE);
    initNavbarDropdowns();
  });

  /* ==========================================================================
     1. LOAD ANIMATIONS

     Usage:
     animation="load"
  ========================================================================== */

  function initLoadAnimations(ease) {
    const elements = document.querySelectorAll('[animation="load"]');

    if (!elements.length) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: "1rem",
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease,
        delay: 0.08,
        clearProps: "transform,opacity",
      }
    );
  }

  /* ==========================================================================
     2. SCROLL ANIMATIONS

     Usage:

     animation="fade"

     animation="fade-stagger"
       → anime les enfants directs
  ========================================================================== */

  function initScrollAnimations(ease) {
    if (typeof ScrollTrigger === "undefined") {
      console.warn("GE: ScrollTrigger is missing.");
      return;
    }

    initFade(ease);
    initFadeStagger(ease);
  }

  /* --------------------------------------------------------------------------
     FADE
  -------------------------------------------------------------------------- */

  function initFade(ease) {
    const elements = document.querySelectorAll('[animation="fade"]');

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: "1rem",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease,
          clearProps: "transform,opacity",

          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        }
      );
    });
  }

  /* --------------------------------------------------------------------------
     FADE STAGGER
  -------------------------------------------------------------------------- */

  function initFadeStagger(ease) {
    const parents = document.querySelectorAll(
      '[animation="fade-stagger"]'
    );

    parents.forEach((parent) => {
      const children = [...parent.children];

      if (!children.length) return;

      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: "1.5rem",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.08,
          ease,
          clearProps: "transform,opacity",

          scrollTrigger: {
            trigger: parent,
            start: "top 86%",
            once: true,
          },
        }
      );
    });
  }

  /* ==========================================================================
     3. NAVBAR DROPDOWNS

     Structure GE:

     .nav--drop
        .nav--trigger
            ...
            .nav--arrow

        .nav--sub-menu
            .nav--sub-link
  ========================================================================== */

  function initNavbarDropdowns() {
    const dropdowns = [...document.querySelectorAll(".nav--drop")];

    if (!dropdowns.length) return;

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".nav--trigger");
      const menu = dropdown.querySelector(".nav--sub-menu");
      const arrow = dropdown.querySelector(".nav--arrow");

      if (!trigger || !menu) return;

      /* Accessibility */
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-expanded", "false");

      /* Initial state */
      gsap.set(menu, {
        autoAlpha: 0,
        y: "0.75rem",
        pointerEvents: "none",
      });

      if (arrow) {
        gsap.set(arrow, {
          rotate: 0,
        });
      }

      /* ----------------------------------------------------------------------
         OPEN
      ---------------------------------------------------------------------- */

      const openDropdown = () => {
        /* Close all other dropdowns first */
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            closeDropdown(otherDropdown);
          }
        });

        dropdown.classList.add("is--open");

        trigger.setAttribute("aria-expanded", "true");

        const timeline = gsap.timeline();

        timeline
          .set(menu, {
            visibility: "visible",
            pointerEvents: "auto",
          })

          .to(
            menu,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            },
            0
          );

        if (arrow) {
          timeline.to(
            arrow,
            {
              rotate: 180,
              duration: 0.4,
              ease: "power3.out",
            },
            0
          );
        }
      };

      /* ----------------------------------------------------------------------
         TOGGLE
      ---------------------------------------------------------------------- */

      const toggleDropdown = () => {
        const isOpen = dropdown.classList.contains("is--open");

        if (isOpen) {
          closeDropdown(dropdown);
        } else {
          openDropdown();
        }
      };

      /* Click */
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        toggleDropdown();
      });

      /* Keyboard */
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();

          toggleDropdown();
        }

        if (event.key === "Escape") {
          closeDropdown(dropdown);
        }
      });
    });

    /* ------------------------------------------------------------------------
       CLOSE WHEN CLICKING OUTSIDE
    ------------------------------------------------------------------------ */

    document.addEventListener("click", (event) => {
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
          closeDropdown(dropdown);
        }
      });
    });

    /* ------------------------------------------------------------------------
       ESCAPE
    ------------------------------------------------------------------------ */

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      dropdowns.forEach((dropdown) => {
        closeDropdown(dropdown);
      });
    });
  }

  /* ==========================================================================
     CLOSE DROPDOWN
  ========================================================================== */

  function closeDropdown(dropdown) {
    if (!dropdown.classList.contains("is--open")) return;

    const trigger = dropdown.querySelector(".nav--trigger");
    const menu = dropdown.querySelector(".nav--sub-menu");
    const arrow = dropdown.querySelector(".nav--arrow");

    if (!menu) return;

    dropdown.classList.remove("is--open");

    trigger?.setAttribute("aria-expanded", "false");

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(menu, {
          visibility: "hidden",
          pointerEvents: "none",
        });
      },
    });

    timeline.to(
      menu,
      {
        autoAlpha: 0,
        y: "0.75rem",
        duration: 0.3,
        ease: "power2.inOut",
      },
      0
    );

    if (arrow) {
      timeline.to(
        arrow,
        {
          rotate: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );
    }
  }
})();
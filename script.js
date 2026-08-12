/* ==========================================================================
   GE — INTERACTIONS & ANIMATIONS

   Requires:
   GSAP
   ScrollTrigger
========================================================================== */

(() => {
  "use strict";


  /* ==========================================================================
     INIT
  ========================================================================== */

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
     1. PAGE LOAD ANIMATIONS

     Usage:

     animation="load"
  ========================================================================== */

  function initLoadAnimations(ease) {

    const elements = document.querySelectorAll(
      '[animation="load"]'
    );


    if (!elements.length) return;


    gsap.fromTo(
      elements,

      {
        opacity: 0,
        y: "1rem"
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.85,

        stagger: 0.08,

        ease: ease,

        delay: 0.08,

        clearProps: "transform,opacity"
      }
    );

  }



  /* ==========================================================================
     2. SCROLL ANIMATIONS

     Usage:

     animation="fade"

     animation="fade-stagger"
  ========================================================================== */

  function initScrollAnimations(ease) {

    if (typeof ScrollTrigger === "undefined") {
      console.warn("GE: ScrollTrigger is missing.");
      return;
    }


    initFade(ease);
    initFadeStagger(ease);

  }



  /* ==========================================================================
     2.1 FADE

     Example:

     <div animation="fade">
       ...
     </div>
  ========================================================================== */

  function initFade(ease) {

    const elements = document.querySelectorAll(
      '[animation="fade"]'
    );


    elements.forEach((element) => {

      gsap.fromTo(
        element,

        {
          opacity: 0,
          y: "1rem"
        },

        {
          opacity: 1,
          y: 0,

          duration: 0.85,

          ease: ease,

          clearProps: "transform,opacity",

          scrollTrigger: {

            trigger: element,

            start: "top 86%",

            once: true

          }

        }

      );

    });

  }



  /* ==========================================================================
     2.2 FADE STAGGER

     Animates direct children.

     Example:

     <div animation="fade-stagger">

       <div>Item 1</div>
       <div>Item 2</div>
       <div>Item 3</div>

     </div>
  ========================================================================== */

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
          y: "1.5rem"
        },

        {
          opacity: 1,
          y: 0,

          duration: 0.78,

          stagger: 0.08,

          ease: ease,

          clearProps: "transform,opacity",

          scrollTrigger: {

            trigger: parent,

            start: "top 86%",

            once: true

          }

        }

      );

    });

  }



  /* ==========================================================================
     3. NAVBAR DROPDOWNS

     Expected structure:

     .nav--drop

       .nav--trigger

         text
         .nav--arrow

       .nav--sub-menu

         .nav--sub-link
         .nav--sub-link
         ...
  ========================================================================== */

  function initNavbarDropdowns() {

    const dropdowns = [
      ...document.querySelectorAll(".nav--drop")
    ];


    if (!dropdowns.length) return;



    /* ------------------------------------------------------------------------
       INITIAL STATE
    ------------------------------------------------------------------------ */

    dropdowns.forEach((dropdown) => {

      const trigger = dropdown.querySelector(
        ".nav--trigger"
      );

      const menu = dropdown.querySelector(
        ".nav--sub-menu"
      );

      const arrow = dropdown.querySelector(
        ".nav--arrow"
      );


      if (!trigger || !menu) return;



      /* Accessibility */

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



      /* Menu initial state */

      gsap.set(
        menu,
        {

          opacity: 0,

          y: "0.75rem",

          visibility: "hidden",

          pointerEvents: "none"

        }
      );



      /* Arrow initial state */

      if (arrow) {

        gsap.set(
          arrow,
          {
            rotate: 0
          }
        );

      }



      /* ----------------------------------------------------------------------
         CLICK
      ---------------------------------------------------------------------- */

      trigger.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          event.stopPropagation();


          const isOpen =
            dropdown.classList.contains(
              "is--open"
            );


          if (isOpen) {

            closeDropdown(dropdown);

          }

          else {

            closeAllDropdowns(dropdown);

            openDropdown(dropdown);

          }

        }
      );



      /* ----------------------------------------------------------------------
         KEYBOARD
      ---------------------------------------------------------------------- */

      trigger.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();


            const isOpen =
              dropdown.classList.contains(
                "is--open"
              );


            if (isOpen) {

              closeDropdown(dropdown);

            }

            else {

              closeAllDropdowns(dropdown);

              openDropdown(dropdown);

            }

          }



          if (event.key === "Escape") {

            closeDropdown(dropdown);

          }

        }
      );

    });



    /* ------------------------------------------------------------------------
       CLICK OUTSIDE
    ------------------------------------------------------------------------ */

    document.addEventListener(
      "click",
      (event) => {

        dropdowns.forEach(
          (dropdown) => {

            if (
              !dropdown.contains(
                event.target
              )
            ) {

              closeDropdown(dropdown);

            }

          }
        );

      }
    );



    /* ------------------------------------------------------------------------
       ESCAPE
    ------------------------------------------------------------------------ */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !== "Escape"
        ) {
          return;
        }


        closeAllDropdowns();

      }
    );



    /* ========================================================================
       OPEN DROPDOWN
    ======================================================================== */

    function openDropdown(dropdown) {

      const trigger =
        dropdown.querySelector(
          ".nav--trigger"
        );

      const menu =
        dropdown.querySelector(
          ".nav--sub-menu"
        );

      const arrow =
        dropdown.querySelector(
          ".nav--arrow"
        );


      if (!menu) return;



      /* Stop previous animation */

      gsap.killTweensOf(menu);


      if (arrow) {

        gsap.killTweensOf(arrow);

      }



      /* Add state */

      dropdown.classList.add(
        "is--open"
      );


      trigger?.setAttribute(
        "aria-expanded",
        "true"
      );



      /* Make visible before animation */

      gsap.set(
        menu,
        {

          visibility: "visible",

          pointerEvents: "auto"

        }
      );



      /* Animate dropdown */

      gsap.to(
        menu,
        {

          opacity: 1,

          y: 0,

          duration: 0.45,

          ease: "power3.out",

          overwrite: true

        }
      );



      /* Animate arrow */

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
       CLOSE DROPDOWN
    ======================================================================== */

    function closeDropdown(dropdown) {

      if (
        !dropdown.classList.contains(
          "is--open"
        )
      ) {
        return;
      }


      const trigger =
        dropdown.querySelector(
          ".nav--trigger"
        );

      const menu =
        dropdown.querySelector(
          ".nav--sub-menu"
        );

      const arrow =
        dropdown.querySelector(
          ".nav--arrow"
        );


      if (!menu) return;



      /* Remove state */

      dropdown.classList.remove(
        "is--open"
      );


      trigger?.setAttribute(
        "aria-expanded",
        "false"
      );



      /* Stop previous animations */

      gsap.killTweensOf(menu);


      if (arrow) {

        gsap.killTweensOf(arrow);

      }



      /* Dropdown animation */

      gsap.to(
        menu,
        {

          opacity: 0,

          y: "0.75rem",

          duration: 0.3,

          ease: "power2.inOut",

          overwrite: true,


          onComplete: () => {

            /*
             Prevent old closing animation
             from hiding a dropdown that
             has already been reopened.
            */

            if (
              !dropdown.classList.contains(
                "is--open"
              )
            ) {

              gsap.set(
                menu,
                {

                  visibility: "hidden",

                  pointerEvents: "none"

                }
              );

            }

          }

        }
      );



      /* Arrow animation */

      if (arrow) {

        gsap.to(
          arrow,
          {

            rotate: 0,

            duration: 0.3,

            ease: "power2.inOut",

            overwrite: true

          }
        );

      }

    }



    /* ========================================================================
       CLOSE ALL DROPDOWNS

       except = dropdown that should stay open
    ======================================================================== */

    function closeAllDropdowns(
      except = null
    ) {

      dropdowns.forEach(
        (dropdown) => {

          if (
            dropdown !== except
          ) {

            closeDropdown(dropdown);

          }

        }
      );

    }

  }


})();
/* ==========================================================================
   MOBILE NAVIGATION — HORIZONTAL DRAG / SCROLL
   Keeps dropdown menus visible outside the navigation container
   ========================================================================== */

   document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".container--nav-bottom");
    if (!nav) return;
  
    const items = Array.from(nav.children);
  
    const MOBILE_BREAKPOINT = 767;
    const RIGHT_PADDING = 16; // espace conservé après le dernier item
  
    let currentX = 0;
    let startX = 0;
    let startTranslate = 0;
    let isDragging = false;
    let hasMoved = false;
  
    function isMobile() {
      return window.innerWidth <= MOBILE_BREAKPOINT;
    }
  
  
    /* --------------------------------------------------------------------------
       Scroll boundaries
       -------------------------------------------------------------------------- */
  
    function getBounds() {
      if (!items.length) {
        return {
          min: 0,
          max: 0
        };
      }
  
      const navRect = nav.getBoundingClientRect();
  
      const firstRect = items[0].getBoundingClientRect();
      const lastRect = items[items.length - 1].getBoundingClientRect();
  
      // Positions naturelles, sans le translate actuel
      const naturalLeft = firstRect.left - currentX;
      const naturalRight = lastRect.right - currentX;
  
      const contentWidth = naturalRight - naturalLeft;
      const availableWidth = navRect.width;
  
      return {
        max: 0,
  
        // RIGHT_PADDING permet de garder de l'espace
        // visible après le dernier élément.
        min: Math.min(
          0,
          availableWidth - contentWidth - RIGHT_PADDING
        )
      };
    }
  
  
    /* --------------------------------------------------------------------------
       Clamp position
       -------------------------------------------------------------------------- */
  
    function clamp(value) {
      const bounds = getBounds();
  
      return Math.max(
        bounds.min,
        Math.min(bounds.max, value)
      );
    }
  
  
    /* --------------------------------------------------------------------------
       Apply horizontal movement
       -------------------------------------------------------------------------- */
  
    function setTranslate(value, animate = false) {
      currentX = clamp(value);
  
      items.forEach((item) => {
        item.style.transition = animate
          ? "transform 0.35s cubic-bezier(.22,.61,.36,1)"
          : "none";
  
        item.style.transform = `translate3d(${currentX}px, 0, 0)`;
      });
    }
  
  
    /* ==========================================================================
       TOUCH
       ========================================================================== */
  
    nav.addEventListener(
      "touchstart",
      (e) => {
        if (!isMobile()) return;
  
        isDragging = true;
        hasMoved = false;
  
        startX = e.touches[0].clientX;
        startTranslate = currentX;
  
        items.forEach((item) => {
          item.style.transition = "none";
        });
      },
      { passive: true }
    );
  
  
    nav.addEventListener(
      "touchmove",
      (e) => {
        if (!isMobile() || !isDragging) return;
  
        const x = e.touches[0].clientX;
        const deltaX = x - startX;
  
        if (Math.abs(deltaX) > 5) {
          hasMoved = true;
        }
  
        setTranslate(startTranslate + deltaX);
      },
      { passive: true }
    );
  
  
    nav.addEventListener(
      "touchend",
      () => {
        if (!isMobile()) return;
  
        isDragging = false;
  
        setTranslate(currentX, true);
      },
      { passive: true }
    );
  
  
    /* ==========================================================================
       MOUSE DRAG
       ========================================================================== */
  
    nav.addEventListener("mousedown", (e) => {
      if (!isMobile()) return;
  
      isDragging = true;
      hasMoved = false;
  
      startX = e.clientX;
      startTranslate = currentX;
  
      items.forEach((item) => {
        item.style.transition = "none";
      });
    });
  
  
    window.addEventListener("mousemove", (e) => {
      if (!isMobile() || !isDragging) return;
  
      const deltaX = e.clientX - startX;
  
      if (Math.abs(deltaX) > 5) {
        hasMoved = true;
      }
  
      setTranslate(startTranslate + deltaX);
    });
  
  
    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
  
      isDragging = false;
  
      setTranslate(currentX, true);
    });
  
  
    /* ==========================================================================
       PREVENT CLICK AFTER DRAG
       ========================================================================== */
  
    nav.addEventListener(
      "click",
      (e) => {
        if (!hasMoved) return;
  
        e.preventDefault();
        e.stopPropagation();
  
        hasMoved = false;
      },
      true
    );
  
  
    /* ==========================================================================
       RESIZE
       ========================================================================== */
  
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        currentX = 0;
  
        items.forEach((item) => {
          item.style.transform = "";
          item.style.transition = "";
        });
  
        return;
      }
  
      setTranslate(currentX);
    });
  });
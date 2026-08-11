/* ==========================================================================
   GE — HOME

   Requires:
   - GSAP
   - Swiper
========================================================================== */

(() => {
    "use strict";
  
  
    let mediaSwiper = null;
  
    let originalMediaSlides = [];
  
  
    /* ==========================================================================
       HELPERS
    ========================================================================== */
  
    function normalizeText(text) {
  
      return (text || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
  
    }
  
  
  
    /* ==========================================================================
       INIT
    ========================================================================== */
  
    document.addEventListener(
      "DOMContentLoaded",
      () => {
  
        initSchoolCards();
  
        initMetierCards();
  
        initMediaSlider();
  
        initFilters();
  
        initFAQ();
  
      }
    );
  
  
  
    /* ==========================================================================
       1. SCHOOL CARDS
    ========================================================================== */
  
    function initSchoolCards() {
  
      const cards =
        document.querySelectorAll(
          ".is--home-subhero .groupe--ecole-item"
        );
  
  
      if (!cards.length) return;
  
  
      cards.forEach((card) => {
  
        const overlay =
          card.querySelector(
            ".ecole--list-hover"
          );
  
  
        if (!overlay) return;
  
  
        const links =
          overlay.querySelectorAll("a");
  
  
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
  
       Couleur = background-color de .metier--card
    ========================================================================== */
  
    function initMetierCards() {
  
      const cards =
        document.querySelectorAll(
          ".metier--card"
        );
  
  
      if (!cards.length) return;
  
  
      cards.forEach((card) => {
  
        const color =
          window
            .getComputedStyle(card)
            .backgroundColor;
  
  
        if (
          !color ||
          color === "transparent" ||
          color === "rgba(0, 0, 0, 0)"
        ) {
  
          return;
  
        }
  
  
        card.style.setProperty(
          "--metier-color",
          color
        );
  
      });
  
    }
  
  
  
    /* ==========================================================================
       3. FILTER HELPERS
    ========================================================================== */
  
    function setupFilterTrigger(
      filter,
      trigger
    ) {
  
      if (!filter || !trigger) return;
  
  
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
  
  
      /* ------------------------------------------------------------------------
         CLICK
      ------------------------------------------------------------------------ */
  
      trigger.addEventListener(
        "click",
        (event) => {
  
          event.preventDefault();
  
          event.stopPropagation();
  
  
          const isOpen =
            filter.classList.contains(
              "is--open"
            );
  
  
          closeAllFilters(filter);
  
  
          if (isOpen) {
  
            closeFilter(filter);
  
          }
  
          else {
  
            openFilter(filter);
  
          }
  
        }
      );
  
  
      /* ------------------------------------------------------------------------
         KEYBOARD
      ------------------------------------------------------------------------ */
  
      trigger.addEventListener(
        "keydown",
        (event) => {
  
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
  
            event.preventDefault();
  
            trigger.click();
  
          }
  
  
          if (
            event.key === "Escape"
          ) {
  
            closeFilter(filter);
  
          }
  
        }
      );
  
    }
  
  
  
    /* ==========================================================================
       OPEN FILTER
    ========================================================================== */
  
    function openFilter(filter) {
  
      if (!filter) return;
  
  
      filter.classList.add(
        "is--open"
      );
  
  
      const trigger =
        filter.querySelector(
          ".actualite--filter-trigger"
        );
  
  
      trigger?.setAttribute(
        "aria-expanded",
        "true"
      );
  
    }
  
  
  
    /* ==========================================================================
       CLOSE FILTER
    ========================================================================== */
  
    function closeFilter(filter) {
  
      if (!filter) return;
  
  
      filter.classList.remove(
        "is--open"
      );
  
  
      const trigger =
        filter.querySelector(
          ".actualite--filter-trigger"
        );
  
  
      trigger?.setAttribute(
        "aria-expanded",
        "false"
      );
  
    }
  
  
  
    /* ==========================================================================
       CLOSE ALL FILTERS
    ========================================================================== */
  
    function closeAllFilters(
      exception = null
    ) {
  
      document
        .querySelectorAll(
          ".filter--top .faq--filter"
        )
        .forEach((filter) => {
  
          if (
            filter !== exception
          ) {
  
            closeFilter(filter);
  
          }
  
        });
  
    }
  
  
  
    /* ==========================================================================
       4. ACTUALITES FILTER
    ========================================================================== */
  
    function initActualitesFilter() {
  
      const grid =
        document.querySelector(
          ".grid--2cl.is--actualites"
        );
  
  
      if (!grid) return;
  
  
      const section =
        grid.closest(".section");
  
  
      if (!section) return;
  
  
      const filter =
        section.querySelector(
          ".filter--top .faq--filter"
        );
  
  
      const trigger =
        filter?.querySelector(
          ".actualite--filter-trigger"
        );
  
  
      const label =
        filter?.querySelector(
          ".filter--text"
        );
  
  
      const dropdown =
        filter?.querySelector(
          ".actualites--filter-drop"
        );
  
  
      const options =
        dropdown?.querySelectorAll(
          '[filter="text"]'
        );
  
  
      const items =
        grid.querySelectorAll(
          ":scope > .w-dyn-item"
        );
  
  
      if (
        !filter ||
        !trigger ||
        !dropdown ||
        !options?.length
      ) {
  
        return;
  
      }
  
  
      setupFilterTrigger(
        filter,
        trigger
      );
  
  
      options.forEach((option) => {
  
        option.addEventListener(
          "click",
          (event) => {
  
            event.preventDefault();
  
            event.stopPropagation();
  
  
            const selected =
              option.textContent.trim();
  
  
            const selectedNormalized =
              normalizeText(selected);
  
  
  
            /* --------------------------------------------------------------
               UPDATE TEXT
            -------------------------------------------------------------- */
  
            if (label) {
  
              label.textContent =
                selected;
  
            }
  
  
  
            /* --------------------------------------------------------------
               ACTIVE
            -------------------------------------------------------------- */
  
            options.forEach((other) => {
  
              other.classList.remove(
                "is--active"
              );
  
            });
  
  
            option.classList.add(
              "is--active"
            );
  
  
  
            /* --------------------------------------------------------------
               FILTER
  
               Actualités:
               filter="results"
            -------------------------------------------------------------- */
  
            items.forEach((item) => {
  
              const result =
                item.querySelector(
                  '[filter="results"]'
                );
  
  
              const value =
                normalizeText(
                  result?.textContent
                );
  
  
              const show =
                value ===
                selectedNormalized;
  
  
              item.style.display =
                show ? "" : "none";
  
            });
  
  
  
            closeFilter(filter);
  
          }
        );
  
      });
  
    }
  
  
  
    /* ==========================================================================
       5. SAVE ORIGINAL MEDIA SLIDES
    ========================================================================== */
  
    function saveOriginalMediaSlides() {
  
      const slider =
        document.querySelector(
          ".swiper.is--media"
        );
  
  
      if (!slider) return;
  
  
      const wrapper =
        slider.querySelector(
          ".swiper-wrapper"
        );
  
  
      if (!wrapper) return;
  
  
      originalMediaSlides =
        Array
          .from(wrapper.children)
          .filter((slide) => {
  
            return slide.classList.contains(
              "swiper-slide"
            );
  
          })
          .map((slide) => {
  
            const clone =
              slide.cloneNode(true);
  
  
            cleanSwiperSlide(clone);
  
  
            return clone;
  
          });
  
    }
  
  
  
    /* ==========================================================================
       CLEAN SWIPER SLIDE
    ========================================================================== */
  
    function cleanSwiperSlide(slide) {
  
      slide.classList.remove(
        "swiper-slide-active",
        "swiper-slide-next",
        "swiper-slide-prev",
        "swiper-slide-visible",
        "swiper-slide-fully-visible"
      );
  
  
      slide.removeAttribute(
        "data-swiper-slide-index"
      );
  
  
      slide.removeAttribute(
        "aria-label"
      );
  
  
      slide.removeAttribute(
        "aria-hidden"
      );
  
  
      slide.style.removeProperty(
        "margin-right"
      );
  
  
      slide.style.removeProperty(
        "transform"
      );
  
  
      slide.style.removeProperty(
        "transition-duration"
      );
  
    }
  
  
  
    /* ==========================================================================
       GET 2REM GAP
    ========================================================================== */
  
    function getMediaGap() {
  
      const rootFontSize =
        parseFloat(
          window
            .getComputedStyle(
              document.documentElement
            )
            .fontSize
        );
  
  
      return rootFontSize * 2;
  
    }
  
  
  
    /* ==========================================================================
       CREATE MEDIA SWIPER
    ========================================================================== */
  
    function createMediaSwiper() {
  
      const slider =
        document.querySelector(
          ".swiper.is--media"
        );
  
  
      if (!slider) return;
  
  
      if (
        typeof Swiper ===
        "undefined"
      ) {
  
        console.warn(
          "GE Home: Swiper missing."
        );
  
        return;
  
      }
  
  
      const slides =
        slider.querySelectorAll(
          ".swiper-wrapper > .swiper-slide"
        );
  
  
      if (!slides.length) return;
  
  
      mediaSwiper =
        new Swiper(
          slider,
          {
  
            /* ================================================================
               WIDTH
            ================================================================ */
  
            slidesPerView: "auto",
  
            slidesPerGroup: 1,
  
  
            /* ================================================================
               GAP = 2REM
            ================================================================ */
  
            spaceBetween:
              getMediaGap(),
  
  
            /* ================================================================
               SPEED
            ================================================================ */
  
            speed: 850,
  
  
            /* ================================================================
               TRUE INFINITE LOOP
            ================================================================ */
  
            loop:
              slides.length > 1,
  
            loopAdditionalSlides:
              slides.length,
  
  
            /* ================================================================
               AUTOPLAY
            ================================================================ */
  
            autoplay:
              slides.length > 1
                ? {
  
                    delay: 2500,
  
                    disableOnInteraction:
                      false,
  
                    pauseOnMouseEnter:
                      true
  
                  }
                : false,
  
  
            centeredSlides: false,
  
  
            /* ================================================================
               INTERACTION
            ================================================================ */
  
            grabCursor: true,
  
            allowTouchMove:
              slides.length > 1,
  
            simulateTouch: true,
  
            touchRatio: 1,
  
            touchAngle: 45,
  
            threshold: 5,
  
  
            resistance: true,
  
            resistanceRatio: 0.65,
  
  
            watchOverflow: false,
  
  
            observer: true,
  
            observeParents: true,
  
            resizeObserver: true
  
          }
        );
  
    }
  
  
  
    /* ==========================================================================
       DESTROY MEDIA SWIPER
    ========================================================================== */
  
    function destroyMediaSwiper() {
  
      if (!mediaSwiper) return;
  
  
      mediaSwiper.destroy(
        true,
        true
      );
  
  
      mediaSwiper = null;
  
    }
  
  
  
    /* ==========================================================================
       INIT MEDIA SLIDER
    ========================================================================== */
  
    function initMediaSlider() {
  
      saveOriginalMediaSlides();
  
      createMediaSwiper();
  
    }
  
  
  
    /* ==========================================================================
       FILTER MEDIA SLIDES
    ========================================================================== */
  
    function filterMediaSlides(
      selected
    ) {
  
      const slider =
        document.querySelector(
          ".swiper.is--media"
        );
  
  
      if (!slider) return;
  
  
      const wrapper =
        slider.querySelector(
          ".swiper-wrapper"
        );
  
  
      if (!wrapper) return;
  
  
      const selectedNormalized =
        normalizeText(selected);
  
  
  
      /* ------------------------------------------------------------------------
         DESTROY
      ------------------------------------------------------------------------ */
  
      destroyMediaSwiper();
  
  
  
      /* ------------------------------------------------------------------------
         CLEAR
      ------------------------------------------------------------------------ */
  
      wrapper.innerHTML = "";
  
  
  
      /* ------------------------------------------------------------------------
         MATCH
  
         Médias:
         filter="result"
      ------------------------------------------------------------------------ */
  
      const matchingSlides =
        originalMediaSlides.filter(
          (slide) => {
  
            const result =
              slide.querySelector(
                '[filter="result"]'
              );
  
  
            const value =
              normalizeText(
                result?.textContent
              );
  
  
            return (
              value ===
              selectedNormalized
            );
  
          }
        );
  
  
  
      /* ------------------------------------------------------------------------
         INSERT
      ------------------------------------------------------------------------ */
  
      matchingSlides.forEach(
        (originalSlide) => {
  
          const slide =
            originalSlide.cloneNode(
              true
            );
  
  
          cleanSwiperSlide(
            slide
          );
  
  
          wrapper.appendChild(
            slide
          );
  
        }
      );
  
  
  
      /* ------------------------------------------------------------------------
         RECREATE SWIPER
      ------------------------------------------------------------------------ */
  
      requestAnimationFrame(() => {
  
        requestAnimationFrame(() => {
  
          createMediaSwiper();
  
        });
  
      });
  
    }
  
  
  
    /* ==========================================================================
       6. MEDIA FILTER
    ========================================================================== */
  
    function initMediaFilter() {
  
      const section =
        document.querySelector(
          ".section.is--home-slider"
        );
  
  
      if (!section) return;
  
  
      const filter =
        section.querySelector(
          ".filter--top .faq--filter"
        );
  
  
      const trigger =
        filter?.querySelector(
          ".actualite--filter-trigger"
        );
  
  
      const label =
        filter?.querySelector(
          ".filter--text"
        );
  
  
      /*
        Ton HTML utilise également
        .actualites--filter-drop pour Médias.
      */
  
      const dropdown =
        filter?.querySelector(
          ".actualites--filter-drop"
        );
  
  
      const options =
        dropdown?.querySelectorAll(
          '[filter="text"]'
        );
  
  
      if (
        !filter ||
        !trigger ||
        !dropdown ||
        !options?.length
      ) {
  
        return;
  
      }
  
  
      setupFilterTrigger(
        filter,
        trigger
      );
  
  
      options.forEach((option) => {
  
        option.addEventListener(
          "click",
          (event) => {
  
            event.preventDefault();
  
            event.stopPropagation();
  
  
            const selected =
              option.textContent.trim();
  
  
  
            /* --------------------------------------------------------------
               UPDATE TEXT
            -------------------------------------------------------------- */
  
            if (label) {
  
              label.textContent =
                selected;
  
            }
  
  
  
            /* --------------------------------------------------------------
               ACTIVE
            -------------------------------------------------------------- */
  
            options.forEach((other) => {
  
              other.classList.remove(
                "is--active"
              );
  
            });
  
  
            option.classList.add(
              "is--active"
            );
  
  
  
            /* --------------------------------------------------------------
               FILTER MEDIA
            -------------------------------------------------------------- */
  
            filterMediaSlides(
              selected
            );
  
  
  
            closeFilter(filter);
  
          }
        );
  
      });
  
    }
  
  
  
    /* ==========================================================================
       7. FILTER OUTSIDE CLICK
    ========================================================================== */
  
    function initFilterOutsideClick() {
  
      document.addEventListener(
        "click",
        (event) => {
  
          document
            .querySelectorAll(
              ".filter--top .faq--filter"
            )
            .forEach((filter) => {
  
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
  
  
      document.addEventListener(
        "keydown",
        (event) => {
  
          if (
            event.key ===
            "Escape"
          ) {
  
            closeAllFilters();
  
          }
  
        }
      );
  
    }
  
  
  
    /* ==========================================================================
       INIT FILTERS
    ========================================================================== */
  
    function initFilters() {
  
      initActualitesFilter();
  
      initMediaFilter();
  
      initFilterOutsideClick();
  
    }
  
  
  
    /* ==========================================================================
       8. FAQ
    ========================================================================== */
  
    function initFAQ() {
  
      const items =
        document.querySelectorAll(
          ".faq--item"
        );
  
  
      if (!items.length) return;
  
  
      if (
        typeof gsap ===
        "undefined"
      ) {
  
        console.warn(
          "GE Home: GSAP missing."
        );
  
        return;
  
      }
  
  
      items.forEach((item) => {
  
        const question =
          item.querySelector(
            ".faq--question"
          );
  
  
        const answer =
          item.querySelector(
            ".faq--answer"
          );
  
  
        const arrow =
          item.querySelector(
            ".faq--arrow"
          );
  
  
        if (
          !question ||
          !answer
        ) {
  
          return;
  
        }
  
  
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
  
  
        const toggle = () => {
  
          const isOpen =
            item.classList.contains(
              "is--open"
            );
  
  
          if (isOpen) {
  
            closeFAQ(item);
  
            return;
  
          }
  
  
          items.forEach((other) => {
  
            if (
              other !== item
            ) {
  
              closeFAQ(other);
  
            }
  
          });
  
  
          openFAQ(item);
  
        };
  
  
        question.addEventListener(
          "click",
          toggle
        );
  
  
        question.addEventListener(
          "keydown",
          (event) => {
  
            if (
              event.key ===
                "Enter" ||
              event.key ===
                " "
            ) {
  
              event.preventDefault();
  
              toggle();
  
            }
  
  
            if (
              event.key ===
              "Escape"
            ) {
  
              closeFAQ(item);
  
            }
  
          }
        );
  
      });
  
    }
  
  
  
    /* ==========================================================================
       OPEN FAQ
    ========================================================================== */
  
    function openFAQ(item) {
  
      if (
        item.classList.contains(
          "is--open"
        )
      ) {
  
        return;
  
      }
  
  
      const question =
        item.querySelector(
          ".faq--question"
        );
  
  
      const answer =
        item.querySelector(
          ".faq--answer"
        );
  
  
      const arrow =
        item.querySelector(
          ".faq--arrow"
        );
  
  
      if (!answer) return;
  
  
      item.classList.add(
        "is--open"
      );
  
  
      question?.setAttribute(
        "aria-expanded",
        "true"
      );
  
  
      gsap.killTweensOf(
        answer
      );
  
  
      if (arrow) {
  
        gsap.killTweensOf(
          arrow
        );
  
      }
  
  
      gsap.to(
        answer,
        {
  
          height: "auto",
  
          opacity: 1,
  
          pointerEvents: "auto",
  
          duration: 0.5,
  
          ease: "power3.out",
  
          overwrite: true
  
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
  
  
  
    /* ==========================================================================
       CLOSE FAQ
    ========================================================================== */
  
    function closeFAQ(item) {
  
      if (
        !item.classList.contains(
          "is--open"
        )
      ) {
  
        return;
  
      }
  
  
      const question =
        item.querySelector(
          ".faq--question"
        );
  
  
      const answer =
        item.querySelector(
          ".faq--answer"
        );
  
  
      const arrow =
        item.querySelector(
          ".faq--arrow"
        );
  
  
      if (!answer) return;
  
  
      question?.setAttribute(
        "aria-expanded",
        "false"
      );
  
  
      gsap.killTweensOf(
        answer
      );
  
  
      if (arrow) {
  
        gsap.killTweensOf(
          arrow
        );
  
      }
  
  
      gsap.to(
        answer,
        {
  
          height: 0,
  
          opacity: 0,
  
          pointerEvents: "none",
  
          duration: 0.4,
  
          ease: "power2.inOut",
  
          overwrite: true,
  
          onComplete: () => {
  
            item.classList.remove(
              "is--open"
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
  
  
  })();
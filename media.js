/* ==========================================================================
   GE — MEDIA PAGE
   FILTER + SWIPER ONLY

   Requires:
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
  
        saveOriginalMediaSlides();
  
        createMediaSwiper();
  
        initMediaFilter();
  
        initFilterOutsideClick();
  
      }
    );
  
  
    /* ==========================================================================
       SAVE ORIGINAL SLIDES
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
          .from(
            wrapper.children
          )
          .filter((slide) => {
  
            return slide.classList.contains(
              "swiper-slide"
            );
  
          })
          .map((slide) => {
  
            const clone =
              slide.cloneNode(
                true
              );
  
  
            cleanSwiperSlide(
              clone
            );
  
  
            return clone;
  
          });
  
    }
  
  
    /* ==========================================================================
       CLEAN SWIPER SLIDE
    ========================================================================== */
  
    function cleanSwiperSlide(
      slide
    ) {
  
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
  
  
      slide.style.removeProperty(
        "transition-delay"
      );
  
    }
  
  
    /* ==========================================================================
       GAP — 2REM
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
  
  
      return (
        rootFontSize * 2
      );
  
    }
  
  
    /* ==========================================================================
       CREATE SWIPER
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
          "GE Media: Swiper missing."
        );
  
        return;
  
      }
  
  
      const slides =
        slider.querySelectorAll(
          ".swiper-wrapper > .swiper-slide"
        );
  
  
      if (!slides.length) {
  
        return;
  
      }
  
  
      mediaSwiper =
        new Swiper(
          slider,
          {
  
            slidesPerView:
              3,
  
  
            slidesPerGroup:
              1,
  
  
            spaceBetween:
              getMediaGap(),
  
  
            speed:
              850,
  
  
            loop:
              slides.length > 3,
  
  
            loopAdditionalSlides:
              slides.length,
  
  
            autoplay:
              slides.length > 3
                ? {
  
                    delay:
                      2500,
  
                    disableOnInteraction:
                      false,
  
                    pauseOnMouseEnter:
                      true
  
                  }
                : false,
  
  
            centeredSlides:
              false,
  
  
            grabCursor:
              true,
  
  
            allowTouchMove:
              slides.length > 1,
  
  
            simulateTouch:
              true,
  
  
            touchRatio:
              1,
  
  
            touchAngle:
              45,
  
  
            threshold:
              5,
  
  
            resistance:
              true,
  
  
            resistanceRatio:
              0.65,
  
  
            watchOverflow:
              false,
  
  
            observer:
              true,
  
  
            observeParents:
              true,
  
  
            resizeObserver:
              true,
  
  
            breakpoints: {
  
              0: {
  
                slidesPerView:
                  1.15
  
              },
  
  
              480: {
  
                slidesPerView:
                  1.4
  
              },
  
  
              768: {
  
                slidesPerView:
                  2
  
              },
  
  
              992: {
  
                slidesPerView:
                  3
  
              }
  
            }
  
          }
        );
  
    }
  
  
    /* ==========================================================================
       DESTROY SWIPER
    ========================================================================== */
  
    function destroyMediaSwiper() {
  
      if (!mediaSwiper) {
  
        return;
  
      }
  
  
      mediaSwiper.destroy(
        true,
        true
      );
  
  
      mediaSwiper =
        null;
  
    }
  
  
    /* ==========================================================================
       FILTER SLIDES
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
        normalizeText(
          selected
        );
  
  
      destroyMediaSwiper();
  
  
      wrapper.innerHTML =
        "";
  
  
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
  
  
      requestAnimationFrame(
        () => {
  
          requestAnimationFrame(
            () => {
  
              createMediaSwiper();
  
            }
          );
  
        }
      );
  
    }
  
  
    /* ==========================================================================
       MEDIA FILTER
    ========================================================================== */
  
    function initMediaFilter() {
  
      const section =
        document.querySelector(
          ".section.is--media-slider"
        );
  
  
      if (!section) return;
  
  
      const filter =
        section.querySelector(
          ".media--filter .faq--filter"
        );
  
  
      if (!filter) return;
  
  
      const trigger =
        filter.querySelector(
          ".actualite--filter-trigger"
        );
  
  
      const label =
        filter.querySelector(
          ".filter--text"
        );
  
  
      const dropdown =
        filter.querySelector(
          ".actualites--filter-drop"
        );
  
  
      const options =
        dropdown?.querySelectorAll(
          '[filter="text"]'
        );
  
  
      if (
        !trigger ||
        !label ||
        !dropdown ||
        !options?.length
      ) {
  
        return;
  
      }
  
  
      const initialLabel =
        label.textContent.trim();
  
  
      label.dataset.initialText =
        initialLabel;
  
  
      filter.classList.remove(
        "is--open"
      );
  
  
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
  
  
      /* --------------------------------------------------------------------------
         OPEN / CLOSE
      -------------------------------------------------------------------------- */
  
      function openFilter() {
  
        filter.classList.add(
          "is--open"
        );
  
  
        trigger.setAttribute(
          "aria-expanded",
          "true"
        );
  
      }
  
  
      function closeFilter() {
  
        filter.classList.remove(
          "is--open"
        );
  
  
        trigger.setAttribute(
          "aria-expanded",
          "false"
        );
  
      }
  
  
      function toggleFilter() {
  
        if (
          filter.classList.contains(
            "is--open"
          )
        ) {
  
          closeFilter();
  
        }
        else {
  
          openFilter();
  
        }
  
      }
  
  
      /* --------------------------------------------------------------------------
         TRIGGER
      -------------------------------------------------------------------------- */
  
      trigger.addEventListener(
        "click",
        (event) => {
  
          event.preventDefault();
          event.stopPropagation();
  
          toggleFilter();
  
        }
      );
  
  
      trigger.addEventListener(
        "keydown",
        (event) => {
  
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
  
            event.preventDefault();
  
            toggleFilter();
  
          }
  
  
          if (
            event.key === "Escape"
          ) {
  
            closeFilter();
  
          }
  
        }
      );
  
  
      /* --------------------------------------------------------------------------
         OPTIONS
      -------------------------------------------------------------------------- */
  
      options.forEach(
        (option) => {
  
          option.addEventListener(
            "click",
            (event) => {
  
              event.preventDefault();
              event.stopPropagation();
  
  
              const selected =
                option.textContent.trim();
  
  
              label.textContent =
                selected;
  
  
              options.forEach(
                (other) => {
  
                  other.classList.remove(
                    "is--active"
                  );
  
                }
              );
  
  
              option.classList.add(
                "is--active"
              );
  
  
              filterMediaSlides(
                selected
              );
  
  
              closeFilter();
  
            }
          );
  
        }
      );
  
  
      /* Store close function */
  
      filter._closeMediaFilter =
        closeFilter;
  
    }
  
  
    /* ==========================================================================
       OUTSIDE CLICK + ESCAPE
    ========================================================================== */
  
    function initFilterOutsideClick() {
  
      document.addEventListener(
        "click",
        (event) => {
  
          const filter =
            document.querySelector(
              ".section.is--media-slider .media--filter .faq--filter"
            );
  
  
          if (
            filter &&
            !filter.contains(
              event.target
            )
          ) {
  
            filter._closeMediaFilter?.();
  
          }
  
        }
      );
  
  
      document.addEventListener(
        "keydown",
        (event) => {
  
          if (
            event.key !==
            "Escape"
          ) {
  
            return;
  
          }
  
  
          const filter =
            document.querySelector(
              ".section.is--media-slider .media--filter .faq--filter"
            );
  
  
          filter?._closeMediaFilter?.();
  
        }
      );
  
    }
  
  })();
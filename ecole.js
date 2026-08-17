/* ========================================================================== 
   ECOL PAGE
   Requires: Swiper
   ========================================================================== */

   (() => {
    "use strict";
  
    let mediaSwiper = null;
    let originalMediaSlides = [];
  
    document.addEventListener("DOMContentLoaded", () => {
      initEcoleHero();
      initAnchorSchool();
      initMetierCards();
      initMediaSlider();
      initMediaFilter();
      initOutsideClicks();
    });
  
  
    /* ========================================================================
       HELPERS
       ======================================================================== */
  
    function normalizeText(text) {
      return (text || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }
  
  
    /* ========================================================================
       1. HERO — ECOLES DROPDOWNS + TABS CORRESPONDANCE
       ======================================================================== */
  
    function initEcoleHero() {
      const hero = document.querySelector(".section.is--ecoles-hero");
      if (!hero) return;
  
      const groups = Array.from(hero.querySelectorAll(".ecole--group"));
      const schoolLinks = Array.from(hero.querySelectorAll(".ecole--link"));
      const schoolTabs = Array.from(
        hero.querySelectorAll(".tabs--wrapper > .tabs--ecole")
      );
  
      if (!schoolLinks.length || !schoolTabs.length) return;
  
      function activateSchool(index) {
        const matchingTabs = schoolTabs[index];
        const matchingLink = schoolLinks[index];
  
        if (!matchingTabs || !matchingLink) return;
  
        schoolLinks.forEach((link, i) => {
          const active = i === index;
  
          link.classList.toggle("is--ecole-active", active);
  
          if (active) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
  
        schoolTabs.forEach((tab, i) => {
          const active = i === index;
  
          tab.classList.toggle("is--ecole-visible", active);
          tab.setAttribute("aria-hidden", active ? "false" : "true");
        });
      }
  
      /* Dropdowns fermés au chargement */
      groups.forEach((group) => {
        group.classList.remove("is--open");
  
        const trigger = group.querySelector(".ecole--triiger");
        if (!trigger) return;
  
        trigger.setAttribute("role", "button");
        trigger.setAttribute("tabindex", "0");
        trigger.setAttribute("aria-expanded", "false");
  
        function toggleGroup(event) {
          event.preventDefault();
          event.stopPropagation();
  
          const willOpen = !group.classList.contains("is--open");
  
          group.classList.toggle("is--open", willOpen);
          trigger.setAttribute(
            "aria-expanded",
            willOpen ? "true" : "false"
          );
        }
  
        /* Seul le trigger ouvre / ferme son dropdown */
        trigger.addEventListener("click", toggleGroup);
  
        trigger.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggleGroup(event);
          }
        });
      });
  
      /* Sélection école : change uniquement le contenu affiché */
      schoolLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
  
          activateSchool(index);
  
          /*
            IMPORTANT :
            on NE ferme PAS le dropdown ici.
            Il reste ouvert jusqu'au prochain clic
            sur son propre .ecole--triiger.
          */
        });
      });
  
      /* Premier lien + premier bloc Tabs actifs par défaut */
      activateSchool(0);
    }
  
    /* ========================================================================
       1.1. HERO — NAVBAR ANCHOR → ECOLE ACTIVE
       ======================================================================== */

    function initAnchorSchool() {
      const hash = window.location.hash.replace("#", "");

      if (!hash) return;

      const targetLink = document.getElementById(hash);

      if (
        !targetLink ||
        !targetLink.classList.contains("ecole--link")
      ) {
        return;
      }

      // Active l'école correspondante
      targetLink.click();

      // Attend la mise à jour du contenu avant le scroll
      setTimeout(() => {
        const hero = document.querySelector(".section.is--ecoles-hero");
        if (!hero) return;

        const offset = 80;

        const top =
          hero.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }, 100);
    }


    function closeEcoleGroup(group) {
      if (!group) return;
  
      group.classList.remove("is--open");
  
      const trigger = group.querySelector(".ecole--triiger");
      trigger?.setAttribute("aria-expanded", "false");
    }
  
    function closeAllEcoleGroups(exception = null) {
      document.querySelectorAll(".section.is--ecoles-hero .ecole--group").forEach((group) => {
        if (group !== exception) closeEcoleGroup(group);
      });
    }
  
  
    /* ========================================================================
       2. METIERS — COLOR FROM CARD BACKGROUND
       ======================================================================== */
  
    function initMetierCards() {
      const cards = document.querySelectorAll(".metier--card");
      if (!cards.length) return;
  
      cards.forEach((card) => {
        const color = window.getComputedStyle(card).backgroundColor;
  
        if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") {
          return;
        }
  
        card.style.setProperty("--metier-color", color);
      });
    }
  
  
    /* ========================================================================
       3. GENERIC FILTER DROPDOWN
       ======================================================================== */
  
    function prepareFilterLabel(filter) {
      const label = filter?.querySelector(".filter--text");
      if (!label) return null;
  
      if (!label.dataset.initialText) {
        label.dataset.initialText = label.textContent.trim();
      }
  
      label.textContent = label.dataset.initialText;
      return label;
    }
  
    function setupFilterTrigger(filter, trigger) {
      if (!filter || !trigger) return;
  
      filter.classList.remove("is--open");
  
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-expanded", "false");
  
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
  
        const isOpen = filter.classList.contains("is--open");
        closeAllFilters(filter);
  
        if (isOpen) closeFilter(filter);
        else openFilter(filter);
      });
  
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          trigger.click();
        }
  
        if (event.key === "Escape") {
          closeFilter(filter);
        }
      });
    }
  
    function openFilter(filter) {
      if (!filter) return;
      filter.classList.add("is--open");
      filter.querySelector(".actualite--filter-trigger")?.setAttribute("aria-expanded", "true");
    }
  
    function closeFilter(filter) {
      if (!filter) return;
      filter.classList.remove("is--open");
      filter.querySelector(".actualite--filter-trigger")?.setAttribute("aria-expanded", "false");
    }
  
    function closeAllFilters(exception = null) {
      document.querySelectorAll(".filter--top .faq--filter").forEach((filter) => {
        if (filter !== exception) closeFilter(filter);
      });
    }
  
  
    /* ========================================================================
       4. MEDIA SWIPER
       ======================================================================== */
  
    function cleanSwiperSlide(slide) {
      slide.classList.remove(
        "swiper-slide-active",
        "swiper-slide-next",
        "swiper-slide-prev",
        "swiper-slide-visible",
        "swiper-slide-fully-visible"
      );
  
      slide.removeAttribute("data-swiper-slide-index");
      slide.removeAttribute("aria-label");
      slide.removeAttribute("aria-hidden");
      slide.style.removeProperty("margin-right");
      slide.style.removeProperty("transform");
      slide.style.removeProperty("transition-duration");
      slide.style.removeProperty("transition-delay");
    }
  
    function saveOriginalMediaSlides() {
      const slider = document.querySelector(".swiper.is--media");
      if (!slider) return;
  
      const wrapper = slider.querySelector(".swiper-wrapper");
      if (!wrapper) return;
  
      originalMediaSlides = Array.from(wrapper.children)
        .filter((slide) => slide.classList.contains("swiper-slide"))
        .map((slide) => {
          const clone = slide.cloneNode(true);
          cleanSwiperSlide(clone);
          return clone;
        });
    }
  
    function getMediaGap() {
      const rootFontSize = parseFloat(
        window.getComputedStyle(document.documentElement).fontSize
      );
  
      return rootFontSize * 2;
    }
  
    function createMediaSwiper() {
      const slider = document.querySelector(".swiper.is--media");
      if (!slider) return;
  
      if (typeof Swiper === "undefined") {
        console.warn("ECOL: Swiper missing.");
        return;
      }
  
      const slides = slider.querySelectorAll(".swiper-wrapper > .swiper-slide");
      if (!slides.length) return;
  
      mediaSwiper = new Swiper(slider, {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: getMediaGap(),
        speed: 850,
  
        loop: slides.length > 3,
        loopAdditionalSlides: slides.length,
  
        autoplay:
          slides.length > 3
            ? {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false,
  
        centeredSlides: false,
        grabCursor: true,
        allowTouchMove: slides.length > 1,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        threshold: 5,
        resistance: true,
        resistanceRatio: 0.65,
        watchOverflow: false,
        observer: true,
        observeParents: true,
        resizeObserver: true,
  
        breakpoints: {
          0: { slidesPerView: 1.15 },
          480: { slidesPerView: 1.4 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        },
      });
    }
  
    function destroyMediaSwiper() {
      if (!mediaSwiper) return;
  
      mediaSwiper.destroy(true, true);
      mediaSwiper = null;
    }
  
    function initMediaSlider() {
      saveOriginalMediaSlides();
      createMediaSwiper();
    }
  
    function filterMediaSlides(selected) {
      const slider = document.querySelector(".swiper.is--media");
      if (!slider) return;
  
      const wrapper = slider.querySelector(".swiper-wrapper");
      if (!wrapper) return;
  
      const selectedNormalized = normalizeText(selected);
  
      destroyMediaSwiper();
      wrapper.innerHTML = "";
  
      const matchingSlides = originalMediaSlides.filter((slide) => {
        const result = slide.querySelector('[filter="result"]');
        return normalizeText(result?.textContent) === selectedNormalized;
      });
  
      matchingSlides.forEach((originalSlide) => {
        const slide = originalSlide.cloneNode(true);
        cleanSwiperSlide(slide);
        wrapper.appendChild(slide);
      });
  
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          createMediaSwiper();
        });
      });
    }
  
  
    /* ========================================================================
       5. MEDIA FILTER
       ======================================================================== */
  
    function initMediaFilter() {
      const section = document.querySelector(".section.is--home-slider");
      if (!section) return;
  
      const filter = section.querySelector(".filter--top .faq--filter");
      if (!filter) return;
  
      const trigger = filter.querySelector(".actualite--filter-trigger");
      const label = prepareFilterLabel(filter);
      const dropdown = filter.querySelector(".actualites--filter-drop");
      const options = dropdown?.querySelectorAll('[filter="text"]');
  
      if (!trigger || !dropdown || !options?.length) return;
  
      setupFilterTrigger(filter, trigger);
  
      options.forEach((option) => {
        option.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
  
          const selected = option.textContent.trim();
  
          if (label) label.textContent = selected;
  
          options.forEach((other) => other.classList.remove("is--active"));
          option.classList.add("is--active");
  
          filterMediaSlides(selected);
          closeFilter(filter);
        });
      });
    }
  
  
    /* ========================================================================
       6. OUTSIDE CLICK / ESCAPE
       ======================================================================== */
  
    function initOutsideClicks() {
      document.addEventListener("click", (event) => {
        document.querySelectorAll(".section.is--ecoles-hero .ecole--group").forEach((group) => {
          if (!group.contains(event.target)) closeEcoleGroup(group);
        });
  
        document.querySelectorAll(".filter--top .faq--filter").forEach((filter) => {
          if (!filter.contains(event.target)) closeFilter(filter);
        });
      });
  
      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
  
        closeAllEcoleGroups();
        closeAllFilters();
      });
    }
  })();
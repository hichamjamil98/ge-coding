/* =========================================================
   HOME
========================================================= */

let mediaSwiper = null;
let originalMediaSlides = [];


/* =========================================================
   HELPERS
========================================================= */

function normalizeText(text) {

  return (text || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

}


/* =========================================================
   SCHOOL CARDS
========================================================= */

function initSchoolCards() {

  const cards =
    document.querySelectorAll(".groupe--ecole-item");

  if (!cards.length) return;


  cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

      cards.forEach((otherCard) => {

        if (otherCard !== card) {
          otherCard.classList.remove("is--active");
        }

      });

      card.classList.add("is--active");

    });


    card.addEventListener("mouseleave", () => {

      card.classList.remove("is--active");

    });

  });

}


/* =========================================================
   METIER CARDS
========================================================= */

function initMetierCards() {

  const cards =
    document.querySelectorAll(".metier--card");

  if (!cards.length) return;


  cards.forEach((card) => {

    const background =
      window
        .getComputedStyle(card)
        .backgroundColor;


    if (!background) return;


    /*
    rgb(213, 255, 217)
    =>
    rgba(213, 255, 217, .85)
    */

    const values =
      background.match(/\d+/g);


    if (!values || values.length < 3) return;


    const shadowColor =
      `rgba(${values[0]}, ${values[1]}, ${values[2]}, 0.85)`;


    card.style.setProperty(
      "--metier-shadow-color",
      shadowColor
    );

  });

}


/* =========================================================
   GENERIC FILTER
========================================================= */

function setupFilterTrigger(filter, trigger) {

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


  trigger.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();


    const wasOpen =
      filter.classList.contains("is--open");


    closeAllFilters(filter);


    if (!wasOpen) {

      openFilter(filter);

    }

  });


  trigger.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      trigger.click();

    }


    if (event.key === "Escape") {

      closeFilter(filter);

    }

  });

}


/* =========================================================
   OPEN FILTER
========================================================= */

function openFilter(filter) {

  if (!filter) return;


  filter.classList.add("is--open");


  const trigger =
    filter.querySelector(
      ".actualite--filter-trigger"
    );


  trigger?.setAttribute(
    "aria-expanded",
    "true"
  );

}


/* =========================================================
   CLOSE FILTER
========================================================= */

function closeFilter(filter) {

  if (!filter) return;


  filter.classList.remove("is--open");


  const trigger =
    filter.querySelector(
      ".actualite--filter-trigger"
    );


  trigger?.setAttribute(
    "aria-expanded",
    "false"
  );

}


/* =========================================================
   CLOSE ALL FILTERS
========================================================= */

function closeAllFilters(exception = null) {

  document
    .querySelectorAll(".faq--filter")
    .forEach((filter) => {

      if (filter !== exception) {

        closeFilter(filter);

      }

    });

}


/* =========================================================
   ACTUALITES FILTER
========================================================= */

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
    section.querySelector(".faq--filter");


  const trigger =
    filter?.querySelector(
      ".actualite--filter-trigger"
    );


  const label =
    filter?.querySelector(".filter--text");


  const dropdown =
    filter?.querySelector(
      ".actualites--filter-drop"
    );


  const options =
    dropdown?.querySelectorAll(
      ".filter--link"
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
  ) return;


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


        /*
        Change le texte du trigger
        */

        if (label) {

          label.textContent = selected;

        }


        /*
        Active state
        */

        options.forEach((item) => {

          item.classList.remove(
            "is--active"
          );

        });


        option.classList.add(
          "is--active"
        );


        /*
        Filter CMS items

        Actualités utilise :
        filter="results"
        */

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
            value === selectedNormalized;


          item.style.display =
            show ? "" : "none";

        });


        closeFilter(filter);

      }
    );

  });

}


/* =========================================================
   MEDIA — SAVE ORIGINAL SLIDES
========================================================= */

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


  /*
  Sauvegarde uniquement les vraies
  slides Webflow.
  */

  originalMediaSlides =
    Array
      .from(
        wrapper.children
      )
      .filter((slide) =>
        slide.classList.contains(
          "swiper-slide"
        )
      )
      .map((slide) => {

        const clone =
          slide.cloneNode(true);


        cleanSwiperSlide(clone);


        return clone;

      });

}


/* =========================================================
   CLEAN SWIPER SLIDE
========================================================= */

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
    "role"
  );


  slide.style.removeProperty(
    "width"
  );


  slide.style.removeProperty(
    "margin-right"
  );


  slide.style.removeProperty(
    "transform"
  );

}


/* =========================================================
   CREATE MEDIA SWIPER
========================================================= */

function createMediaSwiper() {

  const slider =
    document.querySelector(
      ".swiper.is--media"
    );


  if (!slider) return;


  if (typeof Swiper === "undefined") {

    console.warn(
      "Swiper is not loaded."
    );

    return;

  }


  const numberOfSlides =
    slider.querySelectorAll(
      ".swiper-wrapper > .swiper-slide"
    ).length;


  if (!numberOfSlides) return;


  mediaSwiper =
    new Swiper(
      slider,
      {

        /*
        IMPORTANT:
        garde la largeur des slides
        définie par Webflow
        */

        slidesPerView: "auto",


        /*
        Gap demandé : 2rem
        Swiper attend des pixels.
        */

        spaceBetween: parseFloat(
          getComputedStyle(
            document.documentElement
          ).fontSize
        ) * 2,


        slidesPerGroup: 1,


        /*
        Infinite loop réel
        */

        loop:
          numberOfSlides > 1,


        loopAdditionalSlides:
          numberOfSlides,


        speed: 750,


        grabCursor: true,

        allowTouchMove: true,

        simulateTouch: true,

        centeredSlides: false,


        /*
        Évite l'effet de blocage
        */

        watchOverflow: false,

        observer: true,

        observeParents: true,

        resizeObserver: true,


        /*
        Pas d'autoplay ici.
        Le loop est infini au drag.
        */

        autoplay: false

      }
    );

}


/* =========================================================
   DESTROY MEDIA SWIPER
========================================================= */

function destroyMediaSwiper() {

  if (!mediaSwiper) return;


  mediaSwiper.destroy(
    true,
    true
  );


  mediaSwiper = null;

}


/* =========================================================
   INIT MEDIA SLIDER
========================================================= */

function initMediaSlider() {

  saveOriginalMediaSlides();

  createMediaSwiper();

}


/* =========================================================
   FILTER MEDIA
========================================================= */

function filterMediaSlides(selected) {

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


  /*
  IMPORTANT:
  destroy avant modification du DOM
  */

  destroyMediaSwiper();


  wrapper.innerHTML = "";


  const matchingSlides =
    originalMediaSlides.filter(
      (slide) => {

        /*
        Média utilise :
        filter="result"
        */

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


  /*
  Réinjecte les slides filtrées
  */

  matchingSlides.forEach(
    (originalSlide) => {

      const slide =
        originalSlide.cloneNode(true);


      cleanSwiperSlide(slide);


      wrapper.appendChild(slide);

    }
  );


  /*
  Attend que le navigateur recalcule
  les widths avant de recréer Swiper.
  */

  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      createMediaSwiper();

    });

  });

}


/* =========================================================
   MEDIA FILTER
========================================================= */

function initMediaFilter() {

  const section =
    document.querySelector(
      ".section.is--home-slider"
    );


  if (!section) return;


  const filter =
    section.querySelector(
      ".faq--filter"
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
      ".media--filter-drop"
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
  ) return;


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


        /*
        Change :
        Filter par thèmes
        =>
        Thème X
        */

        if (label) {

          label.textContent =
            selected;

        }


        /*
        Active
        */

        options.forEach((item) => {

          item.classList.remove(
            "is--active"
          );

        });


        option.classList.add(
          "is--active"
        );


        /*
        Filter slider
        */

        filterMediaSlides(
          selected
        );


        closeFilter(filter);

      }
    );

  });

}


/* =========================================================
   FILTER OUTSIDE CLICK
========================================================= */

function initFilterOutsideClick() {

  document.addEventListener(
    "click",
    (event) => {

      document
        .querySelectorAll(
          ".faq--filter"
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
        event.key === "Escape"
      ) {

        closeAllFilters();

      }

    }
  );

}


/* =========================================================
   INIT FILTERS
========================================================= */

function initFilters() {

  initActualitesFilter();

  initMediaFilter();

  initFilterOutsideClick();

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

  const items =
    document.querySelectorAll(
      ".faq--item"
    );


  if (!items.length) return;


  items.forEach((item) => {

    const question =
      item.querySelector(
        ".faq--question"
      );


    const answer =
      item.querySelector(
        ".faq--answer"
      );


    if (!question || !answer) return;


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


    /*
    Initial state
    */

    gsap.set(
      answer,
      {

        height: 0,

        opacity: 0,

        overflow: "hidden",

        pointerEvents: "none"

      }
    );


    function toggleFAQ() {

      const isOpen =
        item.classList.contains(
          "is--open"
        );


      /*
      Ferme les autres
      */

      items.forEach(
        (otherItem) => {

          if (
            otherItem === item
          ) return;


          closeFAQ(otherItem);

        }
      );


      if (isOpen) {

        closeFAQ(item);

      } else {

        openFAQ(item);

      }

    }


    question.addEventListener(
      "click",
      toggleFAQ
    );


    question.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          toggleFAQ();

        }

      }
    );

  });

}


/* =========================================================
   OPEN FAQ
========================================================= */

function openFAQ(item) {

  const question =
    item.querySelector(
      ".faq--question"
    );


  const answer =
    item.querySelector(
      ".faq--answer"
    );


  if (!answer) return;


  item.classList.add(
    "is--open"
  );


  question?.setAttribute(
    "aria-expanded",
    "true"
  );


  gsap.killTweensOf(answer);


  gsap.to(
    answer,
    {

      height: "auto",

      opacity: 1,

      duration: 0.5,

      ease: "power3.out",

      pointerEvents: "auto"

    }
  );

}


/* =========================================================
   CLOSE FAQ
========================================================= */

function closeFAQ(item) {

  const question =
    item.querySelector(
      ".faq--question"
    );


  const answer =
    item.querySelector(
      ".faq--answer"
    );


  if (!answer) return;


  item.classList.remove(
    "is--open"
  );


  question?.setAttribute(
    "aria-expanded",
    "false"
  );


  gsap.killTweensOf(answer);


  gsap.to(
    answer,
    {

      height: 0,

      opacity: 0,

      duration: 0.4,

      ease: "power3.inOut",

      pointerEvents: "none"

    }
  );

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initSchoolCards();

    initMetierCards();

    /*
    Important :
    slider AVANT le filtre média
    pour sauvegarder les slides originales.
    */

    initMediaSlider();

    initFilters();

    initFAQ();

  }
);
/* ==========================================================================
   GE — ACTUALITES PAGE — FILTER ONLY
========================================================================== */

(() => {
    "use strict";
  
  
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
  
        initActualitesFilter();
  
      }
    );
  
  
    /* ==========================================================================
       ACTUALITES FILTER
    ========================================================================== */
  
    function initActualitesFilter() {
  
      const section =
        document.querySelector(
          ".main-wrapper .section.is--padding96"
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
  
  
      const dropdown =
        filter?.querySelector(
          ".actualites--filter-drop"
        );
  
  
      const options =
        dropdown?.querySelectorAll(
          '[filter="text"]'
        );
  
  
      const items =
        section.querySelectorAll(
          ".grid--2cl.is--actualites > .w-dyn-item"
        );
  
  
      if (
        !filter ||
        !trigger ||
        !label ||
        !dropdown ||
        !options?.length ||
        !items.length
      ) {
  
        return;
  
      }
  
  
      /* --------------------------------------------------------------------------
         INITIAL STATE
      -------------------------------------------------------------------------- */
  
      const initialLabel =
        label.dataset.initialText ||
        label.textContent.trim();
  
  
      label.dataset.initialText =
        initialLabel;
  
  
      label.textContent =
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
  
  
      /* ==========================================================================
         OPEN / CLOSE
      ========================================================================== */
  
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
  
  
      /* ==========================================================================
         TRIGGER
      ========================================================================== */
  
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
  
  
      /* ==========================================================================
         OPTIONS
      ========================================================================== */
  
      options.forEach(
        (option) => {
  
          option.addEventListener(
            "click",
            (event) => {
  
              event.preventDefault();
              event.stopPropagation();
  
  
              const selected =
                option.textContent.trim();
  
  
              const selectedNormalized =
                normalizeText(
                  selected
                );
  
  
              /* LABEL */
  
              label.textContent =
                selected;
  
  
              /* ACTIVE OPTION */
  
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
  
  
              /* FILTER CMS ITEMS */
  
              items.forEach(
                (item) => {
  
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
                    show
                      ? ""
                      : "none";
  
                }
              );
  
  
              closeFilter();
  
            }
          );
  
        }
      );
  
  
      /* ==========================================================================
         OUTSIDE CLICK
      ========================================================================== */
  
      document.addEventListener(
        "click",
        (event) => {
  
          if (
            !filter.contains(
              event.target
            )
          ) {
  
            closeFilter();
  
          }
  
        }
      );
  
  
      /* ==========================================================================
         ESCAPE
      ========================================================================== */
  
      document.addEventListener(
        "keydown",
        (event) => {
  
          if (
            event.key ===
            "Escape"
          ) {
  
            closeFilter();
  
          }
  
        }
      );
  
    }
  
  })();
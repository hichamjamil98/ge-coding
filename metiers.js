/* ==========================================================================
   GE — METIERS PAGE — CARD HOVER ONLY
========================================================================== */

(() => {
    "use strict";
  
  
    document.addEventListener(
      "DOMContentLoaded",
      () => {
  
        initMetierCards();
  
      }
    );
  
  
    function initMetierCards() {
  
      const cards =
        document.querySelectorAll(
          ".metier--card"
        );
  
  
      if (!cards.length) return;
  
  
      cards.forEach(
        (card) => {
  
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
  
  
          /*
            Récupère automatiquement la couleur
            CMS/background de chaque carte.
          */
  
          card.style.setProperty(
            "--metier-color",
            color
          );
  
        }
      );
  
    }
  
  })();
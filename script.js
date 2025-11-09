/* ======================================================
   script.js — smooth auto-slide + touch-friendly carousels
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- current year (for footer) ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- auto-slide & swipe carousel ---------- */
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll("img");
    if (slides.length <= 1) return;

    let index = 0;
    let autoSlide;

    const goTo = (i, smooth = true) => {
      index = (i + slides.length) % slides.length;
      carousel.scrollTo({
        left: carousel.clientWidth * index,
        behavior: smooth ? "smooth" : "instant",
      });
    };

    const start = () => {
      stop();
      autoSlide = setInterval(() => goTo(index + 1), 2000);
    };
    const stop = () => clearInterval(autoSlide);

    /* --- touch / drag support --- */
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => {
      stop();
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener("touchmove", (e) => {
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 60) {
        goTo(index + (dx < 0 ? 1 : -1));
        startX = e.touches[0].clientX; // reset for smoother swiping
      }
    });
    carousel.addEventListener("touchend", start);

    /* --- hover pause on desktop --- */
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    /* --- kick off --- */
    start();
  });

  /* ---------- lightbox viewer ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    document.querySelectorAll(".carousel img, .cert-card img").forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.innerHTML = `
          <button class="lb-close">✕</button>
          <img src="${img.src}" alt="">
        `;
        lightbox.classList.add("show");
      });
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target.classList.contains("lb-close") || e.target === lightbox) {
        lightbox.classList.remove("show");
        lightbox.innerHTML = "";
      }
    });
  }
});

/* ======================================================
   script.js — cute & smooth auto-slide + lightbox + touch support
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 🌿 Update current year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------- 🌸 Auto-slide + touch-friendly carousel ---------- */
  const CAROUSEL_DELAY = 3500; // ⏱ change this to adjust wait time (ms)

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll("img");
    if (slides.length <= 1) return;

    let index = 0;
    let interval;
    let isUserInteracting = false;

    /* go to a particular slide */
    const goTo = (i, smooth = true) => {
      index = (i + slides.length) % slides.length;
      carousel.scrollTo({
        left: carousel.clientWidth * index,
        behavior: smooth ? "smooth" : "instant",
      });
    };

    /* autoplay controls */
    const startAuto = () => {
      if (!isUserInteracting) {
        stopAuto();
        interval = setInterval(() => goTo(index + 1), CAROUSEL_DELAY);
      }
    };
    const stopAuto = () => clearInterval(interval);

    /* touch / drag events */
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => {
      isUserInteracting = true;
      stopAuto();
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener("touchmove", (e) => {
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 60) {
        goTo(index + (dx < 0 ? 1 : -1));
        startX = e.touches[0].clientX; // reset midpoint
      }
    });
    carousel.addEventListener("touchend", () => {
      isUserInteracting = false;
      startAuto();
    });

    /* hover pause on desktop */
    carousel.addEventListener("mouseenter", () => {
      isUserInteracting = true;
      stopAuto();
    });
    carousel.addEventListener("mouseleave", () => {
      isUserInteracting = false;
      startAuto();
    });

    /* kick it off */
    startAuto();
  });


  /* ---------- 🌼 Lightbox Viewer ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    document.querySelectorAll(".carousel img, .cert-card img").forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.innerHTML = `
          <div class="lb-content">
            <button class="lb-close" aria-label="Close">✕</button>
            <img src="${img.src}" alt="${img.alt || ""}">
          </div>
        `;
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
      });
    });

    /* close on click outside or ✕ */
    lightbox.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("lb-close") ||
        e.target === lightbox
      ) {
        lightbox.classList.remove("show");
        lightbox.innerHTML = "";
        document.body.style.overflow = "";
      }
    });
  }

/* --- Mobile Navbar Toggle --- */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

  /* ---------- 🍃 Mobile Menu Toggle ---------- */
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});

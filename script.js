/* script.js — autoslide carousels, lightbox, lazy images, year, menu toggle */
document.addEventListener('DOMContentLoaded', () => {
  // --- YEAR ---
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // --- LAZY LOAD IMAGES ---
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });

  // --- AUTO SLIDE CAROUSELS ---
  document.querySelectorAll('.carousel').forEach(carousel => {
    const children = carousel.querySelectorAll('img');
    if (children.length <= 1) return;

    let idx = 0;
    const slide = () => {
      idx = (idx + 1) % children.length;
      carousel.scrollTo({ left: carousel.clientWidth * idx, behavior: 'smooth' });
    };

    let interval = setInterval(slide, 3000);

    // Pause on hover/touch
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => interval = setInterval(slide, 3000));
    carousel.addEventListener('touchstart', () => clearInterval(interval));
  });

  // --- LIGHTBOX FUNCTIONALITY ---
  const lightbox = document.getElementById('lightbox');

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightbox.innerHTML = `
      <button class="lb-close" aria-label="Close">✕</button>
      <img src="${src}" alt="${caption || ''}">
      <p class="lb-cap">${caption || ''}</p>
    `;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => (lightbox.innerHTML = ''), 200);
  }

  // Attach lightbox click handlers to certs & carousel images
  document.querySelectorAll('.cert-card img, .carousel img, .about-photo img').forEach(img => {
    img.addEventListener('click', e => {
      openLightbox(e.currentTarget.src, e.currentTarget.alt || '');
    });
  });

  // --- SCROLL REVEAL ANIMATION ---
  const revealTargets = document.querySelectorAll('.section, .cert-card, .intern-card, .edu-card');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.opacity = 1;
        en.target.style.transform = 'none';
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(t => {
    t.style.opacity = 0;
    t.style.transform = 'translateY(20px)';
    t.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    io.observe(t);
  });

  // --- MOBILE MENU TOGGLE ---
  const menuBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuBtn.classList.toggle('open');
    });
  }
});

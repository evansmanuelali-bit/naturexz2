// ============ NATUREXZ — main.js ============
(function () {
  'use strict';

  /* ---------- Header ao rolar ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  /* ---------- Cursor personalizado ---------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animateCursor() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateCursor);
  })();
  document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  /* ---------- Slideshow do hero ---------- */
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 6000);

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1600;
      const t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => cio.observe(c));

  /* ---------- Parallax suave nas imagens ---------- */
  const pImgs = document.querySelectorAll('.parallax-img img');
  window.addEventListener('scroll', () => {
    pImgs.forEach(img => {
      const r = img.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      img.style.transform = `translateY(${center * -0.08}px)`;
    });
  }, { passive: true });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.full;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLB() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLB);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

  /* ---------- Formulário (apenas front-end) ---------- */
  const form = document.getElementById('newsForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Digite um e-mail válido.';
      return;
    }
    msg.textContent = 'Bem-vindo(a) à Naturexz! Você receberá nossas histórias da floresta. 🌿';
    form.reset();
  });
})();

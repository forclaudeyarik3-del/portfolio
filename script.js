const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach((element, index) => {
    if (element.closest('.hero')) element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
    observer.observe(element);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});

const navigation = document.querySelector('.glass-nav');
const syncNavigationSurface = () => navigation?.classList.toggle('is-scrolled', window.scrollY > 420);
syncNavigationSurface();
window.addEventListener('scroll', syncNavigationSurface, { passive: true });

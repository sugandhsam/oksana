const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (!prefersReducedMotion) {
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const nav = document.querySelector(".nav");
let lastKnownScroll = 0;

const handleScroll = () => {
  if (Math.abs(window.scrollY - lastKnownScroll) < 10) {
    return;
  }
  lastKnownScroll = window.scrollY;
  nav.classList.toggle("nav--scrolled", window.scrollY > 10);
};

window.addEventListener("scroll", handleScroll, { passive: true });

if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const orbs = document.querySelectorAll(".orb");
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const updateOrbs = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    orbs.forEach((orb) => {
      const speed = Number(orb.dataset.speed || 0.4);
      orb.style.transform = `translate3d(${currentX * speed}px, ${currentY * speed}px, 0)`;
    });

    requestAnimationFrame(updateOrbs);
  };

  window.addEventListener("mousemove", (event) => {
    targetX = (event.clientX - window.innerWidth / 2) / 20;
    targetY = (event.clientY - window.innerHeight / 2) / 20;
  });

  updateOrbs();
}

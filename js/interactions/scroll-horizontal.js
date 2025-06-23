// js/interactions/scroll-horizontal.js

import { contentWrapper, scrollIndicator } from '../core/constants.js';
import { interactionReady } from './interactionState.js';

export function initHorizontalScroll() {
  let scrollPosition = 0;
  const maxScroll = contentWrapper.scrollWidth - window.innerWidth;

  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  }

  function handleScroll(e) {
    if (!interactionReady) return;
    e.preventDefault();
    scrollPosition += e.deltaY;
    scrollPosition = Math.max(0, Math.min(scrollPosition + e.deltaY * 2, maxScroll));

    gsap.to(contentWrapper, {
      scrollTo: { x: scrollPosition },
      duration: 1.5,
      ease: "power3.out",
    });

    requestAnimationFrame(updateScrollbarPosition);
  }

  function updateScrollbarPosition() {
  const maxScroll = getMaxScroll();
  const scrollPercentage = scrollPosition / maxScroll;
  const indicatorWidth = scrollIndicator.clientWidth;
  const totalVisibleWidth = contentWrapper.clientWidth * 0.8;
  const adjustedPosition = scrollPercentage * (totalVisibleWidth - indicatorWidth);

  scrollIndicator.style.transform = `translateX(${adjustedPosition}px)`;

  animateThumbsOnScroll(scrollPercentage);  
}

  function animateThumbsOnScroll(progress) {
  gsap.to('.video-thumb1, .video-thumb2', {
    scale: gsap.utils.mapRange(0, 1, 0.95, 1.05, progress),
    opacity: gsap.utils.mapRange(0, 1, 0.8, 1, progress),
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

  function updateMaxScroll() {
    // Recalculate maxScroll on resize
    scrollPosition = 0;
    gsap.set(contentWrapper, { scrollTo: { x: 0 } });
    updateScrollbarPosition();
  }

  contentWrapper.addEventListener('wheel', throttle(handleScroll, 50));

  window.addEventListener('load', () => {
    updateMaxScroll();
    window.scrollTo(0, 0);
    updateScrollbarPosition();
  });

  window.addEventListener('resize', updateMaxScroll);
  contentWrapper.addEventListener('scroll', updateScrollbarPosition);
}

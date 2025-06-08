// js/interactions/scroll-horizontal.js

import { contentWrapper, scrollIndicator } from '../core/constants.js';

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
    const scrollPercentage = scrollPosition / maxScroll;
    const indicatorWidth = scrollIndicator.clientWidth;
    const totalVisibleWidth = contentWrapper.clientWidth * 0.8;
    const adjustedPosition = scrollPercentage * (totalVisibleWidth - indicatorWidth);
    scrollIndicator.style.transform = `translateX(${adjustedPosition}px)`;
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

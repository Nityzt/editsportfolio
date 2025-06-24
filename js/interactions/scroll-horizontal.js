import { contentWrapper, scrollIndicator } from '../core/constants.js';
import { interactionReady } from './interactionState.js';

export function initHorizontalScroll() {
  const getMaxScroll = () => contentWrapper.scrollWidth - window.innerWidth;

  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let scrollVelocity = 0;
  let lastClientX = 0;
  let lastTimestamp = 0;
  let isMomentumRunning = false;
  let currentTween = null;

  contentWrapper.addEventListener('mousedown', (e) => {
    if (!interactionReady) return;
    isDragging = true;
    startX = e.clientX;
    scrollStart = contentWrapper.scrollLeft;
    scrollVelocity = 0;
    lastClientX = e.clientX;
    lastTimestamp = Date.now();

    document.body.style.cursor = 'grabbing';
    contentWrapper.classList.add('dragging');

    if (currentTween) currentTween.kill(); // stop GSAP if dragging
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const newScroll = scrollStart - dx;
    contentWrapper.scrollLeft = Math.max(0, Math.min(getMaxScroll(), newScroll));

    const dt = Date.now() - lastTimestamp || 16;
    const dxNow = e.clientX - lastClientX;
    scrollVelocity = -dxNow / dt * 16.67;

    lastClientX = e.clientX;
    lastTimestamp = Date.now();
    updateUI();
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = '';
    contentWrapper.classList.remove('dragging');

    if (Math.abs(scrollVelocity) > 0.5) {
      startMomentum();
    }
  });

  function startMomentum() {
    if (isMomentumRunning) return;
    isMomentumRunning = true;

    function step() {
      if (Math.abs(scrollVelocity) < 0.2) {
        scrollVelocity = 0;
        isMomentumRunning = false;
        return;
      }

      const newScroll = contentWrapper.scrollLeft + scrollVelocity;
      contentWrapper.scrollLeft = Math.max(0, Math.min(getMaxScroll(), newScroll));
      scrollVelocity *= 0.94;

      updateUI();
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('wheel', (e) => {
    if (!interactionReady) return;
    e.preventDefault();

    const delta = e.deltaY * 4;
    duration: 0.6;
    const targetScroll = Math.max(0, Math.min(getMaxScroll(), contentWrapper.scrollLeft + delta));

    if (currentTween) currentTween.kill();

    currentTween = gsap.to(contentWrapper, {
      scrollTo: { x: targetScroll },
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: updateUI,
    });
  }, { passive: false });

  
  function updateUI() {
    const maxScroll = getMaxScroll();
    const scrollLeft = contentWrapper.scrollLeft;
    const scrollPercentage = scrollLeft / maxScroll;

    gsap.to('.video-thumb1, .video-thumb2', {
      scale: gsap.utils.mapRange(0, 1, 0.95, 1.05, scrollPercentage),
      opacity: gsap.utils.mapRange(0, 1, 0.8, 1, scrollPercentage),
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const indicatorWidth = scrollIndicator.clientWidth;
    const totalVisibleWidth = contentWrapper.clientWidth * 0.8;
    const adjustedPosition = scrollPercentage * (totalVisibleWidth - indicatorWidth);
    scrollIndicator.style.transform = `translateX(${adjustedPosition}px)`;
  }

  window.addEventListener('load', () => {
    contentWrapper.scrollLeft = 0;
    updateUI();
  });

  window.addEventListener('resize', updateUI);
  contentWrapper.addEventListener('scroll', updateUI);
}

let touchStartX = 0;
let touchEndX = 0;

contentWrapper.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

contentWrapper.addEventListener('touchmove', e => {
  touchEndX = e.touches[0].clientX;
  const deltaX = touchStartX - touchEndX;
  scrollPosition += deltaX * 2; // adjust speed
  scrollPosition = Math.max(0, Math.min(scrollPosition, contentWrapper.scrollWidth - window.innerWidth));
  gsap.set(contentWrapper, { scrollTo: { x: scrollPosition } });
  touchStartX = touchEndX;
});
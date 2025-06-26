import { contentWrapper, scrollIndicator } from '../core/constants.js';
import { interactionReady } from './interactionState.js';

export function initHorizontalScroll() {
  const getMaxScroll = () => contentWrapper.scrollWidth - window.innerWidth;

  // Desktop drag variables
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let scrollVelocity = 0;
  let lastClientX = 0;
  let lastTimestamp = 0;
  let isMomentumRunning = false;
  let currentTween = null;

  // Touch variables
  let touchStartX = 0;
  let touchStartY = 0;
  let touchLastX = 0;
  let touchVelocity = 0;
  let touchStartTime = 0;
  let isTouchScrolling = false;
  let touchScrollStart = 0;

  // Enhanced touch detection
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Desktop mouse events
  contentWrapper.addEventListener('mousedown', (e) => {
    if (!interactionReady || isTouchDevice) return;
    e.preventDefault();
    
    isDragging = true;
    startX = e.clientX;
    scrollStart = contentWrapper.scrollLeft;
    scrollVelocity = 0;
    lastClientX = e.clientX;
    lastTimestamp = Date.now();

    document.body.style.cursor = 'grabbing';
    contentWrapper.classList.add('dragging');

    if (currentTween) currentTween.kill();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging || isTouchDevice) return;

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
    if (!isDragging || isTouchDevice) return;
    isDragging = false;
    document.body.style.cursor = '';
    contentWrapper.classList.remove('dragging');

    if (Math.abs(scrollVelocity) > 0.5) {
      startMomentum();
    }
  });

  // Enhanced touch events
  contentWrapper.addEventListener('touchstart', (e) => {
    if (!interactionReady) return;
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchLastX = touch.clientX;
    touchStartTime = Date.now();
    touchScrollStart = contentWrapper.scrollLeft;
    touchVelocity = 0;
    isTouchScrolling = false;

    if (currentTween) currentTween.kill();
  }, { passive: true });

  contentWrapper.addEventListener('touchmove', (e) => {
    if (!interactionReady) return;
    
    const touch = e.touches[0];
    const deltaX = touchStartX - touch.clientX;
    const deltaY = touchStartY - touch.clientY;
    
    // Determine scroll direction on first significant move
    if (!isTouchScrolling && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      isTouchScrolling = Math.abs(deltaX) > Math.abs(deltaY);
    }
    
    // Only handle horizontal scrolling
    if (isTouchScrolling) {
      e.preventDefault(); // Prevent vertical scroll
      
      const newScroll = touchScrollStart + deltaX;
      const clampedScroll = Math.max(0, Math.min(getMaxScroll(), newScroll));
      contentWrapper.scrollLeft = clampedScroll;
      
      // Calculate velocity for momentum
      const dt = Date.now() - touchStartTime || 16;
      const dx = touch.clientX - touchLastX;
      touchVelocity = dx / dt * 16.67;
      
      touchLastX = touch.clientX;
      updateUI();
    }
  }, { passive: false });

  contentWrapper.addEventListener('touchend', (e) => {
    if (!interactionReady || !isTouchScrolling) return;
    
    // Apply momentum if velocity is significant
    if (Math.abs(touchVelocity) > 0.5) {
      startTouchMomentum();
    }
    
    isTouchScrolling = false;
  }, { passive: true });

  // Momentum for touch
  function startTouchMomentum() {
    if (isMomentumRunning) return;
    isMomentumRunning = true;

    function step() {
      if (Math.abs(touchVelocity) < 0.2) {
        touchVelocity = 0;
        isMomentumRunning = false;
        return;
      }

      const newScroll = contentWrapper.scrollLeft - touchVelocity;
      contentWrapper.scrollLeft = Math.max(0, Math.min(getMaxScroll(), newScroll));
      touchVelocity *= 0.92; // Slightly more friction for touch

      updateUI();
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Desktop momentum (existing)
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
  if (!interactionReady || isTouchDevice) return;

  const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
  const delta = isVerticalScroll ? e.deltaY : e.deltaX;

  if (Math.abs(delta) < 1) return; // Ignore tiny scrolls (avoid noise)

  e.preventDefault();

  const targetScroll = Math.max(0, Math.min(getMaxScroll(), contentWrapper.scrollLeft + delta * 2));

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
    if (maxScroll <= 0) return; // Prevent division by zero
    
    const scrollLeft = contentWrapper.scrollLeft;
    const scrollPercentage = scrollLeft / maxScroll;

    // Smooth scale and opacity changes
    // gsap.to('.video-thumb1, .video-thumb2', {
    //   scale: gsap.utils.mapRange(0, 1, 0.95, 1.05, Math.min(scrollPercentage, 1)),
    //   opacity: gsap.utils.mapRange(0, 1, 0.8, 1, Math.min(scrollPercentage, 1)),
    //   duration: 0.25,
    //   ease: 'power2.out',
    //   overwrite: 'auto',
    // });

    // Update scroll indicator
    if (scrollIndicator) {
      const indicatorWidth = scrollIndicator.clientWidth;
      const totalVisibleWidth = contentWrapper.clientWidth * 0.8;
      const adjustedPosition = scrollPercentage * (totalVisibleWidth - indicatorWidth);
      scrollIndicator.style.transform = `translateX(${Math.max(0, adjustedPosition)}px)`;
    }
  }

  // Initialize
  window.addEventListener('load', () => {
    contentWrapper.scrollLeft = 0;
    updateUI();
  });

  window.addEventListener('resize', () => {
    updateUI();
  });

  contentWrapper.addEventListener('scroll', updateUI);
}
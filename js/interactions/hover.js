import { backgroundVideo } from '../core/constants.js';
import { interactionReady } from './interactionState.js';

let lastPlayedSrc = '';

export function initHoverThumbs() {
  const allVideoThumbs = document.querySelectorAll('.video-thumb1, .video-thumb2');

  allVideoThumbs.forEach(mainThumb => {
    let hoverTimeout;

    mainThumb.addEventListener('mouseenter', () => {
      if (!interactionReady) return;
      clearTimeout(hoverTimeout);

      const innerThumb = mainThumb.querySelector('[data-video-background]');
      const videoSrc = innerThumb?.getAttribute('data-video-background');

      if (videoSrc && backgroundVideo && videoSrc !== lastPlayedSrc) {
        const sourceElement = backgroundVideo.querySelector('source');
        if (sourceElement) {
          sourceElement.src = videoSrc;
          backgroundVideo.load();
          backgroundVideo.play();
          lastPlayedSrc = videoSrc;
        }
      }

      animateThumb(mainThumb, true);
    });

    mainThumb.addEventListener('mouseleave', () => {
      if (!interactionReady) return;
      clearTimeout(hoverTimeout);

      hoverTimeout = setTimeout(() => {
        animateThumb(mainThumb, false);
      }, 50);
    });
  });
}

function animateThumb(mainThumb, show = true) {
  const thumbGroup = mainThumb.querySelector('[class^="thumb"]');
  const match = [...thumbGroup.classList].find(cls => /^thumb\d+$/.test(cls));
  const thumbNum = match?.replace('thumb', '') || '';
  const thumbPrefix = `.thumb${thumbNum}-`;

  const elements = mainThumb.querySelectorAll(
    `${thumbPrefix}1, ${thumbPrefix}2, ${thumbPrefix}3, ${thumbPrefix}4`
  );

  gsap.killTweensOf(elements);

  const yValues = [-340, -170, 170, 340];

  elements.forEach((el, i) => {
    gsap.to(el, {
      y: show ? yValues[i] : 0,
      opacity: show ? 1 : 0,
      duration: 0.4,
      ease: show ? "power2.out" : "power2.inOut",
      overwrite: true
    });
  });
}

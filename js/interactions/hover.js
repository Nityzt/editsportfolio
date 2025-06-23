
import { backgroundVideo } from '../core/constants.js';
import { interactionReady } from './interactionState.js';

export function initHoverThumbs() {
  const allVideoThumbs = document.querySelectorAll('.video-thumb1, .video-thumb2');

  allVideoThumbs.forEach(mainThumb => {
    mainThumb.addEventListener('mouseenter', () => {
      if (!interactionReady) return;
      const innerThumb = mainThumb.querySelector('[data-video-background]');
      const videoSrc = innerThumb ? innerThumb.getAttribute('data-video-background') : null;

      if (videoSrc && backgroundVideo) {
        const sourceElement = backgroundVideo.querySelector('source');
        if (sourceElement) {
          sourceElement.src = videoSrc; 
          backgroundVideo.load();
          backgroundVideo.play();
        }
      }

      
      const thumbGroup = mainThumb.querySelector('[class^="thumb"]');
      const match = [...thumbGroup.classList].find(cls => /^thumb\d+$/.test(cls));
      const thumbNum = match?.replace('thumb', '') || '';
      const thumbPrefix = `.thumb${thumbNum}-`;

      ['1', '2', '3', '4'].forEach(num => {
        const elements = mainThumb.querySelectorAll(`${thumbPrefix}${num}`);
        gsap.killTweensOf(elements);

        const positions = [-340, -170, 170, 340];

        gsap.to(elements, {
          y: positions[num - 1],
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      });
    });

    mainThumb.addEventListener('mouseleave', () => {
      if (!interactionReady) return;
      const thumbGroup = mainThumb.querySelector('[class^="thumb"]');
      const match = [...thumbGroup.classList].find(cls => /^thumb\d+$/.test(cls));
      const thumbNum = match?.replace('thumb', '') || '';
      const thumbPrefix = `.thumb${thumbNum}-`;

      const elements = mainThumb.querySelectorAll(`${thumbPrefix}1, ${thumbPrefix}2, ${thumbPrefix}3, ${thumbPrefix}4`);
      gsap.killTweensOf(elements);

      gsap.to(elements, {
        y: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });

      if (backgroundVideo) {
        const sourceElement = backgroundVideo.querySelector('source');
        if (sourceElement) {
          sourceElement.src = 'previews/biggerpreviewedited.mp4';
          backgroundVideo.load();
          backgroundVideo.play();
        }
      }
    });
  });
}
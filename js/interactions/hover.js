// js/interactions/hover-thumbs.js

import { backgroundVideo } from '../core/constants.js';

export function initHoverThumbs() {
  const allVideoThumbs = document.querySelectorAll('.video-thumb1, .video-thumb2');

  allVideoThumbs.forEach(mainThumb => {
    mainThumb.addEventListener('mouseenter', () => {
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

      const thumbPrefix = mainThumb.classList.contains('video-thumb1') ? '.thumb1-' : '.thumb2-';

      ['1', '2', '3', '4'].forEach(num => {
        gsap.killTweensOf(mainThumb.querySelectorAll(`${thumbPrefix}${num}`));

        const positions = [-340, -170, 170, 340];

        gsap.to(mainThumb.querySelectorAll(`${thumbPrefix}${num}`), {
          y: positions[num - 1],
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      });
    });

    mainThumb.addEventListener('mouseleave', () => {
      const thumbPrefix = mainThumb.classList.contains('video-thumb1') ? '.thumb1-' : '.thumb2-';

      gsap.killTweensOf(mainThumb.querySelectorAll(`${thumbPrefix}1, ${thumbPrefix}2, ${thumbPrefix}3, ${thumbPrefix}4`));

      gsap.to(mainThumb.querySelectorAll(`${thumbPrefix}1, ${thumbPrefix}2, ${thumbPrefix}3, ${thumbPrefix}4`), {
        y: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });

      // Reset background video to default
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

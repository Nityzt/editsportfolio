// js/interactions/hover-thumbs.js

import { backgroundVideo, getAllVideoThumbs } from '../core/constants.js';

export function initHoverThumbs() {
  const allVideoThumbs = getAllVideoThumbs();

  allVideoThumbs.forEach(mainThumb => {
    mainThumb.addEventListener('mouseenter', () => {
      const videoSrc = mainThumb.getAttribute('data-video-background');
      if (videoSrc && backgroundVideo) {
        backgroundVideo.src = videoSrc;
        backgroundVideo.play();
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
        backgroundVideo.src = "previews/biggerpreviewedited.mp4";
        backgroundVideo.play();
      }
    });
  });
}

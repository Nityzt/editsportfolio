import { backgroundVideo } from '../core/constants.js';
import { interactionReady } from './interactionState.js';

let currentHoveredThumb= null;
let lastPlayedSrc = '';
let lastSnapTime = 0;
const snapCooldown = 500; // prevent rapid-fire snapping

export function initHoverThumbs() {
  const allVideoThumbs = document.querySelectorAll('.video-thumb1, .video-thumb2');

  allVideoThumbs.forEach(mainThumb => {
    let hoverTimeout;

    mainThumb.addEventListener('mouseenter', () => {
      if (!interactionReady) return;
      clearTimeout(hoverTimeout);

      currentHoveredThumb= mainThumb;

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
      // scrollThumbToCenter(mainThumb);
    });

    mainThumb.addEventListener('mouseleave', () => {
      if (!interactionReady) return;
      clearTimeout(hoverTimeout);

      hoverTimeout = setTimeout(() => {
        animateThumb(mainThumb, false);
        if (currentHoveredThumb === mainThumb) currentHoveredThumb = null;
      }, 50);
    });
  });
}

function animateThumb(mainThumb, show = true) {
  const thumbGroup = mainThumb.querySelector('[class^="thumb"]');
  const match = [...thumbGroup.classList].find(cls => /^thumb\d+$/.test(cls));
  const thumbNum = match?.replace('thumb', '') || '';
  const thumbPrefix = `.thumb${thumbNum}-`;

  // gsap.to(()=>{'mainThumb',{
  //   scale: 1.05,
  // }
  // })
  const elements = mainThumb.querySelectorAll(
    `${thumbPrefix}1, ${thumbPrefix}2, ${thumbPrefix}3, ${thumbPrefix}4`
  );

  gsap.killTweensOf(elements);

  const yValues = [-34, -17, 34, 17];

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

function scrollThumbToCenter(thumb) {
  const now = Date.now();
  if (now - lastSnapTime < snapCooldown) return;
  lastSnapTime = now;

  const wrapper = document.querySelector('.content-wrapper');
  if (!wrapper) return;

  const offsetLeft = thumb.offsetLeft;
  const centerX = offsetLeft - (wrapper.clientWidth / 2) + (thumb.clientWidth / 2);

  gsap.killTweensOf(wrapper); // Stop previous scrolls
  gsap.to(wrapper, {
    scrollTo: { x: centerX },
    duration: 0.6,
    ease: "power2.out",
    overwrite: true,
  });
}

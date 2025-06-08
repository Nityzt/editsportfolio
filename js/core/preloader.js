
import { preloader } from './constants.js';
import { animateThumbnails } from '../interactions/thumbnails.js';
import { initVideoPlayer } from '../interactions/videoplayer.js';

export function initPreloader() {
  let progress = 0;

  // Start animation while loader counts up
  animateThumbnails();

  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 2;
      preloader.innerText = `${progress}%`;
    } else {
      clearInterval(interval);

      // Fade out after loading
      gsap.to("#preloader", {
  opacity: 0,
  duration: 1,
  onComplete: () => {
    preloader.style.display = 'none';
    initVideoPlayer(); // call AFTER preloader finishes
  }
});
    }
  }, 20);
}

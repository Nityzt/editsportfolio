import { preloader } from './constants.js';
import { animateThumbnails } from '../interactions/thumbnails.js';
import { initVideoPlayer } from '../interactions/videoplayer.js';

export function initPreloader() {
  // console.log("initPreloader() called");
  let progress = 0;

  animateThumbnails();
 // console.log("animateThumbnails() called");

  const interval = setInterval(() => {
  //  console.log("progress tick:", progress);
    if (progress < 100) {
      progress += 2;
      preloader.innerText = `${progress}%`;
    } else {
      clearInterval(interval);

      console.log("✅ progress complete");
        
      gsap.to("#preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          console.log("preloader hidden");
          preloader.style.display = 'none';
          initVideoPlayer(); 
        }
      });
    }
  }, 20);
}
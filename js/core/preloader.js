
import { preloader } from '../core/constants.js';

export function initPreloader(onComplete = () => {}) {
  let progress = 0;

  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 2;
      preloader.innerText = `${progress}%`;
    } else {
      clearInterval(interval);
      gsap.to("#preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          preloader.style.display = "none";
          onComplete(); // ✅ call onComplete after preloader hides
        },
      });
    }
  }, 20);
}

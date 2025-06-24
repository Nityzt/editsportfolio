import { preloader } from './constants.js';
import { initVideoPlayer } from '../interactions/videoplayer.js';
import { animateThumbnails } from '../interactions/thumbnails.js';

export function initPreloader() {
  let progress = 0;

  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 2;
      preloader.innerText = `${progress}%`;
    } else {
      clearInterval(interval);

      const welcome = document.querySelector('#welcome');
      const enterBtn = document.getElementById('enter-button');

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 1 } });

      // Preloader exit
      tl.to("#preloader", {
        y: "20%",
        opacity: 0,
        // delay:0.1,
        duration: 2,
        onComplete: () => {
          preloader.style.display = "none";
        }
      });

      // Welcome enter
      tl.fromTo(welcome, {
        y: "-30%",
        opacity: 0
      }, {
        y: "0%",
        opacity: 1,
        duration: 2,
        // delay:0.2,
        onStart: () => {
          welcome.classList.add("visible");
          welcome.style.pointerEvents = "auto";
        }
      }, "<+0.1");

      // Init video player
      tl.call(() => initVideoPlayer());

      // Define enter logic once
      let hasEntered = false;
      function enterSite() {
        if (hasEntered) return;
        hasEntered = true;

        gsap.to(welcome, {
          opacity: 0,
          y: '80%',
          duration: 2.6,
          delay: 0,
          ease: "power4.inOut",
          onComplete: () => {
            welcome.classList.remove('visible');
            welcome.classList.add('hide');
          }
        });

        animateThumbnails();

        setTimeout(() => {
          document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }

      // Button click
      if (enterBtn) {
        enterBtn.addEventListener('click', enterSite);
      }

      // Scroll listener (fires once)
      window.addEventListener('wheel', function scrollOnce() {
        enterSite();
        window.removeEventListener('wheel', scrollOnce);
      }, { passive: true });
    }
  }, 20);
}

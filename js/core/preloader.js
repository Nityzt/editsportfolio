import { preloader } from './constants.js';
import { initVideoPlayer } from '../interactions/videoplayer.js';
import { animateThumbnails } from '../interactions/thumbnails.js';



export function initPreloader() {
  let progress = 0;

  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 4;
      
      preloader.innerText = `${progress}%`;
    } else {
      clearInterval(interval);

      const welcome = document.querySelector('#welcome');
      // const enterBtn = document.getElementById('enter-button');

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 1 } });

      // Preloader exit
      tl.to("#preloader", {
        y: "35%",
        opacity: 0,
         delay:0.1,
        duration: 1.2,
        ease:'power2.inOut',

        onComplete: () => {
          preloader.style.display = "none";
          const welcomeVideo = document.getElementById('welcome-video');
if (welcomeVideo) {
  welcomeVideo.playbackRate = 0.5; // slower (0.5 is half speed, 2 is double speed)
}
        }
      });

      // Welcome enter
      tl.fromTo(welcome, {
        y: "-30%",
        opacity: 0,
        scale:1,
      }, {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        scale:1,
        // delay:0.2,
        ease: 'power2.inOut',
        onStart: () => {
          welcome.classList.add("visible");
          welcome.style.pointerEvents = "auto";
        }
      }, "<+0.1");

      tl.fromTo("#welcome h2",{
        opacity:0,
        y:10,
        delay:0,
        
      },{
        opacity:1,
        // y:30,
        delay:0.5,
        ease: 'Bounce.Out'

      },  "<+0.1");

      tl.fromTo("#welcome p",{
        opacity:0,
        y:30,
        delay:0,
        
      },{
        opacity:1,
        y:10,
        delay:0.1,
        ease: 'Bounce.Out'

      },  "<+0.1");

      

      // tl.fromTo("#enter-button",{
      //   opacity:0,
      //   y:0,
      //   delay:0,
        
      // },{
      //   opacity:1,
      //   y:30,
      //   delay:0.2,
      //   ease: 'Bounce3.Out'

      // },  "<+0.1");

    

      // Init video player
      tl.call(() => initVideoPlayer());

      // Define enter logic once
      let hasEntered = false;
      function enterSite() {
        if (hasEntered) return;
        hasEntered = true;

        const t2 = gsap.timeline({ defaults: { ease: "power3.inOut", } });
        t2.to("#welcome p",{
        opacity:0,
        y:50,
        delay:0,
        duration:1,
        ease: 'Bounce.Out'

      },  );

      tl.to("#welcome h2",{
        opacity:0,
        y:40,
        delay:0,
        duration:1,
        ease: 'Bounce.Out'

      },  "<+0.1");

      tl.to(welcome, {
          opacity: 0,
          y: '60%',
          duration: 2,
          delay: 0,
          ease: "power3.inOut",
          onComplete: () => {
            welcome.classList.remove('visible');
            welcome.classList.add('hide');
          }
        }, "<+0.1");

        animateThumbnails();

        setTimeout(() => {
          document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }

      // Button click
      if (welcome) {
        welcome.addEventListener('click', enterSite);
      }

      // Scroll listener (fires once)
      window.addEventListener('wheel', function scrollOnce() {
        enterSite();
        window.removeEventListener('wheel', scrollOnce);
      }, { passive: true });
    }
  }, 20);
}

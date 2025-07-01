import { initPreloader } from './core/preloader.js';
import { initHoverThumbs } from './interactions/hover.js';
import { initVideoPlayer } from './interactions/videoplayer.js';
import { fadeBackgroundVideoIn } from './interactions/fade-background-video.js';
import { initHorizontalScroll } from './interactions/scroll-horizontal.js';
import { initIdleAnimation } from './interactions/idle-animation.js';
import { animateThumbnails } from './interactions/thumbnails.js';
import { Cursor } from './core/cursor.js';


Cursor();

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

const welcome = document.getElementById('welcome');

let hasEntered = false;

function enterSite() {

  if (hasEntered) return;

  hasEntered = true;

  if(!welcome) return;

  console.log('Removing .visible and adding .hide');
  
  welcome?.classList.remove('visible');
  void welcome.offsetWidth;
  
  welcome.classList.add('hide');

  animateThumbnails();
  fadeBackgroundVideoIn();

  setTimeout(() => {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHoverThumbs();
  initHorizontalScroll();

  const enterBtn = document.getElementById('enter-button');
  if (welcome) {
    welcome.addEventListener('click', enterSite);
  }

  window.addEventListener('wheel', () => {
    if (!hasEntered) enterSite();
  }, { once: true });
});
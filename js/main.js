import { initPreloader } from './core/preloader.js';
import { initHoverThumbs } from './interactions/hover.js';
import { initVideoPlayer } from './interactions/videoplayer.js';
import { fadeBackgroundVideoIn } from './interactions/fade-background-video.js';
import { initHorizontalScroll } from './interactions/scroll-horizontal.js';
import { initIdleAnimation } from './interactions/idle-animation.js';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHoverThumbs();
  initVideoPlayer();
  fadeBackgroundVideoIn();
  initHorizontalScroll();
  initIdleAnimation();
});
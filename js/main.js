import { initPreloader } from './core/preloader.js';
import { initHoverThumbs } from './interactions/hover.js';
import { initVideoPlayer } from './interactions/videoplayer.js';
import { fadeBackgroundVideoIn } from './interactions/fade-background-video.js';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHoverThumbs();
  initVideoPlayer();
  fadeBackgroundVideoIn();
});
import { initPreloader } from './core/preloader.js';
import { initHoverThumbs } from './interactions/hover.js';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHoverThumbs();
});
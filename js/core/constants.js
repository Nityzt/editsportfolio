export const contentWrapper = document.querySelector('.content-wrapper');
export const scrollIndicator = document.querySelector('.scroll-indicator');
export const backgroundVideo = document.getElementById('background-videodefault');
export const preloader = document.getElementById('preloader');
export const mainThumbs = document.querySelectorAll('[data-video]');
export function getAllVideoThumbs() {
  return document.querySelectorAll('.video-thumb1, .video-thumb2');
}
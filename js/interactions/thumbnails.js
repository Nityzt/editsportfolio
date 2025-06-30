// js/interactions/thumbnails.js

import { disableInteractions } from "./interactionState.js";
import { enableInteractions } from "./interactionState.js";

export function animateThumbnails() {
  disableInteractions();
  gsap.to(".scroll-indicator", {
    opacity: 0,
    duration: 0,
    ease: "power3.inOut",
    delay: 0,
  });

  gsap.to(".video-thumb2", {
    x: -500,
    margin: 0,
    opacity: 0,
    duration: 0,
    ease: "power3.inOut",
    stagger: 0.15,
  });

  gsap.to(".video-thumb1", {
    x: 200,
    opacity: 0,
    duration: 0,
    ease: "power3.inOut",
    stagger: 0.15,
  });

  gsap.to(".video-thumb1", {
    y: 0,
    margin: 0,
    duration: 2.5,
    ease: "power3.inOut",
    stagger: 0.15,
    delay: 0.1,
  });

  gsap.to(".video-thumb1", {
    opacity: 1,
    duration: 2,
    ease: "power3.inOut",
    stagger: 0.15,
    delay: 1,
  });

  gsap.to(".video-thumb2", {
    opacity: 1,
    y: 0,
    duration: 2.5,
    delay: 2,
    ease: "power3.inOut",
    stagger: 0.15,
  });

  gsap.to(".video-thumb1", {
    margin: '2.5vw',
    x: '-27.2vw',
    duration: 2,
    ease: "power3.inOut",
    delay: 2,
  });

  gsap.to(".video-thumb2", {
    margin: '2.5vw',
    duration: 3,
    ease: "power3.inOut",
    delay: 1,
  });

  gsap.to(".video-thumb1", {
    x: 0,
    duration: 2,
    ease: "power3.inOut",
    delay: 3.8,
  });

  gsap.to(".video-thumb2", {
    x: 0,
    duration: 2,
    ease: "power3.inOut",
    delay: 3.8,
  });

  gsap.to(".scroll-indicator", {
    opacity: 1,
    duration: 1,
    ease: "power3.inOut",
    delay: 5,
  });

  setTimeout(()=>{
    enableInteractions();
  }, 5000);

  return Promise.resolve();
}
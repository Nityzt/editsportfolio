export function fadeBackgroundVideoIn() {
  gsap.to("#background-videodefault", {
    opacity: 0.2,
    duration: 1.5,
    ease: "power3.in",
    delay: 1.2, // No delay needed anymore, your new preloader is fast
  });
}
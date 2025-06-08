// js/interactions/idle-animation.js

export function initIdleAnimation() {
  let idleTimeout;
  let firstTime = true;

  const idleAnimation = gsap.to([".video-thumb1", ".video-thumb2"], {
    scale: 1.05,
    rotation: 0,
    ease: "bounce.Out",
    duration: 0.8,
    delay: 0.5,
    paused: true,
    repeat: -1,
    yoyo: true,
  });

  function resetIdleTimer() {
    idleAnimation.pause();
    clearTimeout(idleTimeout);

    gsap.to([".video-thumb1", ".video-thumb2"], {
      scale: 1,
      rotation: 0,
      opacity: 1,
      ease: "power2.Out",
      duration: 0.5,
    });

    let delay = firstTime ? -2000 : 0;

    idleTimeout = setTimeout(() => {
      idleAnimation.play();
      firstTime = false;
    }, 10000 + delay);
  }

  // Add event listeners to track user activity
  window.addEventListener("mousemove", resetIdleTimer);
  window.addEventListener("keydown", resetIdleTimer);
  window.addEventListener("scroll", resetIdleTimer);

  // Start the idle timer initially
  resetIdleTimer();
}

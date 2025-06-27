export function fadeBackgroundVideoIn() {
  const video = document.getElementById('background-videodefault');
  if (!video) return;

  video.pause();
  video.currentTime = 0;

  gsap.to(video, {
    opacity: 0.1,
    duration: 3,
    ease: "power3.in",
    delay: 0.5,
    onStart: () => {
      video.play().catch(err => {
        console.warn('Background video failed to play:', err);
      });
    }
  });
}
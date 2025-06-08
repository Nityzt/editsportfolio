// js/interactions/videoplayer.js

import { backgroundVideo } from '../core/constants.js';

export function initVideoPlayer() {
  const backgroundPlayerVideo = document.getElementById('background-video-player');
  const backgroundPlayerSource = backgroundPlayerVideo ? backgroundPlayerVideo.querySelector('source') : null;

  document.querySelectorAll('.video-thumb1, .video-thumb2').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const videoId = thumb.getAttribute('data-video')
        || thumb.querySelector('[data-video]')?.getAttribute('data-video');

      const videoPlayer = document.getElementById('video-player');
      const video = document.querySelector('#video-player iframe');

      

      // Always open the player first
      videoPlayer.style.display = 'block';

      // Set the source of the iframe to the YouTube embed link or local video
      if (videoId.endsWith('.mp4')) {
        video.src = videoId;
      } else {
        video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
      }

      // Now trigger background fade safely
      if (backgroundPlayerVideo && backgroundPlayerSource) {
        backgroundPlayerSource.src = 'previews/player-background.mp4';
        backgroundPlayerVideo.load();
        backgroundPlayerVideo.play().catch(err => {
          console.log('Background player play interrupted:', err);
        });

        gsap.to('#background-video-player', {
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut'
        });
      }
    });
  });

  // Close player logic:
  document.getElementById('close-player').addEventListener('click', () => {
    const videoPlayer = document.getElementById('video-player');
    const video = document.querySelector('#video-player iframe');

    videoPlayer.style.display = 'none';
    video.src = '';

    // Fade out background player video and pause it safely
    if (backgroundPlayerVideo) {
      gsap.to('#background-video-player', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          backgroundPlayerVideo.pause();
        }
      });
    }
  });

  // Optional: Close player on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const videoPlayer = document.getElementById('video-player');
      const video = document.querySelector('#video-player iframe');

      videoPlayer.style.display = 'none';
      video.src = '';

      if (backgroundPlayerVideo) {
        gsap.to('#background-video-player', {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            backgroundPlayerVideo.pause();
          }
        });
      }
    }
  });
}

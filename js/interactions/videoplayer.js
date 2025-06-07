// js/interactions/video-player.js

export function initVideoPlayer() {
  const videoPlayer = document.getElementById('video-player');
  const closePlayerButton = document.getElementById('close-player');
  const videoFrame = document.querySelector('#video-player iframe');

  // Attach click listeners to video-thumb wrappers
  document.querySelectorAll('.video-thumb1, .video-thumb2').forEach(thumbWrapper => {
    thumbWrapper.addEventListener('click', (event) => {
      // Find the closest element with data-video (could be the inner .thumbX)
      const target = event.target.closest('[data-video]');

      if (target) {
        const videoId = target.getAttribute('data-video');

        // Only open player if data-video exists
        if (videoId) {
          // Check if it's a YouTube ID or a .mp4
          if (videoId.endsWith('.mp4')) {
            videoFrame.src = videoId; // Play raw mp4
          } else {
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
          }

          videoPlayer.style.display = 'block';
        }
      }
    });
  });

  // Close button
  closePlayerButton.addEventListener('click', () => {
    closeVideoPlayer(videoPlayer, videoFrame);
  });

  // Escape key support
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeVideoPlayer(videoPlayer, videoFrame);
    }
  });
}

function closeVideoPlayer(videoPlayer, videoFrame) {
  videoPlayer.style.display = 'none';
  videoFrame.src = '';
}

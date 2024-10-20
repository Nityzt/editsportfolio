
// video player
document.querySelectorAll('.video-thumb1').forEach(thumb1 => {
    thumb1.addEventListener('click', () => {
        const videoId = thumb1.getAttribute('data-video');
        const videoPlayer = document.getElementById('video-player');
        const video = document.querySelector('#video-player iframe');

        // Set the source of the iframe to the YouTube embed link
        video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

        videoPlayer.style.display = 'block';

    });
});

document.querySelectorAll('.video-thumb2').forEach(thumb2 => {
    thumb2.addEventListener('click', () => {
        const videoId = thumb2.getAttribute('data-video');
        const videoPlayer = document.getElementById('video-player');
        const video = document.querySelector('#video-player iframe');

        // Set the source of the iframe to the YouTube embed link
        video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

        videoPlayer.style.display = 'block';

    });
});


document.getElementById('close-player').addEventListener('click', () => {
    const videoPlayer = document.getElementById('video-player');
    const video = document.querySelector('#video-player iframe');
    
    // Hide the video player
    videoPlayer.style.display = 'none';
    
    // Stop the video playback by removing the source
    video.src = '';
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const videoPlayer = document.getElementById('video-player');
        const video = document.querySelector('#video-player iframe');

        // Hide the video player
        videoPlayer.style.display = 'none';
        
        // Stop the video playback
        video.src = '';
    }
});



let idleTimeout;
let firstTime = true;
const idleAnimation = gsap.to([".video-thumb1", ".video-thumb2"], {
    scale: 1.05,       // Slight zoom in
    rotation: 0,       // Small rotation      // Slight opacity change
    ease: "bounce.Out",
    duration: 0.8,
    delay:0.5,
    paused: true,
    repeat: -1,         // Infinite loop
    yoyo: true,          // Go back and forth
    
});

// Reset idle timer on any activity
function resetIdleTimer() {
    idleAnimation.pause();
    clearTimeout(idleTimeout);
    gsap.to([".video-thumb1", ".video-thumb2"], {
        scale: 1,    // Original scale
        rotation: 0,    // Original rotation
        opacity: 1,     // Original opacity
        ease: "power2.Out",
        duration: 0.5,    // Duration for easing back
    });

    let delay = firstTime ? -2000 : 0;

    idleTimeout = setTimeout(() => {
        idleAnimation.play();  // Play idle animation after being idle for 10 seconds
        firstTime = false;  
    }, 10000 + delay);  // Adjust the idle time as needed
}

// Add event listeners to track user activity
window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('keydown', resetIdleTimer);
window.addEventListener('scroll', resetIdleTimer);


resetIdleTimer();


const backgroundVideo = document.getElementById('background-videodefault');

document.querySelectorAll('.video-thumb1, .video-thumb2').forEach(function(mainThumb) {
    mainThumb.addEventListener('mouseenter', function() {
        console.log("Hovered: ", mainThumb);  // Debugging hover
        // Select all sub-thumbnails within this main thumbnail

       

        const videoSrc = mainThumb.getAttribute('data-video-background');
        console.log("Video Source: ", videoSrc);  // Check the value of the attribute
        
       
            backgroundVideo.play()
        
            
        

    gsap.killTweensOf(mainThumb.querySelectorAll('.thumb1-1, .thumb2-1, .thumb3-1, .thumb4-1, .thumb5-1, .thumb6-1,.thumb7-1,.thumb8-1'));
    gsap.killTweensOf(mainThumb.querySelectorAll('.thumb1-2, .thumb2-2, .thumb3-2, .thumb4-2, .thumb5-2, .thumb6-2, .thumb7-2, .thumb8-2'));
    gsap.killTweensOf(mainThumb.querySelectorAll('.thumb1-3, .thumb2-3, .thumb3-3, .thumb4-3, .thumb5-3, .thumb6-3, .thumb7-3, .thumb8-3'));
    gsap.killTweensOf(mainThumb.querySelectorAll('.thumb1-4, .thumb2-4, .thumb3-4, .thumb4-4, .thumb5-4, .thumb6-4, .thumb7-4, .thumb8-4'));

        gsap.to(mainThumb.querySelectorAll('.thumb1-1, .thumb2-1, .thumb3-1, .thumb4-1, .thumb5-1, .thumb6-1,.thumb7-1,.thumb8-1'), {
            y: -340, // Move up by the height of the thumbnails
            opacity: 1,
            
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
        gsap.to(mainThumb.querySelectorAll('.thumb1-2, .thumb2-2, .thumb3-2, .thumb4-2, .thumb5-2, .thumb6-2, .thumb7-2, .thumb8-2'), {
            y: -170, // Move up by the height of the thumbnails
            opacity: 1,
            
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
        gsap.to(mainThumb.querySelectorAll('.thumb1-3, .thumb2-3, .thumb3-3, .thumb4-3, .thumb5-3, .thumb6-3, .thumb7-3, .thumb8-3'), {
            y: 170, // Move up by the height of the thumbnails
            opacity: 1,
            
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
        gsap.to(mainThumb.querySelectorAll('.thumb1-4, .thumb2-4, .thumb3-4, .thumb4-4, .thumb5-4, .thumb6-4, .thumb7-4, .thumb8-4'), {
            y: 340, // Move up by the height of the thumbnails
            opacity: 1,
            
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    });

    mainThumb.addEventListener('mouseleave', function() {
        console.log("Mouse left: ", mainThumb);  // Debugging mouse leave

        gsap.killTweensOf(mainThumb.querySelectorAll('.thumb1-1, .thumb1-2, .thumb1-3, .thumb1-4, .thumb2-1, .thumb2-2, .thumb2-3, .thumb2-4, .thumb3-1, .thumb3-2, .thumb3-3, .thumb3-4, .thumb4-1, .thumb4-2, .thumb4-3, .thumb4-4, .thumb5-1, .thumb5-2, .thumb5-3, .thumb5-4, .thumb6-1, .thumb6-2, .thumb6-3, .thumb6-4, .thumb8-1, .thumb8-2, .thumb8-3, .thumb8-4, .thumb7-1, .thumb7-2, .thumb7-3, .thumb7-4'));
        gsap.to(mainThumb.querySelectorAll('.thumb1-1, .thumb1-2, .thumb1-3, .thumb1-4,.thumb2-1, .thumb2-2, .thumb2-3, .thumb2-4 ,.thumb3-1, .thumb3-2, .thumb3-3, .thumb3-4,.thumb4-1, .thumb4-2, .thumb4-3, .thumb4-4,.thumb5-1, .thumb5-2, .thumb5-3, .thumb5-4,.thumb6-1, .thumb6-2, .thumb6-3, .thumb6-4 ,.thumb8-1, .thumb8-2, .thumb8-3, .thumb8-4,.thumb7-1, .thumb7-2, .thumb7-3, .thumb7-4'), {
            y: 0, // Move back to original position
            opacity: 0, // Hide again
            duration: 0.2,
            ease: "power2.inOut"
            
        });
        backgroundVideo.src = "previews/biggerpreviewedited.mp4"; // Set your default video here
        backgroundVideo.play();

    });
});
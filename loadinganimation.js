let progress = 0;
const preloader = document.getElementById('preloader');
const interval = setInterval(() => {
    if (progress < 100) {
        progress = progress +2;
        preloader.innerText = progress + '%';
    } else {
        clearInterval(interval);
        gsap.to("#preloader", {opacity: 0, duration: 1, onComplete: () => preloader.style.display = 'none'});
        animateThumbnails0();
        animateThumbnails1();
        animateThumbnails2();
        animateThumbnails3();
        animateThumbnails4();
        animateThumbnails5();
        animateThumbnails6();
        animateThumbnails7();
        animateThumbnails8();
        animateThumbnails9();
        animateThumbnails10();
        animatebgvideo();
    }
}, 20);

function animatebgvideo(){
    gsap.to("#background-videodefault", {

        opacity: 0.2,
        duration: 1.5,
        ease:"power3.in",
        delay:4,
        })
}

function animateThumbnails0(){

    gsap.to(".scroll-indicator", {

        opacity: 0,
        
        duration:0,
        ease: "power3.inOut",
        delay: 0,
    } );
}

function animateThumbnails1() {
    
    gsap.to(".video-thumb2", {
        
           // Fade in
        x:-500,
        margin:0,
        
                // Move to original position
        duration: 0,
        ease: "power3.inOut",
        stagger: 0.15,

    });
}

function animateThumbnails2() {
    
    gsap.to(".video-thumb1", {
        
              // Fade in
        x:200,
        
                // Move to original position
        duration: 0,
        ease: "power3.inOut",
        stagger: 0.15,
    });
}


function animateThumbnails3() {
    
    gsap.to(".video-thumb1", {
        
                 // Fade in
        y: 0,
        margin: 0,
        
                // Move to original position
        duration: 3,
        ease: "power3.inOut",
        stagger: 0.15,
        delay: 0.1,
        
    });
}
function animateThumbnails4() {
    
    gsap.to(".video-thumb1", {
        
        opacity: 1,          // Fade in
       
        
                // Move to original position
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.15,
        delay: 1,
    });
}


function animateThumbnails5() {
    
    gsap.to(".video-thumb2", {
        
        opacity: 1,          // Fade in
        y: 0,
        
                // Move to original position
        duration: 2.5,
        delay: 2,
        ease: "power3.inOut",
        stagger: 0.15,
    });
}

function animateThumbnails6(){

    gsap.to(".video-thumb1", {
        margin: '2.5vw',
        x: -500,
        duration:2 ,
        ease: "power3.inOut",
        delay: 2,
    } );
}

function animateThumbnails7(){

    gsap.to(".video-thumb2", {
        margin: '2.5vw',
        
        duration:3,
        ease: "power3.inOut",
        delay: 1,
    } );
}

function animateThumbnails8(){

    gsap.to(".video-thumb1", {

        x:260,
        
        duration:2,
        ease: "power3.inOut",
        delay: 4,
    } );
}
function animateThumbnails9(){

    gsap.to(".video-thumb2", {

        x:260,
        
        duration:2,
        ease: "power3.inOut",
        delay: 4,
    } );
}
function animateThumbnails10(){

    gsap.to(".scroll-indicator", {

        opacity: 1,
        
        duration:1,
        ease: "power3.inOut",
        delay: 5,
    } );
}

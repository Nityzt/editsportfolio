gsap.registerPlugin(ScrollToPlugin);


gsap.registerPlugin(ScrollTrigger);



// Horizontal scroll logic
const contentWrapper = document.querySelector('.content-wrapper');
let scrollPosition = 0;
const maxScroll = contentWrapper.scrollWidth - window.innerWidth; 

// Throttle function to limit scroll events
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

contentWrapper.addEventListener('wheel', throttle(handleScroll, 50));

// Function to handle mouse wheel event
function handleScroll(e) {
    // Prevent default vertical scroll
    e.preventDefault();

    // Update scroll position based on wheel delta
    scrollPosition += e.deltaY;

    // Ensure scroll position stays within bounds
    scrollPosition = Math.max(0, Math.min(scrollPosition + e.deltaY*2 , maxScroll));

    // Smoothly scroll to the updated position using GSAP's ScrollToPlugin
    gsap.to(contentWrapper, {
        scrollTo: { x: scrollPosition }, // Scroll horizontally
        duration: 1.5,  // Duration of the scroll animation
        ease: "power3.out"        
    });

    requestAnimationFrame(updateScrollbarPosition);
    
}

function updateScrollbarPosition() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollPercentage = scrollPosition / maxScroll;
    const indicatorWidth = scrollIndicator.clientWidth;

    // Set the position of the scrollbar indicator
    const totalVisibleWidth = contentWrapper.clientWidth*0.8;
    const adjustedPosition = scrollPercentage * (totalVisibleWidth - indicatorWidth);
    scrollIndicator.style.transform = `translateX(${adjustedPosition}px)`;
}


window.addEventListener('load', () => {
    updateMaxScroll();
    window.scrollTo(0, 0); // Start at the top
    updateScrollbarPosition(); 
});

window.addEventListener('resize', updateScrollIndicator);



// Call updateScrollIndicator on scroll to adjust the position if needed
contentWrapper.addEventListener('scroll', updateScrollIndicator);
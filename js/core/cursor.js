export function Cursor(){
    gsap.set('.cursor-circle', { xPercent: -50, yPercent: -50 });

const circle = document.querySelector('.cursor-circle');
let colorIndex = 0;
let lastColorChange = 0;
const colorChangeInterval = 150; // ms

let currentColor = getColor(); // initial color

function getColor() {
  const colors = ['#ffff00', '#b0ff00', '#00f7ff', '#7b5cff', '#fc06cd'];
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
}

 let moveTimeout;
  
document.addEventListener('mousemove', (e) => {
  const now = Date.now();

  // Update color if enough time has passed
  if (now - lastColorChange > colorChangeInterval) {
    currentColor = getColor();
    lastColorChange = now;
  }

  // const t1 = gsap.timeline();

 
  // Fade in once
  if (parseFloat(getComputedStyle(circle).opacity) === 0) {
    gsap.to(circle, {
      duration: 1.2,
      opacity: 1,
    });
  }

  if (now - lastColorChange > colorChangeInterval) {
    currentColor = getColor();
    lastColorChange = now;
  }

  gsap.to(circle, {
    duration: 0.3,
    scale: 1.5,
    delay:0.05,
    x: e.clientX,
    y: e.clientY,
    backgroundColor: currentColor,
    ease: "power3.out",
  });

  // Clear any previous stop timeout
  clearTimeout(moveTimeout);

  // Set timeout to scale back down after user stops moving
  moveTimeout = setTimeout(() => {
    gsap.to(circle, {
      duration: 0.5,
      scale: 1,
      ease: "power3.out"
    });
  }, 100); // delay before scaling down (adjust to taste)
});

// Scale on link/button hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(circle, { scale: 1.5 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(circle, { scale: 1 });
  });
});

}
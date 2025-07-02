export function Cursor() {
  gsap.set('.cursor-circle', { xPercent: -50, yPercent: -50 });

  const circle = document.querySelector('.cursor-circle');
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { x: pos.x, y: pos.y };
  let velocity = { x: 0, y: 0 };
  let colorIndex = 0;
  let lastColorChange = 0;
  const colorChangeInterval = 150;
  let currentColor = getColor();

  function getColor() {
    const colors = ['#f7ff00', '#b0ff00', '#00f7ff', '#7b5cff', '#fc06cd'];
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  }

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;

    const now = Date.now();
    if (now - lastColorChange > colorChangeInterval) {
      currentColor = getColor();
      lastColorChange = now;
    }

    // Fade in on first movement
    if (parseFloat(getComputedStyle(circle).opacity) === 0) {
      gsap.to(circle, {
        duration: 0.2,
        opacity: 1,
        ease: 'power3.inOut',
        delay: 0.1,
      });
    }
  });

  // Smooth animation loop
  gsap.ticker.add(() => {
    // Interpolate position
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;
    pos.x += dx * 0.2;
    pos.y += dy * 0.2;

    // Calculate velocity
    velocity.x = dx;
    velocity.y = dy;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const stretch = Math.min(speed / 50, 0.75); // max stretch
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Apply transform
    gsap.set(circle, {
      x: pos.x,
      y: pos.y,
      backgroundColor: currentColor,
      scaleX: 1 + stretch*1.4,
      scaleY: 1 - stretch*0.6,
      rotation: angle,
      transformOrigin: 'center',
      delay:0.05,
    });
  });

  // Scale up on link/button hover
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(circle, { scale: 1.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(circle, { scale: 1, duration: 0.3 });
    });
  });
}

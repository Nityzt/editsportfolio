import { getAllVideoThumbs } from "../core/constants.js";
import { mainThumbs } from "../core/constants.js";
export function playClickAnimation(thumb) {
  // Animate the sub-thumbs out
  const subThumb1 = thumb.querySelectorAll('[class*="-1"]');
  const subThumb2 = thumb.querySelectorAll('[class*="-2"]');
  const subThumb3 = thumb.querySelectorAll('[class*="-3"]');
  const subThumb4 = thumb.querySelectorAll('[class*="-4"]');

  const t3 = gsap.timeline();

//     t3.to(mainThumbs,{
//     x:'30vw',
//   })

  t3.to(subThumb1, {
    opacity: 1,
    y: '-20vw',
    
    ease: 'power1.inOut',
  });
    t3.to(subThumb3,{
    opacity:1,
    y:'20vw',
    
    ease: 'power1.inOut',
  },"-=0.6");
  t3.to(subThumb2, {
    opacity: 1,
    y: '-10vw',
    
    ease: 'power1.inOut',
  },"-=0.5");
  t3.to(subThumb4,{
    opacity:1,
    y:'10vw',
    
    ease: 'power1.inOut',
  },"-=0.6");
  


  
  return t3;
}
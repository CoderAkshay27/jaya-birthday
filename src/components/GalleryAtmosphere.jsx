import { motion, useScroll, useTransform } from 'motion/react';
// A bounded, CSS-animated layer. Motion shares its scroll scheduler with the page.
export default function GalleryAtmosphere({target,reduced,active}) {
 const {scrollYProgress}=useScroll({target,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,1],[-22,22]);
 return <div className="gallery-atmosphere" aria-hidden="true" data-active={active&&!reduced}>
  <div className="gallery-blush"/>
  <motion.div className="gallery-starfield" style={{y:reduced?0:y}}>
   {Array.from({length:20},(_,i)=><span className="gallery-star" key={i} style={{left:`${(i*31+9)%96}%`,top:`${(i*19+6)%95}%`,'--delay':`${-(i%6)}s`}}/>)}
  </motion.div>
  {!reduced&&Array.from({length:6},(_,i)=><span key={i} className="gallery-rain-heart" style={{left:`${8+i*17}%`,'--delay':`${-i*3}s`,'--duration':`${17+i*2}s`}}>♥</span>)}
 </div>;
}

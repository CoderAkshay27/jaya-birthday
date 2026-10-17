import { useState, useCallback, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { gallery } from '../data/gallery';
import Photo from './Photo';
import GalleryLightbox from './GalleryLightbox';
import GalleryAtmosphere from './GalleryAtmosphere';
const entrances=[
 {opacity:0,scale:.91,y:0,x:0,rotate:0},
 {opacity:0,x:-32,rotate:-4,scale:.98,y:0},
 {opacity:0,x:32,rotate:0,scale:1,y:0},
 {opacity:0,y:38,scale:.9,x:0,rotate:0},
];
const shown={opacity:1,x:0,y:0,rotate:0,scale:1};
function MemoryMoment({item,index,ready,reduced,onOpen}) {
 const ref=useRef(null);
 const visible=useInView(ref,{once:true,amount:.18});
 return <motion.div ref={ref} className={`memory-wrap memory-${index%4} ${item.kind||'portrait'} cinematic-moment`} initial={reduced?false:entrances[index%4]} animate={reduced||ready&&visible?shown:entrances[index%4]} transition={{duration:1.1,delay:reduced?0:.6+index*.17,ease:[.22,1,.36,1]}} data-visible={visible}>
  <motion.button className="memory-card" onClick={onOpen} aria-label={`Open photograph: ${item.caption}`} whileHover={reduced?undefined:{y:-7,scale:1.025}} whileTap={reduced?undefined:{scale:.98}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
   <div className="memory-image"><Photo src={item.src} alt={item.caption}/><span className="moment-sparkles" aria-hidden="true"><i/><i/><i/></span></div>
   <div className="memory-caption"><span>{item.caption}</span></div>{item.date&&<small>{item.date}</small>}
  </motion.button>
 </motion.div>;
}
export default function MemoriesGallery() {
 const [index,setIndex]=useState(null);
 const close=useCallback(()=>setIndex(null),[]);
 const reduced=useReducedMotion();
 const section=useRef(null),heading=useRef(null);
 const headingSeen=useInView(heading,{once:true,amount:.15});
 const active=useInView(section,{amount:.05});
 return <section ref={section} className="section memories cinematic-gallery" id="memories" data-active={active}>
  <GalleryAtmosphere target={section} reduced={reduced} active={active}/>
  <motion.div ref={heading} className="section-heading" initial={reduced?false:{opacity:0,y:18}} animate={headingSeen||reduced?{opacity:1,y:0}:{opacity:0,y:18}} transition={{duration:.65,ease:[.22,1,.36,1]}}>
   <h2>My Snowgirl, <em>Through My Eyes</em></h2>
   <motion.p initial={reduced?false:{opacity:0,y:10}} animate={headingSeen||reduced?{opacity:1,y:0}:{opacity:0,y:10}} transition={{duration:.55,delay:.15}}>Four little glimpses of the girl who makes my world more beautiful.</motion.p>
  </motion.div>
  <div className="gallery">{gallery.map((item,i)=><MemoryMoment key={item.src} item={item} index={i} ready={headingSeen} reduced={reduced} onOpen={()=>setIndex(i)}/>)}</div>
  {gallery.length===0&&<p className="empty-gallery">Our next chapter is waiting to be captured.</p>}
  <p className="gallery-footnote"><span/> Little moments. Infinite meaning. <span/></p>
  {index!==null&&<GalleryLightbox items={gallery} index={index} setIndex={setIndex} onClose={close}/>}
 </section>;
}

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from './Modal';
import Photo from './Photo';
function OpeningSparkles({reduced}) {
 if(reduced)return null;
 return <div className="lightbox-magic" aria-hidden="true">{Array.from({length:10},(_,i)=>{
  const angle=(i/10)*Math.PI*2;
  return <span key={i} style={{'--dx':`${Math.cos(angle)*110}px`,'--dy':`${Math.sin(angle)*100-25}px`,'--delay':`${i*.035}s`,left:`${35+(i%3)*15}%`,top:`${36+(i%2)*18}%`}}>{i%3===0?'✦':'♥'}</span>;
 })}</div>;
}
export default function GalleryLightbox({items,index,setIndex,onClose}) {
 const reduced=useReducedMotion(),touch=useRef(null);
 useEffect(()=>{
  const key=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setIndex(i=>(i+(e.key==='ArrowRight'?1:-1)+items.length)%items.length);}};
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[items.length,setIndex]);
 const item=items[index];
 return <Modal onClose={onClose} label="Our memories" className="lightbox cinematic-lightbox">
  <div className={`lightbox-image ${item.kind||'portrait'}`} onTouchStart={e=>{touch.current=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;}} onTouchCancel={()=>{touch.current=null;}} onTouchEnd={e=>{
   if(!touch.current||!e.changedTouches.length)return;
   const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;
   if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)setIndex(i=>(i+(dx<0?1:-1)+items.length)%items.length);
   touch.current=null;
  }}>
   <OpeningSparkles key={`spark-${index}`} reduced={reduced}/>
   <AnimatePresence mode="wait" initial={false}>
    <motion.div className="lightbox-photo-stage" key={item.src} initial={reduced?false:{opacity:0,scale:.96,y:8}} animate={{opacity:1,scale:1,y:0}} exit={reduced?{opacity:1}:{opacity:0,scale:.98}} transition={{duration:reduced?0:.3,ease:[.22,1,.36,1]}}><Photo src={item.src} alt={item.caption}/></motion.div>
   </AnimatePresence>
  </div>
  <div className="lightbox-controls">
   <button className="icon-button" disabled={items.length<2} onClick={()=>setIndex(i=>(i-1+items.length)%items.length)} aria-label="Previous photograph"><ChevronLeft/></button>
   <div className="lightbox-caption" aria-live="polite" aria-atomic="true"><p>{item.caption}</p>{item.date&&<small>{item.date} · </small>}<small>{index+1} / {items.length}</small></div>
   <button className="icon-button" disabled={items.length<2} onClick={()=>setIndex(i=>(i+1)%items.length)} aria-label="Next photograph"><ChevronRight/></button>
  </div>
 </Modal>;
}

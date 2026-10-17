import { useEffect, useState } from 'react';
// Crossfade whole gradient layers: CSS cannot interpolate gradient strings.
const chapters = [
 {id:'home',color:'#411536',glow:'radial-gradient(ellipse at 12% 20%,#d061909c,transparent 52%),radial-gradient(ellipse at 93% 4%,#9b69cd85,transparent 54%),radial-gradient(ellipse at 53% 93%,#cc668c99,transparent 55%)'},
 {id:'memories',color:'#241847',glow:'radial-gradient(ellipse at 25% 45%,#a682dd70,transparent 65%),radial-gradient(ellipse at 90% 20%,#d980b344,transparent 58%)'},
 {id:'you',color:'#4b2037',glow:'radial-gradient(ellipse at 75% 40%,#c77d7759,transparent 65%),radial-gradient(ellipse at 12% 80%,#a94c8b55,transparent 55%)'},
 {id:'celebrate',color:'#111b3c',glow:'radial-gradient(ellipse at 50% 35%,#7958af66,transparent 65%),radial-gradient(ellipse at 85% 90%,#d16a9a38,transparent 55%)'},
];
export default function Atmosphere(){
 const [chapter,setChapter]=useState('home');
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setChapter(entry.target.id);},{rootMargin:'-30% 0px -45% 0px',threshold:0});
  chapters.forEach(({id})=>{const section=document.getElementById(id);if(section)observer.observe(section);});
  return()=>observer.disconnect();
 },[]);
 const current=chapters.find(item=>item.id===chapter);
 return <div className="chapter-atmosphere" data-chapter={chapter} style={{backgroundColor:current.color}} aria-hidden="true">{chapters.map(item=><div key={item.id} className="atmosphere-light" style={{background:item.glow,opacity:item.id===chapter?1:0}}/>)}</div>;
}

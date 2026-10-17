import { ArrowDown, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Photo from './Photo';
import Reveal from './Reveal';
import { heroPhoto } from '../data/gallery';
export default function BirthdayHero({onLetter}) {
 const reduce=useReducedMotion();
 return <section className="hero section reference-hero" id="home">
  <div className="hero-copy">
   <Reveal><div className="eyebrow">A LITTLE MIDNIGHT CELEBRATION <span aria-hidden="true">✦</span></div></Reveal>
   <h1 aria-label="Happy birthday, my love. For Jaya.">{['Happy','birthday,','my love.'].map((word,i)=><motion.span className={`heading-line ${i===2?'name':''}`} key={word} initial={reduce?false:{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:1,delay:i*.18}}>{word}</motion.span>)}</h1>
   <Reveal delay={.3}><p className="hero-note">Tonight, the stars are a little brighter — just like every day has been since you walked into my life.</p><button className="primary-button hero-letter-button" onClick={onLetter}>OPEN YOUR LETTER <span><Heart size={16} fill="currentColor"/></span></button></Reveal>
  </div>
  <Reveal className="hero-visual" delay={.25}><div className="halo"/><div className="hero-photo"><span className="portrait-glint" aria-hidden="true"/><Photo src={heroPhoto} alt="Jaya holding a bouquet in front of golden wings" hero/></div><span className="photo-note">the best part of every<br/>chapter</span><span className="hero-orbit-star" aria-hidden="true">✦</span></Reveal>
  <a href="#memories" className="scroll-cue">OUR LITTLE UNIVERSE <ArrowDown size={14}/></a>
 </section>;
}

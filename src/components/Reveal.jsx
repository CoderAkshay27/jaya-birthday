import { motion, useReducedMotion } from 'motion/react';
export default function Reveal({children,delay=0,className=''}) { const reduce=useReducedMotion(); return <motion.div className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.85,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>; }

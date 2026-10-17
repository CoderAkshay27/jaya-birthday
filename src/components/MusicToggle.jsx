import { useRef,useState } from 'react';
import { Music2,Pause } from 'lucide-react';
// Vite detects bundled local music. No track means no visible control.
const tracks=import.meta.glob('/public/assets/music/birthday-song.mp3',{query:'?url',import:'default',eager:true});
export default function MusicToggle(){const audio=useRef(null);const [playing,setPlaying]=useState(false);const [failed,setFailed]=useState(false);if(!Object.keys(tracks).length||failed)return null;async function toggle(){if(playing){audio.current.pause();}else{audio.current.volume=.3;try{await audio.current.play();}catch{setFailed(true);}}}return <><audio ref={audio} src="/assets/music/birthday-song.mp3" loop preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setFailed(true)}/><button className="music-toggle icon-button" onClick={toggle} aria-label={playing?'Pause music':'Play birthday music'} aria-pressed={playing}>{playing?<Pause size={19}/>:<Music2 size={19}/>}</button></>}

import { useEffect, useState } from 'react';
import { photoSizes } from '../data/photoSizes';
import { Heart, Sparkles } from 'lucide-react';
export default function Photo({src,alt,hero=false}) {
 const [missing,setMissing]=useState(false);
 useEffect(()=>setMissing(false),[src]);
 return missing ? <div className={`photo-fallback ${hero?'portrait':''}`} role="img" aria-label={`${alt}. Personal photograph not added yet.`}><span className="orbit orbit-one"/><span className="orbit orbit-two"/><Sparkles className="fallback-star" size={24}/><Heart size={hero?64:35} strokeWidth={0.8}/><span className="fallback-monogram">J</span><span className="fallback-label">{hero?'A space for your favourite photo':'A memory belongs here'}</span></div> : <img {...photoSizes[src]} decoding="async" src={src} alt={alt} onError={()=>setMissing(true)} loading={hero?'eager':'lazy'} fetchPriority={hero?'high':'auto'}/>;
}

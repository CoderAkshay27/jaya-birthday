import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
export default function Modal({children,onClose,label,className=''}) {
 const ref=useRef(null);
 useEffect(()=>{const previous=document.activeElement; const overflow=document.body.style.overflow; document.body.style.overflow='hidden'; ref.current.focus();
 const handle=e=>{if(e.key==='Escape'){e.preventDefault();onClose();} if(e.key==='Tab'){const items=[...ref.current.querySelectorAll('button,a[href],[tabindex="0"]')].filter(el=>!el.disabled); const first=items[0], last=items.at(-1); if(e.shiftKey&&(document.activeElement===first||document.activeElement===ref.current)){e.preventDefault();last?.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===ref.current)){e.preventDefault();first?.focus();}}};
 document.addEventListener('keydown',handle);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',handle);previous?.focus();};},[onClose]);
 return createPortal(<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className={`modal ${className}`} ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label}><button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog"><X/></button>{children}</div></div>,document.body);
}

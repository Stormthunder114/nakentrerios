import React,{useId} from 'react';
// A mesma geometria trançada é usada em todas as graduações.
export function Prajied({colors,label}:{colors:string[];label:string}) {
 const id=useId().replace(/:/g,'');
 const braid='M -15 -19 C 1 -22 20 -6 15 19 C 5 10 -14 8 -15 -19 Z';
 const color=(i:number)=>colors[i%colors.length];
 return <svg className="tr-corda" viewBox="0 0 240 320" role="img" aria-label={`Prajied trançado: ${label}`}>
 <defs><filter id={id+'shadow'} x="-40%" y="-30%" width="180%" height="180%"><feDropShadow dx="1" dy="8" stdDeviation="7" floodColor="#18181b" floodOpacity=".28"/></filter><linearGradient id={id+'shade'} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".13"/><stop offset=".48" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".13"/></linearGradient></defs>
 <g filter={`url(#${id}shadow)`}>
 {Array.from({length:18},(_,i)=>{const a=(-90+i*20)*Math.PI/180;return <g key={i} transform={`translate(${120+72*Math.cos(a)} ${98+77*Math.sin(a)}) rotate(${i*20-90})`}><path d={braid} fill={color(i)}/><path d={braid} fill={`url(#${id}shade)`}/></g>})}
 {[-1,1].map((side,si)=><g key={side}>
 {Array.from({length:4},(_,i)=><g key={i} transform={`translate(${120+side*(15+i*6)} ${183+i*18}) rotate(${-side*18})`}><path d={braid} fill={color(i+si)}/><path d={braid} fill={`url(#${id}shade)`}/></g>)}
 {[0,1,2].map((n)=><path key={n} d={`M ${120+side*33+(n-1)*7} 244 Q ${120+side*36+(n-1)*15} 268 ${120+side*40+(n-1)*24} 292 Q ${120+side*40+(n-1)*24} 299 ${120+side*40+(n-1)*24+12} 301 Q ${120+side*40+(n-1)*24+23} 302 ${120+side*40+(n-1)*24+20} 292 L ${120+side*33+(n-1)*7+8} 244 Z`} fill={color(n+si)}/>)}
 <rect x={120+side*33-17} y="236" width="38" height="15" rx="8" fill={color(si)} transform={`rotate(${-side*9} ${120+side*33} 244)`}/>
 </g>)}
 <ellipse cx="120" cy="177" rx="20" ry="23" fill={color(0)} transform="rotate(28 120 177)"/>
 <path d="M104 161 C113 147 135 160 133 186 C125 180 116 171 104 161Z" fill={color(1)}/>
 <path d="M108 181 C114 191 123 197 134 188 L132 199 C121 207 105 194 108 181Z" fill={color(2)}/>
 </g></svg>;
}


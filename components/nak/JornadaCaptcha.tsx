import React,{useEffect,useRef,useState} from 'react';
declare global {interface Window {turnstile?:{render:(el:HTMLElement,o:Record<string,unknown>)=>string;remove:(id:string)=>void}}}
export function JornadaCaptcha({onToken,revision}:{onToken:(token:string)=>void;revision:number}){
 const ref=useRef<HTMLDivElement>(null);const [error,setError]=useState('');
 useEffect(()=>{const key=(import.meta as unknown as {env:Record<string,string>}).env.VITE_JORNADAS_TURNSTILE_SITE_KEY;if(!key){setError('Envio ainda não ativado: falta configurar a proteção antispam. Esta prévia não envia depoimentos.');return;}
 let widget:string|undefined,disposed=false;
 const render=()=>{if(disposed||!ref.current||!window.turnstile)return;widget=window.turnstile.render(ref.current,{sitekey:key,action:'jornada',callback:(token:string)=>onToken(token),'expired-callback':()=>onToken(''),'error-callback':()=>{onToken('');setError('A verificação não carregou. Tente reabrir o formulário.');},theme:'light'});};
 let script=document.querySelector<HTMLScriptElement>('script[data-jornadas-captcha]');
 if(window.turnstile)render();else{if(!script){script=document.createElement('script');script.dataset.jornadasCaptcha='true';script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;document.head.appendChild(script);}script.addEventListener('load',render);}
 const failure=()=>setError('Não foi possível carregar a proteção antispam. Reabra o formulário.');script?.addEventListener('error',failure);
 return()=>{disposed=true;script?.removeEventListener('load',render);script?.removeEventListener('error',failure);if(widget)window.turnstile?.remove(widget);};
 },[revision,onToken]);
 return <div className="jornada-captcha"><div ref={ref}/>{error&&<p className="jornada-note" role="status">{error}</p>}</div>;
}

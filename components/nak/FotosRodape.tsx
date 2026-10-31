import React, {useState} from 'react';
import {useFotos} from './useFotos';
import './fotos-rodape.css';
export function FotosRodape({onOpen}:{onOpen:()=>void}) {
 const {fotos,loading,error,retry}=useFotos();
 const [paused,setPaused]=useState(false);
 if(loading)return null;
 if(error)return <section className="nak-fotos-rodape"><p>{error}</p><button onClick={retry}>Tentar novamente</button></section>;
 if(!fotos.length)return null;
 return <section className="nak-fotos-rodape" aria-label="Fotos da NAK Entre Rios"><div className="nak-fotos-heading"><div><span>NO NOSSO TATAME</span><h2>Fotos & aulas</h2></div><div><button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'Continuar fotos':'Pausar fotos'}</button><button type="button" onClick={onOpen}>Ver galeria →</button></div></div><div className="nak-fotos-window"><div className={'nak-fotos-track'+(paused?' is-paused':'')}>{[0,1].map(copy=><div className="nak-fotos-set" key={copy} aria-hidden={copy===1?true:undefined}>{fotos.map(f=><figure key={f.id}><img src={f.url} alt={copy===0?f.titulo:''} loading="lazy"/><figcaption>{f.titulo}</figcaption></figure>)}</div>)}</div></div></section>;
}

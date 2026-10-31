import {useEffect,useState} from 'react';
import {listarFotos,Foto,categorias} from '../../lib/fotos';
export function useFotos(){
 const [fotos,setFotos]=useState<Foto[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[refresh,setRefresh]=useState(0);
 useEffect(()=>{let active=true;setLoading(true);setError('');listarFotos().then(rows=>{if(active)setFotos(rows);}).catch(()=>{if(active){setFotos([]);setError('Não foi possível carregar as fotos. Tente novamente.');}}).finally(()=>{if(active)setLoading(false);});return()=>{active=false};},[refresh]);
 useEffect(()=>{const reload=()=>setRefresh(v=>v+1);window.addEventListener('nak-fotos-atualizadas',reload);window.addEventListener('focus',reload);return()=>{window.removeEventListener('nak-fotos-atualizadas',reload);window.removeEventListener('focus',reload)};},[]);
 return {fotos:fotos.map(f=>({...f,categoriaLabel:categorias[f.categoria]})),loading,error,retry:()=>setRefresh(v=>v+1)};
}

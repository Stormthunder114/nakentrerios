import {SessaoExpirada} from './admin';
export const PHOTO_URL='https://mrhyhamjjygysuynmmed.supabase.co';
const key='sb_publishable_6-8yN2C83qYDqf3X5062Vw_a9LucikB';
export const categorias={aulas:'Aulas & Treinos',competicoes:'Competições',espaco:'Espaço do CT',graduacoes:'Graduações'};
export type Foto={span?:string;id:string;url:string;titulo:string;categoria:keyof typeof categorias;descricao:string;detalhe:string;ordem:number;publicada:boolean;excluida:boolean;storage_path:string|null};
async function call(path:string,token?:string,init:RequestInit={}) {
 const r=await fetch(PHOTO_URL+path,{...init,headers:{apikey:key,...(token?{Authorization:'Bearer '+token}:{}),'Content-Type':'application/json',...init.headers},signal:AbortSignal.timeout(30000),cache:'no-store'});
 if(r.status===401&&token)throw new SessaoExpirada('Sua sessão expirou. Entre novamente.');
 if(!r.ok)throw new Error(r.status===403?'Você não tem permissão para alterar as fotos.':'Não foi possível acessar as fotos. Confira a conexão e tente novamente.');
 return r.status===204?null:r.json();
}
export async function listarFotos(token?:string):Promise<Foto[]> {
 const all:Foto[]=[];
 for(let offset=0;;offset+=100){const rows=await call('/rest/v1/nak_fotos?select=*&order=ordem.asc,id.asc&limit=100&offset='+offset+(token?'':'&publicada=eq.true&excluida=eq.false'),token);if(!Array.isArray(rows))throw new Error('Resposta inválida da galeria.');all.push(...rows);if(rows.length<100)return all;}
}
export function validarFoto(f:Foto){
 if(!f.titulo.trim()||f.titulo.trim().length>120||f.descricao.length>1500||f.detalhe.length>180||!Object.hasOwn(categorias,f.categoria)||!Number.isInteger(f.ordem)||Math.abs(f.ordem)>100000)throw new Error('Confira o título, a descrição, a categoria e a ordem da foto.');
 let u:URL;try{u=new URL(f.url);}catch{throw new Error('Selecione uma imagem.');}if(u.protocol!=='https:')throw new Error('A imagem precisa usar HTTPS.');
 return {url:f.url,titulo:f.titulo.trim(),categoria:f.categoria,descricao:f.descricao.trim(),detalhe:f.detalhe.trim(),ordem:f.ordem,publicada:f.publicada,excluida:f.excluida,storage_path:f.storage_path};
}
export async function salvarFoto(token:string,f:Foto,nova=false){
 const body=validarFoto(f);const rows=await call('/rest/v1/nak_fotos'+(nova?'':'?id=eq.'+encodeURIComponent(f.id)),token,{method:nova?'POST':'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({...body,...(nova?{id:f.id}:{})})});
 if(!Array.isArray(rows)||rows.length!==1||rows[0].id!==f.id)throw new Error('A foto não foi salva. Atualize e tente novamente.');return rows[0] as Foto;
}
export async function enviarFoto(token:string,file:File){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024||file.size===0)throw new Error('Escolha uma imagem JPG, PNG ou WebP de até 8 MB.');
 const bitmap=await createImageBitmap(file);let blob:Blob;
 try{if(bitmap.width*bitmap.height>50000000)throw new Error('Imagem muito grande. Escolha uma versão menor.');const scale=Math.min(1,1920/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Não foi possível preparar a imagem.');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Falha ao preparar imagem.')),'image/jpeg',.88));}finally{bitmap.close();}
 const path='galeria/'+crypto.randomUUID()+'.jpg';await call('/storage/v1/object/nak-fotos/'+path,token,{method:'POST',headers:{'Content-Type':'image/jpeg','x-upsert':'false'},body:blob});return {url:PHOTO_URL+'/storage/v1/object/public/nak-fotos/'+path,storage_path:path};
}


// Supabase Edge Function pública. verify_jwt=false SOMENTE nesta nova função.
// Turnstile obrigatório + honeypot + cota persistente + validação; nunca registrar o texto nos logs.
export async function handle(req:Request):Promise<Response>{
 const allowed=['https://nakentrerios.online','https://www.nakentrerios.online'];
 const origin=req.headers.get('origin')||'';
 const headers={'Content-Type':'application/json','Access-Control-Allow-Origin':allowed.includes(origin)?origin:allowed[0],'Vary':'Origin','Access-Control-Allow-Headers':'content-type,apikey','Access-Control-Allow-Methods':'POST,OPTIONS'};
 const reply=(body:object,status=200)=>new Response(JSON.stringify(body),{status,headers});
 if(!allowed.includes(origin))return reply({error:'Origem não permitida'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(req.method!=='POST')return reply({error:'Método inválido'},405);
 const secret=Deno.env.get('JORNADAS_TURNSTILE_SECRET'),salt=Deno.env.get('JORNADAS_RATE_SALT'),url=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 if(!secret||!salt||salt.length<32||!url||!key)return reply({error:'Serviço não configurado'},503);
 try{
  // Limite por bytes inclusive quando Content-Length estiver ausente/forjado.
  const reader=req.body?.getReader();if(!reader)return reply({error:'Corpo ausente'},400);
  let total=0;const chunks:Uint8Array[]=[];
  while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>24000){await reader.cancel();return reply({error:'Texto muito grande'},413);}chunks.push(value);}
  const bytes=new Uint8Array(total);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
  const d=JSON.parse(new TextDecoder().decode(bytes));
  if(typeof d.depoimento!=='string'||!d.depoimento.trim()||d.depoimento.length>5000||typeof d.menor!=='boolean'||d.autoriza!==true)return reply({error:'Dados inválidos'},400);
  for(const [field,max] of [['nome',120],['tempo',80],['prajied',80]] as const){if(typeof d[field]!=='string'||d[field].length>max)return reply({error:'Campo inválido'},400);}
  if(d.website||typeof d.captcha!=='string'||!d.captcha||d.captcha.length>2048)return reply({error:'Verificação obrigatória'},400);
  const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret,response:d.captcha}),signal:AbortSignal.timeout(8000)});
  const verified=await verification.json();
  if(!verification.ok||!verified.success||verified.action!=='jornada'||!['nakentrerios.online','www.nakentrerios.online'].includes(verified.hostname))return reply({error:'Verificação inválida'},400);
  // O gateway deve sobrescrever estes cabeçalhos. Turnstile continua obrigatório mesmo com IP rotativo.
  const ip=req.headers.get('cf-connecting-ip')||req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if(!ip)return reply({error:'Origem não identificada'},503);
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+':'+ip));
  const hashed=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
  const saved=await fetch(url+'/rest/v1/rpc/nak_receber_jornada',{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({p_dados:{nome:d.nome,tempo:d.tempo,prajied:d.prajied,depoimento:d.depoimento,menor:d.menor,autoriza:true},p_chave:hashed}),signal:AbortSignal.timeout(12000)});
  const result=await saved.json();
  if(!saved.ok)return reply({error:'Envio não armazenado'},result?.code==='P0429'?429:503);
  if(typeof result!=='string'||!/^[0-9a-f-]{36}$/i.test(result))return reply({error:'Armazenamento não confirmado'},503);
  return reply({stored:true,id:result},201);
 }catch{return reply({error:'Não foi possível concluir o envio'},503);}
}
Deno.serve(handle);

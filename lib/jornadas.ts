import { SessaoExpirada } from './admin';
const base = 'https://mrhyhamjjygysuynmmed.supabase.co';
const key = 'sb_publishable_6-8yN2C83qYDqf3X5062Vw_a9LucikB';
export type Jornada = {id:string; nome:string|null; tempo:string|null; prajied:string|null; depoimento:string; criado_em:string};
export type JornadaAdmin = Jornada & {estado:'Pendente'|'Aprovado'|'Rejeitado'; menor:boolean; autorizacao_valida:boolean; autorizacao_referencia:string|null; autorizacao_em:string|null; autorizacao_por:string|null; excluida:boolean; versao:number};
export type JornadaEnvio = {nome:string;tempo:string;prajied:string;depoimento:string;menor:boolean;autoriza:boolean;website:string;captcha?:string};
export function validarJornada(d:JornadaEnvio) {
  if (!d.depoimento.trim() || d.depoimento.length>5000) throw new Error('Escreva seu depoimento com até 5.000 caracteres.');
  if(d.nome.length>120||d.tempo.length>80||d.prajied.length>80) throw new Error('Confira o tamanho dos campos opcionais.');
  if(!d.autoriza) throw new Error('Confirme a autorização para continuar.');
}
async function api(path:string,token?:string,body?:unknown){
  const r=await fetch(base+path,{method:body?'POST':'GET',headers:{apikey:key,...(token?{Authorization:`Bearer ${token}`} : {}),'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(token && r.status===401) throw new SessaoExpirada('Sua sessão expirou. Entre novamente.');
  if(r.status===429) throw new Error('Você já enviou jornadas recentemente. Aguarde uma hora e tente novamente.');
  if(!r.ok){if(token && r.status===400) throw new Error('Operação não permitida: confira a autorização e atualize a lista antes de tentar novamente.');throw new Error('Jornadas indisponíveis. A configuração do banco e do serviço de envio precisa estar ativa. Tente novamente mais tarde.');}
  return r.json();
}
export async function enviarJornada(d:JornadaEnvio){validarJornada(d);const result=await api('/functions/v1/enviar-jornada',undefined,d);if(result?.stored!==true||!result.id)throw new Error('Não foi possível confirmar o envio. Tente novamente.');return result;}
export async function listarJornadas(pagina=0):Promise<Jornada[]>{const rows=await api(`/rest/v1/nak_jornadas_publicas?select=id,nome,tempo,prajied,depoimento,criado_em&order=criado_em.desc,id.desc&limit=6&offset=${pagina*6}`);if(!Array.isArray(rows))throw new Error('Não foi possível carregar as jornadas.');return rows;}
export async function listarJornadasAdmin(token:string,estado:string,pagina:number):Promise<JornadaAdmin[]>{return api(`/rest/v1/nak_jornadas?select=*&excluida=eq.false${estado?'&estado=eq.'+encodeURIComponent(estado):''}&order=criado_em.desc,id.desc&limit=20&offset=${pagina*20}`,token);}
export async function acaoJornada(token:string,j:JornadaAdmin,acao:string,dados:Record<string,unknown>={}) {const result=await api('/rest/v1/rpc/nak_moderar_jornada',token,{p_id:j.id,p_versao:j.versao,p_acao:acao,p_dados:dados});if(result?.ok!==true)throw new Error('Não foi possível confirmar a alteração. Atualize a lista.');return result;}
export type EventoJornada={id:number;jornada_id:string;acao:string;estado:string;criado_em:string;ator:string|null};
export async function historicoJornadas(token:string,pagina:number):Promise<EventoJornada[]>{return api(`/rest/v1/nak_jornadas_historico?select=*&order=id.desc&limit=30&offset=${pagina*30}`,token);}

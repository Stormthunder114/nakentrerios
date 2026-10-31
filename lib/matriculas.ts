import {validarMatricula} from './validar-matricula';
const config={"url":"https://mrhyhamjjygysuynmmed.supabase.co","key":"sb_publishable_6-8yN2C83qYDqf3X5062Vw_a9LucikB"};
export async function cadastrarAluno(dados: {nome:string; telefone:string; turma:string; prajed?:string; origem?:string}) {
 const validos=validarMatricula(dados);
 if(!validos)return {data:null,error:{message:'Informe nome, WhatsApp com DDD e uma turma válida.'}};
 const id=crypto.randomUUID();
 try {
  const response=await fetch(config.url+'/rest/v1/alunos',{method:'POST',headers:{apikey:config.key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({id,...validos,prajed:'Branco (Iniciante)',origem:'Site NAK Entre Rios'}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)return {data:null,error:{message:'Não foi possível salvar a inscrição. Tente novamente em instantes.'}};
  return {data:{id},error:null};
 } catch {return {data:null,error:{message:'Não foi possível confirmar o envio. Verifique sua conexão antes de tentar novamente.'}};}
}

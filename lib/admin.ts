import { validarMatricula } from './validar-matricula';

const url = 'https://mrhyhamjjygysuynmmed.supabase.co';
const key = 'sb_publishable_6-8yN2C83qYDqf3X5062Vw_a9LucikB';
export type AlunoAdmin = { id: string; nome: string; telefone: string; turma: string; prajed: string | null; criado_em: string; origem: string | null };
export class SessaoExpirada extends Error {}
// Tokens ficam somente na memória enquanto o painel está aberto.
export async function entrar(email: string, password: string) {
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password }), signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Não foi possível entrar. Confira seu e-mail e senha.');
  const session = await response.json();
  try {
    const allowed = await request(session.access_token, '/nak_admins?select=user_id');
    if (!Array.isArray(allowed) || !allowed.some((item: {user_id: string}) => item.user_id === session.user.id)) {
      throw new Error('Este usuário não tem acesso ao gerenciamento.');
    }
    return { token: session.access_token as string, expires: Date.now() + session.expires_in * 1000 };
  } catch (error) { await sair(session.access_token); throw error; }
}
async function request(token: string, path: string, init: RequestInit = {}) {
  const response = await fetch(url + '/rest/v1' + path, { ...init,
    headers: { apikey: key, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init.headers },
    signal: AbortSignal.timeout(15000), cache: 'no-store',
  });
  if (response.status === 401) throw new SessaoExpirada('Sua sessão expirou. Entre novamente.');
  if (!response.ok) throw new Error('Não foi possível concluir. Confira sua conexão e a autorização de acesso.');
  return response.json();
}
export async function sair(token: string) {
  try { await fetch(url + '/auth/v1/logout?scope=local', { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) }); } catch { /* A sessão local é sempre descartada. */ }
}
export async function listarAlunos(token: string, busca: string, turma: string, pagina: number) {
  const params = new URLSearchParams({ select: 'id,nome,telefone,turma,prajed,criado_em,origem', order: 'criado_em.desc,id.desc', limit: '26', offset: String(pagina * 25) });
  const safe = busca.trim().replace(/[^\p{L}\p{N}\s]/gu, '').slice(0, 120);
  if (safe) params.set('or', `(nome.ilike.*${safe}*,telefone.ilike.*${safe}*)`);
  if (turma) params.set('turma', `eq.${turma}`);
  return request(token, '/alunos?' + params) as Promise<AlunoAdmin[]>;
}
export async function salvarAluno(token: string, aluno: AlunoAdmin) {
  const dados = validarMatricula(aluno, true);
  if (!dados || (aluno.prajed?.trim().length ?? 0) > 80) throw new Error('Confira o nome, o WhatsApp com DDD, a turma e a graduação (até 80 caracteres).');
  const rows = await request(token, `/alunos?id=eq.${encodeURIComponent(aluno.id)}&select=id,nome,telefone,turma,prajed,criado_em,origem`, {
    method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ ...dados, prajed: aluno.prajed?.trim() || null }),
  });
  if (rows.length !== 1) throw new Error('O aluno não foi atualizado. Atualize a lista e tente novamente.');
  return rows[0] as AlunoAdmin;
}

export async function apagarAluno(token: string, id: string) {
  if (!id) throw new Error('Selecione um aluno.');
  const rows = await request(token, '/alunos?id=eq.' + encodeURIComponent(id) + '&select=id', {method:'DELETE',headers:{Prefer:'return=representation'}});
  if (!Array.isArray(rows) || rows.length !== 1 || rows[0].id !== id) throw new Error('O aluno não foi apagado. Confira a autorização e atualize a lista.');
}

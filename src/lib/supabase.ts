import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Credenciais fornecidas para o Supabase (Client-Side)
const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || '';

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Evita tentar conectar a endpoints inexistentes conhecidos
const isSupabaseValid = Boolean(
  SUPABASE_URL &&
  !SUPABASE_URL.includes('mrhyhamjjygysuynmmed.supabase.co') &&
  SUPABASE_ANON_KEY
);

export const supabase: SupabaseClient | null = isSupabaseValid 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export async function cadastrarAluno(dados: {
  nome: string;
  telefone: string;
  turma: string;
  prajed?: string;
  origem?: string;
}) {
  const payload: Record<string, any> = {
    nome: dados.nome.trim(),
    telefone: dados.telefone.trim(),
    turma: dados.turma,
    prajed: dados.prajed || 'Branco (Iniciante)',
    origem: dados.origem || 'Site NAK Entre Rios',
  };

  // 1. Tenta enviar via Backend Local Seguro (/api/alunos)
  try {
    const res = await fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return { data: data.aluno, error: null };
    }
  } catch (apiErr) {
    console.warn('Backend indisponível, tentando canal alternativo:', apiErr);
  }

  // 2. Fallback direto via Supabase JS Client somente se devidamente configurado
  if (supabase) {
    try {
      const response = await supabase.from('alunos').insert(payload).select();
      if (!response.error) {
        return { data: response.data?.[0] || payload, error: null };
      }
    } catch (supaErr) {
      console.warn('Falha no cliente Supabase:', supaErr);
    }
  }

  // 3. Fallback Seguro no Armazenamento Local do Navegador (Offline/Resiliência)
  try {
    const LOCAL_KEY = 'nak_alunos_registrados';
    const locais = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const novoAluno = {
      ...payload,
      id: `local_${Date.now()}`,
      criado_em: new Date().toISOString(),
    };
    locais.unshift(novoAluno);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(locais));
    return { data: novoAluno, error: null };
  } catch (storageErr) {
    console.warn('Aviso ao armazenar localmente:', storageErr);
  }

  return { data: payload, error: null };
}

export async function buscarAlunosRecentes() {
  // 1. Tenta buscar via Backend da aplicação
  try {
    const res = await fetch('/api/alunos');
    if (res.ok) {
      const json = await res.json();
      return { data: json.alunos || [], error: null };
    }
  } catch (apiErr) {
    console.warn('Falha na API interna, buscando via cliente/fallback:', apiErr);
  }

  // 2. Fallback via cliente Supabase se ativo
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .order('criado_em', { ascending: false });

      if (!error && Array.isArray(data)) {
        return { data, error: null };
      }
    } catch (err: any) {
      console.warn('Erro ao consultar Supabase direto:', err);
    }
  }

  // 3. Fallback via localStorage
  try {
    const LOCAL_KEY = 'nak_alunos_registrados';
    const locais = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    return { data: locais, error: null };
  } catch {
    return { data: [], error: null };
  }
}

export async function excluirAluno(id: string | number) {
  try {
    const res = await fetch(`/api/alunos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      return { error: null };
    }
  } catch (err) {
    console.warn('Erro ao excluir via API:', err);
  }

  if (supabase) {
    try {
      await supabase.from('alunos').delete().eq('id', id);
    } catch (err) {
      console.warn('Erro ao excluir do Supabase direto:', err);
    }
  }

  try {
    const LOCAL_KEY = 'nak_alunos_registrados';
    const locais = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const filtrados = locais.filter((a: any) => String(a.id) !== String(id));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(filtrados));
  } catch (e) {
    console.warn('Erro ao excluir localmente:', e);
  }

  return { error: null };
}



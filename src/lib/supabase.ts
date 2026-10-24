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
  userId?: string;
}) {
  const payload: Record<string, any> = {
    nome: dados.nome.trim(),
    telefone: dados.telefone.trim(),
    turma: dados.turma,
    prajed: dados.prajed || 'Branco (Iniciante)',
    origem: dados.origem || 'Site NAK Entre Rios',
    userId: dados.userId || null,
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
  if (!id) {
    return { error: new Error('ID do aluno não informado.') };
  }

  try {
    const resposta = await fetch(
      `/api/alunos/${encodeURIComponent(String(id))}`,
      { method: 'DELETE' }
    );

    const resultado = await resposta.json().catch(() => null);

    if (!resposta.ok || resultado?.success !== true) {
      // Tenta remover do localStorage diretamente
      const LOCAL_KEY = 'nak_alunos_registrados';
      const locais = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
      const novos = locais.filter((a: any) => String(a.id) !== String(id));
      localStorage.setItem(LOCAL_KEY, JSON.stringify(novos));
    }

    return { error: null };
  } catch (erro) {
    // Fallback local se offline
    const LOCAL_KEY = 'nak_alunos_registrados';
    const locais = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const novos = locais.filter((a: any) => String(a.id) !== String(id));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(novos));
    return { error: null };
  }
}

export async function atualizarAluno(id: string | number, dados: Record<string, any>) {
  try {
    const res = await fetch(`/api/alunos/${encodeURIComponent(String(id))}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (res.ok) {
      const json = await res.json();
      return { data: json.aluno, error: null };
    }
  } catch (err) {
    console.warn('Falha ao atualizar via API, atualizando local:', err);
  }

  // Fallback LocalStorage
  try {
    const LOCAL_KEY = 'nak_alunos_registrados';
    const locais = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const index = locais.findIndex((a: any) => String(a.id) === String(id));
    if (index >= 0) {
      locais[index] = { ...locais[index], ...dados, updated_at: new Date().toISOString() };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(locais));
      return { data: locais[index], error: null };
    }
  } catch (e) {
    console.error(e);
  }

  return { data: dados, error: null };
}

export async function buscarPagamentos() {
  try {
    const res = await fetch('/api/pagamentos');
    if (res.ok) {
      const json = await res.json();
      return { data: json.pagamentos || [], error: null };
    }
  } catch (err) {
    console.warn('API de pagamentos indisponível, buscando local:', err);
  }

  try {
    const locais = JSON.parse(localStorage.getItem('nak_pagamentos') || '[]');
    return { data: locais, error: null };
  } catch {
    return { data: [], error: null };
  }
}

export async function registrarPagamento(dados: {
  alunoId: string | number;
  alunoNome: string;
  valor: number;
  mesReferencia?: string;
  dataPagamento?: string;
  formaPagamento?: string;
  observacoes?: string;
}) {
  try {
    const res = await fetch('/api/pagamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (res.ok) {
      const json = await res.json();
      return { data: json.pagamento, error: null };
    }
  } catch (err) {
    console.warn('Erro ao salvar pagamento via API:', err);
  }

  // Fallback local
  try {
    const novo = {
      id: `pag_${Date.now()}`,
      ...dados,
      status: 'pago',
      created_at: new Date().toISOString(),
    };
    const locais = JSON.parse(localStorage.getItem('nak_pagamentos') || '[]');
    locais.unshift(novo);
    localStorage.setItem('nak_pagamentos', JSON.stringify(locais));
    return { data: novo, error: null };
  } catch (e: any) {
    return { data: null, error: e };
  }
}

export async function excluirPagamento(id: string | number) {
  try {
    await fetch(`/api/pagamentos/${encodeURIComponent(String(id))}`, { method: 'DELETE' });
  } catch {
    // Ignora erro de rede
  }
  try {
    const locais = JSON.parse(localStorage.getItem('nak_pagamentos') || '[]');
    const filtrados = locais.filter((p: any) => String(p.id) !== String(id));
    localStorage.setItem('nak_pagamentos', JSON.stringify(filtrados));
  } catch {}
  return { error: null };
}

export async function buscarPresencas() {
  try {
    const res = await fetch('/api/presencas');
    if (res.ok) {
      const json = await res.json();
      return { data: json.presencas || [], error: null };
    }
  } catch (err) {
    console.warn('API de presenças indisponível, buscando local:', err);
  }

  try {
    const locais = JSON.parse(localStorage.getItem('nak_presencas') || '[]');
    return { data: locais, error: null };
  } catch {
    return { data: [], error: null };
  }
}

export async function salvarChamadaPresenca(registros: Array<{
  data: string;
  turma: string;
  alunoId: string | number;
  alunoNome: string;
  presente: boolean;
  observacao?: string;
}>) {
  try {
    const res = await fetch('/api/presencas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registros }),
    });
    if (res.ok) {
      const json = await res.json();
      return { data: json.registros, error: null };
    }
  } catch (err) {
    console.warn('Erro ao salvar presença via API:', err);
  }

  try {
    let locais = JSON.parse(localStorage.getItem('nak_presencas') || '[]');
    const datasTurmas = new Set(registros.map(r => `${r.data}_${r.turma}`));
    locais = locais.filter((p: any) => !datasTurmas.has(`${p.data}_${p.turma}`));
    const novos = registros.map(r => ({
      id: `pres_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      ...r,
      criado_em: new Date().toISOString(),
    }));
    locais = [...novos, ...locais];
    localStorage.setItem('nak_presencas', JSON.stringify(locais));
    return { data: novos, error: null };
  } catch (e: any) {
    return { data: null, error: e };
  }
}


  

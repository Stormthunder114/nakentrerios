import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.set('trust proxy', true);
app.use(express.json());

// CORS & Headers para suporte a domínio personalizado (nakentrerios.online)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// === ARMAZENAMENTO PERSISTENTE LOCAL (FALLBACK SEGURO) ===
const DATA_DIR = path.join(process.cwd(), 'data');
const ALUNOS_FILE = path.join(DATA_DIR, 'alunos.json');

function ensureDataStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ALUNOS_FILE)) {
    fs.writeFileSync(ALUNOS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function getLocalAlunos(): any[] {
  ensureDataStorage();
  try {
    const raw = fs.readFileSync(ALUNOS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro ao ler alunos locais:', err);
    return [];
  }
}

function saveLocalAlunos(alunos: any[]): void {
  ensureDataStorage();
  try {
    fs.writeFileSync(ALUNOS_FILE, JSON.stringify(alunos, null, 2), 'utf-8');
  } catch (err) {
    console.error('Erro ao salvar alunos locais:', err);
  }
}

// === CONFIGURAÇÃO SUPABASE CONDICIONAL & SEGURA ===
const rawSupabaseUrl = process.env.SUPABASE_URL || '';
const supabaseSecret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';

// Evita tentar conectar a domínios inválidos/inexistentes conhecidos
const isSupabaseConfigured = Boolean(
  rawSupabaseUrl &&
  !rawSupabaseUrl.includes('mrhyhamjjygysuynmmed.supabase.co') &&
  supabaseSecret
);

let supabaseAdmin: SupabaseClient | null = null;
if (isSupabaseConfigured) {
  try {
    supabaseAdmin = createClient(rawSupabaseUrl, supabaseSecret, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('[Supabase] Cliente administrativo configurado.');
  } catch (err) {
    console.warn('[Supabase] Não foi possível inicializar cliente:', err);
    supabaseAdmin = null;
  }
} else {
  console.log('[Sistema] Supabase externo não configurado ou offline. Utilizando banco local JSON persistente.');
}

// === ROTAS DA API ===

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    storage: isSupabaseConfigured ? 'supabase+local_fallback' : 'local_json',
    supabaseActive: Boolean(supabaseAdmin),
  });
});

// Listar Alunos (Painel da Academia / Mestre)
app.get('/api/alunos', async (req, res) => {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('alunos')
        .select('*')
        .order('criado_em', { ascending: false });

      if (!error && Array.isArray(data)) {
        return res.json({
          alunos: data,
          total: data.length,
          origem: 'supabase',
        });
      }
    } catch (supaErr) {
      console.warn('[Supabase] Falha ao consultar Supabase, utilizando banco local:', supaErr);
    }
  }

  const localAlunos = getLocalAlunos();
  return res.json({
    alunos: localAlunos,
    total: localAlunos.length,
    origem: 'local',
  });
});

// Criar Matrícula (Salvamento seguro e resiliente)
app.post('/api/alunos', async (req, res) => {
  try {
    const { nome, telefone, turma, prajed, origem } = req.body;

    if (!nome || !telefone || !turma) {
      return res.status(400).json({
        error: 'Campos obrigatórios: nome, telefone e turma.',
      });
    }

    const novoAluno = {
      id: `nak_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nome: String(nome).trim(),
      telefone: String(telefone).trim(),
      turma: String(turma).trim(),
      prajed: prajed || 'Branco (Iniciante)',
      origem: origem || 'Site NAK Entre Rios',
      status: 'pendente',
      criado_em: new Date().toISOString(),
    };

    // 1. Salva localmente para garantir que NENHUMA matrícula seja perdida
    const alunos = getLocalAlunos();
    alunos.unshift(novoAluno);
    saveLocalAlunos(alunos);

    // 2. Se o Supabase estiver configurado, tenta sincronizar
    if (supabaseAdmin) {
      try {
        const { error } = await supabaseAdmin
          .from('alunos')
          .insert({
            nome: novoAluno.nome,
            telefone: novoAluno.telefone,
            turma: novoAluno.turma,
            prajed: novoAluno.prajed,
            origem: novoAluno.origem,
          });

        if (error) {
          console.warn('[Supabase Sync] Aviso ao sincronizar com Supabase:', error.message);
        }
      } catch (syncErr) {
        console.warn('[Supabase Sync] Não foi possível alcançar o Supabase externo:', syncErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Matrícula realizada com sucesso!',
      aluno: novoAluno,
    });
  } catch (err: any) {
    console.error('Exceção ao matricular aluno:', err);
    return res.status(500).json({ error: err.message || 'Erro interno do servidor' });
  }
});

// Excluir Aluno
app.delete('/api/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Remove do armazenamento local
    const alunos = getLocalAlunos();
    const filtrados = alunos.filter((a) => String(a.id) !== String(id));
    saveLocalAlunos(filtrados);

    // Se Supabase ativo, tenta excluir também
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from('alunos').delete().eq('id', id);
      } catch (e) {
        console.warn('Aviso ao excluir do Supabase:', e);
      }
    }

    return res.json({ success: true, message: 'Aluno removido com sucesso.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Erro ao remover aluno' });
  }
});

// === CONFIGURAÇÃO VITE & ARQUIVOS ESTÁTICOS ===
async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Muay Thai rodando na porta ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Falha ao iniciar servidor:', err);
});

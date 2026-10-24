import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getDbAlunos, insertDbAluno, deleteDbAluno } from './src/db/alunos.ts';
import { getOrCreateUser } from './src/db/users.ts';

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

// Armazenamento local de redundância
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

// === ROTAS DA API ===

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Download do pacote completo para Cloudflare Pages
app.get(['/api/download-zip', '/site-nak-atualizado.zip'], (req, res) => {
  const zipPath = path.join(process.cwd(), 'public', 'site-nak-atualizado.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="site-nak-atualizado.zip"');
    return res.sendFile(zipPath);
  }
  return res.status(404).send('Arquivo zip não encontrado. Execute o build primeiro.');
});


// Autenticação: Sincronizar usuário Firebase com PostgreSQL
app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    const { uid, email, name, picture } = req.user;
    const dbUser = await getOrCreateUser(uid, email || '', name, picture);
    return res.json({ user: dbUser });
  } catch (error: any) {
    console.error('Falha ao sincronizar usuário:', error);
    return res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

// Autenticação: Obter perfil atual
app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    const { uid, email, name, picture } = req.user;
    const dbUser = await getOrCreateUser(uid, email || '', name, picture);
    return res.json({ user: dbUser });
  } catch (error: any) {
    console.error('Falha ao obter usuário atual:', error);
    return res.status(500).json({ error: 'Erro ao obter dados do usuário' });
  }
});

// Listar Alunos (Cloud SQL com fallback local)
app.get('/api/alunos', async (req, res) => {
  try {
    const sqlAlunos = await getDbAlunos();
    if (Array.isArray(sqlAlunos) && sqlAlunos.length > 0) {
      return res.json({
        alunos: sqlAlunos,
        total: sqlAlunos.length,
      });
    }
  } catch (dbErr) {
    console.error('Falha ao consultar banco Cloud SQL:', dbErr);
  }

  // Fallback para arquivo local se banco estiver em inicialização ou vazio
  const localAlunos = getLocalAlunos();
  return res.json({
    alunos: localAlunos,
    total: localAlunos.length,
  });
});

// Criar Matrícula (Cloud SQL + persistência segura)
app.post('/api/alunos', async (req, res) => {
  try {
    const { nome, telefone, turma, prajed, origem, userId } = req.body;

    if (!nome || !telefone || !turma) {
      return res.status(400).json({
        error: 'Campos obrigatórios: nome, telefone e turma.',
      });
    }

    let alunoCriado: any = null;

    try {
      alunoCriado = await insertDbAluno({
        nome: String(nome),
        telefone: String(telefone),
        turma: String(turma),
        prajed: prajed || 'Branco (Iniciante)',
        origem: origem || 'Site NAK Entre Rios',
        userId: userId || undefined,
      });
    } catch (sqlErr) {
      console.error('Erro na inserção Cloud SQL, acionando gravação local:', sqlErr);
    }

    // Salva cópia local para garantia e resiliência
    const localObj = alunoCriado || {
      id: `local_${Date.now()}`,
      nome: String(nome).trim(),
      telefone: String(telefone).trim(),
      turma: String(turma).trim(),
      prajed: prajed || 'Branco (Iniciante)',
      origem: origem || 'Site NAK Entre Rios',
      status: 'pendente',
      created_at: new Date().toISOString(),
    };

    const locais = getLocalAlunos();
    locais.unshift(localObj);
    saveLocalAlunos(locais);

    return res.status(201).json({
      success: true,
      message: 'Matrícula realizada com sucesso!',
      aluno: localObj,
    });
  } catch (err: any) {
    console.error('Exceção ao matricular aluno:', err);
    return res.status(500).json({ error: 'Erro ao processar matrícula' });
  }
});

// Excluir Aluno
app.delete('/api/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (!isNaN(numericId)) {
      try {
        await deleteDbAluno(numericId);
      } catch (sqlErr) {
        console.error('Erro ao deletar no Cloud SQL:', sqlErr);
      }
    }

    // Também limpa do armazenamento local
    const alunos = getLocalAlunos();
    const filtrados = alunos.filter((a) => String(a.id) !== String(id));
    saveLocalAlunos(filtrados);

    return res.json({ success: true, message: 'Aluno removido com sucesso.' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Erro ao remover aluno' });
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

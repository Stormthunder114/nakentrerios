import {AdminJornadas} from './AdminJornadas';
import { whatsappAluno } from '../../lib/whatsapp-aluno';
import React, { useEffect, useRef, useState } from 'react';
import { LockKeyhole, Search, X, LogOut, Pencil, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { entrar, sair, listarAlunos, salvarAluno, apagarAluno, SessaoExpirada, type AlunoAdmin } from '../../lib/admin';
import { turmas } from '../../lib/validar-matricula';
import './admin.css';
import {AdminFotos} from './AdminFotos';

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const generation = useRef(0);
  const [section,setSection]=useState<'alunos'|'fotos'|'jornadas'>('alunos');
  const [session, setSession] = useState<{token: string; expires: number} | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [rows, setRows] = useState<AlunoAdmin[]>([]);
  const [query, setQuery] = useState('');
  const [turma, setTurma] = useState('');
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [edit, setEdit] = useState<AlunoAdmin | null>(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  useEffect(() => {
    if (!session) return;
    const timer = window.setTimeout(() => {
      generation.current++; setSession(null); setRows([]); setEdit(null);
      setError('Sua sessão expirou. Entre novamente.');
    }, Math.max(0, session.expires - Date.now() - 10000));
    return () => { clearTimeout(timer); void sair(session.token); };
  }, [session]);
  useEffect(() => {
    if (!session) return;
    const current = ++generation.current;
    setLoading(true); setRows([]); setMore(false); setError('');
    const timer = window.setTimeout(async () => {
      try {
        const result = await listarAlunos(session.token, query, turma, page);
        if (current === generation.current) { setRows(result.slice(0, 25)); setMore(result.length > 25); }
      } catch (err) {
        if (current !== generation.current) return;
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os alunos.');
        if (err instanceof SessaoExpirada) { setSession(null); setEdit(null); }
      } finally { if (current === generation.current) setLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); generation.current++; };
  }, [session, query, turma, page, refresh]);
  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { setSession(await entrar(email, password)); setPassword(''); setNotice(''); }
    catch (err) { setError(err instanceof Error ? err.message : 'Falha na conexão. Tente novamente.'); }
    finally { setBusy(false); }
  }
  async function save(event: React.FormEvent) {
    event.preventDefault(); if (!session || !edit) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await salvarAluno(session.token, edit); setEdit(null); setNotice('Dados do aluno atualizados.'); setRefresh(value => value + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.');
      if (err instanceof SessaoExpirada) { setSession(null); setRows([]); setEdit(null); }
    } finally { setBusy(false); }
  }
  async function remove() {
    if (!session || !edit || busy) return;
    if (!window.confirm('Apagar o cadastro de ' + edit.nome + '? Esta ação é permanente.')) return;
    setBusy(true); setError(''); setNotice('');
    try { await apagarAluno(session.token, edit.id); setEdit(null); setNotice('Cadastro apagado.'); setPage(0); setRefresh(v => v + 1); }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível apagar o aluno.'); if (err instanceof SessaoExpirada) {setSession(null);setRows([]);setEdit(null);} }
    finally {setBusy(false);}
  }
  return <dialog ref={dialog} className="nak-admin" aria-labelledby="admin-title" onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}>
    <header className="nak-admin-header">
      <div><span className="nak-admin-eyebrow">NAK ENTRE RIOS · ACESSO RESTRITO</span><h2 id="admin-title">{session ? 'Gerenciamento da academia' : 'Área do professor'}</h2></div>
      <button className="nak-admin-icon" type="button" disabled={busy} onClick={onClose} aria-label="Fechar gerenciamento"><X size={22}/></button>
    </header>
    <div className="nak-admin-body">
      {error && <p className="nak-admin-alert" role="alert">{error}</p>}
      {notice && <p className="nak-admin-success" role="status">{notice}</p>}
      {!session ? <form className="nak-admin-login" onSubmit={login}>
        <LockKeyhole size={32} className="nak-admin-accent"/><h3>Entre para cuidar da sua turma</h3>
        <p>Somente administradores autorizados podem consultar e alterar os cadastros.</p>
        <label>E-mail<input autoFocus type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} disabled={busy}/></label>
        <label>Senha<input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} disabled={busy}/></label>
        <button className="nak-admin-primary" disabled={busy}>{busy ? 'Entrando…' : 'Entrar no gerenciamento'}</button>
        <small>Ao fechar esta área, você será desconectado.</small>
      </form> : <>
        <div className="nak-admin-toolbar"><span><Users size={18}/> Cadastros da academia</span><button type="button" disabled={busy} onClick={() => { generation.current++; setSession(null); setRows([]); setEdit(null); setNotice(''); setError(''); }}><LogOut size={16}/> Sair</button></div>
        <nav className="nak-admin-sections" aria-label="Seções do administrador"><button type="button" disabled={busy} aria-pressed={section==='alunos'} onClick={()=>{setSection('alunos');setError('');setNotice('')}}>Alunos</button><button type="button" disabled={busy} aria-pressed={section==='fotos'} onClick={()=>{setSection('fotos');setError('');setNotice('')}}>Fotos</button><button type="button" disabled={busy} aria-pressed={section==='jornadas'} onClick={()=>{setSection('jornadas');setError('');setNotice('')}}>Jornadas dos Alunos</button></nav>
        {section==='jornadas'?<AdminJornadas token={session.token} busy={busy} setBusy={setBusy} onExpired={()=>{setSession(null);setBusy(false);setError('Sua sessão expirou. Entre novamente.')}}/>:section==='fotos'?<AdminFotos token={session.token} busy={busy} setBusy={setBusy} onExpired={()=>{setSession(null);setRows([]);setEdit(null);setBusy(false);setError('Sua sessão expirou. Entre novamente.')}}/>:<>
        {edit ? <form onSubmit={save} className="nak-admin-edit">
          <h3>Editar aluno</h3>
          <div className="nak-admin-fields">
            <label>Nome do aluno<input autoFocus required minLength={2} maxLength={120} value={edit.nome} onChange={e => setEdit({...edit,nome:e.target.value})} disabled={busy}/></label>
            <label>WhatsApp com DDD<input required type="tel" maxLength={20} value={edit.telefone} onChange={e => setEdit({...edit,telefone:e.target.value})} disabled={busy}/></label>
            <label>Turma<select value={edit.turma} onChange={e => setEdit({...edit,turma:e.target.value})} disabled={busy}>{turmas.map(t => <option key={t}>{t}</option>)}</select></label>
            <label>Graduação / Prajied<input maxLength={80} value={edit.prajed || ''} onChange={e => setEdit({...edit,prajed:e.target.value})} disabled={busy}/></label>
          </div>{whatsappAluno(edit.telefone) && <a className="nak-aluno-whatsapp" href={whatsappAluno(edit.telefone)!} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp ↗</a>}<div className="nak-admin-actions"><button className="nak-admin-primary" disabled={busy}>{busy ? 'Salvando…' : 'Salvar alterações'}</button><button type="button" disabled={busy} onClick={() => {setEdit(null); setError('');}}>Cancelar</button><button type="button" className="nak-admin-delete" disabled={busy} onClick={remove}>Apagar aluno</button></div>
        </form> : <>
          <div className="nak-admin-filters"><label><span><Search size={16}/> Buscar aluno</span><input type="search" placeholder="Nome ou WhatsApp" maxLength={120} value={query} onChange={e => {setQuery(e.target.value);setPage(0);}}/></label><label>Turma<select value={turma} onChange={e => {setTurma(e.target.value);setPage(0);}}><option value="">Todas as turmas</option>{turmas.map(t => <option key={t}>{t}</option>)}</select></label><button type="button" disabled={loading} onClick={() => setRefresh(value => value + 1)}>Atualizar</button></div>
          {loading ? <p role="status" className="nak-admin-empty">Carregando alunos…</p> : rows.length === 0 ? <p className="nak-admin-empty">{error ? 'A lista não pôde ser carregada. Tente atualizar.' : 'Nenhum aluno encontrado.'}</p> : <div className="nak-admin-table-wrap"><table><caption className="sr-only">Alunos cadastrados</caption><thead><tr><th>Aluno</th><th>WhatsApp</th><th>Turma / graduação</th><th>Cadastro</th><th>Ação</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><strong>{row.nome}</strong></td><td>{row.telefone}{whatsappAluno(row.telefone) && <a className="nak-aluno-whatsapp" href={whatsappAluno(row.telefone)!} target="_blank" rel="noopener noreferrer" aria-label={`Conversar com ${row.nome} no WhatsApp`}>Conversar no WhatsApp ↗</a>}</td><td>{row.turma}<small>{row.prajed || 'Não informada'}</small></td><td>{row.criado_em ? new Date(row.criado_em).toLocaleDateString('pt-BR') : '—'}</td><td><button type="button" aria-label={`Editar ${row.nome}`} onClick={() => {setEdit({...row});setNotice('');setError('');}}><Pencil size={15}/> Editar</button></td></tr>)}</tbody></table></div>}
          <div className="nak-admin-pagination"><button type="button" disabled={loading || page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft size={16}/> Anterior</button><span>Página {page + 1} · {rows.length} alunos</span><button type="button" disabled={loading || !more} onClick={() => setPage(p => p + 1)}>Próxima <ChevronRight size={16}/></button></div>
        </>}
        </>}
      </>}
    </div>
  </dialog>;
}

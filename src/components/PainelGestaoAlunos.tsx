import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  CreditCard, 
  CalendarCheck, 
  UserPlus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Phone, 
  ArrowLeft, 
  Plus, 
  DollarSign, 
  Calendar, 
  Shield, 
  Check, 
  Send, 
  FileText, 
  TrendingUp,
  Download,
  Award
} from 'lucide-react';
import { NakLogo } from './NakLogo';
import type { Aluno, Pagamento, PresencaRegistro, TurmaId } from '../types';
import { 
  buscarAlunosRecentes, 
  cadastrarAluno, 
  atualizarAluno, 
  excluirAluno, 
  buscarPagamentos, 
  registrarPagamento, 
  excluirPagamento, 
  buscarPresencas, 
  salvarChamadaPresenca 
} from '../lib/supabase';

interface PainelGestaoAlunosProps {
  onVoltarAoSite: () => void;
}

// Lista de turmas oficiais da NAK Entre Rios
const TURMAS_OPCOES: TurmaId[] = [
  'Manhã - 07:00',
  'Noite - 19:30',
  'Feminino - 18:30',
  'Kids - 17:30',
];

// Graduações (Prajied) do Muay Thai Tradicional
const PRAJIED_OPCOES = [
  { nome: 'Branco (Iniciante)', cor: 'bg-zinc-100 text-zinc-800 border-zinc-300' },
  { nome: 'Branco e Vermelho (Amador 1)', cor: 'bg-red-50 text-red-700 border-red-200' },
  { nome: 'Vermelho (Amador 2)', cor: 'bg-red-600 text-white border-red-700' },
  { nome: 'Vermelho e Azul Claro (Intermediário)', cor: 'bg-gradient-to-r from-red-600 to-sky-500 text-white border-red-500' },
  { nome: 'Azul Claro (Avançado)', cor: 'bg-sky-500 text-white border-sky-600' },
  { nome: 'Azul e Escuro (Instrutor Auxiliar)', cor: 'bg-blue-800 text-white border-blue-900' },
  { nome: 'Preto (Professor/Kru)', cor: 'bg-black text-white border-zinc-800' },
];

// Dados iniciais de demonstração realistas para a academia
const ALUNOS_INICIAIS: Aluno[] = [
  {
    id: 'nak_01',
    nome: 'Carlos Eduardo Santos',
    telefone: '42999123456',
    turma: 'Noite - 19:30',
    prajed: 'Vermelho (Amador 2)',
    status: 'ativo',
    statusPagamento: 'em_dia',
    valorMensalidade: 120,
    vencimentoMensalidade: 10,
    criado_em: '2026-01-15T10:00:00.000Z',
    observacoes: 'Foco em competição WFC Paraná. Sparring liberado.',
    contatoEmergencia: 'Esposa Mariana (42) 99888-1122',
  },
  {
    id: 'nak_02',
    nome: 'Beatriz Almeida Rocha',
    telefone: '42988776655',
    turma: 'Feminino - 18:30',
    prajed: 'Branco e Vermelho (Amador 1)',
    status: 'ativo',
    statusPagamento: 'em_dia',
    valorMensalidade: 120,
    vencimentoMensalidade: 5,
    criado_em: '2026-02-10T14:30:00.000Z',
    observacoes: 'Treino de condicionamento e defesa pessoal.',
    contatoEmergencia: 'Mãe Silvana (42) 99111-2233',
  },
  {
    id: 'nak_03',
    nome: 'Lucas Gabriel Silveira',
    telefone: '42991002233',
    turma: 'Kids - 17:30',
    prajed: 'Branco (Iniciante)',
    status: 'ativo',
    statusPagamento: 'pendente',
    valorMensalidade: 100,
    vencimentoMensalidade: 15,
    criado_em: '2026-03-01T09:00:00.000Z',
    observacoes: '11 anos. Turma infantil. Ótima disciplina.',
    contatoEmergencia: 'Pai Roberto (42) 99900-4455',
  },
  {
    id: 'nak_04',
    nome: 'Mateus Henrique Ramos',
    telefone: '42998223344',
    turma: 'Manhã - 07:00',
    prajed: 'Vermelho e Azul Claro (Intermediário)',
    status: 'ativo',
    statusPagamento: 'em_dia',
    valorMensalidade: 120,
    vencimentoMensalidade: 10,
    criado_em: '2025-11-20T08:00:00.000Z',
    observacoes: 'Atleta do Nak Fight Team.',
    contatoEmergencia: 'Irmão Thiago (42) 98822-9988',
  },
  {
    id: 'nak_05',
    nome: 'Juliana Costa Ferreira',
    telefone: '42984112233',
    turma: 'Feminino - 18:30',
    prajed: 'Branco (Iniciante)',
    status: 'ativo',
    statusPagamento: 'atrasado',
    valorMensalidade: 120,
    vencimentoMensalidade: 5,
    criado_em: '2026-03-12T17:00:00.000Z',
    observacoes: 'Alergia leve a esparadrapo/fitas.',
    contatoEmergencia: 'Marido Renato (42) 99122-3344',
  },
  {
    id: 'nak_06',
    nome: 'Rodrigo Barbosa Mendes',
    telefone: '42999554433',
    turma: 'Noite - 19:30',
    prajed: 'Branco e Vermelho (Amador 1)',
    status: 'ativo',
    statusPagamento: 'em_dia',
    valorMensalidade: 120,
    vencimentoMensalidade: 20,
    criado_em: '2026-02-01T19:30:00.000Z',
    observacoes: 'Objetivo perda de peso e técnica.',
    contatoEmergencia: 'Amigo Lucas (42) 99877-1122',
  },
];

export const PainelGestaoAlunos: React.FC<PainelGestaoAlunosProps> = ({ onVoltarAoSite }) => {
  // Aba ativa: 'alunos' | 'pagamentos' | 'presenca' | 'ficha'
  const [activeTab, setActiveTab] = useState<'alunos' | 'pagamentos' | 'presenca' | 'ficha'>('alunos');

  // Estados principais
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [presencas, setPresencas] = useState<PresencaRegistro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMensagem, setFeedbackMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  // Filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTurma, setFiltroTurma] = useState<string>('todos');
  const [filtroPagamento, setFiltroPagamento] = useState<string>('todos');

  // Modal de Cadastro/Edição de Aluno
  const [isAlunoModalOpen, setIsAlunoModalOpen] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null);
  const [formDataAluno, setFormDataAluno] = useState({
    nome: '',
    telefone: '',
    turma: 'Noite - 19:30',
    prajed: 'Branco (Iniciante)',
    status: 'ativo',
    statusPagamento: 'em_dia',
    valorMensalidade: 120,
    vencimentoMensalidade: 10,
    contatoEmergencia: '',
    observacoes: '',
  });

  // Modal de Confirmação de Exclusão de Aluno
  const [alunoParaExcluir, setAlunoParaExcluir] = useState<Aluno | null>(null);

  // Modal de Registrar Pagamento
  const [isPagamentoModalOpen, setIsPagamentoModalOpen] = useState(false);
  const [alunoPagamento, setAlunoPagamento] = useState<Aluno | null>(null);
  const [formDataPagamento, setFormDataPagamento] = useState({
    alunoId: '',
    alunoNome: '',
    valor: 120,
    mesReferencia: 'Maio/2026',
    dataPagamento: new Date().toISOString().slice(0, 10),
    formaPagamento: 'PIX',
    observacoes: '',
  });

  // Estado para Chamada de Presença Diária
  const [dataChamada, setDataChamada] = useState<string>(new Date().toISOString().slice(0, 10));
  const [turmaChamada, setTurmaChamada] = useState<TurmaId>('Noite - 19:30');
  const [chamadaTemp, setChamadaTemp] = useState<Record<string, boolean>>({});

  // Aluno Selecionado para Ficha Completa
  const [alunoSelecionadoFicha, setAlunoSelecionadoFicha] = useState<Aluno | null>(null);

  // Exibir toast temporário
  const mostrarToast = (texto: string, tipo: 'sucesso' | 'erro' = 'sucesso') => {
    setFeedbackMensagem({ texto, tipo });
    setTimeout(() => setFeedbackMensagem(null), 3500);
  };

  // Carregar dados na montagem
  useEffect(() => {
    async function carregarTudo() {
      setIsLoading(true);
      try {
        const [resAlunos, resPags, resPres] = await Promise.all([
          buscarAlunosRecentes(),
          buscarPagamentos(),
          buscarPresencas(),
        ]);

        let alunosLista: Aluno[] = resAlunos.data || [];
        if (alunosLista.length === 0) {
          // Inicializa com dados modelo se estiver vazio
          alunosLista = ALUNOS_INICIAIS;
          try {
            localStorage.setItem('nak_alunos_registrados', JSON.stringify(ALUNOS_INICIAIS));
          } catch {}
        }

        setAlunos(alunosLista);

        // Se houver pagamentos salvos, usa; caso contrário, gera alguns de exemplo
        if (resPags.data && resPags.data.length > 0) {
          setPagamentos(resPags.data);
        } else {
          const pagamentosExemplo: Pagamento[] = [
            {
              id: 'pag_ex_1',
              alunoId: 'nak_01',
              alunoNome: 'Carlos Eduardo Santos',
              valor: 120,
              mesReferencia: 'Maio/2026',
              dataPagamento: '2026-05-02',
              formaPagamento: 'PIX',
              status: 'pago',
              observacoes: 'Comprovante via WhatsApp',
            },
            {
              id: 'pag_ex_2',
              alunoId: 'nak_02',
              alunoNome: 'Beatriz Almeida Rocha',
              valor: 120,
              mesReferencia: 'Maio/2026',
              dataPagamento: '2026-05-04',
              formaPagamento: 'Dinheiro',
              status: 'pago',
              observacoes: 'Pago no balcão',
            },
            {
              id: 'pag_ex_3',
              alunoId: 'nak_04',
              alunoNome: 'Mateus Henrique Ramos',
              valor: 120,
              mesReferencia: 'Maio/2026',
              dataPagamento: '2026-05-01',
              formaPagamento: 'PIX',
              status: 'pago',
            },
          ];
          setPagamentos(pagamentosExemplo);
          try {
            localStorage.setItem('nak_pagamentos', JSON.stringify(pagamentosExemplo));
          } catch {}
        }

        // Se houver presenças salvas, usa
        if (resPres.data && resPres.data.length > 0) {
          setPresencas(resPres.data);
        } else {
          // Prepara presenças de exemplo
          const presencasExemplo: PresencaRegistro[] = [
            {
              id: 'pres_ex_1',
              data: new Date().toISOString().slice(0, 10),
              turma: 'Noite - 19:30',
              alunoId: 'nak_01',
              alunoNome: 'Carlos Eduardo Santos',
              presente: true,
            },
            {
              id: 'pres_ex_2',
              data: new Date().toISOString().slice(0, 10),
              turma: 'Noite - 19:30',
              alunoId: 'nak_06',
              alunoNome: 'Rodrigo Barbosa Mendes',
              presente: true,
            },
          ];
          setPresencas(presencasExemplo);
          try {
            localStorage.setItem('nak_presencas', JSON.stringify(presencasExemplo));
          } catch {}
        }

        if (alunosLista.length > 0) {
          setAlunoSelecionadoFicha(alunosLista[0]);
        }
      } catch (err) {
        console.error('Erro ao inicializar dados:', err);
      } finally {
        setIsLoading(false);
      }
    }

    carregarTudo();
  }, []);

  // Alunos filtrados
  const alunosFiltrados = useMemo(() => {
    return alunos.filter((aluno) => {
      const matchBusca = 
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.telefone.includes(searchTerm) ||
        (aluno.prajed && aluno.prajed.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchTurma = filtroTurma === 'todos' || aluno.turma === filtroTurma;
      const matchPag = filtroPagamento === 'todos' || (aluno.statusPagamento || 'em_dia') === filtroPagamento;

      return matchBusca && matchTurma && matchPag;
    });
  }, [alunos, searchTerm, filtroTurma, filtroPagamento]);

  // Alunos da turma selecionada na Chamada
  const alunosDaTurmaChamada = useMemo(() => {
    return alunos.filter((a) => a.turma === turmaChamada);
  }, [alunos, turmaChamada]);

  // Sincroniza chamadaTemp ao mudar data ou turma da chamada
  useEffect(() => {
    const mapa: Record<string, boolean> = {};
    alunosDaTurmaChamada.forEach((aluno) => {
      const idStr = String(aluno.id);
      const reg = presencas.find(
        (p) => p.data === dataChamada && p.turma === turmaChamada && String(p.alunoId) === idStr
      );
      mapa[idStr] = reg ? reg.presente : true; // Padrão: presente
    });
    setChamadaTemp(mapa);
  }, [dataChamada, turmaChamada, alunosDaTurmaChamada, presencas]);

  // Métricas de topo
  const kpis = useMemo(() => {
    const total = alunos.length;
    const emDia = alunos.filter((a) => (a.statusPagamento || 'em_dia') === 'em_dia').length;
    const pendentes = alunos.filter((a) => a.statusPagamento === 'pendente' || a.statusPagamento === 'atrasado').length;
    const arrecadadoMes = pagamentos
      .filter((p) => p.status === 'pago')
      .reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);
    const presencasHoje = presencas.filter((p) => p.data === new Date().toISOString().slice(0, 10) && p.presente).length;

    return { total, emDia, pendentes, arrecadadoMes, presencasHoje };
  }, [alunos, pagamentos, presencas]);

  // Abertura do Modal de Novo Aluno
  const handleNovoAluno = () => {
    setAlunoEditando(null);
    setFormDataAluno({
      nome: '',
      telefone: '',
      turma: 'Noite - 19:30',
      prajed: 'Branco (Iniciante)',
      status: 'ativo',
      statusPagamento: 'em_dia',
      valorMensalidade: 120,
      vencimentoMensalidade: 10,
      contatoEmergencia: '',
      observacoes: '',
    });
    setIsAlunoModalOpen(true);
  };

  // Abertura do Modal de Editar Aluno
  const handleEditarAluno = (aluno: Aluno) => {
    setAlunoEditando(aluno);
    setFormDataAluno({
      nome: aluno.nome,
      telefone: aluno.telefone,
      turma: aluno.turma,
      prajed: aluno.prajed || 'Branco (Iniciante)',
      status: (aluno.status as any) || 'ativo',
      statusPagamento: (aluno.statusPagamento as any) || 'em_dia',
      valorMensalidade: aluno.valorMensalidade || 120,
      vencimentoMensalidade: aluno.vencimentoMensalidade || 10,
      contatoEmergencia: aluno.contatoEmergencia || '',
      observacoes: aluno.observacoes || '',
    });
    setIsAlunoModalOpen(true);
  };

  // Salvar Aluno (Novo ou Editado)
  const handleSalvarAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDataAluno.nome.trim() || !formDataAluno.telefone.trim()) {
      mostrarToast('Por favor, preencha o nome e telefone do aluno.', 'erro');
      return;
    }

    if (alunoEditando && alunoEditando.id) {
      // Atualização
      const { data, error } = await atualizarAluno(alunoEditando.id, formDataAluno);
      if (!error) {
        setAlunos((prev) =>
          prev.map((a) => (String(a.id) === String(alunoEditando.id) ? { ...a, ...formDataAluno } : a))
        );
        mostrarToast(`Dados de ${formDataAluno.nome} atualizados com sucesso!`);
        setIsAlunoModalOpen(false);
      } else {
        mostrarToast('Erro ao atualizar aluno. Tente novamente.', 'erro');
      }
    } else {
      // Novo cadastro
      const { data, error } = await cadastrarAluno({
        nome: formDataAluno.nome,
        telefone: formDataAluno.telefone,
        turma: formDataAluno.turma,
        prajed: formDataAluno.prajed,
      });

      const novoCompleto: Aluno = {
        ...formDataAluno,
        id: data?.id || `local_${Date.now()}`,
        criado_em: new Date().toISOString(),
      };

      setAlunos((prev) => [novoCompleto, ...prev]);
      mostrarToast(`Aluno ${formDataAluno.nome} cadastrado com sucesso!`);
      setIsAlunoModalOpen(false);
    }
  };

  // Confirmar Exclusão de Aluno
  const handleConfirmarExclusao = async () => {
    if (!alunoParaExcluir || !alunoParaExcluir.id) return;
    const nomeExcluido = alunoParaExcluir.nome;
    const { error } = await excluirAluno(alunoParaExcluir.id);

    if (!error) {
      setAlunos((prev) => prev.filter((a) => String(a.id) !== String(alunoParaExcluir.id)));
      mostrarToast(`Aluno ${nomeExcluido} excluído com sucesso.`);
    } else {
      mostrarToast('Não foi possível excluir o aluno.', 'erro');
    }
    setAlunoParaExcluir(null);
  };

  // Abrir Modal de Pagamento para um Aluno
  const handleAbrirPagamento = (aluno: Aluno) => {
    setAlunoPagamento(aluno);
    setFormDataPagamento({
      alunoId: String(aluno.id || ''),
      alunoNome: aluno.nome,
      valor: aluno.valorMensalidade || 120,
      mesReferencia: 'Maio/2026',
      dataPagamento: new Date().toISOString().slice(0, 10),
      formaPagamento: 'PIX',
      observacoes: '',
    });
    setIsPagamentoModalOpen(true);
  };

  // Salvar Pagamento
  const handleSalvarPagamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDataPagamento.alunoId || !formDataPagamento.valor) {
      mostrarToast('Dados incompletos para pagamento.', 'erro');
      return;
    }

    const res = await registrarPagamento({
      alunoId: formDataPagamento.alunoId,
      alunoNome: formDataPagamento.alunoNome,
      valor: Number(formDataPagamento.valor),
      mesReferencia: formDataPagamento.mesReferencia,
      dataPagamento: formDataPagamento.dataPagamento,
      formaPagamento: formDataPagamento.formaPagamento,
      observacoes: formDataPagamento.observacoes,
    });

    if (res.data) {
      setPagamentos((prev) => [res.data, ...prev]);
      // Atualiza o aluno para status "em_dia"
      setAlunos((prev) =>
        prev.map((a) =>
          String(a.id) === String(formDataPagamento.alunoId) ? { ...a, statusPagamento: 'em_dia' } : a
        )
      );
      mostrarToast(`Pagamento de R$ ${formDataPagamento.valor} registrado para ${formDataPagamento.alunoNome}!`);
      setIsPagamentoModalOpen(false);
    } else {
      mostrarToast('Erro ao salvar pagamento.', 'erro');
    }
  };

  // Excluir Pagamento
  const handleExcluirPagamento = async (id: string | number) => {
    if (confirm('Tem certeza que deseja excluir este registro de pagamento?')) {
      await excluirPagamento(id);
      setPagamentos((prev) => prev.filter((p) => String(p.id) !== String(id)));
      mostrarToast('Registro de pagamento removido.');
    }
  };

  // Salvar Chamada de Presença
  const handleSalvarChamada = async () => {
    const registros = alunosDaTurmaChamada.map((aluno) => ({
      data: dataChamada,
      turma: turmaChamada,
      alunoId: aluno.id!,
      alunoNome: aluno.nome,
      presente: chamadaTemp[String(aluno.id)] ?? true,
    }));

    const res = await salvarChamadaPresenca(registros);
    if (res.data) {
      // Atualiza presenças na memória
      setPresencas((prev) => {
        const datasTurmas = `${dataChamada}_${turmaChamada}`;
        const limpas = prev.filter((p) => `${p.data}_${p.turma}` !== datasTurmas);
        return [...res.data, ...limpas];
      });
      mostrarToast(`Chamada da turma ${turmaChamada} salva com sucesso!`);
    } else {
      mostrarToast('Erro ao salvar chamada.', 'erro');
    }
  };

  // Alternar presença de um aluno no dia
  const togglePresencaAluno = (alunoId: string | number) => {
    const idStr = String(alunoId);
    setChamadaTemp((prev) => ({
      ...prev,
      [idStr]: !prev[idStr],
    }));
  };

  // Marcar todos presentes
  const marcarTodosPresentes = () => {
    const todos: Record<string, boolean> = {};
    alunosDaTurmaChamada.forEach((a) => {
      todos[String(a.id)] = true;
    });
    setChamadaTemp(todos);
    mostrarToast('Todos os alunos marcados como presentes.');
  };

  // Obter cor do Prajied
  const getPrajiedBadge = (prajed?: string) => {
    const encontrado = PRAJIED_OPCOES.find((p) => p.nome === prajed);
    return encontrado?.cor || 'bg-zinc-100 text-zinc-800 border-zinc-200';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-600 selection:text-white flex flex-col">
      {/* Top Header do Painel */}
      <header className="border-b border-zinc-800 bg-zinc-900/90 backdrop-blur sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVoltarAoSite}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition border border-zinc-700 active:scale-95 cursor-pointer"
            title="Voltar para a página principal da academia"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Voltar ao Site</span>
          </button>

          <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <NakLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Teko'] text-xl sm:text-2xl uppercase tracking-wider font-bold leading-none text-white">
                  <span className="text-red-600">NAK</span> Gestão de Alunos
                </span>
                <span className="bg-red-600/20 text-red-400 border border-red-600/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin CT
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Centro de Treinamento Muay Thai • Entre Rios - PR
              </p>
            </div>
          </div>
        </div>

        {/* Informações do Professor & Ação Rápida */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={handleNovoAluno}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-lg shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Aluno</span>
          </button>

          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-red-500">
              JR
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-zinc-200 leading-tight">Prof. Jonatas Ramos</p>
              <p className="text-[10px] text-zinc-400">Kru Muay Thai</p>
            </div>
          </div>
        </div>
      </header>

      {/* Toast Feedback */}
      {feedbackMensagem && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs sm:text-sm font-medium ${
            feedbackMensagem.tipo === 'sucesso' 
              ? 'bg-zinc-900 border-emerald-500 text-emerald-400' 
              : 'bg-zinc-900 border-red-500 text-red-400'
          }`}>
            {feedbackMensagem.tipo === 'sucesso' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedbackMensagem.texto}</span>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Banner de Boas-vindas e Métricas */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-zinc-700 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">Total de Alunos</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Teko'] text-white tracking-tight">
              {kpis.total} <span className="text-sm font-sans font-normal text-zinc-400">matriculados</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">{kpis.emDia}</span> em dia • 
              <span className="text-amber-400 font-bold ml-1">{kpis.pendentes}</span> pendentes
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-zinc-700 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">Mensalidades em Dia</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Teko'] text-emerald-400 tracking-tight">
              {kpis.total > 0 ? Math.round((kpis.emDia / kpis.total) * 100) : 0}%
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              {kpis.emDia} de {kpis.total} alunos regularizados
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-zinc-700 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">Arrecadado no Mês</span>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Teko'] text-white tracking-tight">
              R$ {kpis.arrecadadoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              {pagamentos.length} pagamentos processados
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-zinc-700 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider">Presenças Hoje</span>
              <CalendarCheck className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-['Teko'] text-sky-400 tracking-tight">
              {kpis.presencasHoje} <span className="text-sm font-sans font-normal text-zinc-400">no tatame</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              Registro diário de frequência
            </div>
          </div>
        </section>

        {/* Abas de Navegação Principal */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('alunos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0 ${
              activeTab === 'alunos'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Alunos Cadastrados ({alunos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pagamentos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0 ${
              activeTab === 'pagamentos'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Controle de Pagamentos ({pagamentos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presenca')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0 ${
              activeTab === 'presenca'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Chamada & Presença</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ficha')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0 ${
              activeTab === 'ficha'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ficha do Aluno</span>
          </button>
        </div>

        {/* ABA 1: ALUNOS CADASTRADOS & EDIÇÃO */}
        {activeTab === 'alunos' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Barra de Filtros e Busca */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar aluno por nome, telefone ou graduação..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-600 transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-300">
                  <Filter className="w-3.5 h-3.5 text-red-500" />
                  <select
                    value={filtroTurma}
                    onChange={(e) => setFiltroTurma(e.target.value)}
                    className="bg-transparent text-zinc-200 focus:outline-none text-xs cursor-pointer"
                  >
                    <option value="todos" className="bg-zinc-900">Todas as Turmas</option>
                    {TURMAS_OPCOES.map((t) => (
                      <option key={t} value={t} className="bg-zinc-900">{t}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-300">
                  <span className="text-zinc-500">Status:</span>
                  <select
                    value={filtroPagamento}
                    onChange={(e) => setFiltroPagamento(e.target.value)}
                    className="bg-transparent text-zinc-200 focus:outline-none text-xs cursor-pointer"
                  >
                    <option value="todos" className="bg-zinc-900">Todos os Status</option>
                    <option value="em_dia" className="bg-zinc-900">Em Dia</option>
                    <option value="pendente" className="bg-zinc-900">Pendente</option>
                    <option value="atrasado" className="bg-zinc-900">Atrasado</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNovoAluno}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition active:scale-95 cursor-pointer ml-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar</span>
                </button>
              </div>
            </div>

            {/* Lista / Tabela de Alunos */}
            {isLoading ? (
              <div className="p-12 text-center text-zinc-500">Carregando lista de alunos...</div>
            ) : alunosFiltrados.length === 0 ? (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
                <Users className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-sm text-zinc-400 font-medium">Nenhum aluno encontrado com os filtros aplicados.</p>
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setFiltroTurma('todos'); setFiltroPagamento('todos'); }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Aluno & Graduação</th>
                        <th className="py-3 px-4">Turma</th>
                        <th className="py-3 px-4">WhatsApp / Contato</th>
                        <th className="py-3 px-4">Mensalidade</th>
                        <th className="py-3 px-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {alunosFiltrados.map((aluno) => {
                        const statusPag = aluno.statusPagamento || 'em_dia';
                        const numLimpo = aluno.telefone.replace(/\D/g, '');
                        const linkWhats = `https://wa.me/55${numLimpo}?text=Ol%C3%A1%20${encodeURIComponent(aluno.nome)}!%20Aqui%20%C3%A9%20o%20Professor%20Jonatas%20da%20NAK%20Entre%20Rios.`;

                        return (
                          <tr key={aluno.id} className="hover:bg-zinc-800/40 transition">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                                  {aluno.nome.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-semibold text-zinc-100 flex items-center gap-2">
                                    <span>{aluno.nome}</span>
                                    {aluno.status === 'inativo' && (
                                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">Inativo</span>
                                    )}
                                  </div>
                                  <div className="mt-0.5">
                                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPrajiedBadge(aluno.prajed)}`}>
                                      {aluno.prajed || 'Branco (Iniciante)'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-zinc-300 font-medium">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                                <Clock className="w-3 h-3 text-red-500" />
                                {aluno.turma}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <a
                                  href={linkWhats}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold transition"
                                  title="Enviar mensagem direta pelo WhatsApp"
                                >
                                  <Phone className="w-3 h-3 text-emerald-400" />
                                  <span>{aluno.telefone}</span>
                                </a>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="space-y-1">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  statusPag === 'em_dia' 
                                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' 
                                    : statusPag === 'pendente'
                                    ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                                    : 'bg-red-950/60 text-red-400 border border-red-800'
                                }`}>
                                  {statusPag === 'em_dia' && <Check className="w-3 h-3" />}
                                  {statusPag === 'pendente' && <Clock className="w-3 h-3" />}
                                  {statusPag === 'atrasado' && <AlertCircle className="w-3 h-3" />}
                                  <span>{statusPag.replace('_', ' ')}</span>
                                </span>
                                <div className="text-[11px] text-zinc-400">
                                  R$ {aluno.valorMensalidade || 120} • Venc. dia {aluno.vencimentoMensalidade || 10}
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleAbrirPagamento(aluno)}
                                  className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-400 transition"
                                  title="Registrar pagamento de mensalidade"
                                >
                                  <DollarSign className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleEditarAluno(aluno)}
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
                                  title="Editar dados do aluno"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setAlunoSelecionadoFicha(aluno);
                                    setActiveTab('ficha');
                                  }}
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
                                  title="Ver ficha completa"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setAlunoParaExcluir(aluno)}
                                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-400 transition"
                                  title="Excluir aluno"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABA 2: CONTROLE DE PAGAMENTOS */}
        {activeTab === 'pagamentos' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Resumo Financeiro da Academia */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
                <span className="text-xs text-zinc-400 uppercase font-semibold">Total Arrecadado</span>
                <div className="text-3xl font-black font-['Teko'] text-emerald-400 tracking-tight mt-1">
                  R$ {kpis.arrecadadoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Receitas confirmadas via PIX, Dinheiro e Cartão</p>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
                <span className="text-xs text-zinc-400 uppercase font-semibold">Alunos Pendentes / Atrasados</span>
                <div className="text-3xl font-black font-['Teko'] text-amber-400 tracking-tight mt-1">
                  {kpis.pendentes} <span className="text-sm font-sans font-normal text-zinc-400">alunos</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Lembretes podem ser disparados pelo WhatsApp</p>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Ação Rápida</span>
                  <p className="text-xs text-zinc-300 mt-1">Lançar recebimento de mensalidade avulsa</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (alunos.length > 0) {
                      handleAbrirPagamento(alunos[0]);
                    } else {
                      mostrarToast('Cadastre um aluno primeiro.', 'erro');
                    }
                  }}
                  className="mt-3 w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Pagamento</span>
                </button>
              </div>
            </div>

            {/* Lista de Alunos Inadimplentes com Botão de Cobrança WhatsApp */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Lembretes de Pagamento Pendente
                  </h3>
                  <p className="text-xs text-zinc-400">Envie uma mensagem respeitosa com 1 clique para alunos pendentes</p>
                </div>
              </div>

              {alunos.filter((a) => a.statusPagamento === 'pendente' || a.statusPagamento === 'atrasado').length === 0 ? (
                <div className="p-6 text-center text-xs text-emerald-400 font-medium bg-emerald-950/20 border border-emerald-900/40 rounded-xl">
                  🎉 Excelente! Todas as mensalidades dos alunos estão em dia!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {alunos
                    .filter((a) => a.statusPagamento === 'pendente' || a.statusPagamento === 'atrasado')
                    .map((aluno) => {
                      const numLimpo = aluno.telefone.replace(/\D/g, '');
                      const msg = `Sawadee Krap, ${aluno.nome}! Tudo bem? Passando para lembrar sobre a mensalidade do Muay Thai na NAK Entre Rios (Vencimento dia ${aluno.vencimentoMensalidade || 10} • Valor R$ ${aluno.valorMensalidade || 120}). Qualquer dúvida estamos à disposição! Oss!`;
                      const linkWhats = `https://wa.me/55${numLimpo}?text=${encodeURIComponent(msg)}`;

                      return (
                        <div key={aluno.id} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                          <div>
                            <div className="font-semibold text-zinc-200 text-xs">{aluno.nome}</div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              Turma {aluno.turma} • R$ {aluno.valorMensalidade || 120}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={linkWhats}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition"
                              title="Enviar lembrete amigável no WhatsApp"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Lembrete WhatsApp</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleAbrirPagamento(aluno)}
                              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium transition"
                            >
                              Dar Baixa
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Histórico de Recibos / Pagamentos Realizados */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Histórico de Pagamentos Recebidos</h3>
                  <p className="text-xs text-zinc-400">Todos os lançamentos confirmados de mensalidades</p>
                </div>
              </div>

              {pagamentos.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500">Nenhum pagamento registrado ainda.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Aluno</th>
                        <th className="py-3 px-4">Mês de Ref.</th>
                        <th className="py-3 px-4">Valor</th>
                        <th className="py-3 px-4">Forma</th>
                        <th className="py-3 px-4">Data Pagamento</th>
                        <th className="py-3 px-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {pagamentos.map((pag) => (
                        <tr key={pag.id} className="hover:bg-zinc-800/40 transition">
                          <td className="py-3.5 px-4 font-semibold text-zinc-200">
                            {pag.alunoNome}
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400">
                            {pag.mesReferencia}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-400">
                            R$ {Number(pag.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-semibold">
                              {pag.formaPagamento}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400">
                            {pag.dataPagamento}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleExcluirPagamento(pag.id)}
                              className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition"
                              title="Remover este registro de pagamento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA 3: CHAMADA & PRESENÇA NO TATAME */}
        {activeTab === 'presenca' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Seletor de Data e Turma para a Chamada */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Data da Aula:
                  </label>
                  <input
                    type="date"
                    value={dataChamada}
                    onChange={(e) => setDataChamada(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Turma do Treino:
                  </label>
                  <select
                    value={turmaChamada}
                    onChange={(e) => setTurmaChamada(e.target.value as TurmaId)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {TURMAS_OPCOES.map((t) => (
                      <option key={t} value={t} className="bg-zinc-900">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={marcarTodosPresentes}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
                >
                  Marcar Todos Presentes
                </button>
                <button
                  type="button"
                  onClick={handleSalvarChamada}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-lg shadow-red-600/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar Chamada</span>
                </button>
              </div>
            </div>

            {/* Checklist de Alunos da Turma */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Alunos da Turma ({turmaChamada})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Clique no botão de presença para alternar entre Presente e Falta
                  </p>
                </div>
                <span className="text-xs text-zinc-400 font-medium">
                  {alunosDaTurmaChamada.length} alunos matriculados nesta turma
                </span>
              </div>

              {alunosDaTurmaChamada.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500">
                  Nenhum aluno cadastrado nesta turma ainda. Vá para a aba "Alunos" para matricular alunos nesta turma.
                </div>
              ) : (
                <div className="divide-y divide-zinc-800/60">
                  {alunosDaTurmaChamada.map((aluno) => {
                    const isPresente = chamadaTemp[String(aluno.id)] ?? true;

                    return (
                      <div
                        key={aluno.id}
                        className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-800/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                            isPresente ? 'bg-emerald-950 border border-emerald-700 text-emerald-300' : 'bg-red-950 border border-red-800 text-red-300'
                          }`}>
                            {aluno.nome.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-200 text-sm">{aluno.nome}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPrajiedBadge(aluno.prajed)}`}>
                                {aluno.prajed || 'Branco'}
                              </span>
                              <span className="text-[11px] text-zinc-500">
                                WhatsApp: {aluno.telefone}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botão de Toggle de Presença */}
                        <button
                          type="button"
                          onClick={() => togglePresencaAluno(aluno.id!)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                            isPresente
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-zinc-700'
                          }`}
                        >
                          {isPresente ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-white" />
                              <span>Presente</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span>Falta</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA 4: FICHA DO ALUNO */}
        {activeTab === 'ficha' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Seletor do Aluno para Visualização Detalhada */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Selecionar Aluno:</span>
              <select
                value={alunoSelecionadoFicha ? String(alunoSelecionadoFicha.id) : ''}
                onChange={(e) => {
                  const achado = alunos.find((a) => String(a.id) === e.target.value);
                  if (achado) setAlunoSelecionadoFicha(achado);
                }}
                className="w-full sm:w-auto flex-1 max-w-md bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                {alunos.map((a) => (
                  <option key={a.id} value={String(a.id)} className="bg-zinc-900">
                    {a.nome} — {a.turma}
                  </option>
                ))}
              </select>
            </div>

            {alunoSelecionadoFicha ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Perfil Principal */}
                <div className="lg:col-span-1 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-red-600 flex items-center justify-center font-bold text-white text-2xl shadow-xl shadow-red-600/10">
                      {alunoSelecionadoFicha.nome.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{alunoSelecionadoFicha.nome}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{alunoSelecionadoFicha.turma}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPrajiedBadge(alunoSelecionadoFicha.prajed)}`}>
                      {alunoSelecionadoFicha.prajed || 'Branco (Iniciante)'}
                    </span>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                      <span className="text-zinc-500">Telefone / Whats:</span>
                      <span className="font-semibold text-zinc-200">{alunoSelecionadoFicha.telefone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                      <span className="text-zinc-500">Mensalidade:</span>
                      <span className="font-semibold text-emerald-400">R$ {alunoSelecionadoFicha.valorMensalidade || 120}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                      <span className="text-zinc-500">Dia de Vencimento:</span>
                      <span className="font-semibold text-zinc-200">Todo dia {alunoSelecionadoFicha.vencimentoMensalidade || 10}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800/40">
                      <span className="text-zinc-500">Status Geral:</span>
                      <span className="font-semibold text-zinc-200 uppercase">{alunoSelecionadoFicha.status || 'ativo'}</span>
                    </div>
                    {alunoSelecionadoFicha.contatoEmergencia && (
                      <div className="py-1">
                        <span className="text-zinc-500 block mb-1">Contato de Emergência:</span>
                        <span className="text-zinc-300 font-medium">{alunoSelecionadoFicha.contatoEmergencia}</span>
                      </div>
                    )}
                    {alunoSelecionadoFicha.observacoes && (
                      <div className="py-1">
                        <span className="text-zinc-500 block mb-1">Observações Médicas / Treino:</span>
                        <p className="text-zinc-300 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/60">
                          {alunoSelecionadoFicha.observacoes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditarAluno(alunoSelecionadoFicha)}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Aluno</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAbrirPagamento(alunoSelecionadoFicha)}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Mensalidade</span>
                    </button>
                  </div>
                </div>

                {/* Histórico do Aluno: Pagamentos e Frequência */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Histórico de Pagamentos */}
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      Histórico de Pagamentos de {alunoSelecionadoFicha.nome}
                    </h4>

                    {pagamentos.filter((p) => String(p.alunoId) === String(alunoSelecionadoFicha.id)).length === 0 ? (
                      <p className="text-xs text-zinc-500 py-3">Nenhum pagamento registrado ainda para este aluno.</p>
                    ) : (
                      <div className="space-y-2">
                        {pagamentos
                          .filter((p) => String(p.alunoId) === String(alunoSelecionadoFicha.id))
                          .map((pag) => (
                            <div key={pag.id} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-semibold text-zinc-200">{pag.mesReferencia}</span>
                                <span className="text-zinc-500 ml-2">({pag.dataPagamento})</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-emerald-400">R$ {pag.valor.toFixed(2)}</span>
                                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{pag.formaPagamento}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Histórico de Frequência / Presença */}
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-sky-500" />
                      Frequência & Presenças Registradas
                    </h4>

                    {presencas.filter((p) => String(p.alunoId) === String(alunoSelecionadoFicha.id)).length === 0 ? (
                      <p className="text-xs text-zinc-500 py-3">Nenhuma presença computada até o momento.</p>
                    ) : (
                      <div className="space-y-2">
                        {presencas
                          .filter((p) => String(p.alunoId) === String(alunoSelecionadoFicha.id))
                          .map((pres) => (
                            <div key={pres.id} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-semibold text-zinc-200">Data: {pres.data}</span>
                                <span className="text-zinc-500 ml-2">Turma {pres.turma}</span>
                              </div>
                              <div>
                                {pres.presente ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Presente
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-red-400 text-xs font-semibold">
                                    <XCircle className="w-3.5 h-3.5" /> Falta
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

      </main>

      {/* MODAL: CADASTRAR OU EDITAR ALUNO */}
      {isAlunoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                <span>{alunoEditando ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAlunoModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarAluno} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formDataAluno.nome}
                  onChange={(e) => setFormDataAluno({ ...formDataAluno, nome: e.target.value })}
                  placeholder="Ex: Carlos Eduardo Santos"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={formDataAluno.telefone}
                    onChange={(e) => setFormDataAluno({ ...formDataAluno, telefone: e.target.value })}
                    placeholder="(42) 99999-9999"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Turma de Treino</label>
                  <select
                    value={formDataAluno.turma}
                    onChange={(e) => setFormDataAluno({ ...formDataAluno, turma: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {TURMAS_OPCOES.map((t) => (
                      <option key={t} value={t} className="bg-zinc-900">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Graduação (Prajied)</label>
                  <select
                    value={formDataAluno.prajed}
                    onChange={(e) => setFormDataAluno({ ...formDataAluno, prajed: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {PRAJIED_OPCOES.map((p) => (
                      <option key={p.nome} value={p.nome} className="bg-zinc-900">{p.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Status da Matrícula</label>
                  <select
                    value={formDataAluno.status}
                    onChange={(e) => setFormDataAluno({ ...formDataAluno, status: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    <option value="ativo" className="bg-zinc-900">Ativo</option>
                    <option value="pendente" className="bg-zinc-900">Pendente</option>
                    <option value="inativo" className="bg-zinc-900">Inativo / Trancado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Valor Mensalidade (R$)</label>
                  <input
                    type="number"
                    value={formDataAluno.valorMensalidade}
                    onChange={(e) => setFormDataAluno({ ...formDataAluno, valorMensalidade: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Dia de Vencimento</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={formDataAluno.vencimentoMensalidade}
                    onChange={(e) => setFormDataAluno({ ...formDataAluno, vencimentoMensalidade: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Contato de Emergência</label>
                <input
                  type="text"
                  value={formDataAluno.contatoEmergencia}
                  onChange={(e) => setFormDataAluno({ ...formDataAluno, contatoEmergencia: e.target.value })}
                  placeholder="Ex: Mãe Maria (42) 99999-0000"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Observações Médicas / Notas</label>
                <textarea
                  rows={2}
                  value={formDataAluno.observacoes}
                  onChange={(e) => setFormDataAluno({ ...formDataAluno, observacoes: e.target.value })}
                  placeholder="Lesões anteriores, objetivos, observações..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-red-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAlunoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-md shadow-red-600/20"
                >
                  {alunoEditando ? 'Salvar Alterações' : 'Cadastrar Aluno'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR PAGAMENTO */}
      {isPagamentoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <span>Registrar Pagamento</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsPagamentoModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarPagamento} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-zinc-400 text-xs mb-1">Aluno:</label>
                <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl font-semibold text-zinc-200">
                  {formDataPagamento.alunoNome}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Mês de Referência:</label>
                  <input
                    type="text"
                    value={formDataPagamento.mesReferencia}
                    onChange={(e) => setFormDataPagamento({ ...formDataPagamento, mesReferencia: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Valor (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formDataPagamento.valor}
                    onChange={(e) => setFormDataPagamento({ ...formDataPagamento, valor: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Forma de Pagamento:</label>
                  <select
                    value={formDataPagamento.formaPagamento}
                    onChange={(e) => setFormDataPagamento({ ...formDataPagamento, formaPagamento: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão">Cartão</option>
                    <option value="Transferência">Transferência</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1">Data do Pagamento:</label>
                  <input
                    type="date"
                    value={formDataPagamento.dataPagamento}
                    onChange={(e) => setFormDataPagamento({ ...formDataPagamento, dataPagamento: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs mb-1">Observações do Recibo:</label>
                <input
                  type="text"
                  value={formDataPagamento.observacoes}
                  onChange={(e) => setFormDataPagamento({ ...formDataPagamento, observacoes: e.target.value })}
                  placeholder="Ex: Comprovante enviado no WhatsApp"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsPagamentoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md shadow-emerald-600/20"
                >
                  Confirmar Pagamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {alunoParaExcluir && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-950/80 text-red-500 mx-auto flex items-center justify-center border border-red-800">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Excluir Aluno</h3>
              <p className="text-xs text-zinc-400">
                Tem certeza que deseja excluir permanentemente o aluno <strong>{alunoParaExcluir.nome}</strong>?
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAlunoParaExcluir(null)}
                className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarExclusao}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md shadow-red-600/20"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

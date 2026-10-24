export interface Aluno {
  id?: string | number;
  nome: string;
  telefone: string;
  turma: string;
  prajed?: string;
  origem?: string;
  criado_em?: string;
  created_at?: string;
  status?: 'pendente' | 'confirmado' | 'contatado' | 'ativo' | 'inativo';
  email?: string;
  dataNascimento?: string;
  idade?: number;
  vencimentoMensalidade?: number; // dia do vencimento, ex: 10
  valorMensalidade?: number; // ex: 120
  statusPagamento?: 'em_dia' | 'pendente' | 'atrasado';
  observacoes?: string;
  contatoEmergencia?: string;
  dataMatricula?: string;
}

export interface Pagamento {
  id: string | number;
  alunoId: string | number;
  alunoNome: string;
  valor: number;
  mesReferencia: string; // Ex: 'Maio/2026' ou '2026-05'
  dataPagamento: string; // 'YYYY-MM-DD'
  formaPagamento: 'PIX' | 'Dinheiro' | 'Cartão' | 'Transferência';
  status: 'pago' | 'pendente' | 'estornado';
  observacoes?: string;
}

export interface PresencaRegistro {
  id: string | number;
  data: string; // 'YYYY-MM-DD'
  turma: string;
  alunoId: string | number;
  alunoNome: string;
  presente: boolean;
  horario?: string;
  observacao?: string;
}

export type TurmaId = 
  | 'Manhã - 07:00'
  | 'Noite - 19:30'
  | 'Feminino - 18:30'
  | 'Kids - 17:30';

export interface TurmaDetail {
  id: TurmaId;
  titulo: string;
  horario: string;
  publico: string;
  intensidade: 'Moderada' | 'Alta' | 'Educativa';
  descricao: string;
  dias: string;
  vagasRestantes: number;
  destaque?: boolean;
}


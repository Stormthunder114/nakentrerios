export interface Aluno {
  id?: string | number;
  nome: string;
  telefone: string;
  turma: string;
  prajed?: string;
  origem?: string;
  criado_em?: string;
  created_at?: string;
  status?: 'pendente' | 'confirmado' | 'contatado';
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

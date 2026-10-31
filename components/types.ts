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

export type TurmaId = (typeof import('../lib/validar-matricula').opcoesTurmas)[number]['id'];

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

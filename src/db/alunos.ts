import { db } from './index.ts';
import { alunos } from './schema.ts';
import { desc, eq } from 'drizzle-orm';

export interface CreateAlunoInput {
  nome: string;
  telefone: string;
  turma: string;
  prajed?: string;
  origem?: string;
  userId?: string;
}

export async function getDbAlunos() {
  try {
    return await db.select().from(alunos).orderBy(desc(alunos.createdAt));
  } catch (error) {
    console.error('Database getDbAlunos failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function insertDbAluno(input: CreateAlunoInput) {
  try {
    const result = await db
      .insert(alunos)
      .values({
        nome: input.nome.trim(),
        telefone: input.telefone.trim(),
        turma: input.turma.trim(),
        prajed: input.prajed || 'Branco (Iniciante)',
        origem: input.origem || 'Site NAK Entre Rios',
        userId: input.userId || null,
        status: 'pendente',
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database insertDbAluno failed:', error);
    throw new Error('Database insert failed. Please try again later.', { cause: error });
  }
}

export async function deleteDbAluno(id: number) {
  try {
    const result = await db.delete(alunos).where(eq(alunos.id, id)).returning();
    return result[0];
  } catch (error) {
    console.error('Database deleteDbAluno failed:', error);
    throw new Error('Database delete failed. Please try again later.', { cause: error });
  }
}

export async function updateDbAluno(id: number, data: Partial<CreateAlunoInput & { status?: string }>) {
  try {
    const updatePayload: Record<string, any> = {};
    if (data.nome) updatePayload.nome = data.nome.trim();
    if (data.telefone) updatePayload.telefone = data.telefone.trim();
    if (data.turma) updatePayload.turma = data.turma.trim();
    if (data.prajed) updatePayload.prajed = data.prajed;
    if (data.status) updatePayload.status = data.status;

    const result = await db
      .update(alunos)
      .set(updatePayload)
      .where(eq(alunos.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database updateDbAluno failed:', error);
    throw new Error('Database update failed. Please try again later.', { cause: error });
  }
}


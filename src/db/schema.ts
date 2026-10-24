import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  role: text('role').default('membro'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const alunos = pgTable('alunos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  telefone: text('telefone').notNull(),
  turma: text('turma').notNull(),
  prajed: text('prajed').default('Branco (Iniciante)'),
  origem: text('origem').default('Site NAK Entre Rios'),
  status: text('status').default('pendente'),
  userId: text('user_uid'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  alunos: many(alunos),
}));

export const alunosRelations = relations(alunos, ({ one }) => ({
  user: one(users, {
    fields: [alunos.userId],
    references: [users.uid],
  }),
}));

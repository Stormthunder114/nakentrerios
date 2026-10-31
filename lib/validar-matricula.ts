export const opcoesTurmas = [
  {
    "id": "Adulto manhã - 06h00",
    "titulo": "Adulto manhã",
    "horario": "Terça e quinta · 06h00"
  },
  {
    "id": "Adulto manhã - 08h00",
    "titulo": "Adulto manhã",
    "horario": "Terça e quinta · 08h00"
  },
  {
    "id": "Kids 1 - 5 a 8 anos - 17h30",
    "titulo": "Kids 1 · 5 a 8 anos",
    "horario": "Terça e quinta · 17h30"
  },
  {
    "id": "Kids 2 - 9 a 12 anos - 17h30",
    "titulo": "Kids 2 · 9 a 12 anos",
    "horario": "Quarta e sexta · 17h30"
  },
  {
    "id": "Feminino - a partir de 13 anos - 18h30",
    "titulo": "Feminino · a partir de 13 anos",
    "horario": "Segunda, quarta e sexta · 18h30"
  },
  {
    "id": "Misto - a partir de 13 anos - 19h30",
    "titulo": "Misto · a partir de 13 anos",
    "horario": "Segunda, quarta e sexta · 19h30"
  },
  {
    "id": "Aulas individuais no seu horário",
    "titulo": "Aulas individuais",
    "horario": "No seu horário · combine com o professor"
  }
] as const;
export const turmasNovas: readonly string[] = opcoesTurmas.map(t => t.id);
export const turmas = [...turmasNovas, 'Manhã - 07:00','Noite - 19:30','Feminino - 18:30','Kids - 17:30'];
export function validarMatricula(body: unknown, permitirAntigas = false) {
  if (!body || typeof body !== 'object') return null;
  const input=body as Record<string,unknown>;
  const nome=typeof input.nome==='string' ? input.nome.trim().replace(/\s+/g,' ') : '';
  const telefone=typeof input.telefone==='string' ? input.telefone.replace(/\D/g,'') : '';
  const turma=typeof input.turma==='string' ? input.turma : '';
  if(nome.length<2 || nome.length>120 || !/^\d{10,11}$/.test(telefone) || !(permitirAntigas ? turmas : turmasNovas).includes(turma)) return null;
  return {nome,telefone,turma};
}

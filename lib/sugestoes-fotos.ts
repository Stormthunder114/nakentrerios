export function sugerirDescricoes(titulo:string,categoria:string):string[]{
 const title=titulo.trim().replace(/\s+/g,' ').slice(0,120);
 const prefix=title?`${title} — `:'';
 const normalized=title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 let textos:string[];
 if(/gradu|prajied|prajeid|certific/.test(normalized))textos=['Um registro da nossa jornada no Muay Thai, com dedicação, respeito e aprendizado a cada etapa.','Cada etapa do caminho representa compromisso com o treino e com os valores do Muay Thai.'];
 else if(/manopla|tecnica|treino|aula/.test(normalized))textos=['O Muay Thai se constrói a cada treino, com foco, disciplina e respeito.','Técnica, constância e vontade de aprender fazem parte da nossa caminhada no tatame.'];
 else if(/familia|equipe|uniao/.test(normalized))textos=['Mais que treinar: compartilhar o caminho com respeito, parceria e espírito de equipe.','Um registro da comunidade NAK Entre Rios e da união em torno do Muay Thai.'];
 else textos=({aulas:['O Muay Thai se constrói a cada treino, com foco, disciplina e respeito.','Aprendizado e dedicação fazem parte da nossa rotina no tatame.'],competicoes:['Um registro da nossa caminhada nas competições, com respeito ao esporte e aos adversários.','O espírito de luta vai além do resultado: dedicação, coragem e aprendizado acompanham cada desafio.'],espaco:['Conheça um pouco do espaço onde a NAK Entre Rios compartilha sua paixão pelo Muay Thai.','Um olhar sobre o nosso ambiente de treino e os detalhes do dia a dia na academia.'],graduacoes:['Cada etapa no Muay Thai representa aprendizado, dedicação e respeito à nossa trajetória.','Um registro do caminho de evolução no Muay Thai e dos valores que levamos além do tatame.']} as Record<string,string[]>)[categoria]||['Um registro da nossa caminhada no Muay Thai.','Muay Thai, respeito e dedicação na NAK Entre Rios.'];
 return textos.map(texto=>prefix+texto);
}

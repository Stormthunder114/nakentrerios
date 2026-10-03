import React from 'react';
import { 
  Building2, 
  Award, 
  Trophy, 
  Calendar, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  HeartHandshake, 
  Swords, 
  Flame, 
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NakLogo } from './NakLogo';

interface NakEntreRiosInstitucionalProps {
  onMatriculaClick: () => void;
}

export const NakEntreRiosInstitucional: React.FC<NakEntreRiosInstitucionalProps> = ({ onMatriculaClick }) => {
  const valores = [
    { nome: 'Respeito', desc: 'Ao mestre, aos colegas, aos adversários e a si mesmo dentro e fora do tatame.' },
    { nome: 'Disciplina', desc: 'Compromisso com o treino, pontualidade e dedicação constante ao aprendizado.' },
    { nome: 'Humildade', desc: 'Reconhecer que todo dia é uma oportunidade de aprender algo novo.' },
    { nome: 'Coragem', desc: 'Enfrentar desafios, superar medos e não recuar diante das dificuldades.' },
    { nome: 'Determinação', desc: 'Foco nos objetivos mesmo quando o cansaço e os obstáculos surgirem.' },
    { nome: 'Evolução Constante', desc: 'Melhorar 1% a cada treino, buscando sempre a sua melhor versão.' },
  ];

  return (
    <div id="secaoNakEntreRios" className="space-y-16 scroll-mt-24">
      {/* 1. Apresentação Principal NAK Entre Rios */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <NakLogo size={80} className="shrink-0" />
              <div>
                <span className="text-red-400 font-bold uppercase tracking-widest text-xs block">
                  Distrito de Entre Rios • Guarapuava - PR
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-['Teko'] tracking-tight text-white leading-none">
                  NAK <span className="text-red-500">Entre Rios</span>
                </h2>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold self-start md:self-auto">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Muay Thai Tradicional & Formação de Atletas</span>
            </div>
          </div>

          {/* Texto Oficial NAK Entre Rios */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              <p className="text-zinc-200 font-medium text-base sm:text-lg">
                A <strong>NAK Muay Thai Entre Rios</strong> nasceu com o propósito de levar o Muay Thai para o distrito de Entre Rios, em Guarapuava, oferecendo um espaço de treinamento, disciplina, desenvolvimento pessoal e formação de atletas.
              </p>
              <p>
                À frente da equipe está o <strong>Professor Jonatas Ramos</strong>, responsável pelo desenvolvimento do trabalho da NAK Entre Rios e pela preparação de seus atletas.
              </p>
              <p>
                A NAK Entre Rios tem como objetivo formar praticantes e atletas através dos valores tradicionais do Muay Thai: <span className="text-white font-semibold">respeito, disciplina, humildade, coragem, determinação e evolução constante</span>.
              </p>
              <p>
                Além do treinamento, a equipe proporciona aos seus alunos a oportunidade de participar de <strong>graduações, eventos e competições</strong>, criando um caminho para aqueles que desejam transformar o treinamento em uma experiência competitiva.
              </p>
            </div>

            {/* Destaque Institucional da Câmara */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950/90 border border-red-600/30 space-y-4 shadow-xl shadow-red-950/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-600/10 text-red-400 border border-red-600/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block">
                    Poder Legislativo 2026
                  </span>
                  <h4 className="text-xl font-bold font-['Teko'] uppercase text-white leading-none">
                    Câmara de Guarapuava
                  </h4>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                O trabalho de Jonatas Ramos vem ganhando destaque não apenas dentro das academias e competições, mas também na comunidade. Em <strong>2026</strong>, a Câmara Municipal de Guarapuava apresentou uma:
              </p>

              <blockquote className="p-3.5 rounded-xl bg-red-950/30 border-l-4 border-red-600 text-xs text-red-200 italic leading-relaxed">
                “Moção de Aplausos e Congratulações ao Professor Jonatas Ramos, da Academia NAK Muay Thai, reconhecendo seu trabalho na formação de atletas e sua contribuição para o desenvolvimento social do município.”
              </blockquote>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Impacto comunitário & formação cidadã</span>
              </div>
            </div>
          </div>

          {/* Valores Tradicionais */}
          <div className="pt-6 border-t border-zinc-800/80 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold uppercase font-['Teko'] tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <span>Valores Tradicionais Cultivados na NAK</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {valores.map((v, i) => (
                <div 
                  key={i} 
                  className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-red-600/40 transition group"
                >
                  <div className="text-red-400 font-bold font-['Teko'] text-xl uppercase group-hover:text-red-300 transition">
                    {v.nome}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Professor Jonatas Ramos & Marco de Graduação */}
      <div className="rounded-3xl p-6 sm:p-10 bg-zinc-900/80 border border-zinc-800 relative overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-red-500" />
              <span>Liderança Técnica & Formação</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Teko'] tracking-tight text-white leading-none">
              Professor <span className="text-red-500">Jonatas Ramos</span>
            </h2>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
              <p>
                O <strong>Professor Jonatas Ramos</strong> é uma das principais referências da NAK Entre Rios. Seu trabalho está diretamente ligado à formação e preparação dos atletas da equipe.
              </p>
              <p>
                A atuação do professor envolve não apenas o ensino técnico do Muay Thai, mas também a preparação dos alunos para o ambiente competitivo e a construção de valores através do esporte.
              </p>
              <p>
                A equipe também vem conquistando reconhecimento através da participação em competições e da representação de Entre Rios e Guarapuava no cenário regional das artes marciais.
              </p>
            </div>
          </div>

          {/* Card do 1º Exame de Graduação */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/30 border border-red-600/40 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/30 text-red-400 flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400 block">
                Marco Histórico da Equipe
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-['Teko'] tracking-wide text-white mt-1">
                1º Exame de Graduação
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                NAK Entre Rios • 23 de Março de 2025
              </p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Um marco fundamental dessa trajetória foi a realização do <strong>primeiro exame de graduação da NAK Entre Rios em 23 de março de 2025</strong>, representando uma etapa importante na consolidação do trabalho da equipe e na evolução marcial de seus alunos.
            </p>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-center gap-2 text-xs text-zinc-400">
              <Award className="w-4 h-4 text-red-500" />
              <span>Graduações Oficiais e Prajed Tradicional</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Uma história que continua sendo construída */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-red-950/30 via-zinc-900 to-zinc-950 border border-zinc-800 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-red-500" />
            <span>Nossa Filosofia</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Teko'] tracking-tight text-white leading-none">
            Uma História que Continua <span className="text-red-500">Sendo Construída</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          <div className="lg:col-span-8 space-y-4">
            <p>
              A história da <strong>NAK Entre Rios</strong> está diretamente ligada ao crescimento do Muay Thai na região.
            </p>
            <p>
              Sob o comando do <strong>Professor Jonatas Ramos</strong>, a equipe vem construindo uma trajetória baseada na formação de alunos, desenvolvimento de atletas, participação em competições e valorização do esporte como ferramenta de disciplina e transformação.
            </p>
            <p>
              O <strong>WFC Entre Rios</strong> representa uma parte importante dessa trajetória. Ao longo de suas edições, o evento trouxe para o distrito atletas de diferentes cidades e equipes, criando oportunidades para novos talentos e fortalecendo o cenário das artes marciais na região.
            </p>
            <p className="text-zinc-200 font-semibold">
              Mais do que um lugar para treinar, a NAK Entre Rios busca construir uma <span className="text-red-400 font-bold">família dentro do esporte</span>, onde cada aluno possa evoluir no seu próprio caminho — seja buscando saúde e condicionamento físico, desenvolvimento pessoal, graduação ou a preparação para competir.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-950/90 border border-red-600/40 text-center space-y-4">
            <NakLogo size={70} />
            <div className="space-y-1">
              <div className="text-2xl font-black font-['Teko'] text-white uppercase tracking-wider">
                NAK ENTRE RIOS
              </div>
              <p className="text-xs text-red-400 font-bold uppercase tracking-wider">
                Muay Thai, disciplina, respeito e evolução.
              </p>
            </div>
            <button
              type="button"
              onClick={onMatriculaClick}
              className="w-full py-3 px-5 rounded-xl font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 font-['Teko'] text-xl shadow-lg shadow-red-600/30 transition cursor-pointer"
            >
              Matricule-se na Família NAK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

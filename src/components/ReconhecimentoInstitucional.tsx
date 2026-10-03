import React from 'react';
import { 
  Building2, 
  Award, 
  Trophy, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Target, 
  CheckCircle2, 
  HeartHandshake,
  Swords,
  Layers,
  Flame
} from 'lucide-react';
import { NakLogo } from './NakLogo';

interface ReconhecimentoInstitucionalProps {
  onMatriculaClick: () => void;
}

export const ReconhecimentoInstitucional: React.FC<ReconhecimentoInstitucionalProps> = ({ onMatriculaClick }) => {
  const pilaresFormacao = [
    {
      etapa: '01',
      fase: 'Iniciação',
      desc: 'Primeiros passos no tatame, postura de guarda, movimentação básica e condicionamento sem risco de lesão.',
      icone: Target,
    },
    {
      etapa: '02',
      fase: 'Treinamento',
      desc: 'Desenvolvimento técnico das 8 armas (socos, cotovelos, joelhos e chutes), manoplas e saco de pancada.',
      icone: Flame,
    },
    {
      etapa: '03',
      fase: 'Graduação',
      desc: 'Exames formais de Prajed e Kruang, avaliando técnica, postura marcial, disciplina e evolução pessoal.',
      icone: GraduationCap,
    },
    {
      etapa: '04',
      fase: 'Competição',
      desc: 'Preparação física, psicológica e tática para ringue, torneios de K1, copas e campeonatos estaduais.',
      icone: Swords,
    },
    {
      etapa: '05',
      fase: 'Formação de Atletas',
      desc: 'Atletas de alto rendimento representando Entre Rios e Guarapuava em competições de destaque como o WFC.',
      icone: Trophy,
    },
  ];

  const categoriasPresenca = [
    {
      titulo: 'Crianças e Adolescentes',
      desc: 'Desenvolvimento psicomotor, foco nos estudos, respeito aos pais e disciplina marcial desde cedo.',
      destaque: 'Kids & Juvenil',
    },
    {
      titulo: 'Mulheres Competindo',
      desc: 'Empoderamento real, alto rendimento físico e presença forte feminina nas categorias de Muay Thai.',
      destaque: 'Feminino Ativo',
    },
    {
      titulo: 'Atletas Adultos & K1',
      desc: 'Lutas em regras internacionais de K1 e Muay Thai tradicional, com preparo físico de alto nível.',
      destaque: 'K1 & Tradicional',
    },
    {
      titulo: 'Impacto Social & Inclusão',
      desc: 'Transformação de vidas através do esporte marcial, retirando jovens da ociosidade e formando cidadãos.',
      destaque: 'Desenvolvimento Social',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Bloco 1: Homenagem e Reconhecimento da Câmara Municipal */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-red-600/30 shadow-2xl shadow-red-950/20 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Tag de Destaque */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-600/30 text-red-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-red-500" />
            <span>Registro Oficial • Câmara Municipal de Guarapuava (2026)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-['Teko'] tracking-tight text-white leading-none">
                🏛️ Reconhecimento <span className="text-red-500">Institucional</span>
              </h2>
              <p className="text-lg sm:text-xl font-semibold text-zinc-200">
                Moção de Aplausos e Congratulações à Academia NAK Muay Thai e ao Professor Jonatas Ramos
              </p>
              
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                <p>
                  Esse é um dos pontos mais fortes da história da academia. A <strong>Câmara Municipal de Guarapuava</strong> registrou 
                  homenagem oficial em 2026 por meio de requerimento aprovado com <strong>Moção de Aplausos e Congratulações</strong> ao 
                  <strong> Professor Jonatas Ramos</strong>, enaltecendo publicamente o trabalho de formação de atletas e desenvolvimento social promovido pela academia.
                </p>
                <p>
                  O mesmo documento oficial do Poder Legislativo destaca os atletas da <strong>Academia NAK Muay Thai</strong> que 
                  representaram a cidade e a região na <strong>4ª edição do WFC</strong>, realizada no distrito de <strong>Entre Rios</strong>.
                </p>
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-600/40 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                  <Award className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Impacto que vai além do tatame:</strong> Esse reconhecimento oficial demonstra com clareza que a atuação da NAK não se resume a dar aulas comerciais — há um compromisso público e reconhecido com a disciplina, formação de atletas e desenvolvimento comunitário.
                  </p>
                </div>
              </div>
            </div>

            {/* Selo / Card Visual de Certificação */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-center space-y-4">
              <div className="p-3 rounded-full bg-red-600/10 border border-red-600/30 text-red-500">
                <Building2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-400 block">
                  Poder Legislativo
                </span>
                <h3 className="text-2xl font-bold font-['Teko'] uppercase text-white tracking-wide">
                  Câmara de Guarapuava
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Moção de Aplausos ao Prof. Jonatas Ramos & Atletas NAK no WFC Entre Rios
                </p>
              </div>
              <div className="w-full pt-3 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Registrado em Documento Oficial 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloco 2: Formação de Atletas - Estrutura Completa */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-red-500" />
            <span>Metodologia e Carreira Marcial</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Teko'] tracking-tight text-white leading-none">
            🏅 Formação de Atletas & <span className="text-red-500">Desenvolvimento Social</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A NAK trabalha com uma estrutura completa que vai muito além de oferecer aulas convencionais. 
            Existe uma trilha sólida de evolução marcial pensada para cada praticante:
          </p>
        </div>

        {/* Trilha: Iniciação -> Treinamento -> Graduação -> Competição -> Formação de Atletas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {pilaresFormacao.map((item, idx) => {
            const Icon = item.icone;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-red-600/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-['Teko'] text-3xl font-black text-red-500/60 group-hover:text-red-400 transition">
                      {item.etapa}
                    </span>
                    <div className="p-2 rounded-xl bg-zinc-800/80 group-hover:bg-red-600/20 text-red-400 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold font-['Teko'] tracking-wide text-white uppercase group-hover:text-red-400 transition">
                    {item.fase}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Blocos de Presença e Evidências Reais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {categoriasPresenca.map((cat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-red-600/30 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 px-2 py-0.5 rounded bg-red-600/10 border border-red-600/20 inline-block">
                  {cat.destaque}
                </span>
                <h4 className="text-lg font-bold font-['Teko'] uppercase text-white tracking-wide">
                  {cat.titulo}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chamada para Matrícula */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/90 border border-red-600/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-red-950/20">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              Faça Parte Dessa Equipe
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Teko'] tracking-wide text-white">
              Quer treinar na academia homenageada pela Câmara e competir no tatame?
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              Seja para saúde física, defesa pessoal, descarregar o estresse ou seguir carreira competitiva no K1 e Muay Thai.
            </p>
          </div>

          <button
            type="button"
            onClick={onMatriculaClick}
            className="w-full sm:w-auto shrink-0 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 font-['Teko'] text-2xl shadow-lg shadow-red-600/30 active:scale-95 transition cursor-pointer"
          >
            Matricule-se Agora
          </button>
        </div>
      </div>
    </div>
  );
};

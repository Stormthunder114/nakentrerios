import React from 'react';
import { ShieldCheck, Target, HeartHandshake, Dumbbell, Users, CheckCircle2, Flame, Trophy } from 'lucide-react';
import { NakLogo } from './NakLogo';

export const AcademiaNakInfo: React.FC = () => {
  const diferenciais = [
    {
      titulo: 'Tatame Profissional & Espaço Seguro',
      desc: 'Área ampla de tatames de alta densidade projetada para amortecer quedas, chutes e garantir máxima segurança durante os treinamentos.',
      icone: Dumbbell,
    },
    {
      titulo: 'Equipamentos Tailandeses Autênticos',
      desc: 'Bolsa de pancadas pesadas (heavy & banana bags), paos curvos, aparadores de chute e protetores para treino de impacto real.',
      icone: Target,
    },
    {
      titulo: 'Graduação Tradicional de Prajed',
      desc: 'Sistema sério de evolução marcial através do Prajed (cordão sagrado), valorizando o esforço, técnica e conduta ética do aluno.',
      icone: Trophy,
    },
    {
      titulo: 'Ambiente Familiar e Acolhedor',
      desc: 'Turmas pensadas para homens, mulheres e jovens de todas as idades. Aqui o companheirismo e a ajuda mútua vêm sempre em primeiro lugar.',
      icone: HeartHandshake,
    },
  ];

  const pilares = [
    { num: '100%', label: 'Muay Thai Autêntico', desc: 'Técnicas reais de clinch, cotovelos e joelhos' },
    { num: '800+', label: 'Calorias por Treino', desc: 'Alto gasto calórico e condicionamento físico' },
    { num: '03', label: 'Turnos de Aulas', desc: 'Manhã, tarde e noite para caber na sua rotina' },
    { num: '0 a 100', label: 'Do Zero ao Avançado', desc: 'Não precisa ter experiência prévia para começar' },
  ];

  return (
    <div className="space-y-10">
      {/* Box Principal da Academia */}
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/40 border border-zinc-800 p-6 sm:p-10 relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Logo e Destaque Visual */}
          <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
            <NakLogo size={140} />
            <h3 className="text-3xl sm:text-4xl font-black uppercase font-['Teko'] tracking-wider text-white mt-4">
              NAK <span className="text-red-500">ENTRE RIOS</span>
            </h3>
            <p className="text-xs uppercase font-bold tracking-widest text-red-400 mt-0.5">
              Centro de Treinamento de Muay Thai
            </p>

            <div className="w-full border-t border-zinc-800/80 my-4" />

            <div className="w-full text-left space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Treinamento físico, técnico e mental completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Defesa pessoal e alívio do estresse diário</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Formação de campeões dentro e fora do tatame</span>
              </div>
            </div>
          </div>

          {/* Texto Sobre a Academia */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Sobre a Nossa Academia</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase font-['Teko'] tracking-wide text-white leading-tight">
              Forjando Disciplina, Saúde e o <span className="text-red-500">Espírito Guerreiro</span> em Entre Rios
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Sob a liderança do <strong>Professor Jonatas Ramos</strong>, homenageado oficialmente pelo Poder Legislativo com Moção de Aplausos pela formação de atletas e desenvolvimento social, a <strong>NAK Entre Rios</strong> é uma referência de disciplina, respeito e superação.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Aqui, a metodologia vai da <strong>iniciação e condicionamento</strong> até a <strong>graduação e formação de atletas competitivos em K1 e Muay Thai</strong>. Homens, mulheres, crianças e adolescentes encontram um ambiente acolhedor e seguro, onde cada aluno evolui respeitando seus limites com a máxima qualidade técnica.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {pilares.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center">
                  <div className="text-xl sm:text-2xl font-black font-['Teko'] text-red-400 leading-none">
                    {p.num}
                  </div>
                  <div className="text-[11px] font-bold text-white uppercase mt-1 leading-tight">
                    {p.label}
                  </div>
                  <div className="text-[9px] text-zinc-400 mt-0.5 leading-tight">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Estrutura & Metodologia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diferenciais.map((item, idx) => {
          const Icon = item.icone;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500/40 hover:bg-zinc-900 transition flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold font-['Teko'] text-xl uppercase tracking-wide text-white">
                  {item.titulo}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

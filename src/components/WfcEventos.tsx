import React from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Swords, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Flame,
  Building2,
  Sparkles
} from 'lucide-react';

interface WfcEventosProps {
  onMatriculaClick?: () => void;
}

export const WfcEventos: React.FC<WfcEventosProps> = ({ onMatriculaClick }) => {
  const modalidades = ['Muay Thai', 'Kickboxing', 'Boxe', 'K1', 'MMA'];

  const edicoesWfc = [
    {
      edicao: 'WFC 8ª Edição',
      local: 'Distrito de Entre Rios, Guarapuava - PR',
      tag: 'Marco de Escala',
      descricao: 'A dimensão do evento pode ser percebida pela 8ª edição realizada em Entre Rios, consolidando o distrito no circuito de combate regional.',
      metricas: [
        { rotulo: '42 Atletas', detalhe: 'Em 21 lutas profissionais de alto nível' },
        { rotulo: '18 Equipes', detalhe: 'Representando academias especializadas' },
        { rotulo: '12 Cidades', detalhe: 'De várias regiões do Paraná e do Sul' },
      ],
      destaque: 'Grande concentração de atletas profissionais no distrito de Entre Rios.'
    },
    {
      edicao: 'WFC 11ª Edição',
      data: '12 de Julho de 2025',
      local: 'Centro de Eventos Agrária, Guarapuava - PR',
      tag: 'Edição Especial',
      descricao: 'Aconteceu no prestigiado Centro de Eventos Agrária, contando com diversos combates e atletas de diferentes equipes renomadas.',
      metricas: [
        { rotulo: 'NAK em Ação', detalhe: 'Atletas oficiais representando a equipe da casa' },
        { rotulo: 'Ramon Ramos', detalhe: 'Atleta da casa em destaque oficial do evento' },
        { rotulo: 'Integração', detalhe: 'Aproximou atletas, professores, equipes e público' },
      ],
      destaque: 'Entre os destaques divulgados estava Ramon Ramos, atleta da casa, apresentado como representante da equipe NAK Entre Rios.'
    },
    {
      edicao: 'WFC 14ª Edição',
      local: 'Distrito de Entre Rios, Guarapuava - PR',
      tag: 'Sequência Consagrada',
      descricao: 'A sequência do evento chegou à 14ª edição, novamente tendo Entre Rios como palco para grandes disputas marciais.',
      metricas: [
        { rotulo: 'Atletas Locais', detalhe: 'Atletas de Guarapuava e equipes da região' },
        { rotulo: 'Multimodalidade', detalhe: 'Mantendo a tradição de reunir diversas artes' },
        { rotulo: 'Palco NAK', detalhe: 'Experiência competitiva e torcida apaixonada' },
      ],
      destaque: 'A divulgação do WFC 14ª edição mostra atletas preparados para grandes combates diante do público local.'
    },
  ];

  return (
    <div id="secaoWfc" className="space-y-12 scroll-mt-24">
      {/* Header do WFC */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold">
            <Swords className="w-3.5 h-3.5 text-red-500" />
            <span>Circuito de Lutas Profissionais • Entre Rios & Região</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-['Teko'] tracking-tight text-white leading-none">
              WFC — <span className="text-red-500">World Fight Championship</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-3xl leading-relaxed">
              Um dos grandes destaques da história recente da NAK Entre Rios é sua relação com o WFC, evento de lutas realizado no distrito de Entre Rios, em Guarapuava.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-4xl">
            O evento reúne atletas e equipes de diferentes cidades e modalidades de combate, incluindo <strong>Muay Thai, Kickboxing, Boxe, K1 e MMA</strong>, transformando Entre Rios em um importante ponto de encontro do esporte de combate na região.
          </p>

          {/* Modalidades Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mr-2">Modalidades no WFC:</span>
            {modalidades.map((mod, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-wide flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>{mod}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Edições Especiais: 8ª, 11ª e 14ª */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {edicoesWfc.map((ed, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 sm:p-7 bg-zinc-900/80 border border-zinc-800 hover:border-red-600/40 transition-all flex flex-col justify-between space-y-6 shadow-xl group hover:shadow-red-950/20"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-400 px-2.5 py-1 rounded-md bg-red-600/10 border border-red-600/20">
                  {ed.tag}
                </span>
                {ed.data && (
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {ed.data}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Teko'] uppercase text-white group-hover:text-red-400 transition tracking-wide">
                  {ed.edicao}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{ed.local}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {ed.descricao}
              </p>

              {/* Métricas / Destaques da Edição */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                {ed.metricas.map((m, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs">
                    <span className="font-bold text-white block font-['Teko'] text-lg leading-tight uppercase text-red-400">
                      {m.rotulo}
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      {m.detalhe}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caixa de Citação / Destaque */}
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-600/30 text-xs text-zinc-300 leading-relaxed">
              <p className="text-[11px] italic text-red-200">
                "{ed.destaque}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusão WFC & Oportunidade para Atletas */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/30 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-400 font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-red-500" />
            <span>Oportunidade Real de Ringue</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-black font-['Teko'] text-white uppercase tracking-wide">
            Testar Preparação, Adquirir Experiência e Representar Entre Rios
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            A participação de equipes como a NAK demonstra que o WFC se tornou uma importante oportunidade para os atletas locais testarem sua preparação, adquirirem experiência competitiva e representarem suas academias diante do público.
          </p>
        </div>

        {onMatriculaClick && (
          <button
            type="button"
            onClick={onMatriculaClick}
            className="w-full md:w-auto shrink-0 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 font-['Teko'] text-2xl shadow-lg shadow-red-600/30 active:scale-95 transition cursor-pointer"
          >
            Matricule-se na NAK
          </button>
        )}
      </div>
    </div>
  );
};

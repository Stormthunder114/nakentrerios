import React from 'react';
import { Trophy, Calendar, MapPin, Swords, Medal, Star, Shield, Users, CheckCircle2 } from 'lucide-react';

export const EventosCompeticoes: React.FC = () => {
  const eventos = [
    {
      tipo: 'Campeonato Oficial',
      nome: 'Campeonato Paranaense de Muay Thai',
      local: 'Curitiba / Ponta Grossa - PR',
      descricao: 'Competição oficial das federações estaduais que reúne as maiores academias do Paraná. A NAK Entre Rios marca presença com atletas nas categorias Amador e Semi-Pro.',
      destaques: ['Categorias Masculino e Feminino', 'Disputa de cinturões e medalhas oficiais', 'Regras tradicionais com contagem tailandesa'],
      status: 'Participação Anual',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30'
    },
    {
      tipo: 'Card Profissional & Destaque Municipal',
      nome: 'WFC - 4ª Edição em Entre Rios',
      local: 'Distrito de Entre Rios - PR',
      descricao: 'Evento consagrado no circuito de combate, com menção e registro formal na Câmara Municipal de Guarapuava destacando a equipe de atletas da Academia NAK Muay Thai.',
      destaques: ['Atletas NAK representando Entre Rios e Guarapuava', 'Lutas em regras de Muay Thai e K1', 'Reconhecimento institucional oficial aos atletas e mestre'],
      status: 'Edição de Destaque',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30'
    },
    {
      tipo: 'Card Profissional & Semi-Pro',
      nome: 'Nak Muay Fight & GPs Regionais',
      local: 'Região Sul e Centro-Sul do Paraná',
      descricao: 'Eventos em formato de lutas casadas no ringue com show de luzes, transmissão e regras completas de Muay Thai (socos, chutes, joelhadas e cotoveladas com proteção).',
      destaques: ['Lutas casadas por peso e graduação', 'Atletas NAK em cards principais', 'Público vibrante e torcida apaixonada'],
      status: 'Circuito Regional',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      tipo: 'Evento Interno Solene',
      nome: 'Cerimônia Oficial de Graduação de Prajed',
      local: 'Dojo NAK Entre Rios',
      descricao: 'O grande momento de consagração de cada aluno. Avaliação técnica, teste de resistência física, respeito às tradições e entrega dos cordões sagrados de graduação.',
      destaques: ['Entrega de certificados reconhecidos', 'Rito do Wai Kru Ram Muay', 'Confraternização com famílias e alunos'],
      status: 'Semestral',
      tagColor: 'bg-zinc-800 text-zinc-200 border-zinc-700'
    },
    {
      tipo: 'Treinamento Avançado',
      nome: 'Seminários Técnicos & Sparrings Interacademias',
      local: 'Entre Rios e Academias Parceiras',
      descricao: 'Clínicas técnicas com Krus e Mestres renomados focadas em técnicas de clinch (Muay Khao), chutes circulares explosivos e defesa tática.',
      destaques: ['Intercâmbio de treino seguro', 'Aperfeiçoamento de detalhes de luta', 'Acesso direto a instrutores de elite'],
      status: 'Trimestral',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    }
  ];

  const conquistas = [
    { num: 'Pódios', label: 'Conquistas Regionais', desc: 'Atletas formados no dojo NAK representando Entre Rios' },
    { num: '100%', label: 'Espírito Esportivo', desc: 'Respeito aos adversários e arbitragem em todos os eventos' },
    { num: 'Segurança', label: 'Primeiro Lugar', desc: 'Preparação física e técnica adequada antes de pisar no ringue' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>Competições, Graduações & Eventos</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Teko'] tracking-wide text-white">
          A NAK Entre Rios nos <span className="text-red-500">Ringues & Tatames</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Nossa equipe participa ativamente dos principais circuitos de luta, seminários de graduação e campeonatos no Paraná, elevando o nome de Entre Rios no cenário marcial.
        </p>
      </div>

      {/* Cards de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {eventos.map((ev, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-red-600/40 p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-red-950/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${ev.tagColor}`}>
                  {ev.tipo}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  {ev.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-['Teko'] uppercase text-white group-hover:text-red-400 transition tracking-wide">
                  {ev.nome}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{ev.local}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {ev.descricao}
              </p>

              <div className="pt-2 border-t border-zinc-800/70 space-y-1.5">
                {ev.destaques.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">Equipe NAK Entre Rios</span>
              <span className="text-red-400 font-bold uppercase tracking-wider text-[11px]">
                Representando Nossa Cidade
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Faixa de Preparação de Atletas */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-950 border border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-2xl font-black font-['Teko'] text-white uppercase tracking-wide">
            Quer Competir ou Apenas Treinar por Saúde e Defesa?
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Na NAK Entre Rios, você decide o seu ritmo. O aluno que deseja competir recebe preparação técnica e de ringue especializada. Quem busca apenas saúde, emagrecimento e diversão treina no mesmo ambiente respeitoso sem obrigação de levar golpes fortes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('secaoMatricula');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 whitespace-nowrap active:scale-95 transition"
        >
          Iniciar Meus Treinos na NAK
        </button>
      </div>
    </div>
  );
};

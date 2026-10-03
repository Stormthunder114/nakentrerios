import React from 'react';
import { Target, HeartPulse, Shield, Award, CheckCircle, MapPin, Sparkles } from 'lucide-react';

export const DojoInfo: React.FC = () => {
  const armas = [
    { nome: '2 Punhos', desc: 'Jab, Direto, Cruzado e Upper com precisão e velocidade' },
    { nome: '2 Cotovelos', desc: 'Golpes curtos, cortantes e explosivos de curta distância' },
    { nome: '2 Joelhos', desc: 'Controle absoluto de clinch e joelhadas devastadoras' },
    { nome: '2 Canelas', desc: 'Chutes circulares potentes e bloqueios defensivos' },
  ];

  const passosPrimeiroTreino = [
    'Roupas esportivas confortáveis (shorts/calça leve e camiseta)',
    'Garrafa de água para hidratação durante o treino',
    'Toalha de rosto individual',
    'Disponibilizamos luvas higienizadas e caneleiras para a sua primeira aula',
  ];

  return (
    <div className="space-y-12">
      {/* 8 Armas Section */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest mb-1">
          <Award className="w-4 h-4" />
          <span>Tradição Tailandesa Milenar</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold uppercase font-['Teko'] tracking-wide text-white">
          A Arte das 8 Armas no Tatame da <span className="text-red-500">NAK Entre Rios</span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
          Diferente de outras artes marciais que utilizam apenas 2 ou 4 membros de impacto, o Muay Thai tradicional utiliza todo o corpo como uma fortaleza.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {armas.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-red-500/40 transition">
              <span className="text-red-400 font-['Teko'] text-2xl font-bold block">
                {item.nome}
              </span>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Benefícios & O que trazer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefícios */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
            <HeartPulse className="w-4 h-4" />
            <span>Transformação Corporal & Mental</span>
          </div>
          <h4 className="text-2xl font-bold uppercase font-['Teko'] tracking-wide text-white">
            Por que Treinar na NAK Entre Rios?
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Queima de até 1.000 kcal por aula:</strong> Alta taxa metabólica, perda de gordura e definição muscular rápida.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Defesa Pessoal Eficaz:</strong> Aprenda postura de guarda, esquivas, chutes firmes e controle de distância.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Alívio Imediato de Estresse:</strong> Descarregue as tensões da rotina no saco de pancadas e aparadores.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span><strong>Disciplina & Respeito:</strong> Metodologia que constrói resiliência mental, humildade e espírito de equipe.</span>
            </li>
          </ul>
        </div>

        {/* Como funciona o 1º treino */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>Sua 1ª Aula Experimental</span>
          </div>
          <h4 className="text-2xl font-bold uppercase font-['Teko'] tracking-wide text-white">
            Preparação Sem Complicações
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400">
            Você não precisa de equipamentos caros nem experiência prévia para começar a treinar na NAK Entre Rios.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
            {passosPrimeiroTreino.map((passo, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600/15 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{passo}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-200 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-red-400" />
              <span>Ambiente 100% seguro: alunos iniciantes não fazem sparring pesado de combate.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { TURMAS_DISPONIVEIS } from '../data/turmas';
import type { TurmaId } from '../types';
import { Clock, Calendar, Users, Zap, Check } from 'lucide-react';

interface TurmasCardsProps {
  selectedTurma: TurmaId;
  onSelectTurma: (turma: TurmaId) => void;
}

export const TurmasCards: React.FC<TurmasCardsProps> = ({
  selectedTurma,
  onSelectTurma,
}) => {
  const handleSelect = (id: TurmaId) => {
    onSelectTurma(id);
    const formEl = document.getElementById('secaoMatricula');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-['Teko'] tracking-wide text-white">
          Grade de Turmas & Horários <span className="text-red-500">NAK Entre Rios</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Escolha o horário que melhor se adapta à sua rotina. Treinos estruturados para evolução técnica, perda de peso e condicionamento de combate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TURMAS_DISPONIVEIS.map((turma) => {
          const isSelected = selectedTurma === turma.id;
          return (
            <div
              key={turma.id}
              className={`relative rounded-2xl p-5 sm:p-6 transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900/95 border-red-500 ring-2 ring-red-500/20 shadow-xl shadow-red-600/10'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              {turma.destaque && (
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-wider shadow-sm">
                  Mais Procurada
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                      {turma.publico}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Teko'] tracking-wide text-white uppercase mt-0.5">
                      {turma.titulo}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-red-300 font-mono text-xs font-bold shrink-0">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    <span>{turma.horario.split(' ')[0]}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed">
                  {turma.descricao}
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-red-400/80" />
                    <span>{turma.dias}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-red-400/80" />
                    <span>Intensidade: <strong className="text-zinc-200">{turma.intensidade}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 flex items-center justify-between gap-3">
                <div className="text-[11px] text-zinc-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  {turma.vagasRestantes} vagas abertas
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(turma.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Selecionada</span>
                    </>
                  ) : (
                    <span>Selecionar Turma</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


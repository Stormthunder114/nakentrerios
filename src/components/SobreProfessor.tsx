import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export const SobreProfessor: React.FC = () => {
  return (
    <section 
      id="sobreProfessor" 
      aria-label="Sobre o Professor Jonatas Ramos"
      className="w-full max-w-2xl mx-auto my-3 px-2"
    >
      <div className="bg-white/90 backdrop-blur-sm border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-sm text-left transition-all">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          
          {/* Avatar / Emblema KRU minimalista */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-zinc-950 text-white flex flex-col items-center justify-center shrink-0 border border-zinc-800 shadow-sm">
            <span className="font-['Teko'] text-2xl text-red-500 font-bold leading-none">
              KRU
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400">
              Jonatas
            </span>
          </div>

          {/* Conteúdo direto e clean */}
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-semibold uppercase tracking-wider">
                Liderança Técnica
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Moção de Aplausos • Câmara de Guarapuava</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase font-['Teko'] tracking-wide text-zinc-950 leading-none">
                Professor <span className="text-red-600">Jonatas Ramos</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-1">
                Formação de atletas, disciplina e desenvolvimento pessoal em Entre Rios.
              </p>
            </div>

            {/* Valores resumidos em linha clean */}
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1 text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                Respeito
              </span>
              <span>•</span>
              <span>Disciplina</span>
              <span>•</span>
              <span>Humildade</span>
              <span>•</span>
              <span>Evolução</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


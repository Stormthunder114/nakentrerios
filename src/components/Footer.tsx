import React from 'react';
import { MapPin, Clock, Phone, ShieldCheck, Trophy } from 'lucide-react';
import { NakLogo } from './NakLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <NakLogo size={48} />
            <div>
              <span className="text-white font-['Teko'] text-2xl font-bold uppercase tracking-wider block leading-none">
                NAK <span className="text-red-500">ENTRE RIOS</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                Centro de Treinamento Muay Thai
              </span>
            </div>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            Centro oficial de Muay Thai tradicional em Entre Rios - PR. Foco em disciplina marcial, técnica refinada das 8 armas, saúde, perda de peso e formação de atletas.
          </p>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            <span>Graduação Oficial e Participação em Campeonatos</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h4 className="text-white font-bold font-['Teko'] text-2xl uppercase tracking-wide">
            Liderança & Atendimento
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Phone className="w-4 h-4 text-red-500" />
              <span>WhatsApp Prof. Jonatas Ramos: (42) 92000-9293</span>
            </div>
            <div className="flex items-start gap-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Distrito de Entre Rios • Guarapuava - PR</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Trophy className="w-4 h-4 text-red-500" />
              <span>Homenageado com Moção de Aplausos (2026)</span>
            </div>
          </div>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h4 className="text-white font-bold font-['Teko'] text-2xl uppercase tracking-wide">
            Matrículas Abertas
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            As vagas são organizadas por turma para garantir atenção individual e evolução técnica de cada praticante.
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <span className="text-red-400 font-bold block mb-0.5 uppercase tracking-wide">Sawadee Krap!</span>
            Agende sua primeira aula e venha fazer parte da família NAK Entre Rios.
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3">
        <p>© {new Date().getFullYear()} NAK Entre Rios • Muay Thai Oficial. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1 text-zinc-400 font-mono">
          Supabase Integrado • Tabela: alunos
        </p>
      </div>
    </footer>
  );
};


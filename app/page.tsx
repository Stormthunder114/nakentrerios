import { Jornadas } from '../components/nak/Jornadas';
import React, { useState } from 'react';
import { NakLogo } from '../components/nak/NakLogo';
import { MatriculaModal } from '../components/nak/MatriculaModal';
import { HistoriaMuayThai } from '../components/nak/HistoriaMuayThai';
import { FotosRodape } from '../components/nak/FotosRodape';
import { FotosModal } from '../components/nak/FotosModal';
import { AdminPanel } from '../components/nak/AdminPanel';
import type { TurmaId, Aluno } from '../components/types';

import { 
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Award,
  Camera
} from 'lucide-react';

export default function App() {

  const [adminOpen, setAdminOpen] = useState(false);
  const [fotosOpen, setFotosOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<TurmaId>('Adulto manhã - 06h00');
  const [isMatriculaModalOpen, setIsMatriculaModalOpen] = useState(false);
  const [ultimoMatriculado, setUltimoMatriculado] = useState<Aluno | null>(null);

  const handleMatriculaSucesso = (novoAluno: { nome: string; telefone: string; turma: string }) => {
    const matricula: Aluno = {
      ...novoAluno,
      origem: 'Site NAK Entre Rios',
      criado_em: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    setUltimoMatriculado(matricula);
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col justify-between font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Imagem de Fundo Oficial Muay Thai Sparring */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-top sm:bg-center bg-no-repeat opacity-25 mix-blend-multiply transition-opacity"
        style={{ backgroundImage: `url('/assets/fundo-muaythai.jpg')` }}
        aria-hidden="true"
      />

      {/* Gradiente sutil para garantir contraste perfeito no centro */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-radial from-transparent via-zinc-100/60 to-zinc-100/90"
        aria-hidden="true"
      />

      {/* Subtle Neutral Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-zinc-200/50 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Responsiva: Celular e Computador */}
      <header className="relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
        <button type="button" aria-label="Área do professor"
          onClick={() => setAdminOpen(true)}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          title="NAK Entre Rios"
        >
          <NakLogo size={42} title="NAK Entre Rios" />
          <span className="font-['Teko'] text-2xl sm:text-3xl uppercase tracking-wider font-bold leading-none group-hover:opacity-90 transition">
            <span className="text-red-600">NAK</span> <span className="text-black">Entre Rios</span>
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setFotosOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-zinc-200 text-[11px] sm:text-xs text-zinc-800 font-semibold shadow-sm transition hover:scale-105 active:scale-95"
          >
            <Camera className="w-3.5 h-3.5 text-red-600" />
            <span>Fotos & Aulas</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-[11px] sm:text-xs text-zinc-700 font-medium shadow-sm">
            <Award className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="hidden xs:inline">Distrito de Entre Rios • Guarapuava - PR</span>
            <span className="inline xs:hidden">Entre Rios - PR</span>
          </div>


        </div>
      </header>

      {/* Main Hero Screen com NAK em Vermelho e ENTRE RIOS em Preto */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-12 text-center max-w-4xl mx-auto my-auto w-full">
        <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
          
          {/* Emblema Oficial com acesso secreto à Gestão de Alunos ao clicar */}
          <div 
            className="relative group cursor-pointer select-none"
            title="NAK Entre Rios"
          >
            <div className="absolute -inset-3 bg-red-600/25 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition duration-500" />
            <NakLogo size={120} className="relative transition-transform duration-300 group-hover:scale-105" title="NAK Entre Rios" />
          </div>

          {/* Titles & Identity: NAK Vermelho & ENTRE RIOS Preto */}
          <div className="space-y-2 sm:space-y-3 w-full px-2">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-200/80 border border-zinc-300 text-zinc-800 text-[11px] sm:text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Centro de Treinamento Oficial</span>
            </div>


            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase font-['Teko'] tracking-tight leading-none break-words">
              <span className="text-red-600">NAK</span>{' '}
              <span className="text-black">ENTRE RIOS</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-800 font-['Teko'] tracking-wider uppercase font-semibold">
              Muay Thai • Disciplina • Respeito • Evolução
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto font-sans font-medium px-2">
              Centro de Treinamento • Formação de Atletas e Aulas para Todos os Níveis
            </p>
          </div>

          {/* Resumo da História, Origem, Prajied e os 12 Mandamentos */}
          <HistoriaMuayThai />

          {/* O BOTÃO PRINCIPAL: MATRICULE-SE (Preto Premium de Alto Contraste) */}
          <div className="pt-2 sm:pt-4 flex flex-col items-center gap-3 w-full max-w-xs px-2">
            <button
              type="button"
              id="btnMatriculeSe"
              onClick={() => setIsMatriculaModalOpen(true)}
              className="w-full py-4 sm:py-5 px-6 sm:px-8 rounded-2xl font-bold uppercase tracking-wider text-white bg-black hover:bg-zinc-800 active:scale-95 transition-all duration-200 font-['Teko'] text-2xl sm:text-3xl md:text-4xl shadow-2xl shadow-zinc-950/20 flex items-center justify-center gap-3 cursor-pointer border border-black min-h-[48px]"
            >
              <span>Matricule-se</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-white shrink-0" />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-zinc-600 shrink-0" />
              <span>Inscrições abertas para novas turmas</span>
            </div>
          </div>

          {/* Confirmação de Matrícula */}
          {ultimoMatriculado && (
            <div className="mt-4 p-3.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 text-xs flex items-center gap-2 shadow-md animate-in fade-in max-w-md w-full mx-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Matrícula de <strong>{ultimoMatriculado.nome}</strong> registrada com sucesso!</span>
            </div>
          )}

        </div>
      </main>

      {fotosOpen && <FotosModal onClose={() => setFotosOpen(false)} onMatricula={() => setIsMatriculaModalOpen(true)} />}

      <FotosRodape onOpen={() => setFotosOpen(true)} />

      <Jornadas />

      {/* Footer Minimalista Neutro */}
      <footer className="relative z-10 w-full px-4 sm:px-6 py-6 border-t border-zinc-200 text-center text-[11px] sm:text-xs text-zinc-500 font-medium space-y-3">
        <p>
          © 2026 NAK Entre Rios • Muay Thai em Entre Rios, Guarapuava - PR • Prof. Jonatas Ramos
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://nakentrerios.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-950 font-semibold transition"
          >
            nakentrerios.online
          </a>
        </div>
      </footer>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}

      {/* Modal com Formulário Conectado ao Supabase */}
      <MatriculaModal
        isOpen={isMatriculaModalOpen}
        onClose={() => setIsMatriculaModalOpen(false)}
        selectedTurma={selectedTurma}
        onTurmaChange={setSelectedTurma}
        onMatriculaSucesso={handleMatriculaSucesso}
      />


      {/* Botão Flutuante do WhatsApp Responsivo */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
        <a
          href="https://wa.me/554299144865?text=Sawadee%20Krap%20Professor%20Jonatas!%20Vim%20pelo%20site%20da%20NAK%20Entre%20Rios%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20aulas%20de%20Muay%20Thai."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-black hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm shadow-2xl shadow-black/30 transition-all hover:scale-105 active:scale-95 border border-zinc-800 min-h-[44px]"
          title="Falar com o Professor Jonatas Ramos no WhatsApp"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          <span className="hidden xs:inline sm:inline">WhatsApp NAK</span>
          <span className="inline xs:hidden sm:hidden">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}



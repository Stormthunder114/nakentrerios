import React from 'react';
import { NakLogo } from './NakLogo';

interface HeaderProps {
  onOpenMatricula?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMatricula }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMatriculaClick = () => {
    if (onOpenMatricula) {
      onOpenMatricula();
    } else {
      scrollTo('secaoMatricula');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand with NAK Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <NakLogo size={52} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-xl uppercase font-['Teko'] sm:text-2xl text-white group-hover:text-red-400 transition">
                NAK <span className="text-red-500">ENTRE RIOS</span>
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-red-600/10 text-red-400 border border-red-600/30">
                Oficial
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Centro de Treinamento • Muay Thai
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-zinc-300">
          <button 
            type="button" 
            onClick={() => scrollTo('secaoNakEntreRios')}
            className="hover:text-red-400 transition"
          >
            Conheça NAK Entre Rios
          </button>
          <button 
            type="button" 
            onClick={() => scrollTo('secaoWfc')}
            className="hover:text-red-400 transition"
          >
            WFC Entre Rios
          </button>
          <button 
            type="button" 
            onClick={() => scrollTo('secaoMuayThai')}
            className="hover:text-red-400 transition"
          >
            Conheça o Muay Thai
          </button>
        </nav>

        {/* Action Button - Apenas o botão Matricule-se */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleMatriculaClick}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/30 active:scale-95 transition cursor-pointer"
          >
            Matricule-se
          </button>
        </div>
      </div>
    </header>
  );
};



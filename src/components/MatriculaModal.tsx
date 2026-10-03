import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { MatriculaForm } from './MatriculaForm';
import type { TurmaId } from '../types';

interface MatriculaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTurma: TurmaId;
  onTurmaChange: (turma: TurmaId) => void;
  onMatriculaSucesso?: (novoAluno: { nome: string; telefone: string; turma: string }) => void;
}

export const MatriculaModal: React.FC<MatriculaModalProps> = ({
  isOpen,
  onClose,
  selectedTurma,
  onTurmaChange,
  onMatriculaSucesso,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        id="secaoMatricula"
        className="relative z-10 w-full max-w-xl my-auto max-h-[94vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Fechar formulário"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Formulario */}
        <div className="p-1 sm:p-3 overflow-y-auto max-h-[90vh]">
          <MatriculaForm
            selectedTurma={selectedTurma}
            onTurmaChange={onTurmaChange}
            onMatriculaSucesso={onMatriculaSucesso}
          />
        </div>
      </div>
    </div>
  );
};

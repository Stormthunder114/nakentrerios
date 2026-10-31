import React, { useEffect, useRef } from 'react';
import { GaleriaFotos } from './GaleriaFotos';

export function FotosModal({ onClose, onMatricula }: { onClose: () => void; onMatricula: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return (
    <dialog ref={dialog} onCancel={(event) => event.preventDefault()} aria-label="Fotos e aulas"
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-zinc-100 p-0 text-zinc-900 backdrop:bg-black/70">
      <GaleriaFotos isOpen onClose={onClose} onMatriculaClick={() => { onClose(); onMatricula(); }} />
    </dialog>
  );
}

import {useFotos} from './useFotos';
import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Camera, 
  Trophy, 
  Swords, 
  Building, 
  GraduationCap, 
  MessageCircle,
  Sparkles,
  Layers
} from 'lucide-react';

export type CategoriaGaleria = 'todas' | 'aulas' | 'competicoes' | 'espaco' | 'graduacoes';

export interface FotoGaleria {
  id: string;
  url: string;
  titulo: string;
  categoria: 'aulas' | 'competicoes' | 'espaco' | 'graduacoes';
  categoriaLabel: string;
  descricao: string;
  detalhe?: string;
  span?: string; // para variação de layout no grid
}


interface GaleriaFotosProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMatriculaClick?: () => void;
}

export const GaleriaFotos: React.FC<GaleriaFotosProps> = ({ 
  isOpen = true,
  onClose,
  onMatriculaClick 
}) => {
  const {fotos,loading,error,retry}=useFotos();
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaGaleria>('todas');
  const [fotoSelecionada, setFotoSelecionada] = useState<FotoGaleria | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Filtragem
  const fotosFiltradas = categoriaAtiva === 'todas'
    ? fotos
    : fotos.filter((f) => f.categoria === categoriaAtiva);

  useEffect(()=>{setFotoSelecionada(current=>current ? fotos.find(f=>f.id===current.id) || null : null)},[JSON.stringify(fotos)]);

  // Navegação no Lightbox
  const handleProxima = useCallback(() => {
    if (!fotoSelecionada) return;
    const indiceAtual = fotosFiltradas.findIndex((f) => f.id === fotoSelecionada.id);
    const proximoIndice = (indiceAtual + 1) % fotosFiltradas.length;
    setFotoSelecionada(fotosFiltradas[proximoIndice]);
  }, [fotoSelecionada, fotosFiltradas]);

  const handleAnterior = useCallback(() => {
    if (!fotoSelecionada) return;
    const indiceAtual = fotosFiltradas.findIndex((f) => f.id === fotoSelecionada.id);
    const indiceAnterior = (indiceAtual - 1 + fotosFiltradas.length) % fotosFiltradas.length;
    setFotoSelecionada(fotosFiltradas[indiceAnterior]);
  }, [fotoSelecionada, fotosFiltradas]);

  // Teclado (ESC fecha lightbox ou fecha o modal da galeria)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (fotoSelecionada) {
          setFotoSelecionada(null);
        } else if (onClose) {
          onClose();
        }
        return;
      }
      if (!fotoSelecionada) return;
      if (e.key === 'ArrowRight') handleProxima();
      if (e.key === 'ArrowLeft') handleAnterior();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, fotoSelecionada, onClose, handleProxima, handleAnterior]);

  // Bloqueio do scroll da página quando Modal da galeria está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Touch Swipe para celular no lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleProxima();
    } else if (diff < -50) {
      handleAnterior();
    }
    setTouchStart(null);
  };

  if (!isOpen) return null;

  const indiceFotoAtual = fotoSelecionada 
    ? fotosFiltradas.findIndex((f) => f.id === fotoSelecionada.id) + 1 
    : 0;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Fotos & Aulas - CT NAK Entre Rios"
    >
      {/* Barra Superior do Modal com Título, Filtros e Botão Fechar */}
      <header className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 z-20 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-500 border border-red-600/30 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-['Teko'] text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-none">
                Fotos & Aulas
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-600/20 border border-red-600/30 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                CT Oficial NAK
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 truncate hidden xs:block">
              Aulas, competições, cerimônias de graduação e estrutura
            </p>
          </div>
        </div>

        {/* Controles de Filtro Desktop */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => setCategoriaAtiva('todas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'todas'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Todas</span>
          </button>

          <button
            type="button"
            onClick={() => setCategoriaAtiva('aulas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'aulas'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Aulas & Treinos</span>
          </button>

          <button
            type="button"
            onClick={() => setCategoriaAtiva('competicoes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'competicoes'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Competições</span>
          </button>

          <button
            type="button"
            onClick={() => setCategoriaAtiva('espaco')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'espaco'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Espaço do CT</span>
          </button>

          <button
            type="button"
            onClick={() => setCategoriaAtiva('graduacoes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'graduacoes'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Graduações</span>
          </button>
        </div>

        {/* Botão Fechar Modal */}
        <div className="flex items-center gap-2 shrink-0">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition cursor-pointer active:scale-95 shadow-sm"
              title="Fechar galeria (Esc)"
            >
              <X className="w-4 h-4 text-zinc-300" />
              <span>Fechar</span>
            </button>
          )}
        </div>
      </header>

      {/* Barra de Filtros Mobile / Tablet */}
      <div className="lg:hidden w-full bg-zinc-950 px-4 py-2 border-b border-zinc-800/80 overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
        <button
          type="button"
          onClick={() => setCategoriaAtiva('todas')}
          className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            categoriaAtiva === 'todas'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-900/60'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>Todas ({fotos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setCategoriaAtiva('aulas')}
          className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            categoriaAtiva === 'aulas'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-900/60'
          }`}
        >
          <Swords className="w-3 h-3" />
          <span>Aulas</span>
        </button>

        <button
          type="button"
          onClick={() => setCategoriaAtiva('competicoes')}
          className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            categoriaAtiva === 'competicoes'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-900/60'
          }`}
        >
          <Trophy className="w-3 h-3" />
          <span>Competições</span>
        </button>

        <button
          type="button"
          onClick={() => setCategoriaAtiva('espaco')}
          className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            categoriaAtiva === 'espaco'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-900/60'
          }`}
        >
          <Building className="w-3 h-3" />
          <span>Espaço CT</span>
        </button>

        <button
          type="button"
          onClick={() => setCategoriaAtiva('graduacoes')}
          className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            categoriaAtiva === 'graduacoes'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-900/60'
          }`}
        >
          <GraduationCap className="w-3 h-3" />
          <span>Graduações</span>
        </button>
      </div>

      {/* Conteúdo com Scroll: Grid de Fotos */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 gap-1.5 px-1">
          <span>Exibindo <strong>{fotosFiltradas.length}</strong> fotos do acervo NAK Entre Rios</span>
          <span className="text-zinc-500">Clique em qualquer foto para ampliar em alta definição</span>
        </div>

        {loading && <p role="status" className="text-zinc-300 p-4">Carregando fotos…</p>}
        {error && <div role="alert" className="text-zinc-300 p-4">{error} <button onClick={retry} className="underline p-3">Tentar novamente</button></div>}
        {!loading && !error && fotosFiltradas.length===0 && <p className="text-zinc-300 p-4">Nenhuma foto nesta categoria.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
          {fotosFiltradas.map((foto) => (
            <div
              key={foto.id}
              onClick={() => setFotoSelecionada(foto)}
              className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-4/3 ${foto.span || ''}`}
            >
              {/* Imagem com Zoom Suave ao passar o cursor */}
              <img
                src={foto.url}
                alt={foto.titulo}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Overlay Escuro com Informações */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider drop-shadow">
                    {foto.categoriaLabel}
                  </span>
                  <span className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-zinc-300 group-hover:text-white transition">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-snug drop-shadow line-clamp-1 font-sans">
                    {foto.titulo}
                  </h3>
                  {foto.detalhe && (
                    <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                      {foto.detalhe}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* =========================================================================
       * COMPONENTE LIGHTBOX / VISUALIZADOR EM TELA CHEIA
       * ========================================================================= */}
      {fotoSelecionada && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200 select-none"
          role="dialog"
          aria-modal="true"
          aria-label={fotoSelecionada.titulo}
        >
          {/* Barra Superior do Lightbox */}
          <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/60 z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">
                {String(indiceFotoAtual).padStart(2, '0')} / {String(fotosFiltradas.length).padStart(2, '0')}
              </span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                {fotoSelecionada.categoriaLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onMatriculaClick && (
                <button
                  type="button"
                  onClick={() => {
                    setFotoSelecionada(null);
                    onMatriculaClick();
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Matricule-se</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setFotoSelecionada(null)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer border border-zinc-800"
                aria-label="Fechar visualizador"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Área Central: Imagem + Controles Laterais */}
          <div 
            className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Botão Anterior */}
            <button
              type="button"
              onClick={handleAnterior}
              className="absolute left-2 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition border border-zinc-800 cursor-pointer shadow-lg active:scale-95"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Container da Imagem Ativa */}
            <div className="max-w-4xl max-h-[70vh] flex items-center justify-center relative">
              <img
                src={fotoSelecionada.url}
                alt={fotoSelecionada.titulo}
                className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            {/* Botão Próximo */}
            <button
              type="button"
              onClick={handleProxima}
              className="absolute right-2 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition border border-zinc-800 cursor-pointer shadow-lg active:scale-95"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Barra Inferior: Legenda & Faixa de Miniaturas */}
          <div className="w-full bg-zinc-950/80 border-t border-zinc-800/80 px-4 sm:px-6 py-3.5 z-20 space-y-3">
            {/* Legenda Textual */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base font-sans">
                  {fotoSelecionada.titulo}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {fotoSelecionada.descricao}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <a
                  href={`https://wa.me/554299144865?text=${encodeURIComponent(`Sawadee Krap Professor Jonatas! Vi a foto "${fotoSelecionada.titulo}" no site e gostaria de mais informações.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-700 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dúvida no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Faixa de Miniaturas (Filmstrip) */}
            <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {fotosFiltradas.map((f, idx) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFotoSelecionada(f)}
                  className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    f.id === fotoSelecionada.id
                      ? 'border-red-500 scale-105 opacity-100 ring-2 ring-red-500/30'
                      : 'border-zinc-800 opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                >
                  <img
                    src={f.url}
                    alt={f.titulo}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface PortfolioItem {
  id: string;
  url: string;
  titulo: string;
  tag: string;
  descricao?: string;
}

/**
 * ============================================================================
 * FOTOS REAIS DO PORTFÓLIO / NAK ENTRE RIOS (Álbum Oficial)
 * ============================================================================
 * Imagens reais de atletas, treinos, crianças, graduações, campeonatos e eventos
 * da academia NAK Entre Rios sob a liderança do Professor Jonatas Ramos.
 */
export const PORTFOLIO_FOTOS: PortfolioItem[] = [
  {
    id: 'nak-1',
    url: 'https://i.ibb.co/hnq979z/Save-Clip-App-657416355-18116648863574713-735500378728764010-n.jpg',
    titulo: 'Entrada do Atleta no Ringue',
    tag: 'Combate',
    descricao: 'Concentração, preparo e foco absoluto na caminhada para o ringue sob o apoio da torcida.',
  },
  {
    id: 'nak-2',
    url: 'https://i.ibb.co/KpPNV47M/Save-Clip-App-652670183-17915919528323891-9089946622436895532-n.jpg',
    titulo: 'Vitória no Ringue',
    tag: 'Vitória',
    descricao: 'Celebração e consagração da vitória do atleta da NAK Entre Rios no ringue com o suporte da equipe.',
  },
  {
    id: 'nak-3',
    url: 'https://i.ibb.co/xtjYhQbJ/Save-Clip-App-670006689-18119080057653872-4867412013298073139-n.jpg',
    titulo: 'Graduação ao Ar Livre',
    tag: 'Graduação',
    descricao: 'Cerimônia especial de graduação e entrega de certificados realizada ao ar livre com a equipe NAK.',
  },
  {
    id: 'nak-4',
    url: 'https://i.ibb.co/tw17Q1xy/Save-Clip-App-651933997-17939186949173046-8144652980287581093-n.jpg',
    titulo: 'Graduação & Confraternização ao Ar Livre',
    tag: 'Graduação',
    descricao: 'Alunos e instrutores reunidos em ambiente aberto celebrando a evolução marcial de cada guerreiro.',
  },
  {
    id: 'nak-5',
    url: 'https://i.ibb.co/BV0f7pNr/Save-Clip-App-655224119-18054396110703096-8517460463792851061-n.jpg',
    titulo: 'Celebração de Graduação ao Ar Livre',
    tag: 'Graduação',
    descricao: 'Registro coletivo dos atletas graduados celebrando a conquista de novos níveis marciais ao ar livre.',
  },
  {
    id: 'nak-6',
    url: 'https://i.ibb.co/HTq2ZnL1/Save-Clip-App-658867702-18204526213337307-1025948785271544450-n.jpg',
    titulo: 'Homenagem & Graduação ao Ar Livre',
    tag: 'Graduação',
    descricao: 'Alunos e instrutores comemorando juntos a entrega dos certificados de graduação em meio à natureza.',
  },
  {
    id: 'nak-7',
    url: 'https://i.ibb.co/chp2Qsxy/Save-Clip-App-758252920-18013689488875784-8447790674756990024-n.webp',
    titulo: 'Troféu de Campeão WFC',
    tag: 'Troféus',
    descricao: 'Atleta e professor exibindo o troféu de campeão do WFC dentro do octógono na NAK Entre Rios.',
  },
  {
    id: 'nak-8',
    url: 'https://i.ibb.co/QvXT7rJw/Save-Clip-App-675320059-18077770790640437-5055032542106521291-n.jpg',
    titulo: 'Cerimônia Solene de Graduação',
    tag: 'Graduação',
    descricao: 'Alunos e instrutores comemorando a evolução técnica durante a entrega de certificados no tatame.',
  },
  {
    id: 'nak-9',
    url: 'https://i.ibb.co/xSh5d068/Save-Clip-App-573590221-18057462785640437-3912827893358187324-n.jpg',
    titulo: 'Fé, Honra e Combate',
    tag: 'Valores',
    descricao: 'Atleta com mensagem de fé no braço vestindo com orgulho a camisa da NAK Entre Rios.',
  },
  {
    id: 'nak-10',
    url: 'https://i.ibb.co/b5x8sqb5/Save-Clip-App-572498813-18057462809640437-6041930003124996956-n.jpg',
    titulo: 'Preparação & Foco nas Bandagens',
    tag: 'Foco',
    descricao: 'Atleta ajustando as bandagens nas mãos em concentração pré-treino para o combate.',
  },
  {
    id: 'nak-11',
    url: 'https://i.ibb.co/JWbnLycn/Save-Clip-App-573449126-18057462983640437-4668258331745679816-n.jpg',
    titulo: 'Graduação do Prajied',
    tag: 'Prajied',
    descricao: 'Tradição sagrada do Muay Thai e reconhecimento solene da graduação de Prajied dos atletas da NAK.',
  },
  {
    id: 'nak-12',
    url: 'https://i.ibb.co/GfzTVLbM/Save-Clip-App-625131101-18106084762703273-764547130254689817-n.jpg',
    titulo: 'Moção de Aplausos Oficial',
    tag: 'Reconhecimento',
    descricao: 'Homenagem da Câmara Municipal de Guarapuava ao trabalho social e esportivo do Prof. Jonatas Ramos.',
  },
  {
    id: 'nak-13',
    url: 'https://i.ibb.co/0R9yKHKx/Save-Clip-App-573813719-18057462974640437-7645370781992509263-n.jpg',
    titulo: 'Família & União NAK',
    tag: 'Valores',
    descricao: 'Espaço de acolhimento, desenvolvimento humano e superação constante para todas as idades.',
  },
];

export const PortfolioFaixa: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  // Duplicamos a lista para criar a esteira horizontal em loop contínuo e sem emendas
  const itensDuplicados = [...PORTFOLIO_FOTOS, ...PORTFOLIO_FOTOS];

  // Fechar lightbox com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = PORTFOLIO_FOTOS.findIndex((item) => item.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + PORTFOLIO_FOTOS.length) % PORTFOLIO_FOTOS.length;
    setSelectedPhoto(PORTFOLIO_FOTOS[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = PORTFOLIO_FOTOS.findIndex((item) => item.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_FOTOS.length;
    setSelectedPhoto(PORTFOLIO_FOTOS[nextIndex]);
  };

  return (
    <section 
      aria-label="Portfólio de Treinos e Resultados da NAK Entre Rios"
      className="relative z-10 w-full py-4 sm:py-6 overflow-hidden select-none"
    >
      {/* Máscara suave com gradiente na extremidade esquerda (acabamento premium) */}
      <div 
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-zinc-100 via-zinc-100/80 to-transparent" 
        aria-hidden="true"
      />

      {/* Máscara suave com gradiente na extremidade direita (acabamento premium) */}
      <div 
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-zinc-100 via-zinc-100/80 to-transparent" 
        aria-hidden="true"
      />

      {/* Container com altura responsiva */}
      <div className="relative h-[230px] sm:h-[260px] md:h-[290px] flex items-center overflow-hidden">
        <div className="marquee-track flex items-center gap-4 sm:gap-5 px-2">
          {itensDuplicados.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedPhoto(item);
                }
              }}
              className="group/card relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[190px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-300/80 shadow-md shadow-zinc-300/40 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-red-500/50"
            >
              {/* Imagem com object-fit cover e zoom suave no hover */}
              <img
                src={item.url}
                alt={item.titulo}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover/card:scale-105"
              />

              {/* Overlay sutil escuro para legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />

              {/* Badge de categoria / tag */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-zinc-200 border border-white/20">
                  {item.tag}
                </span>
              </div>

              {/* Ícone sutil de zoom no canto superior direito */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-1.5 rounded-full bg-black/60 text-white/90">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Título da foto no rodapé do card */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-white font-['Teko'] text-lg sm:text-xl uppercase tracking-wide leading-tight truncate drop-shadow-md">
                  {item.titulo}
                </p>
                {item.descricao && (
                  <p className="text-zinc-300 text-[11px] sm:text-xs line-clamp-1 opacity-90">
                    {item.descricao}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL LIGHTBOX / VISUALIZAÇÃO EM TELA CHEIA */}
      {selectedPhoto && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label={selectedPhoto.titulo}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra superior com botão fechar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 text-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  {selectedPhoto.tag}
                </span>
                <h3 className="font-['Teko'] text-xl uppercase tracking-wide truncate">
                  {selectedPhoto.titulo}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Fechar visualização"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagem em alta resolução */}
            <div className="relative w-full max-h-[65vh] sm:max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] sm:max-h-[70vh] object-contain"
              />

              {/* Botões de navegação lateral */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-transform active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próxima foto"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-transform active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Descrição no rodapé do modal */}
            {selectedPhoto.descricao && (
              <div className="px-4 py-3 bg-zinc-900/90 border-t border-zinc-800 text-left">
                <p className="text-zinc-300 text-xs sm:text-sm font-sans leading-relaxed">
                  {selectedPhoto.descricao}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

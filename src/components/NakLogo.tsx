import React, { useState } from 'react';

interface NakLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

// Imagem oficial da NAK Entre Rios fornecida pelo usuário
export const NAK_LOGO_IMAGE_URL = 'https://i.ibb.co/Z62WScD7/490220375-1204519331349136-6119234910120485207-n.jpg';

export const NakLogo: React.FC<NakLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {!hasError ? (
        <div
          style={{ width: size, height: size }}
          className="shrink-0 rounded-full overflow-hidden border-2 border-zinc-300 shadow-xl shadow-zinc-400/30 bg-white flex items-center justify-center transition-transform hover:scale-105"
        >
          <img
            src={NAK_LOGO_IMAGE_URL}
            alt="Logo NAK Muay Thai Entre Rios"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-md transition-transform hover:scale-105"
        >
          {/* Neutral background circle */}
          <circle cx="100" cy="100" r="95" fill="#FAFAFA" />
          <circle cx="100" cy="100" r="93" stroke="#18181B" strokeWidth="4" />

          {/* Winged Fist Graphic */}
          <g id="winged-fist">
            <path
              d="M 52 46 C 45 68, 44 95, 78 112 C 68 98, 62 82, 66 65 C 70 48, 80 40, 80 40 C 70 48, 62 60, 58 74 C 54 88, 56 100, 72 108 C 60 98, 54 85, 52 70 Z"
              fill="#18181B"
            />
            <path
              d="M 64 35 C 50 55, 48 85, 74 104 C 64 85, 66 66, 75 52 C 84 38, 92 36, 92 36 C 82 42, 74 54, 70 70 C 66 84, 70 96, 80 102 Z"
              fill="#09090B"
            />
            <path
              d="M 80 26 C 70 45, 68 70, 85 92 C 78 75, 80 58, 88 46 C 96 34, 100 32, 100 32 C 92 38, 88 48, 86 62 C 84 76, 88 86, 94 90 Z"
              fill="#18181B"
            />
            <path
              d="M 148 46 C 155 68, 156 95, 122 112 C 132 98, 138 82, 134 65 C 130 48, 120 40, 120 40 C 130 48, 138 60, 142 74 C 146 88, 144 100, 128 108 C 140 98, 146 85, 148 70 Z"
              fill="#18181B"
            />
            <path
              d="M 136 35 C 150 55, 152 85, 126 104 C 136 85, 134 66, 125 52 C 116 38, 108 36, 108 36 C 118 42, 126 54, 130 70 C 134 84, 130 96, 120 102 Z"
              fill="#09090B"
            />
            <path
              d="M 120 26 C 130 45, 132 70, 115 92 C 122 75, 120 58, 112 46 C 104 34, 100 32, 100 32 C 108 38, 112 48, 114 62 C 116 76, 112 86, 106 90 Z"
              fill="#18181B"
            />

            <g transform="translate(76, 80)">
              <rect x="6" y="10" width="36" height="26" rx="8" fill="#18181B" />
              <path
                d="M 8 12 Q 13 4 17 12 Q 22 4 26 12 Q 31 4 35 12 Q 40 6 43 14 L 43 28 Q 38 34 24 34 Q 10 34 6 28 Z"
                fill="#09090B"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <line x1="17" y1="12" x2="17" y2="24" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="26" y1="12" x2="26" y2="24" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="35" y1="12" x2="35" y2="24" stroke="#FFFFFF" strokeWidth="1.2" />
              <path
                d="M 7 22 C 11 20, 20 22, 24 25 C 20 28, 12 30, 8 26 Z"
                fill="#27272A"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </g>
          </g>

          <text
            x="100"
            y="152"
            textAnchor="middle"
            fill="#DC2626"
            fontFamily="'Teko', Impact, sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="2"
          >
            NAK
          </text>
          <text
            x="100"
            y="173"
            textAnchor="middle"
            fill="#09090B"
            fontFamily="'Outfit', Arial, sans-serif"
            fontWeight="800"
            fontSize="16"
            letterSpacing="1.5"
          >
            ENTRE RIOS
          </text>
        </svg>
      )}

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-wider text-2xl font-['Teko'] text-black uppercase leading-none">
              <span className="text-red-600">NAK</span> <span className="text-black">Entre Rios</span>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
            Centro de Treinamento Muay Thai
          </span>
        </div>
      )}
    </div>
  );
};

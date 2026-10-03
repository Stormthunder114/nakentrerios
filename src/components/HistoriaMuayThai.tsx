import React, { useState } from 'react';
import { 
  Scroll, 
  Award, 
  Flame, 
  Compass 
} from 'lucide-react';

export const HistoriaMuayThai: React.FC = () => {
  const [abaAtiva, setAbaAtiva] = useState<'origem' | 'prajied' | 'mandamentos'>('origem');

  // Os 12 Mandamentos sagrados fornecidos
  const mandamentos = [
    { numero: 1, texto: 'Respeitar a natureza e todos os seres viventes acima de qualquer coisa.' },
    { numero: 2, texto: 'Respeitar e ser respeitado por colegas e graduados.' },
    { numero: 3, texto: 'Preservar e lutar pelo Muay Thai.' },
    { numero: 4, texto: 'Pensar e agir com o próximo como se fosse a si mesmo.' },
    { numero: 5, texto: 'Honrar pai e mãe como se fossem rei e rainha.' },
    { numero: 6, texto: 'Saber respeitar e acatar uma repreensão ou punição.' },
    { numero: 7, texto: 'Guardar para si o que lhe foi ensinado.' },
    { numero: 8, texto: 'Nunca fazer mau uso de suas técnicas.' },
    { numero: 9, texto: 'Ter a mente sempre iluminada com pensamentos de sinceridade, honestidade e ajuda ao próximo.' },
    { numero: 10, texto: 'Iluminar a mente praticando a mentalização.' },
    { numero: 11, texto: 'Sorrir para o inimigo enquanto não puder destruí-lo.' },
    { numero: 12, texto: 'Morrer lutando, matar para não morrer.' },
  ];

  // Graus de Prajied e significados
  const grausPrajied = [
    {
      cor: 'Branco',
      badgeCor: 'bg-zinc-100 text-zinc-800 border-zinc-300',
      pontoCor: 'bg-zinc-100 border border-zinc-400',
      titulo: 'Iniciação & Humildade',
      significado: 'Representa a pureza, inocência e a mente aberta do praticante para absorver os primeiros fundamentos da arte marcial.',
    },
    {
      cor: 'Branco c/ Ponta Vermelha',
      badgeCor: 'bg-zinc-100 text-zinc-900 border-red-300',
      pontoCor: 'bg-gradient-to-r from-zinc-100 to-red-600',
      titulo: 'Primeiro Avanço Técnico',
      significado: 'Consolidação das posturas e primeiros golpes básicos. Despertar do interesse e da disciplina marcial.',
    },
    {
      cor: 'Vermelho',
      badgeCor: 'bg-red-50 text-red-700 border-red-200',
      pontoCor: 'bg-red-600',
      titulo: 'O Fogo do Aprendizado',
      significado: 'Simboliza a coragem, o sangue do guerreiro, o aumento do vigor físico e o compromisso firme com os treinos.',
    },
    {
      cor: 'Vermelho c/ Ponta Azul Claro',
      badgeCor: 'bg-red-50 text-red-800 border-sky-300',
      pontoCor: 'bg-gradient-to-r from-red-600 to-sky-400',
      titulo: 'Transição & Equilíbrio',
      significado: 'Fase de refinamento da técnica, coordenação motora e desenvolvimento de autocontrole.',
    },
    {
      cor: 'Azul Claro',
      badgeCor: 'bg-sky-50 text-sky-700 border-sky-200',
      pontoCor: 'bg-sky-400',
      titulo: 'Fluidez & Serenidade',
      significado: 'Representa a calma sob pressão no combate, fluidez nos movimentos e o domínio intermediário das 8 armas.',
    },
    {
      cor: 'Azul Claro c/ Ponta Azul Escuro',
      badgeCor: 'bg-sky-50 text-sky-800 border-blue-300',
      pontoCor: 'bg-gradient-to-r from-sky-400 to-blue-800',
      titulo: 'Amadurecimento Tático',
      significado: 'Leitura rápida dos movimentos adversários e precisão na aplicação dos contragolpes.',
    },
    {
      cor: 'Azul Escuro',
      badgeCor: 'bg-blue-50 text-blue-700 border-blue-200',
      pontoCor: 'bg-blue-800',
      titulo: 'Solidez & Firmeza',
      significado: 'Conhecimento técnico avançado, resistência psicológica e postura respeitosa de veterano no dojo.',
    },
    {
      cor: 'Azul Escuro c/ Ponta Preta',
      badgeCor: 'bg-zinc-100 text-zinc-900 border-zinc-400',
      pontoCor: 'bg-gradient-to-r from-blue-800 to-black',
      titulo: 'Pré-Instrutor',
      significado: 'Nível preparatório para auxiliar mestres e professores na formação de novos alunos.',
    },
    {
      cor: 'Preto (Kru / Instrutor)',
      badgeCor: 'bg-black text-white border-zinc-800',
      pontoCor: 'bg-black border border-zinc-600',
      titulo: 'Maestria & Liderança',
      significado: 'Domínio total das 8 armas corporais, capacidade pedagógica para ensinar e transmitir a tradição marcial.',
    },
    {
      cor: 'Preto e Branco',
      badgeCor: 'bg-zinc-900 text-white border-zinc-300',
      pontoCor: 'bg-gradient-to-r from-black to-zinc-100 border border-zinc-400',
      titulo: 'Mestre (Arjarn)',
      significado: 'Formação de novos professores e instrutores, alta liderança e guardião dos ensinamentos da linhagem marcial.',
    },
    {
      cor: 'Preto, Branco e Vermelho',
      badgeCor: 'bg-zinc-950 text-white border-red-600',
      pontoCor: 'bg-gradient-to-r from-black via-zinc-100 to-red-600 border border-zinc-400',
      titulo: 'Grão Mestre',
      significado: 'Graduação máxima e suprema do Muay Thai. Reúne a autoridade e maestria do preto, a pureza, sabedoria e humildade do branco, e a coragem, vitalidade e sangue guerreiro do vermelho.',
    },
  ];

  return (
    <div id="historiaMuayThai" className="w-full max-w-4xl mx-auto my-6 px-4">
      {/* Container Principal em Estilo Neutro e Acabamento Sofisticado */}
      <div className="bg-white/90 backdrop-blur-sm border border-zinc-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-zinc-300/30">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-bold uppercase tracking-widest text-zinc-700">
            <Scroll className="w-3.5 h-3.5 text-red-600" />
            <span>Tradição & Filosofia Marcial</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Teko'] tracking-wide text-zinc-950 leading-none">
            A História do <span className="text-red-600">Muay Thai</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-sans leading-relaxed">
            Conheça as raízes sagradas, o propósito de guerra, a graduação do Prajied e o código de honra dos guerreiros siameses.
          </p>
        </div>

        {/* Seletor de Abas Responsivo para Celular e Computador */}
        <div className="flex items-center justify-start sm:justify-center p-1 bg-zinc-100 rounded-xl max-w-lg mx-auto mb-6 border border-zinc-200 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none gap-1">
          <button
            type="button"
            onClick={() => setAbaAtiva('origem')}
            className={`flex-1 min-w-fit py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
              abaAtiva === 'origem'
                ? 'bg-black text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Origem & Propósito</span>
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva('prajied')}
            className={`flex-1 min-w-fit py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
              abaAtiva === 'prajied'
                ? 'bg-black text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Graus de Prajied</span>
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva('mandamentos')}
            className={`flex-1 min-w-fit py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
              abaAtiva === 'mandamentos'
                ? 'bg-black text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>12 Mandamentos</span>
          </button>
        </div>

        {/* Conteúdo Aba 1: Origem & Para Que Foi Criado */}
        {abaAtiva === 'origem' && (
          <div className="space-y-5 animate-in fade-in duration-200 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Quando e Onde Surgiu */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2.5 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h3 className="font-['Teko'] text-2xl uppercase font-bold text-zinc-900 tracking-wide">
                    Quando e Onde Surgiu
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                  O Muay Thai surgiu há mais de <strong>2.000 anos</strong> no antigo <strong>Reino de Sião</strong> (atual Tailândia). Ele nasceu da evolução das artes ancestrais de combate conhecidas como <em>Muay Boran</em>, transmitidas por mestres guerreiros siameses de geração em geração.
                </p>
                <div className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Raízes siamesas preservadas há milênios na Tailândia.</span>
                </div>
              </div>

              {/* Para Que Foi Criado */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2.5 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h3 className="font-['Teko'] text-2xl uppercase font-bold text-zinc-900 tracking-wide">
                    Para Que Foi Criado
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                  Foi criado como uma <strong>ciência bélica de autodefesa e sobrevivência militar</strong> para defender o povo siamês e suas terras de constantes invasões e conflitos sangrentos.
                </p>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                  Nas batalhas, quando as espadas e lanças se quebravam, o soldado utilizava o próprio corpo como arma letal — nascendo a lendária <strong>Arte das 8 Armas</strong>: dois punhos, dois cotovelos, dois joelhos e duas canelas.
                </p>
              </div>

            </div>

            {/* Destaque das 8 Armas */}
            <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div>
                <p className="font-['Teko'] text-xl uppercase tracking-wider text-zinc-950 font-bold">
                  A Arte das 8 Armas Corporais
                </p>
                <p className="text-xs text-zinc-600">
                  Punhos como lâminas • Cotovelos como marretas • Joelhos como machados • Canelas como escudos
                </p>
              </div>
              <div className="shrink-0 px-3 py-1.5 rounded-lg bg-black text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                Tradição de Batalha
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo Aba 2: Graus de Prajied */}
        {abaAtiva === 'prajied' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-700 leading-relaxed text-left">
              <strong className="text-zinc-900">O que é o Prajied (Prajiad):</strong> É a corda sagrada trançada usada no braço do lutador (bíceps). Na antiguidade, guerreiros recebiam amuletos benzidos e pedaços de tecidos de suas mães para proteção espiritual nas batalhas. Na prática moderna, o Prajied identifica o nível técnico, dedicação e tempo de treino do praticante.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {grausPrajied.map((grau, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition flex items-start gap-3 text-left"
                >
                  <div className={`w-4 h-4 rounded-full ${grau.pontoCor} shrink-0 mt-1 shadow-sm`} />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${grau.badgeCor}`}>
                        {grau.cor}
                      </span>
                      <span className="font-['Teko'] text-lg font-bold text-zinc-900 uppercase leading-none">
                        {grau.titulo}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {grau.significado}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo Aba 3: Os 12 Mandamentos Sagrados */}
        {abaAtiva === 'mandamentos' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 text-left">
              <strong className="text-zinc-900">Código Sagrado de Conduta:</strong> Os 12 mandamentos formam a espinha dorsal da disciplina, respeito e postura de todo praticante autêntico de Muay Thai.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              {mandamentos.map((item) => (
                <div
                  key={item.numero}
                  className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3 hover:bg-zinc-100/80 transition text-left"
                >
                  <span className="w-6 h-6 rounded-lg bg-black text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.numero}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-snug">
                    {item.texto}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-[11px] text-zinc-500">
              <span>Sawadee Krap • Honra, Lealdade e Tradição na NAK Entre Rios</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

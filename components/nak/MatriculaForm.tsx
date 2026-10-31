import React, { useState } from 'react';
import { cadastrarAluno } from '../../lib/matriculas';
import { CheckCircle2, AlertCircle, Loader2, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import type { TurmaId } from '../types';
import { opcoesTurmas } from '../../lib/validar-matricula';

interface MatriculaFormProps {
  selectedTurma: TurmaId;
  onTurmaChange: (turma: TurmaId) => void;
  onMatriculaSucesso?: (novoAluno: { nome: string; telefone: string; turma: string }) => void;
}

export const MatriculaForm: React.FC<MatriculaFormProps> = ({
  selectedTurma,
  onTurmaChange,
  onMatriculaSucesso,
}) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [alunoCadastrado, setAlunoCadastrado] = useState<{
    nome: string;
    telefone: string;
    turma: string;
  } | null>(null);

  // Formatação de telefone brasileira para melhor UX (mantém compatibilidade)
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 10) {
      val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (val.length > 6) {
      val = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    setTelefone(val);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    // Obtém os valores dos campos pelos IDs solicitados pelo usuário
    const nomeInput = nome;
    const telefoneInput = telefone;
    const turmaInput = selectedTurma;

    try {
      const { error } = await cadastrarAluno({
        nome: nomeInput,
        telefone: telefoneInput,
        turma: turmaInput,
        origem: 'Site NAK Entre Rios',
      });

      if (!error) {
        setSucesso(true);
        const matriculado = { nome: nomeInput, telefone: telefoneInput, turma: turmaInput };
        setAlunoCadastrado(matriculado);
        if (onMatriculaSucesso) {
          onMatriculaSucesso(matriculado);
        }
      } else {
        console.error('Erro ao cadastrar matrícula:', error);
        setErro(error.message || 'Erro desconhecido ao salvar.');
      }
    } catch (err: any) {
      console.error('Exceção ao enviar formulário:', err);
      const msg = err?.message || 'Falha de conexão com o banco de dados.';
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleNovaMatricula = () => {
    setNome('');
    setTelefone('');
    setSucesso(false);
    setErro(null);
    setAlunoCadastrado(null);
  };

  // Prepara link de WhatsApp direto com o Mestre da NAK Entre Rios
  const numeroWhatsAppMestre = '554299144865';
  const mensagemWhatsApp = encodeURIComponent(
    `Sawadee Krap Mestre! Acabei de me matricular pelo site oficial da NAK Entre Rios na turma de *${alunoCadastrado?.turma || selectedTurma}*! Meu nome é *${alunoCadastrado?.nome || nome}*. Como funciona a primeira aula experimental?`
  );
  const linkWhatsAppMestre = `https://wa.me/${numeroWhatsAppMestre}?text=${mensagemWhatsApp}`;

  return (
    <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
      {/* Subtle Neutral Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-zinc-800/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header do Card */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Matrícula NAK Entre Rios • Vagas Abertas</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold uppercase font-['Teko'] tracking-wide text-white">
          Inscreva-se Para Treinar na <span className="text-red-600">NAK</span> ENTRE RIOS
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Preencha os dados abaixo. Seus dados serão gravados com segurança no sistema da academia.
        </p>
      </div>

      {sucesso && alunoCadastrado ? (
        <div className="py-4 space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-zinc-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white text-base">
                  Inscrição recebida pela NAK Entre Rios!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                  Sua solicitação foi salva. Fale com o Professor Jonatas Ramos para confirmar a vaga e combinar sua primeira aula.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500">Aluno:</span>{' '}
                <span className="font-semibold text-white">{alunoCadastrado.nome}</span>
              </div>
              <div>
                <span className="text-zinc-500">Turma:</span>{' '}
                <span className="font-semibold text-zinc-200">{alunoCadastrado.turma}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-zinc-500">Telefone registrado:</span>{' '}
                <span className="font-mono text-white">{alunoCadastrado.telefone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={linkWhatsAppMestre}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-zinc-100 hover:bg-white text-zinc-950 shadow-lg shadow-black/40 transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-zinc-950" />
              <span>Falar no WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleNovaMatricula}
              className="py-3.5 px-4 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition"
            >
              Nova Inscrição
            </button>
          </div>
        </div>
      ) : (
        /* Form exatamente com os IDs e estrutura requerida */
        <form
          id="formMatricula"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-full"
        >
          {erro && (
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-semibold text-white">Erro ao salvar matrícula:</strong> {erro}
                <div className="mt-1 text-[11px] text-zinc-400">
                  Verifique sua conexão ou tente novamente.
                </div>
              </div>
            </div>
          )}

          {/* Campo Nome */}
          <div className="space-y-1.5">
            <label htmlFor="nome" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Nome do Aluno <span className="text-zinc-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome Completo do Aluno"
                required
                disabled={loading}
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition text-sm sm:text-base disabled:opacity-50"
              />
            </div>
          </div>

          {/* Campo Telefone */}
          <div className="space-y-1.5">
            <label htmlFor="telefone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              WhatsApp com DDD <span className="text-zinc-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={telefone}
                onChange={handleTelefoneChange}
                placeholder="WhatsApp (ex: 42 99999-8888)"
                required
                disabled={loading}
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition text-sm sm:text-base disabled:opacity-50 font-sans"
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              O Professor Jonatas enviará as orientações do primeiro treino diretamente por aqui.
            </p>
          </div>

          <fieldset disabled={loading} className="space-y-2 min-w-0">
            <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">Turma desejada *</legend>
            {opcoesTurmas.map(opcao => <label key={opcao.id} className={'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ' + (selectedTurma === opcao.id ? 'bg-zinc-800 border-red-500' : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500')}>
              <input type="radio" name="turma" value={opcao.id} checked={selectedTurma === opcao.id} onChange={() => onTurmaChange(opcao.id)} required className="w-4 h-4 shrink-0 accent-red-600" />
              <span className="min-w-0"><span className="block font-semibold text-sm text-white">{opcao.titulo}</span><span className="block text-xs text-zinc-300 mt-1">{opcao.horario}</span></span>
            </label>)}
          </fieldset>

<p className="text-xs text-zinc-400">Usaremos seu nome e WhatsApp para organizar sua inscrição e entrar em contato sobre as aulas. Para a turma Kids, informe o WhatsApp do responsável. A vaga será confirmada pela academia.</p>
          {/* Envio */}
          <button
            type="submit"
            id="btnMatriculaSubmit"
            disabled={loading}
            className="w-full mt-2 py-4 px-6 rounded-xl font-bold uppercase text-zinc-950 bg-zinc-100 hover:bg-white active:scale-[0.99] transition shadow-xl shadow-black/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed font-['Teko'] tracking-wider text-2xl border border-zinc-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
                <span>Processando Matrícula...</span>
              </>
            ) : (
              <span>Enviar inscrição</span>
            )}
          </button>

          {/* Security footnote */}
          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Cadastro Oficial NAK Entre Rios • Envio Seguro</span>
          </div>
        </form>
      )}
    </div>
  );
};



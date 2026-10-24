import React, { useState } from 'react';
import { Download, CheckCircle, ExternalLink, X, FolderArchive, ArrowRight, Copy } from 'lucide-react';

interface DownloadCloudflareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCloudflareModal: React.FC<DownloadCloudflareModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const downloadUrl = '/api/download-zip';

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error('Falha no download');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'site-nak-atualizado.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
    } catch (err) {
      console.error('Erro no download:', err);
      // Fallback direto via navegação de janela
      window.location.href = downloadUrl;
      setDownloadSuccess(true);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/api/download-zip`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-zinc-200 relative text-zinc-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <FolderArchive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-['Teko'] text-2xl uppercase tracking-wide font-bold leading-tight">
              Atualizar <span className="text-red-600">nakentrerios.online</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Arquivos prontos com a esteira de fotos movida para o final da página
            </p>
          </div>
        </div>

        {/* Botão de Download Principal */}
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-900 block">Pacote de Produção (ZIP)</span>
              <span className="text-[11px] text-zinc-500">HTML, CSS, Imagens, Scripts & Redirecionamentos</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              ~3.3 MB
            </span>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer font-['Teko'] text-xl disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            <span>{downloading ? 'Baixando Arquivo...' : 'Clique Aqui para Baixar o ZIP'}</span>
          </button>

          {downloadSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Download iniciado com sucesso! O arquivo <strong>site-nak-atualizado.zip</strong> foi salvo no seu computador/celular.</span>
            </div>
          )}

          <div className="pt-1 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Link direto alternativo:</span>
            <button
              onClick={handleCopyLink}
              className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedLink ? 'Copiado!' : 'Copiar URL'}</span>
            </button>
          </div>
        </div>

        {/* Passo a passo simples Cloudflare */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
            Como publicar no seu Cloudflare Pages (3 minutos):
          </h4>

          <ol className="text-xs text-zinc-600 space-y-2.5 list-decimal pl-4">
            <li>
              <strong>Extraia o arquivo ZIP:</strong> Clique com o botão direito no <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">site-nak-atualizado.zip</code> e escolha <em>"Extrair tudo"</em> (você verá o arquivo <code className="text-zinc-800">index.html</code> e a pasta <code className="text-zinc-800">assets</code>).
            </li>
            <li>
              <strong>Acesse o Cloudflare:</strong> Vá em <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline font-semibold">dash.cloudflare.com</a> → Clique em <strong>Workers & Pages</strong> → Selecione o seu projeto do site.
            </li>
            <li>
              <strong>Fazer Novo Deploy:</strong> Clique na aba <strong>Deployments</strong> (ou "Upload Assets") → Arraste a pasta extraída (ou envie os arquivos) → Clique em <strong>Save and Deploy</strong>.
            </li>
          </ol>
        </div>

        {/* Rodapé com botão de fechar */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <a
            href="https://dash.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-600 hover:text-zinc-950 font-medium inline-flex items-center gap-1"
          >
            <span>Abrir Painel do Cloudflare</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

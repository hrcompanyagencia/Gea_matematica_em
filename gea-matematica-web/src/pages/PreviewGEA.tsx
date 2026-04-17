import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Pencil } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { GEA_CAMPOS } from '../types/gea';

export default function PreviewGEA() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getGEA, geaAtual } = useGEAStore();
  const printRef = useRef<HTMLDivElement>(null);

  const gea = geaAtual?.id === id ? geaAtual : getGEA(id!);

  if (!gea) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">GEA não encontrado.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">Voltar</button>
      </div>
    );
  }

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Barra de ações (não imprime) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <button onClick={() => navigate('/')} className="hover:text-primary-700">Meus GEAs</button>
            <span>/</span>
            <span className="text-gray-800 font-medium">Visualizar</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Visualização do GEA</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/gea/editor/${id}`)} className="btn-secondary">
            <Pencil className="w-4 h-4" /> Editar
          </button>
          <button onClick={handleImprimir} className="btn-primary">
            <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Instrução de PDF */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800 print:hidden">
        <strong>Como salvar em PDF:</strong> Clique em "Imprimir / Salvar PDF" e, na caixa de diálogo de impressão, selecione <strong>"Salvar como PDF"</strong> como destino.
      </div>

      {/* Documento GEA */}
      <div ref={printRef} className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
        {/* Cabeçalho oficial */}
        <div className="bg-primary-900 text-white px-8 py-6 text-center">
          <p className="text-primary-200 text-xs uppercase tracking-widest mb-1">
            Secretaria de Estado da Educação do Amapá — SEED-AP
          </p>
          <h1 className="text-2xl font-bold">GUIA DE ENSINO E APRENDIZAGEM</h1>
          <p className="text-primary-200 text-sm mt-1">
            {gea.identificacao.componenteCurricular} · Ensino Médio
          </p>
        </div>

        {/* Identificação */}
        <div className="border-b border-gray-200">
          <div className="bg-primary-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-2">
            Identificação
          </div>
          <div className="px-6 py-4">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 bg-gray-50 font-semibold px-3 py-2 w-1/4">Escola</td>
                  <td className="border border-gray-300 px-3 py-2">{gea.identificacao.escola}</td>
                  <td className="border border-gray-300 bg-gray-50 font-semibold px-3 py-2 w-1/4">Ano Letivo</td>
                  <td className="border border-gray-300 px-3 py-2">{gea.identificacao.anoLetivo}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 bg-gray-50 font-semibold px-3 py-2">Professor(a)</td>
                  <td className="border border-gray-300 px-3 py-2">{gea.identificacao.professor}</td>
                  <td className="border border-gray-300 bg-gray-50 font-semibold px-3 py-2">Série</td>
                  <td className="border border-gray-300 px-3 py-2">{gea.identificacao.serie}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 bg-gray-50 font-semibold px-3 py-2">Componente</td>
                  <td className="border border-gray-300 px-3 py-2">{gea.identificacao.componenteCurricular}</td>
                  <td className="border border-gray-300 bg-gray-50 font-semibold px-3 py-2">Trimestre</td>
                  <td className="border border-gray-300 px-3 py-2">{gea.identificacao.trimestre}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Habilidades selecionadas */}
        {(gea.habilidadesSelecionadas.length > 0 || gea.habilidadesPersonalizadas.length > 0) && (
          <div className="border-b border-gray-200">
            <div className="bg-primary-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-2">
              Habilidades RCA / BNCC Selecionadas
            </div>
            <div className="px-6 py-4">
              <div className="space-y-2">
                {gea.habilidadesSelecionadas.map((h) => (
                  <div key={h.codigo} className="flex gap-3 text-sm">
                    <span className="font-bold text-primary-800 font-mono flex-shrink-0 w-28">{h.codigo}</span>
                    <span className="text-gray-700">{h.descricao}</span>
                  </div>
                ))}
                {gea.habilidadesPersonalizadas.map((h) => (
                  <div key={h.id} className="flex gap-3 text-sm">
                    <span className="font-bold text-amber-700 font-mono flex-shrink-0 w-28">{h.codigo}</span>
                    <span className="text-gray-700">{h.descricao}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campos do GEA */}
        {GEA_CAMPOS.map((campo) => {
          const valor = gea.conteudo[campo.key];
          if (!valor || !valor.trim()) return null;
          return (
            <div key={campo.key} className="border-b border-gray-200 last:border-b-0">
              <div className="bg-primary-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-2">
                {campo.titulo}
              </div>
              <div className="px-6 py-4">
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {valor}
                </div>
              </div>
            </div>
          );
        })}

        {/* Rodapé */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 text-center text-xs text-gray-400">
          <p>Documento gerado pelo Sistema GEA Matemática — SEED-AP</p>
          <p>Gerado em: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Botão voltar */}
      <div className="flex gap-3 pb-6 print:hidden">
        <button onClick={() => navigate(`/gea/editor/${id}`)} className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Editor
        </button>
        <button onClick={handleImprimir} className="btn-primary">
          <Download className="w-4 h-4" /> Baixar como PDF
        </button>
      </div>
    </div>
  );
}

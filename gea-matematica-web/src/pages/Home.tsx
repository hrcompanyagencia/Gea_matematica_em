import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Pencil, Trash2, Eye, BookOpen, Calendar, User } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { formatarData } from '../lib/utils';
import type { GEA } from '../types/gea';

export default function Home() {
  const navigate = useNavigate();
  const { geas, excluirGEA, setGeaAtual, user } = useGEAStore();

  const handleEditar = (gea: GEA) => {
    setGeaAtual(gea);
    navigate(`/gea/editor/${gea.id}`);
  };

  const handleVisualizar = (gea: GEA) => {
    setGeaAtual(gea);
    navigate(`/gea/preview/${gea.id}`);
  };

  const handleExcluir = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este GEA?')) {
      excluirGEA(id);
    }
  };

  const totalCamposPreenchidos = (gea: GEA) => {
    return Object.values(gea.conteudo).filter((v) => v && v.trim().length > 0).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus GEAs</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Bem-vindo(a), {user?.nome} — {geas.length} guia{geas.length !== 1 ? 's' : ''} salvo{geas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => navigate('/gea/novo')}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Novo GEA
        </button>
      </div>

      {/* Lista vazia */}
      {geas.length === 0 && (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum GEA criado</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Crie seu primeiro Guia de Ensino e Aprendizagem de Matemática para o Ensino Médio.
          </p>
          <button onClick={() => navigate('/gea/novo')} className="btn-primary">
            <Plus className="w-4 h-4" />
            Criar primeiro GEA
          </button>
        </div>
      )}

      {/* Grid de GEAs */}
      {geas.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {geas.map((gea) => {
            const campos = totalCamposPreenchidos(gea);
            const progresso = Math.round((campos / 15) * 100);
            return (
              <div key={gea.id} className="card p-5 hover:shadow-md transition-shadow flex flex-col">
                {/* Cabeçalho */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary-100 rounded-lg p-2">
                      <FileText className="w-4 h-4 text-primary-700" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                        {gea.identificacao.serie}
                      </span>
                      <span className="text-xs text-gray-500 ml-1.5">
                        {gea.identificacao.trimestre}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{gea.identificacao.anoLetivo}</span>
                </div>

                {/* Escola */}
                <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                  {gea.identificacao.escola || 'Escola não informada'}
                </h3>

                {/* Professor */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <User className="w-3 h-3" />
                  <span className="truncate">{gea.identificacao.professor || 'Professor não informado'}</span>
                </div>

                {/* Progresso */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{campos}/15 campos preenchidos</span>
                    <span className="font-medium text-primary-700">{progresso}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all"
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                </div>

                {/* Data */}
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>Atualizado em {formatarData(gea.atualizadoEm)}</span>
                </div>

                {/* Ações */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleVisualizar(gea)}
                    className="flex-1 btn-secondary text-xs py-1.5 justify-center"
                    title="Visualizar"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </button>
                  <button
                    onClick={() => handleEditar(gea)}
                    className="flex-1 btn-primary text-xs py-1.5 justify-center"
                    title="Editar"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(gea.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

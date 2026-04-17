import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle, Circle, X } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { HABILIDADES_RCA, getHabilidadesByUnidade } from '../data/rca-habilidades';
import type { HabilidadeRCA, HabilidadePersonalizada } from '../types/gea';
import { cn } from '../lib/utils';

export default function SelecionarHabilidades() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { geaAtual, setGeaAtual } = useGEAStore();

  const [busca, setBusca] = useState('');
  const [unidadeFiltro, setUnidadeFiltro] = useState<string>('Todas');
  const [selecionadas, setSelecionadas] = useState<HabilidadeRCA[]>(
    geaAtual?.habilidadesSelecionadas ?? []
  );
  const [personalizadas, setPersonalizadas] = useState<HabilidadePersonalizada[]>(
    geaAtual?.habilidadesPersonalizadas ?? []
  );

  // Modal de habilidade personalizada
  const [modalAberto, setModalAberto] = useState(false);
  const [novaHab, setNovaHab] = useState({ codigo: '', descricao: '', objetoConhecimento: '' });

  const unidades = ['Todas', ...Object.keys(getHabilidadesByUnidade())];

  const habFiltradas = HABILIDADES_RCA.filter((h) => {
    const matchBusca =
      !busca ||
      h.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      h.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      h.objetoConhecimento.toLowerCase().includes(busca.toLowerCase());
    const matchUnidade = unidadeFiltro === 'Todas' || h.unidadeTematica === unidadeFiltro;
    return matchBusca && matchUnidade;
  });

  const toggleHabilidade = (hab: HabilidadeRCA) => {
    setSelecionadas((prev) => {
      const existe = prev.find((h) => h.codigo === hab.codigo);
      return existe ? prev.filter((h) => h.codigo !== hab.codigo) : [...prev, hab];
    });
  };

  const adicionarPersonalizada = () => {
    if (!novaHab.codigo || !novaHab.descricao) return;
    setPersonalizadas((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...novaHab },
    ]);
    setNovaHab({ codigo: '', descricao: '', objetoConhecimento: '' });
    setModalAberto(false);
  };

  const removerPersonalizada = (habId: string) => {
    setPersonalizadas((prev) => prev.filter((h) => h.id !== habId));
  };

  const handleProximo = () => {
    if (!geaAtual) return;
    const geaAtualizado = {
      ...geaAtual,
      habilidadesSelecionadas: selecionadas,
      habilidadesPersonalizadas: personalizadas,
    };
    setGeaAtual(geaAtualizado);
    navigate(`/gea/gerar/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <button onClick={() => navigate('/')} className="hover:text-primary-700">Meus GEAs</button>
          <span>/</span>
          <button onClick={() => navigate(`/gea/novo`)} className="hover:text-primary-700">Identificação</button>
          <span>/</span>
          <span className="text-gray-800 font-medium">Habilidades</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Selecionar Habilidades</h1>
        <p className="text-gray-500 text-sm mt-1">
          Selecione as habilidades do RCA que serão trabalhadas neste GEA.
        </p>
      </div>

      {/* Indicador de passos */}
      <div className="flex items-center gap-2 text-sm">
        {['Identificação', 'Habilidades', 'Gerar com IA', 'Editar'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              i < 1 ? 'bg-green-500 text-white' : i === 1 ? 'bg-primary-800 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i < 1 ? '✓' : i + 1}
            </div>
            <span className={i === 1 ? 'text-primary-800 font-medium' : i < 1 ? 'text-green-600' : 'text-gray-400'}>
              {step}
            </span>
            {i < 3 && <ArrowRight className="w-3 h-3 text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Painel esquerdo: banco de habilidades */}
        <div className="lg:col-span-2 card p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">Banco de Habilidades RCA — Matemática EM</h2>

          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input-field pl-9"
              placeholder="Buscar por código, descrição ou objeto..."
            />
          </div>

          {/* Filtro por unidade */}
          <div className="flex flex-wrap gap-2">
            {unidades.map((u) => (
              <button
                key={u}
                onClick={() => setUnidadeFiltro(u)}
                className={cn(
                  'text-xs px-3 py-1 rounded-full border transition-colors',
                  unidadeFiltro === u
                    ? 'bg-primary-800 text-white border-primary-800'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'
                )}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Lista de habilidades */}
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {habFiltradas.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">Nenhuma habilidade encontrada.</p>
            )}
            {habFiltradas.map((hab) => {
              const selecionada = selecionadas.some((h) => h.codigo === hab.codigo);
              return (
                <button
                  key={hab.codigo}
                  onClick={() => toggleHabilidade(hab)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all flex gap-3',
                    selecionada
                      ? 'bg-primary-50 border-primary-300'
                      : 'bg-white border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                  )}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {selecionada
                      ? <CheckCircle className="w-4 h-4 text-primary-700" />
                      : <Circle className="w-4 h-4 text-gray-300" />
                    }
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-primary-700 font-mono">{hab.codigo}</span>
                      <span className="text-xs text-gray-400 truncate">{hab.objetoConhecimento}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{hab.descricao}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel direito: selecionadas */}
        <div className="space-y-4">
          {/* Habilidades RCA selecionadas */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">
                Selecionadas ({selecionadas.length})
              </h3>
            </div>
            {selecionadas.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">
                Nenhuma habilidade selecionada
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selecionadas.map((hab) => (
                  <div key={hab.codigo} className="flex items-start gap-2 bg-primary-50 rounded-lg p-2">
                    <span className="text-xs font-bold text-primary-700 font-mono flex-shrink-0">{hab.codigo}</span>
                    <p className="text-xs text-gray-600 line-clamp-2 flex-1">{hab.descricao}</p>
                    <button
                      onClick={() => toggleHabilidade(hab)}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Habilidades personalizadas */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">
                Personalizadas ({personalizadas.length})
              </h3>
              <button
                onClick={() => setModalAberto(true)}
                className="text-primary-700 hover:text-primary-900 text-xs flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
            {personalizadas.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-2">
                Nenhuma habilidade personalizada
              </p>
            ) : (
              <div className="space-y-2">
                {personalizadas.map((hab) => (
                  <div key={hab.id} className="flex items-start gap-2 bg-amber-50 rounded-lg p-2">
                    <span className="text-xs font-bold text-amber-700 font-mono flex-shrink-0">{hab.codigo}</span>
                    <p className="text-xs text-gray-600 line-clamp-2 flex-1">{hab.descricao}</p>
                    <button
                      onClick={() => removerPersonalizada(hab.id)}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-between">
        <button onClick={() => navigate('/gea/novo')} className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <button
          onClick={handleProximo}
          disabled={selecionadas.length === 0 && personalizadas.length === 0}
          className="btn-primary"
        >
          Próximo: Gerar com IA
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal de habilidade personalizada */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Adicionar Habilidade Personalizada</h3>
              <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <input
                type="text"
                value={novaHab.codigo}
                onChange={(e) => setNovaHab((p) => ({ ...p, codigo: e.target.value }))}
                className="input-field"
                placeholder="Ex: EM13MAT999 ou HAB001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Objeto de Conhecimento</label>
              <input
                type="text"
                value={novaHab.objetoConhecimento}
                onChange={(e) => setNovaHab((p) => ({ ...p, objetoConhecimento: e.target.value }))}
                className="input-field"
                placeholder="Ex: Funções Polinomiais"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                value={novaHab.descricao}
                onChange={(e) => setNovaHab((p) => ({ ...p, descricao: e.target.value }))}
                className="textarea-field"
                rows={3}
                placeholder="Descreva a habilidade..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModalAberto(false)} className="btn-secondary">Cancelar</button>
              <button
                onClick={adicionarPersonalizada}
                disabled={!novaHab.codigo || !novaHab.descricao}
                className="btn-primary"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

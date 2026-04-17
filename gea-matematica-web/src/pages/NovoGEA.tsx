import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, School, User, BookOpen, Calendar } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { criarGEAVazio, SERIES_OPTIONS, TRIMESTRE_OPTIONS, type GEAIdentificacao } from '../types/gea';

const ANO_ATUAL = new Date().getFullYear().toString();

export default function NovoGEA() {
  const navigate = useNavigate();
  const { setGeaAtual } = useGEAStore();

  const [form, setForm] = useState<GEAIdentificacao>({
    escola: '',
    professor: '',
    componenteCurricular: 'Matemática',
    serie: SERIES_OPTIONS[0],
    trimestre: TRIMESTRE_OPTIONS[0],
    anoLetivo: ANO_ATUAL,
  });

  const handleChange = (field: keyof GEAIdentificacao, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoGEA = criarGEAVazio(form);
    setGeaAtual(novoGEA);
    navigate(`/gea/habilidades/${novoGEA.id}`);
  };

  const campos = [
    {
      label: 'Nome da Escola',
      field: 'escola' as const,
      icon: School,
      placeholder: 'Ex: E.E. Gov. Janary Nunes',
      required: true,
    },
    {
      label: 'Nome do(a) Professor(a)',
      field: 'professor' as const,
      icon: User,
      placeholder: 'Ex: Maria Silva',
      required: true,
    },
    {
      label: 'Componente Curricular',
      field: 'componenteCurricular' as const,
      icon: BookOpen,
      placeholder: 'Matemática',
      required: true,
    },
    {
      label: 'Ano Letivo',
      field: 'anoLetivo' as const,
      icon: Calendar,
      placeholder: ANO_ATUAL,
      required: true,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <button onClick={() => navigate('/')} className="hover:text-primary-700 transition-colors">
            Meus GEAs
          </button>
          <span>/</span>
          <span className="text-gray-800 font-medium">Novo GEA</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Novo Guia de Ensino e Aprendizagem</h1>
        <p className="text-gray-500 text-sm mt-1">
          Preencha as informações de identificação para começar.
        </p>
      </div>

      {/* Indicador de passos */}
      <div className="flex items-center gap-2 text-sm">
        {['Identificação', 'Habilidades', 'Gerar com IA', 'Editar'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              i === 0 ? 'bg-primary-800 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i + 1}
            </div>
            <span className={i === 0 ? 'text-primary-800 font-medium' : 'text-gray-400'}>
              {step}
            </span>
            {i < 3 && <ArrowRight className="w-3 h-3 text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {campos.map(({ label, field, icon: Icon, placeholder, required }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-gray-400" />
                {label}
                {required && <span className="text-red-500">*</span>}
              </span>
            </label>
            <input
              type="text"
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="input-field"
              placeholder={placeholder}
              required={required}
            />
          </div>
        ))}

        {/* Série e Trimestre lado a lado */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Série <span className="text-red-500">*</span>
            </label>
            <select
              value={form.serie}
              onChange={(e) => handleChange('serie', e.target.value)}
              className="input-field"
              required
            >
              {SERIES_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Trimestre <span className="text-red-500">*</span>
            </label>
            <select
              value={form.trimestre}
              onChange={(e) => handleChange('trimestre', e.target.value)}
              className="input-field"
              required
            >
              {TRIMESTRE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="btn-primary">
            Próximo: Selecionar Habilidades
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

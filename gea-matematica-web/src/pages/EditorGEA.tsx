import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Sparkles, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { GEA_CAMPOS, type GEACampo } from '../types/gea';
import { cn } from '../lib/utils';

export default function EditorGEA() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getGEA, geaAtual, setGeaAtual, salvarGEA } = useGEAStore();

  const [gea, setGea] = useState(geaAtual || getGEA(id!));
  const [campoAberto, setCampoAberto] = useState<GEACampo | null>(GEA_CAMPOS[0].key);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [regenerando, setRegenerando] = useState<GEACampo | null>(null);

  useEffect(() => {
    if (!gea && id) {
      const encontrado = getGEA(id);
      if (encontrado) setGea(encontrado);
    }
  }, [id]);

  if (!gea) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">GEA não encontrado.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">Voltar ao início</button>
      </div>
    );
  }

  const handleCampoChange = (campo: GEACampo, valor: string) => {
    setGea((prev) => prev ? { ...prev, conteudo: { ...prev.conteudo, [campo]: valor } } : prev);
    setSalvo(false);
  };

  const handleSalvar = async () => {
    if (!gea) return;
    setSalvando(true);
    await new Promise((r) => setTimeout(r, 300));
    salvarGEA(gea);
    setGeaAtual(gea);
    setSalvando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  const handleRegenerar = async (campo: GEACampo, tituloCampo: string) => {
    if (!gea) return;
    setRegenerando(campo);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const habilidades = [
      ...gea.habilidadesSelecionadas,
      ...gea.habilidadesPersonalizadas.map((h) => ({
        codigo: h.codigo,
        descricao: h.descricao,
        unidadeTematica: '',
        objetoConhecimento: h.objetoConhecimento,
        competencia: '',
      })),
    ];
    const habs = habilidades.map((h) => h.codigo).join(', ');
    const serie = gea.identificacao.serie;
    const trimestre = gea.identificacao.trimestre;

    // Sugestões alternativas para regeneração
    const alternativas: Record<string, string[]> = {
      justificativa: [
        `A abordagem das habilidades ${habs} no ${trimestre} do ${serie} fundamenta-se na necessidade de preparar os estudantes para os desafios contemporâneos. O pensamento matemático desenvolve a capacidade analítica e a resolução de problemas complexos, competências essenciais para a vida cidadã e profissional no século XXI, conforme orientações do RCA-AP e da BNCC.`,
        `O trabalho com as habilidades ${habs} no ${serie} justifica-se pela sua relevância para a compreensão do mundo contemporâneo. A Matemática, como linguagem universal, permite ao estudante interpretar fenômenos naturais, sociais e econômicos, desenvolvendo o raciocínio lógico e a capacidade de argumentação fundamentada em evidências.`,
      ],
      atividadesAutodidaticas: [
        `Atividades individuais sugeridas:\n• Resolução de exercícios contextualizados do livro didático\n• Pesquisa em plataformas digitais (Khan Academy, Geogebra)\n• Elaboração de fichas de estudo com conceitos-chave\n• Prática de questões do ENEM relacionadas às habilidades ${habs}\n• Produção de vídeos explicativos curtos sobre os conteúdos`,
        `Atividades para estudo autônomo:\n• Leitura dirigida dos capítulos do livro didático\n• Resolução de problemas de vestibulares anteriores\n• Criação de mapas mentais e resumos visuais\n• Uso de aplicativos matemáticos no celular\n• Diário de aprendizagem com registro de dificuldades e conquistas`,
      ],
    };

    const opcoes = alternativas[campo];
    const novoTexto = opcoes
      ? opcoes[Math.floor(Math.random() * opcoes.length)]
      : `Sugestão regenerada para "${tituloCampo}" — ${serie}, ${trimestre}. Habilidades: ${habs}. Este campo pode ser editado livremente para melhor atender às necessidades da sua turma e contexto escolar.`;

    handleCampoChange(campo, novoTexto);
    setRegenerando(null);
  };

  const camposPreenchidos = Object.values(gea.conteudo).filter((v) => v && v.trim().length > 0).length;
  const progresso = Math.round((camposPreenchidos / 15) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <button onClick={() => navigate('/')} className="hover:text-primary-700">Meus GEAs</button>
            <span>/</span>
            <span className="text-gray-800 font-medium">Editor</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {gea.identificacao.serie} — {gea.identificacao.trimestre} — {gea.identificacao.anoLetivo}
          </h1>
          <p className="text-gray-500 text-sm">{gea.identificacao.escola}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => navigate(`/gea/preview/${id}`)} className="btn-secondary">
            <Eye className="w-4 h-4" />
            Visualizar
          </button>
          <button onClick={handleSalvar} disabled={salvando} className="btn-primary">
            {salvando ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : salvo ? (
              <CheckCircle className="w-4 h-4 text-green-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {salvo ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="card p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 font-medium">Progresso do GEA</span>
          <span className="text-primary-700 font-bold">{camposPreenchidos}/15 campos — {progresso}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Identificação resumida */}
      <div className="card p-4">
        <div className="section-header -m-4 mb-4 rounded-t-xl">
          Identificação
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {[
            { label: 'Escola', value: gea.identificacao.escola },
            { label: 'Professor(a)', value: gea.identificacao.professor },
            { label: 'Componente', value: gea.identificacao.componenteCurricular },
            { label: 'Série', value: gea.identificacao.serie },
            { label: 'Trimestre', value: gea.identificacao.trimestre },
            { label: 'Ano Letivo', value: gea.identificacao.anoLetivo },
          ].map(({ label, value }) => (
            <div key={label}>
              <span className="text-gray-400 text-xs">{label}</span>
              <p className="font-medium text-gray-800 truncate">{value || '—'}</p>
            </div>
          ))}
        </div>
        {(gea.habilidadesSelecionadas.length > 0 || gea.habilidadesPersonalizadas.length > 0) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Habilidades selecionadas:</p>
            <div className="flex flex-wrap gap-1.5">
              {gea.habilidadesSelecionadas.map((h) => (
                <span key={h.codigo} className="badge bg-primary-100 text-primary-700">{h.codigo}</span>
              ))}
              {gea.habilidadesPersonalizadas.map((h) => (
                <span key={h.id} className="badge bg-amber-100 text-amber-700">{h.codigo}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Campos do GEA */}
      <div className="space-y-3">
        {GEA_CAMPOS.map((campo, idx) => {
          const valor = gea.conteudo[campo.key];
          const preenchido = valor && valor.trim().length > 0;
          const aberto = campoAberto === campo.key;

          return (
            <div key={campo.key} className="card overflow-hidden">
              {/* Cabeçalho do campo */}
              <button
                onClick={() => setCampoAberto(aberto ? null : campo.key)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                    preenchido ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                  )}>
                    {preenchido ? '✓' : idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{campo.titulo}</p>
                    <p className="text-xs text-gray-400">{campo.descricao}</p>
                  </div>
                </div>
                {aberto ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Conteúdo expandido */}
              {aberto && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="flex justify-end mb-2 pt-3">
                    <button
                      onClick={() => handleRegenerar(campo.key, campo.titulo)}
                      disabled={regenerando === campo.key}
                      className="text-xs text-primary-700 hover:text-primary-900 flex items-center gap-1 disabled:opacity-50"
                    >
                      <Sparkles className={cn('w-3.5 h-3.5', regenerando === campo.key && 'animate-spin')} />
                      {regenerando === campo.key ? 'Regenerando...' : 'Regenerar com IA'}
                    </button>
                  </div>
                  <textarea
                    value={valor || ''}
                    onChange={(e) => handleCampoChange(campo.key, e.target.value)}
                    className="textarea-field"
                    rows={6}
                    placeholder={campo.placeholder}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {(valor || '').length} caracteres
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botão salvar final */}
      <div className="flex justify-between pb-6">
        <button onClick={() => navigate('/')} className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="flex gap-3">
          <button onClick={() => navigate(`/gea/preview/${id}`)} className="btn-secondary">
            <Eye className="w-4 h-4" /> Visualizar PDF
          </button>
          <button onClick={handleSalvar} disabled={salvando} className="btn-primary">
            <Save className="w-4 h-4" />
            {salvando ? 'Salvando...' : 'Salvar GEA'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sparkles, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useGEAStore } from '../store/useGEAStore';
import { GEA_CAMPOS, type GEAConteudo } from '../types/gea';

// Simulação local de geração de sugestões (sem backend externo)
// Em produção, substituir por chamada real à API
async function gerarSugestoesLocais(
  identificacao: Record<string, string>,
  habilidades: Array<{ codigo: string; descricao: string }>,
  campo: string,
  tituloCampo: string
): Promise<string> {
  // Simula latência de rede
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));

  const serie = identificacao.serie || '1º Ano';
  const trimestre = identificacao.trimestre || '1º Trimestre';
  const habs = habilidades.map((h) => h.codigo).join(', ');

  const sugestoes: Record<string, string> = {
    justificativa: `O estudo das habilidades matemáticas previstas para o ${trimestre} do ${serie} do Ensino Médio (${habs}) é fundamental para o desenvolvimento do raciocínio lógico-matemático dos estudantes. A Matemática, enquanto ciência e linguagem universal, contribui para a formação integral do educando, capacitando-o a interpretar e transformar a realidade com base em argumentação rigorosa e pensamento crítico, conforme preconizado pelo Referencial Curricular Amapaense e pela BNCC.`,

    habilidadesEspecificas: habilidades
      .map((h) => `${h.codigo} — ${h.descricao}`)
      .join('\n\n'),

    conhecimentosPrevios: `Para o desenvolvimento das habilidades do ${trimestre}, espera-se que os estudantes do ${serie} dominem:\n• Operações fundamentais com números reais\n• Conceitos básicos de proporcionalidade\n• Leitura e interpretação de gráficos e tabelas\n• Noções elementares de geometria plana\n• Resolução de equações de 1º grau`,

    objetosConhecimento: `Os objetos de conhecimento trabalhados neste GEA incluem:\n${habilidades.map((h) => `• ${h.descricao.split(' ').slice(0, 6).join(' ')}...`).join('\n')}`,

    atividadesAutodidaticas: `Atividades individuais para dentro e fora de sala:\n• Leitura e resolução de exercícios do livro didático (capítulos relacionados às habilidades ${habs})\n• Pesquisa em plataformas digitais como Khan Academy, GeoGebra e YouTube Educacional\n• Resolução de listas de exercícios contextualizados com situações do cotidiano amapaense\n• Elaboração de resumos e mapas conceituais sobre os conteúdos estudados\n• Prática de problemas do ENEM relacionados às habilidades trabalhadas`,

    atividadesDidaticoCooperativas: `Atividades colaborativas em duplas e grupos:\n• Resolução cooperativa de problemas em grupos de 3 a 4 estudantes\n• Apresentação de soluções ao grupo-classe com justificativa dos raciocínios\n• Jogo matemático: Quiz de habilidades com perguntas elaboradas pelos próprios estudantes\n• Projeto em grupo: Pesquisa e apresentação de aplicações das habilidades em contextos reais do Amapá\n• Seminário: cada grupo explica uma das habilidades trabalhadas para os demais`,

    espacosEducativos: `Espaços a serem utilizados neste GEA:\n• Sala de aula convencional — aulas expositivas dialogadas e resolução de exercícios\n• Laboratório de informática — uso do GeoGebra, planilhas eletrônicas e plataformas digitais\n• Biblioteca escolar — pesquisa em livros didáticos e paradidáticos\n• Pátio da escola — atividades de medição e geometria prática\n• Sala de vídeo — exibição de videoaulas e documentários matemáticos`,

    teoriaEtica: `As habilidades desenvolvidas neste GEA contribuem para a formação ética e o projeto de vida dos estudantes ao:\n• Promover o pensamento crítico e a tomada de decisões baseada em dados e evidências\n• Desenvolver a responsabilidade financeira por meio da Matemática Financeira\n• Estimular a cooperação, o respeito às diferenças e o trabalho em equipe\n• Relacionar o conhecimento matemático com questões socioambientais do Amapá\n• Preparar os estudantes para o exercício consciente da cidadania`,

    fontesReferencias: `BRASIL. Ministério da Educação. Base Nacional Comum Curricular. Brasília: MEC, 2018.\n\nAMAPÁ. Secretaria de Estado da Educação. Referencial Curricular Amapaense. Macapá: SEED-AP, 2022.\n\nDANTA, Manoel. Matemática: Contexto e Aplicações. São Paulo: Ática, 2020.\n\nPAULO, Rosa; HELERBROCK, Rafael. Ser Protagonista: Matemática. São Paulo: SM, 2020.\n\nKHAN ACADEMY. Matemática do Ensino Médio. Disponível em: www.khanacademy.org/pt-BR\n\nGEOGEBRA. Aplicativo de Matemática Dinâmica. Disponível em: www.geogebra.org`,

    eletivas: `Possibilidades de eletivas relacionadas às habilidades ${habs}:\n• Eletiva "Matemática Financeira na Prática" — aplicação de juros, investimentos e orçamento pessoal\n• Eletiva "Matemática e Tecnologia" — uso de softwares matemáticos e programação\n• Eletiva "Estatística e Pesquisa Social" — coleta e análise de dados da comunidade escolar\n• Eletiva "Geometria e Arte" — exploração de padrões geométricos em obras de arte e arquitetura`,

    recursosDidaticos: `Recursos necessários para execução deste GEA:\n• Livro didático de Matemática (PNLD)\n• Quadro branco e marcadores coloridos\n• Computadores/tablets com acesso à internet\n• Softwares: GeoGebra, LibreOffice Calc\n• Régua, compasso, transferidor e esquadros\n• Projetor multimídia\n• Material impresso: listas de exercícios e fichas de atividades\n• Calculadora científica`,

    culturaDigital: `Integração com a cultura digital:\n• Uso do GeoGebra para visualização dinâmica de funções e geometria\n• Planilhas eletrônicas (Google Sheets / LibreOffice Calc) para análise de dados e Matemática Financeira\n• Plataformas de aprendizagem: Khan Academy, Brilliant.org\n• Criação de vídeos curtos explicando conceitos matemáticos (TikTok educacional)\n• Uso de QR Codes em atividades para acesso a materiais complementares\n• Participação em fóruns e grupos de estudo online`,

    projetosIntegradoresI: `Integração com Humanas e Ciências da Natureza:\n• Geografia: uso de escalas, coordenadas geográficas e análise de dados demográficos do Amapá\n• Biologia: análise estatística de dados populacionais e crescimento exponencial\n• Física: funções e gráficos aplicados ao movimento, energia e ondas\n• História: interpretação de dados históricos por meio de gráficos e estatística\n• Química: notação científica e proporcionalidade em reações químicas`,

    projetosIntegradoresII: `Integração com Linguagens e Matemática:\n• Língua Portuguesa: leitura e interpretação de textos com dados matemáticos e infográficos\n• Arte: geometria, simetria e padrões matemáticos em obras artísticas\n• Educação Física: estatística aplicada ao desempenho esportivo e análise de jogos\n• Língua Inglesa: leitura de textos científicos em inglês com conteúdo matemático\n• Redação: argumentação baseada em dados estatísticos para textos dissertativos`,

    criteriosAvaliacao: `Avaliação objetiva (10 pontos):\n• Prova com questões de múltipla escolha e dissertativas sobre as habilidades ${habs}\n• Questões contextualizadas no estilo ENEM\n• Peso: 10 pontos\n\nAvaliação dissertativa (10 pontos):\n• Resolução de problemas com justificativa detalhada do raciocínio\n• Apresentação de projeto ou trabalho escrito\n• Peso: 10 pontos\n\nAvaliação formativa (10 pontos):\n• Participação nas atividades em sala\n• Entrega de atividades autodidáticas\n• Engajamento nas atividades cooperativas\n• Peso: 10 pontos`,
  };

  return sugestoes[campo] || `Conteúdo sugerido para o campo "${tituloCampo}" relacionado às habilidades ${habs} do ${trimestre} — ${serie}.`;
}

export default function GerarGEA() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { geaAtual, setGeaAtual, salvarGEA } = useGEAStore();

  const [status, setStatus] = useState<'idle' | 'gerando' | 'concluido' | 'erro'>('idle');
  const [campoAtual, setCampoAtual] = useState(0);
  const [erro, setErro] = useState('');
  const gerandoRef = useRef(false);

  const gerarTudo = async () => {
    if (!geaAtual || gerandoRef.current) return;
    gerandoRef.current = true;
    setStatus('gerando');
    setErro('');

    try {
      const conteudo: Partial<GEAConteudo> = {};
      const habilidades = [
        ...geaAtual.habilidadesSelecionadas,
        ...geaAtual.habilidadesPersonalizadas.map((h) => ({
          codigo: h.codigo,
          descricao: h.descricao,
          unidadeTematica: '',
          objetoConhecimento: h.objetoConhecimento,
          competencia: '',
        })),
      ];

      for (let i = 0; i < GEA_CAMPOS.length; i++) {
        setCampoAtual(i);
        const campo = GEA_CAMPOS[i];
        const texto = await gerarSugestoesLocais(
          geaAtual.identificacao as unknown as Record<string, string>,
          habilidades,
          campo.key,
          campo.titulo
        );
        conteudo[campo.key] = texto;
      }

      const geaAtualizado = {
        ...geaAtual,
        conteudo: conteudo as GEAConteudo,
        atualizadoEm: new Date().toISOString(),
      };
      setGeaAtual(geaAtualizado);
      salvarGEA(geaAtualizado);
      setStatus('concluido');
    } catch (e) {
      setErro(String(e));
      setStatus('erro');
    } finally {
      gerandoRef.current = false;
    }
  };

  useEffect(() => {
    gerarTudo();
  }, []);

  const progresso = status === 'concluido' ? 100 : Math.round((campoAtual / GEA_CAMPOS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerando GEA com IA</h1>
        <p className="text-gray-500 text-sm mt-1">
          Aguarde enquanto as sugestões são geradas para cada campo do documento.
        </p>
      </div>

      {/* Indicador de passos */}
      <div className="flex items-center gap-2 text-sm">
        {['Identificação', 'Habilidades', 'Gerar com IA', 'Editar'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              i < 2 ? 'bg-green-500 text-white' : i === 2 ? 'bg-primary-800 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i < 2 ? '✓' : i + 1}
            </div>
            <span className={i === 2 ? 'text-primary-800 font-medium' : i < 2 ? 'text-green-600' : 'text-gray-400'}>
              {step}
            </span>
            {i < 3 && <ArrowRight className="w-3 h-3 text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Card de progresso */}
      <div className="card p-8 text-center space-y-6">
        {/* Ícone animado */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mx-auto ${
          status === 'concluido' ? 'bg-green-100' : status === 'erro' ? 'bg-red-100' : 'bg-primary-100'
        }`}>
          {status === 'concluido' ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : status === 'erro' ? (
            <AlertCircle className="w-10 h-10 text-red-600" />
          ) : (
            <Sparkles className={`w-10 h-10 text-primary-700 ${status === 'gerando' ? 'animate-pulse' : ''}`} />
          )}
        </div>

        {/* Status */}
        {status === 'gerando' && (
          <>
            <div>
              <p className="font-semibold text-gray-800 text-lg">Gerando sugestões...</p>
              <p className="text-gray-500 text-sm mt-1">
                Campo {campoAtual + 1} de {GEA_CAMPOS.length}:{' '}
                <span className="font-medium text-primary-700">{GEA_CAMPOS[campoAtual]?.titulo}</span>
              </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{progresso}% concluído</p>
          </>
        )}

        {status === 'concluido' && (
          <>
            <div>
              <p className="font-semibold text-gray-800 text-lg">GEA gerado com sucesso!</p>
              <p className="text-gray-500 text-sm mt-1">
                Todos os 15 campos foram preenchidos com sugestões. Agora você pode editar e personalizar cada campo.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-50 rounded-xl p-3">
                <div className="text-2xl font-bold text-green-700">15</div>
                <div className="text-xs text-green-600">Campos gerados</div>
              </div>
              <div className="bg-primary-50 rounded-xl p-3">
                <div className="text-2xl font-bold text-primary-700">
                  {(geaAtual?.habilidadesSelecionadas.length ?? 0) + (geaAtual?.habilidadesPersonalizadas.length ?? 0)}
                </div>
                <div className="text-xs text-primary-600">Habilidades</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <div className="text-2xl font-bold text-amber-700">100%</div>
                <div className="text-xs text-amber-600">Concluído</div>
              </div>
            </div>
          </>
        )}

        {status === 'erro' && (
          <div>
            <p className="font-semibold text-red-700">Erro ao gerar sugestões</p>
            <p className="text-gray-500 text-sm mt-1">{erro}</p>
            <button onClick={gerarTudo} className="btn-primary mt-4">
              Tentar novamente
            </button>
          </div>
        )}
      </div>

      {/* Lista de campos */}
      {status !== 'idle' && (
        <div className="card p-5">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Campos do GEA</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {GEA_CAMPOS.map((campo, i) => {
              const concluido = status === 'concluido' || i < campoAtual;
              const atual = status === 'gerando' && i === campoAtual;
              return (
                <div
                  key={campo.key}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                    concluido ? 'bg-green-50 text-green-700' :
                    atual ? 'bg-primary-50 text-primary-700 animate-pulse' :
                    'bg-gray-50 text-gray-400'
                  }`}
                >
                  {concluido ? (
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : atual ? (
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 flex-shrink-0" />
                  )}
                  <span className="truncate">{campo.titulo}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Botões de navegação */}
      {status === 'concluido' && (
        <div className="flex justify-between">
          <button onClick={() => navigate(`/gea/habilidades/${id}`)} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <button onClick={() => navigate(`/gea/editor/${id}`)} className="btn-primary">
            Editar GEA
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

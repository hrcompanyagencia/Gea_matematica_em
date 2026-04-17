import type { GEAConteudo, GEAIdentificacao, HabilidadeRCA, HabilidadePersonalizada, GEACampo } from '../types/gea';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function formatarHabilidades(
  habilidades: HabilidadeRCA[],
  personalizadas: HabilidadePersonalizada[]
): string {
  const rca = habilidades.map((h) => `- ${h.codigo}: ${h.descricao}`).join('\n');
  const custom = personalizadas.map((h) => `- ${h.codigo}: ${h.descricao}`).join('\n');
  return [rca, custom].filter(Boolean).join('\n');
}

function formatarIdentificacao(id: GEAIdentificacao): string {
  return `Escola: ${id.escola}
Professor(a): ${id.professor}
Componente Curricular: ${id.componenteCurricular}
Série: ${id.serie}
Trimestre: ${id.trimestre}
Ano Letivo: ${id.anoLetivo}`;
}

export async function gerarTodosOsCampos(
  identificacao: GEAIdentificacao,
  habilidades: HabilidadeRCA[],
  habilidadesPersonalizadas: HabilidadePersonalizada[]
): Promise<Partial<GEAConteudo>> {
  const habilidadesTexto = formatarHabilidades(habilidades, habilidadesPersonalizadas);
  const identificacaoTexto = formatarIdentificacao(identificacao);

  const prompt = `Você é um Professor Especialista em Planejamento Educacional do Estado do Amapá, com larga experiência em elaboração de GEA (Guia de Ensino e Aprendizagem) seguindo o RCA (Referencial Curricular Amapaense) e a BNCC.

Dados do GEA:
${identificacaoTexto}

Habilidades selecionadas:
${habilidadesTexto}

Gere o conteúdo completo para todos os 15 campos do GEA em português brasileiro, claro, pedagógico e pronto para uso em documento oficial. Retorne APENAS um JSON válido com as seguintes chaves:

{
  "justificativa": "...",
  "habilidadesEspecificas": "...",
  "conhecimentosPrevios": "...",
  "objetosConhecimento": "...",
  "atividadesAutodidaticas": "...",
  "atividadesDidaticoCooperativas": "...",
  "espacosEducativos": "...",
  "teoriaEtica": "...",
  "fontesReferencias": "...",
  "eletivas": "...",
  "recursosDidaticos": "...",
  "culturaDigital": "...",
  "projetosIntegradoresI": "...",
  "projetosIntegradoresII": "...",
  "criteriosAvaliacao": "..."
}`;

  const response = await fetch(`${API_BASE}/gea/gerar-todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao gerar conteúdo: ${response.statusText}`);
  }

  const data = await response.json();
  return data.conteudo as Partial<GEAConteudo>;
}

export async function gerarCampo(
  campo: GEACampo,
  tituloCampo: string,
  identificacao: GEAIdentificacao,
  habilidades: HabilidadeRCA[],
  habilidadesPersonalizadas: HabilidadePersonalizada[]
): Promise<string> {
  const habilidadesTexto = formatarHabilidades(habilidades, habilidadesPersonalizadas);
  const identificacaoTexto = formatarIdentificacao(identificacao);

  const prompt = `Você é um Professor Especialista em Planejamento Educacional do Estado do Amapá, com larga experiência em elaboração de GEA seguindo o RCA e a BNCC.

Dados do GEA:
${identificacaoTexto}

Habilidades selecionadas:
${habilidadesTexto}

Gere o conteúdo para o campo "${tituloCampo}" do GEA em português brasileiro, claro, pedagógico e pronto para uso em documento oficial. Retorne apenas o texto do campo, sem formatação JSON.`;

  const response = await fetch(`${API_BASE}/gea/gerar-campo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, campo }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao gerar campo: ${response.statusText}`);
  }

  const data = await response.json();
  return data.conteudo as string;
}

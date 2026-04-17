// ============================================================
// Tipos do GEA — Guia de Ensino e Aprendizagem
// ============================================================

export interface HabilidadeRCA {
  codigo: string;
  descricao: string;
  unidadeTematica: string;
  objetoConhecimento: string;
  competencia: string;
}

export interface HabilidadePersonalizada {
  id: string;
  codigo: string;
  descricao: string;
  objetoConhecimento: string;
}

export interface GEAIdentificacao {
  escola: string;
  professor: string;
  componenteCurricular: string;
  serie: string;
  trimestre: string;
  anoLetivo: string;
}

export interface GEAConteudo {
  justificativa: string;
  habilidadesEspecificas: string;
  conhecimentosPrevios: string;
  objetosConhecimento: string;
  atividadesAutodidaticas: string;
  atividadesDidaticoCooperativas: string;
  espacosEducativos: string;
  teoriaEtica: string;
  fontesReferencias: string;
  eletivas: string;
  recursosDidaticos: string;
  culturaDigital: string;
  projetosIntegradoresI: string;
  projetosIntegradoresII: string;
  criteriosAvaliacao: string;
}

export interface GEA {
  id: string;
  identificacao: GEAIdentificacao;
  habilidadesSelecionadas: HabilidadeRCA[];
  habilidadesPersonalizadas: HabilidadePersonalizada[];
  conteudo: GEAConteudo;
  criadoEm: string;
  atualizadoEm: string;
}

export type GEACampo = keyof GEAConteudo;

export interface GEACampoInfo {
  key: GEACampo;
  titulo: string;
  descricao: string;
  placeholder: string;
}

export const GEA_CAMPOS: GEACampoInfo[] = [
  {
    key: 'justificativa',
    titulo: 'Justificativa',
    descricao: 'Por que estudar as habilidades específicas deste trimestre',
    placeholder: 'Descreva a importância de estudar os conteúdos deste guia...',
  },
  {
    key: 'habilidadesEspecificas',
    titulo: 'Habilidades Específicas BNCC e RCA',
    descricao: 'Habilidades com códigos do Referencial Curricular Amapaense',
    placeholder: 'Liste as habilidades com seus respectivos códigos...',
  },
  {
    key: 'conhecimentosPrevios',
    titulo: 'Conhecimentos Prévios',
    descricao: 'Conhecimentos que o aluno deveria dominar antes deste GEA',
    placeholder: 'Liste os conhecimentos prévios necessários...',
  },
  {
    key: 'objetosConhecimento',
    titulo: 'Objetos de Conhecimento',
    descricao: 'Conteúdos vinculados às habilidades específicas',
    placeholder: 'Liste os objetos de conhecimento...',
  },
  {
    key: 'atividadesAutodidaticas',
    titulo: 'Atividades Autodidáticas',
    descricao: 'Atividades que o aluno pode desenvolver sozinho',
    placeholder: 'Liste atividades individuais para dentro e fora de sala...',
  },
  {
    key: 'atividadesDidaticoCooperativas',
    titulo: 'Atividades Didático-Cooperativas',
    descricao: 'Atividades em dupla ou grupo',
    placeholder: 'Liste atividades colaborativas para dentro e fora de sala...',
  },
  {
    key: 'espacosEducativos',
    titulo: 'Espaços Educativos',
    descricao: 'Espaços da escola a serem utilizados',
    placeholder: 'Liste os espaços educativos que serão utilizados...',
  },
  {
    key: 'teoriaEtica',
    titulo: 'Teoria e Prática de Ética e Projeto de Vida',
    descricao: 'Contribuição para formação ética e projeto de vida',
    placeholder: 'Descreva como os conteúdos contribuem para a formação ética...',
  },
  {
    key: 'fontesReferencias',
    titulo: 'Fontes e Referências',
    descricao: 'Bibliografia usada e necessária para estudo',
    placeholder: 'Liste as referências bibliográficas...',
  },
  {
    key: 'eletivas',
    titulo: 'Eletivas',
    descricao: 'Como os conteúdos podem ser usados em oficinas de aprofundamento',
    placeholder: 'Descreva possibilidades de eletivas relacionadas...',
  },
  {
    key: 'recursosDidaticos',
    titulo: 'Recursos Didáticos',
    descricao: 'Recursos necessários para execução do GEA',
    placeholder: 'Liste os recursos didáticos necessários...',
  },
  {
    key: 'culturaDigital',
    titulo: 'Cultura Digital',
    descricao: 'Contribuição para atividades ligadas à cultura digital',
    placeholder: 'Descreva como os conteúdos se relacionam com a cultura digital...',
  },
  {
    key: 'projetosIntegradoresI',
    titulo: 'Projetos Integradores I — Humanas e Natureza',
    descricao: 'Integração com disciplinas de Humanas e Ciências da Natureza',
    placeholder: 'Descreva como os conteúdos se integram com Humanas e Natureza...',
  },
  {
    key: 'projetosIntegradoresII',
    titulo: 'Projetos Integradores II — Linguagens e Matemática',
    descricao: 'Integração com disciplinas de Linguagens e Matemática',
    placeholder: 'Descreva como os conteúdos se integram com Linguagens e Matemática...',
  },
  {
    key: 'criteriosAvaliacao',
    titulo: 'Critérios de Avaliação',
    descricao: 'Avaliação objetiva (10 pts), dissertativa (10 pts) e formativa (10 pts)',
    placeholder: 'Descreva os critérios de avaliação...',
  },
];

export const SERIES_OPTIONS = ['1º Ano', '2º Ano', '3º Ano'];
export const TRIMESTRE_OPTIONS = ['1º Trimestre', '2º Trimestre', '3º Trimestre'];

export function criarGEAVazio(identificacao: GEAIdentificacao): GEA {
  return {
    id: crypto.randomUUID(),
    identificacao,
    habilidadesSelecionadas: [],
    habilidadesPersonalizadas: [],
    conteudo: {
      justificativa: '',
      habilidadesEspecificas: '',
      conhecimentosPrevios: '',
      objetosConhecimento: '',
      atividadesAutodidaticas: '',
      atividadesDidaticoCooperativas: '',
      espacosEducativos: '',
      teoriaEtica: '',
      fontesReferencias: '',
      eletivas: '',
      recursosDidaticos: '',
      culturaDigital: '',
      projetosIntegradoresI: '',
      projetosIntegradoresII: '',
      criteriosAvaliacao: '',
    },
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  };
}

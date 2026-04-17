<div align="center">
  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663319298144/ViXMJTCDCXMX73ShCryogu/gea-web-icon-TorPsFxpspFEAhj7vMTNLd.webp" alt="GEA Matemática" width="120" />

  <h1>GEA Matemática</h1>

  <p><strong>Plataforma web para elaboração de Guias de Ensino e Aprendizagem de Matemática</strong><br/>
  Secretaria de Estado da Educação do Amapá — SEED-AP · Ensino Médio</p>

  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
  ![Zustand](https://img.shields.io/badge/Zustand-5-FF6B35)
  ![License](https://img.shields.io/badge/Licença-MIT-green)
</div>

---

## Sobre o Projeto

O **GEA Matemática** é uma plataforma web desenvolvida para apoiar professores de Matemática do Ensino Médio da rede estadual do Amapá na elaboração dos **Guias de Ensino e Aprendizagem (GEA)**, documentos pedagógicos exigidos pela Secretaria de Estado da Educação do Amapá (SEED-AP) e alinhados ao **Referencial Curricular Amapaense (RCA)** e à **Base Nacional Comum Curricular (BNCC)**.

A plataforma integra um banco de habilidades do RCA de Matemática e um assistente de inteligência artificial que gera automaticamente sugestões para os 15 campos obrigatórios do GEA, permitindo que o professor revise, edite e personalize cada campo antes de exportar o documento final em PDF diretamente pelo navegador.

## Funcionalidades

O fluxo de trabalho da plataforma é organizado em quatro etapas sequenciais:

| Etapa | Tela | Descrição |
|-------|------|-----------|
| 1 | **Identificação** | Preenchimento dos dados da escola, professor, série (1º, 2º ou 3º ano), trimestre e ano letivo |
| 2 | **Habilidades** | Seleção de habilidades do banco RCA com busca por texto, filtro por unidade temática e adição de habilidades personalizadas |
| 3 | **Geração por IA** | Geração automática dos 15 campos do GEA via assistente de IA, com barra de progresso em tempo real |
| 4 | **Edição e Exportação** | Editor completo com regeneração individual de cada campo e visualização formatada para impressão em PDF |

Além do fluxo principal, a tela inicial exibe todos os GEAs salvos com busca por nome, escola ou professor, e permite excluir documentos existentes. Todos os dados são persistidos localmente no navegador via `localStorage`.

## Campos do GEA Gerados pela IA

O assistente de IA preenche automaticamente os seguintes 15 campos obrigatórios do GEA, com base nas habilidades RCA selecionadas e nos dados de identificação:

| # | Campo | Descrição |
|---|-------|-----------|
| 1 | Justificativa | Relevância do estudo das habilidades no trimestre |
| 2 | Habilidades Específicas BNCC e RCA | Habilidades com códigos do Referencial Curricular Amapaense |
| 3 | Conhecimentos Prévios | Pré-requisitos que o aluno deve dominar |
| 4 | Objetos de Conhecimento | Conteúdos vinculados às habilidades |
| 5 | Atividades Autodidáticas | Atividades individuais para dentro e fora de sala |
| 6 | Atividades Didático-Cooperativas | Atividades em dupla ou grupo |
| 7 | Espaços Educativos | Espaços da escola a serem utilizados |
| 8 | Teoria e Prática de Ética e Projeto de Vida | Contribuição para a formação ética |
| 9 | Fontes e Referências | Bibliografia utilizada e recomendada |
| 10 | Eletivas | Possibilidades de aprofundamento em oficinas |
| 11 | Recursos Didáticos | Materiais necessários para execução do GEA |
| 12 | Cultura Digital | Relação dos conteúdos com tecnologia e cultura digital |
| 13 | Projetos Integradores I | Integração com Humanas e Ciências da Natureza |
| 14 | Projetos Integradores II | Integração com Linguagens e Matemática |
| 15 | Critérios de Avaliação | Avaliação objetiva, dissertativa e formativa (10 pts cada) |

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| [React](https://react.dev) | 19 | Interface de usuário |
| [Vite](https://vite.dev) | 8 | Bundler e servidor de desenvolvimento |
| [TypeScript](https://www.typescriptlang.org) | 6 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Estilização utilitária |
| [React Router](https://reactrouter.com) | 7 | Roteamento client-side |
| [Zustand](https://zustand-demo.pmnd.rs) | 5 | Gerenciamento de estado global com persistência |
| [Lucide React](https://lucide.dev) | — | Ícones SVG |
| [Axios](https://axios-http.com) | — | Requisições HTTP para o backend de IA |
| [TanStack Query](https://tanstack.com/query) | 5 | Cache e sincronização de dados assíncronos |

A exportação para PDF é realizada nativamente pelo navegador via `window.print()`, com folha de estilos CSS de impressão dedicada (`src/print.css`) que formata o documento com cabeçalho institucional, tabela de identificação e todos os campos do GEA em layout adequado para impressão em papel A4.

## Pré-requisitos

Para executar o projeto localmente, você precisará de:

- [Node.js](https://nodejs.org) versão 18 ou superior
- [npm](https://www.npmjs.com) versão 9 ou superior (ou `yarn` / `pnpm`)
- Acesso a um endpoint de API compatível com o serviço de geração de sugestões por IA (configurável em `src/services/geaApi.ts`)

## Instalação e Execução

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/gea-matematica-web.git
cd gea-matematica-web
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`. Para acessar a plataforma, utilize as credenciais de demonstração:

- **E-mail:** `professor@seed.ap.gov.br`
- **Senha:** `gea2024`

Para gerar o build de produção otimizado:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/` e podem ser servidos por qualquer servidor HTTP estático (Nginx, Apache, Vercel, Netlify, GitHub Pages, etc.).

## Estrutura do Projeto

```
gea-matematica-web/
├── public/
│   └── favicon.png              # Ícone do app
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Navbar, footer e estrutura principal
│   │   └── ProtectedRoute.tsx   # Guarda de rota autenticada
│   ├── data/
│   │   └── rca-habilidades.ts   # Banco de habilidades RCA (50+ habilidades)
│   ├── lib/
│   │   └── utils.ts             # Utilitário cn() para classes CSS
│   ├── pages/
│   │   ├── Login.tsx            # Tela de autenticação
│   │   ├── Home.tsx             # Lista de GEAs salvos
│   │   ├── NovoGEA.tsx          # Formulário de identificação
│   │   ├── SelecionarHabilidades.tsx  # Banco RCA + habilidades personalizadas
│   │   ├── GerarGEA.tsx         # Geração automática por IA
│   │   ├── EditorGEA.tsx        # Editor completo dos 15 campos
│   │   └── PreviewGEA.tsx       # Visualização e exportação PDF
│   ├── services/
│   │   └── geaApi.ts            # Integração com API de IA
│   ├── store/
│   │   └── useGEAStore.ts       # Estado global (Zustand + localStorage)
│   ├── types/
│   │   └── gea.ts               # Tipos TypeScript e constantes do GEA
│   ├── App.tsx                  # Roteamento principal
│   ├── index.css                # Estilos globais e classes utilitárias
│   ├── main.tsx                 # Ponto de entrada da aplicação
│   └── print.css                # Estilos de impressão para exportação PDF
├── index.html                   # HTML base com metadados e fontes
├── tailwind.config.js           # Configuração do Tailwind com paleta SEED-AP
├── vite.config.ts               # Configuração do Vite
├── tsconfig.json                # Configuração do TypeScript
└── package.json                 # Dependências e scripts
```

## Configuração da API de IA

O serviço de geração de sugestões está configurado em `src/services/geaApi.ts`. Por padrão, o app consome um endpoint de LLM compatível com a API do servidor backend. Para apontar para um endpoint diferente, edite a constante `API_BASE_URL` no arquivo de serviço:

```typescript
// src/services/geaApi.ts
const API_BASE_URL = 'http://localhost:3000'; // altere conforme necessário
```

O payload enviado ao endpoint inclui os dados de identificação do GEA, as habilidades RCA selecionadas e o campo específico a ser gerado, permitindo regeneração individual de cada seção do documento.

## Exportação em PDF

Na tela de **Visualização do GEA**, clique em **"Imprimir / Salvar PDF"**. No diálogo de impressão do navegador, selecione **"Salvar como PDF"** como destino de impressão. O documento é formatado automaticamente para papel A4 com:

- Cabeçalho institucional com nome da escola, professor, série, trimestre e ano letivo
- Tabela de identificação completa
- Lista de habilidades RCA selecionadas com códigos BNCC
- Todos os 15 campos do GEA em layout de tabela

Recomenda-se usar o Google Chrome ou Microsoft Edge para melhor fidelidade na geração do PDF.

## Hospedagem

O projeto é uma aplicação React estática (SPA) e pode ser hospedado gratuitamente em:

- **[Vercel](https://vercel.com)** — recomendado; suporta SPA com roteamento client-side automaticamente
- **[Netlify](https://netlify.com)** — requer arquivo `_redirects` com `/* /index.html 200`
- **[GitHub Pages](https://pages.github.com)** — requer configuração de `base` no `vite.config.ts`

## Contribuição

Contribuições são bem-vindas. Para propor melhorias ou reportar problemas, abra uma _issue_ ou envie um _pull request_ com a descrição detalhada da mudança proposta.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Consulte o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <sub>Desenvolvido para a Secretaria de Estado da Educação do Amapá (SEED-AP) · Ensino Médio · Matemática</sub>
</div>

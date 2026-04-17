# GEA Matemática Web — TODO

## Concluído

- [x] Inicializar projeto React + Vite + TypeScript + Tailwind CSS
- [x] Configurar tema de cores educacional (azul primário SEED-AP)
- [x] Criar tipos TypeScript do GEA (campos, habilidades, usuário)
- [x] Criar banco de habilidades RCA de Matemática EM (50+ habilidades com códigos BNCC)
- [x] Criar store Zustand com persistência (AsyncStorage-like via localStorage)
- [x] Criar serviço de API para geração de sugestões via LLM do backend
- [x] Tela de Login com e-mail institucional e senha
- [x] Componente Layout com navbar responsiva e footer
- [x] Componente ProtectedRoute para rotas autenticadas
- [x] Tela Home com lista de GEAs salvos, busca e filtros
- [x] Tela Novo GEA — formulário de identificação (escola, professor, série, trimestre, ano)
- [x] Tela Selecionar Habilidades — banco RCA com busca, filtro por categoria e habilidades personalizadas
- [x] Tela Gerar com IA — geração automática dos 15 campos do GEA com progresso em tempo real
- [x] Tela Editor GEA — edição de todos os campos com regeneração individual por IA
- [x] Tela Preview GEA — visualização formatada do GEA com exportação para PDF via impressão do navegador
- [x] Exportação PDF direta no navegador (window.print() com CSS de impressão)
- [x] Gerar logo do app (livro com símbolos matemáticos, fundo azul escuro)
- [x] Integrar logo na tela de Login e na navbar
- [x] Configurar favicon, título e metadados OG no index.html
- [x] Build de produção sem erros TypeScript
- [x] Configurar allowedHosts no Vite para acesso externo via proxy

## Melhorias futuras sugeridas

- [ ] Autenticação real via backend (OAuth ou JWT com banco de dados)
- [ ] Sincronização de GEAs entre dispositivos via backend
- [ ] Filtro de habilidades por série (1º, 2º, 3º ano)
- [ ] Duplicar GEA existente para reutilizar estrutura
- [ ] Exportação direta como arquivo PDF (sem diálogo de impressão)
- [ ] Histórico de versões de cada GEA
- [ ] Modo de colaboração entre professores

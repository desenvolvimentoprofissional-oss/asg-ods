# Relatório Oficial de Conformidade das Métricas do AGENTS.MD

**Data da Auditoria:** 2026-10-13  
**Status:** 100% HOMOLOGADO E CONFORME (AUTO-AUDITADO)  
**Escopo Total Inspecionado:** 90 arquivos (aplicação, testes e scripts)  
**Membros Executáveis Avaliados:** 482  

## 1. Matriz de Conformidade Normativa

| Critério Normativo (AGENTS.md) | Limite Regulamentar | Valor Máximo Encontrado | Veredito |
|---|---|---|---|
| Linhas por Arquivo (§ 25.1 / § 25.2) | ≤ 250 linhas | **246 linhas** (tests/leads.test.ts (246 linhas)) | **APROVADO (PASS)** |
| Comprimento de Linha (§ 25.9) | ≤ 120 caracteres | **118 caracteres** (scripts/metrics-ast.ts:122 (118 chars)) | **APROVADO (PASS)** |
| Físicas por Função (§ 25.6) | ≤ 40 linhas | **38 linhas** (Teto) | **APROVADO (PASS)** |
| Lógicas por Função (§ 25.6) | ≤ 25 linhas | **25 linhas** (Teto) | **APROVADO (PASS)** |
| Complexidade Ciclomática (§ 25.3) | CC ≤ 7 | **CC = 7** (Teto) | **APROVADO (PASS)** |
| Complexidade Cognitiva (§ 25.4) | ≤ 15 | **Cog = 9** (Teto) | **APROVADO (PASS)** |
| Profundidade de Aninhamento (§ 25.5) | ≤ 3 níveis | **≤ 3 níveis** (Teto) | **APROVADO (PASS)** |

## 2. Metodologia Sintática e Autoauditoria dos Scripts

- **Autoauditoria dos Scripts**: Os próprios utilitários (`scripts/*.ts`) são auditados.
- **AST Oficial TypeScript**: Análise via TypeScript Compiler API (`typescript`).
- **Detecção de Exceção Declarativa (§ 25.2)**: Validação AST de nós imperativos.
- **Isolamento de Funções Internas**: Closures e callbacks com escopo próprio.
- **Contagem de Linhas de Lógica**: Exclusão de assinaturas, chaves isoladas e comentários.
- **Complexidade Cognitiva SonarSource**: Especificação canônica testada.

## 3. Livro-Razão das Funções de Maior Complexidade

| Arquivo | Função / Componente | Linha | Físicas | Lógicas | CC | Cognitiva | Status |
|---|---|---|---|---|---|---|---|
| `scripts/generate-codigofonte.ts` | `collectDirectoryFiles` | 43 | 19 | 12 | 7 | 9 | CONFORME |
| `server.ts` | `readFirebaseConfig` | 18 | 17 | 12 | 7 | 5 | CONFORME |
| `src/components/presentation/PresentationMode.tsx` | `isInputFocused` | 23 | 13 | 10 | 7 | 2 | CONFORME |
| `src/api/leadsService.ts` | `validateLeadResponse` | 18 | 10 | 6 | 7 | 7 | CONFORME |
| `server.ts` | `executeLeadCreation` | 131 | 28 | 20 | 6 | 5 | CONFORME |
| `scripts/metrics-runner.ts` | `evaluateFunctionNode` | 84 | 25 | 15 | 6 | 5 | CONFORME |
| `src/server/leadBucketService.ts` | `writeLeadToBucket` | 125 | 27 | 15 | 6 | 6 | CONFORME |
| `server.ts` | `rateLimiter` | 100 | 22 | 14 | 6 | 4 | CONFORME |
| `scripts/metrics-ast.ts` | `visit` | 134 | 19 | 12 | 6 | 5 | CONFORME |
| `src/components/presentation/PresentationMode.tsx` | `handleKeyDown` | 74 | 14 | 11 | 6 | 5 | CONFORME |
| `scripts/metrics-ast.ts` | `checkNesting` | 197 | 17 | 7 | 6 | 5 | CONFORME |
| `src/components/interest/useInterestForm.ts` | `isFormValid` | 30 | 10 | 7 | 6 | 1 | CONFORME |
| `scripts/metrics-ast.ts` | `visit` | 85 | 9 | 6 | 6 | 5 | CONFORME |
| `scripts/metrics-runner.ts` | `getNodeName` | 46 | 8 | 5 | 6 | 4 | CONFORME |
| `src/components/layout/PrivacyDialog.tsx` | `anonymous` | 82 | 6 | 5 | 6 | 5 | CONFORME |
| `src/server/leadBucketService.ts` | `anonymous` | 98 | 25 | 17 | 5 | 4 | CONFORME |
| `src/server/vaultService.ts` | `decryptVaultField` | 21 | 14 | 11 | 5 | 4 | CONFORME |
| `scripts/metrics-runner.ts` | `walkDirectory` | 31 | 14 | 10 | 5 | 7 | CONFORME |
| `server.ts` | `handleJsonSyntaxError` | 59 | 13 | 9 | 5 | 3 | CONFORME |
| `scripts/generate-codigofonte.ts` | `getProjectFiles` | 63 | 17 | 8 | 5 | 6 | CONFORME |
| `server.ts` | `initFirestoreInstance` | 36 | 10 | 7 | 5 | 4 | CONFORME |
| `src/components/interest/interestFormUtils.ts` | `formatPhone` | 14 | 9 | 6 | 5 | 5 | CONFORME |
| `src/server/securityHeaders.ts` | `anonymous` | 84 | 8 | 5 | 5 | 6 | CONFORME |
| `scripts/metrics-runner.ts` | `validateFunctionLimits` | 55 | 12 | 4 | 5 | 4 | CONFORME |
| `scripts/metrics-ast.ts` | `isSkippableLogicLine` | 174 | 5 | 3 | 5 | 4 | CONFORME |
| `src/components/home/FaqAccordion.tsx` | `FaqAccordion` | 84 | 30 | 21 | 4 | 3 | CONFORME |
| `src/components/layout/HeaderMobileMenu.tsx` | `MobileMenuItem` | 9 | 32 | 20 | 4 | 4 | CONFORME |
| `src/components/layout/HeaderDesktopNav.tsx` | `anonymous` | 9 | 22 | 18 | 4 | 4 | CONFORME |
| `scripts/metrics-runner.ts` | `auditFile` | 110 | 19 | 13 | 4 | 3 | CONFORME |
| `src/components/presentation/useSignatoriesCarousel.ts` | `anonymous` | 91 | 12 | 11 | 4 | 3 | CONFORME |

---
*Relatório gerado automaticamente por `scripts/check-metrics.ts`.*

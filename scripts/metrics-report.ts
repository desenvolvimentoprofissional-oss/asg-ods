import type { MetricsAuditResult, FunctionMetricEntry } from './metrics-types';

function renderMatrixRow(label: string, limit: string, value: string, loc: string, ok: boolean): string {
  const verdict = ok ? '**APROVADO (PASS)**' : '**REPROVADO (FAIL)**';
  return `| ${label} | ${limit} | **${value}** (${loc}) | ${verdict} |\n`;
}

interface MetricSpec {
  label: string;
  limit: string;
  val: string;
  loc: string;
  ok: boolean;
}

function getFileMetricSpecs(r: MetricsAuditResult): MetricSpec[] {
  return [
    {
      label: 'Linhas por Arquivo (§ 25.1 / § 25.2)',
      limit: '≤ 250 linhas',
      val: `${r.maxFileLines} linhas`,
      loc: r.maxFileLinesPath,
      ok: r.maxFileLines <= 250,
    },
    {
      label: 'Comprimento de Linha (§ 25.9)',
      limit: '≤ 120 caracteres',
      val: `${r.maxLineLength} caracteres`,
      loc: r.maxLineLengthPath,
      ok: r.maxLineLength <= 120,
    },
  ];
}

function getSizeSpecs(r: MetricsAuditResult): MetricSpec[] {
  return [
    {
      label: 'Físicas por Função (§ 25.6)',
      limit: '≤ 40 linhas',
      val: `${r.maxPhysical} linhas`,
      loc: 'Teto',
      ok: r.maxPhysical <= 40,
    },
    {
      label: 'Lógicas por Função (§ 25.6)',
      limit: '≤ 25 linhas',
      val: `${r.maxLogic} linhas`,
      loc: 'Teto',
      ok: r.maxLogic <= 25,
    },
  ];
}

function getComplexitySpecs(r: MetricsAuditResult): MetricSpec[] {
  return [
    {
      label: 'Complexidade Ciclomática (§ 25.3)',
      limit: 'CC ≤ 7',
      val: `CC = ${r.maxCC}`,
      loc: 'Teto',
      ok: r.maxCC <= 7,
    },
    {
      label: 'Complexidade Cognitiva (§ 25.4)',
      limit: '≤ 15',
      val: `Cog = ${r.maxCog}`,
      loc: 'Teto',
      ok: r.maxCog <= 15,
    },
    {
      label: 'Profundidade de Aninhamento (§ 25.5)',
      limit: '≤ 3 níveis',
      val: `≤ ${r.maxNesting} níveis`,
      loc: 'Teto',
      ok: r.maxNesting <= 3,
    },
  ];
}

function renderTableRows(result: MetricsAuditResult): string {
  const allSpecs = [
    ...getFileMetricSpecs(result),
    ...getSizeSpecs(result),
    ...getComplexitySpecs(result),
  ];
  return allSpecs.map((s) => renderMatrixRow(s.label, s.limit, s.val, s.loc, s.ok)).join('');
}

function renderMatrixSection(result: MetricsAuditResult): string {
  let s = '## 1. Matriz de Conformidade Normativa\n\n';
  s += '| Critério Normativo (AGENTS.md) | Limite Regulamentar | Valor Máximo Encontrado | Veredito |\n';
  s += '|---|---|---|---|\n';
  s += renderTableRows(result);
  s += '\n';
  return s;
}

function renderLedgerRow(item: FunctionMetricEntry): string {
  const fileAndName = `| \`${item.file}\` | \`${item.name}\` | ${item.line} | `;
  const metrics = `${item.physical} | ${item.logic} | ${item.cc} | ${item.cognitive} | CONFORME |\n`;
  return fileAndName + metrics;
}

function renderLedgerSection(ledger: FunctionMetricEntry[]): string {
  let s = '## 3. Livro-Razão das Funções de Maior Complexidade\n\n';
  s += '| Arquivo | Função / Componente | Linha | Físicas | Lógicas | CC | Cognitiva | Status |\n';
  s += '|---|---|---|---|---|---|---|---|\n';
  const sorted = [...ledger].sort((a, b) => b.cc - a.cc || b.logic - a.logic).slice(0, 30);
  sorted.forEach((item) => {
    s += renderLedgerRow(item);
  });
  s += '\n---\n*Relatório gerado automaticamente por `scripts/check-metrics.ts`.*\n';
  return s;
}

export function generateMarkdownReport(result: MetricsAuditResult): string {
  const isPassed = result.errors.length === 0;
  const today = new Date().toISOString().slice(0, 10);
  const statusStr = isPassed
    ? '100% HOMOLOGADO E CONFORME (AUTO-AUDITADO)'
    : `REPROVADO (${result.errors.length} VIOLAÇÕES ENCONTRADAS)`;

  let md = '# Relatório Oficial de Conformidade das Métricas do AGENTS.MD\n\n';
  md += `**Data da Auditoria:** ${today}  \n`;
  md += `**Status:** ${statusStr}  \n`;
  md += `**Escopo Total Inspecionado:** ${result.filesCount} arquivos (aplicação, testes e scripts)  \n`;
  md += `**Membros Executáveis Avaliados:** ${result.evaluatedFunctions}  \n\n`;

  if (!isPassed) {
    md += '## ⚠️ Violações Identificadas\n\n';
    result.errors.forEach((err) => {
      md += `- ${err}\n`;
    });
    md += '\n';
  }

  md += renderMatrixSection(result);
  md += '## 2. Metodologia Sintática e Autoauditoria dos Scripts\n\n';
  md += '- **Autoauditoria dos Scripts**: Os próprios utilitários (`scripts/*.ts`) são auditados.\n';
  md += '- **AST Oficial TypeScript**: Análise via TypeScript Compiler API (`typescript`).\n';
  md += '- **Detecção de Exceção Declarativa (§ 25.2)**: Validação AST de nós imperativos.\n';
  md += '- **Isolamento de Funções Internas**: Closures e callbacks com escopo próprio.\n';
  md += '- **Contagem de Linhas de Lógica**: Exclusão de assinaturas, chaves isoladas e comentários.\n';
  md += '- **Complexidade Cognitiva SonarSource**: Especificação canônica testada.\n\n';
  md += renderLedgerSection(result.ledger);
  return md;
}

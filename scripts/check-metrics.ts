import fs from 'node:fs';
import { runMetricsAudit } from './metrics-runner';
import { generateMarkdownReport } from './metrics-report';

export function main() {
  const auditResult = runMetricsAudit();
  fs.writeFileSync('RELATORIO-CONFORMIDADE-METRICAS.md', generateMarkdownReport(auditResult), 'utf8');

  if (auditResult.errors.length > 0) {
    console.error(
      `\x1b[31mFalha na verificação normativa de métricas AGENTS.md (${auditResult.errors.length} erros):\x1b[0m`
    );
    auditResult.errors.forEach((e) => console.error('  - ' + e));
    process.exit(1);
  }

  console.log('\x1b[32m=== AUDITORIA DE MÉTRICAS AGENTS.MD (100% HOMOLOGADA) ===\x1b[0m');
  console.log(`Arquivos verificados (incluindo scripts): ${auditResult.filesCount}`);
  console.log(`Funções/métodos/membros executáveis avaliados: ${auditResult.evaluatedFunctions}`);
  console.log(`  [PASS] Limite de arquivo: ≤ 250 linhas (Máximo: ${auditResult.maxFileLinesPath})`);
  console.log(`  [PASS] Comprimento de linha: ≤ 120 caracteres (Máximo: ${auditResult.maxLineLengthPath})`);
  console.log(`  [PASS] Tamanho físico de função: ≤ 40 linhas (Máximo: ${auditResult.maxPhysical})`);
  console.log(`  [PASS] Tamanho lógico de função: ≤ 25 linhas (Máximo: ${auditResult.maxLogic})`);
  console.log(`  [PASS] Complexidade Ciclomática (CC): ≤ 7 (Máximo: ${auditResult.maxCC})`);
  console.log(`  [PASS] Complexidade Cognitiva: ≤ 15 (Máximo: ${auditResult.maxCog})`);
  console.log('  [PASS] Profundidade de aninhamento: ≤ 3 níveis');
  console.log('Relatório gravado com sucesso em: RELATORIO-CONFORMIDADE-METRICAS.md');
}

main();

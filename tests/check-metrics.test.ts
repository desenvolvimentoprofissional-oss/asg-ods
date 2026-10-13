import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import {
  isDeclarativeAST,
  getCyclomaticComplexity,
  getCognitiveComplexity,
  getLogicLines,
} from '../scripts/metrics-ast';
import { runMetricsAudit } from '../scripts/metrics-runner';

describe('1. Validação Declarativa AST', () => {
  it('deve identificar arquivos puramente declarativos sem construções imperativas', () => {
    const declCode = 'export const CONFIG = { a: 1 }; export type MyType = { id: string };';
    const sfDecl = ts.createSourceFile('decl.ts', declCode, ts.ScriptTarget.Latest, true);
    expect(isDeclarativeAST(sfDecl)).toBe(true);

    const imperCode = 'export function calc(x: number) { if (x > 0) return x * 2; return 0; }';
    const sfImper = ts.createSourceFile('imper.ts', imperCode, ts.ScriptTarget.Latest, true);
    expect(isDeclarativeAST(sfImper)).toBe(false);
  });
});

describe('2. Validação CC com Isolamento', () => {
  it('deve calcular CC isolando estritamente funções internas', () => {
    const code =
      'export function outer() {\n' +
      '  const inner = (x: number) => { if (x > 10) return 1; return 2; };\n' +
      '  return inner(1);\n' +
      '}';
    const sf = ts.createSourceFile('cc.ts', code, ts.ScriptTarget.Latest, true);
    const outerFn = sf.statements[0] as ts.FunctionDeclaration;
    expect(getCyclomaticComplexity(outerFn)).toBe(1);
  });
});

describe('3. Validação Complexidade Cognitiva', () => {
  it('deve calcular Complexidade Cognitiva de acordo com SonarSource White Paper', () => {
    const code =
      'function sample(a: boolean, b: boolean, c: boolean, n: number) {\n' +
      '  if (a && b || c) { for (let i = 0; i < n; i++) {} }\n' +
      '}';
    const sf = ts.createSourceFile('cog.ts', code, ts.ScriptTarget.Latest, true);
    const fn = sf.statements[0] as ts.FunctionDeclaration;
    expect(getCognitiveComplexity(fn)).toBe(5);
  });
});

describe('4. Validação Linhas de Lógica', () => {
  it('deve calcular linhas de lógica desconsiderando assinaturas multiline e chaves isoladas', () => {
    const code =
      'export function fn(a: string, b: number): boolean {\n' +
      '  // comment\n' +
      '  const x = a.trim();\n' +
      '  return x.length > b;\n' +
      '}';
    const sf = ts.createSourceFile('logic.ts', code, ts.ScriptTarget.Latest, true);
    const fn = sf.statements[0] as ts.FunctionDeclaration;
    expect(getLogicLines(fn, sf)).toBe(2);
  });
});

describe('5. Auditoria Integral do Repositório (Incluindo Scripts)', () => {
  it('deve certificar que 100% dos arquivos e funções atendem aos limites do AGENTS.MD', () => {
    const audit = runMetricsAudit();
    expect(audit.errors).toHaveLength(0);
    expect(audit.evaluatedFunctions).toBeGreaterThanOrEqual(300);
    expect(audit.maxFileLines).toBeLessThanOrEqual(250);
    expect(audit.maxLineLength).toBeLessThanOrEqual(120);
    expect(audit.maxPhysical).toBeLessThanOrEqual(40);
    expect(audit.maxLogic).toBeLessThanOrEqual(25);
    expect(audit.maxCC).toBeLessThanOrEqual(7);
    expect(audit.maxCog).toBeLessThanOrEqual(15);
  });
});

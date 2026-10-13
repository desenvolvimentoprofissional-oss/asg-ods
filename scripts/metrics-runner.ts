import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import type { FunctionMetricEntry, MetricsAuditResult } from './metrics-types';
import {
  isExecutableNode,
  isDeclarativeAST,
  getCyclomaticComplexity,
  getCognitiveComplexity,
  getLogicLines,
  checkNesting,
} from './metrics-ast';

interface AuditState {
  ledger: FunctionMetricEntry[];
  evaluatedFunctions: number;
  maxFileLines: number;
  maxFileLinesPath: string;
  maxLineLength: number;
  maxLineLengthPath: string;
  maxPhysical: number;
  maxLogic: number;
  maxCC: number;
  maxCog: number;
  maxNesting: number;
}

const TARGET_EXTS = new Set(['.ts', '.tsx', '.js']);
const IGNORED_NAMES = new Set(['node_modules', 'dist', 'build', '.git', 'coverage', 'functions']);

export function walkDirectory(dir: string): string[] {
  let files: string[] = [];
  for (const item of fs.readdirSync(dir)) {
    if (IGNORED_NAMES.has(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(walkDirectory(full));
    } else if (TARGET_EXTS.has(path.extname(item))) {
      files.push(full);
    }
  }
  return files;
}

function getNodeName(node: ts.Node, sf: ts.SourceFile): string {
  const named = node as { name?: ts.Node };
  if (named.name && named.name.getText(sf)) return named.name.getText(sf);
  if (node.parent && ts.isVariableDeclaration(node.parent) && node.parent.name) {
    return node.parent.name.getText(sf);
  }
  return 'anonymous';
}

function validateFunctionLimits(
  file: string,
  start: number,
  name: string,
  m: { physical: number; logic: number; cc: number; cog: number },
  errors: string[]
): void {
  if (m.physical > 40) errors.push(`${file}:${start} [${name}] - Físicas > 40 (${m.physical})`);
  if (m.logic > 25) errors.push(`${file}:${start} [${name}] - Lógicas > 25 (${m.logic})`);
  if (m.cc > 7) errors.push(`${file}:${start} [${name}] - CC > 7 (${m.cc})`);
  if (m.cog > 15) errors.push(`${file}:${start} [${name}] - Cog > 15 (${m.cog})`);
}

function auditFileLines(file: string, lines: string[], state: AuditState, errors: string[]): void {
  if (lines.length > state.maxFileLines) {
    state.maxFileLines = lines.length;
    state.maxFileLinesPath = `${file} (${lines.length} linhas)`;
  }
  lines.forEach((l, idx) => {
    if (l.length > state.maxLineLength) {
      state.maxLineLength = l.length;
      state.maxLineLengthPath = `${file}:${idx + 1} (${l.length} chars)`;
    }
    if (l.length > 120) {
      errors.push(`${file}:${idx + 1} - Linha excede 120 caracteres (${l.length} chars)`);
    }
  });
}

function evaluateFunctionNode(
  node: ts.Node,
  sf: ts.SourceFile,
  file: string,
  state: AuditState,
  errors: string[]
): void {
  if (!isExecutableNode(node)) return;
  state.evaluatedFunctions++;
  const start = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const end = sf.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
  const physical = end - start + 1;
  const logic = getLogicLines(node, sf);
  const cc = getCyclomaticComplexity(node);
  const cognitive = getCognitiveComplexity(node);

  if (physical > state.maxPhysical) state.maxPhysical = physical;
  if (logic > state.maxLogic) state.maxLogic = logic;
  if (cc > state.maxCC) state.maxCC = cc;
  if (cognitive > state.maxCog) state.maxCog = cognitive;

  const name = getNodeName(node, sf);
  state.ledger.push({ file, name, line: start, physical, logic, cc, cognitive });
  validateFunctionLimits(file, start, name, { physical, logic, cc, cog: cognitive }, errors);
}

function auditFile(file: string, state: AuditState, errors: string[]): void {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  auditFileLines(file, lines, state, errors);

  const sf = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  if (lines.length > 250 && !isDeclarativeAST(sf)) {
    errors.push(`${file} - Arquivo de lógica excede 250 linhas (§ 25.1: ${lines.length})`);
  }

  function walkNode(n: ts.Node) {
    evaluateFunctionNode(n, sf, file, state, errors);
    ts.forEachChild(n, walkNode);
  }
  ts.forEachChild(sf, walkNode);
  const tracker = { max: state.maxNesting };
  ts.forEachChild(sf, (n) => checkNesting(n, sf, file, 0, errors, tracker));
  if (tracker.max > state.maxNesting) state.maxNesting = tracker.max;
}

function createInitialAuditState(): AuditState {
  return {
    ledger: [],
    evaluatedFunctions: 0,
    maxFileLines: 0,
    maxFileLinesPath: '',
    maxLineLength: 0,
    maxLineLengthPath: '',
    maxPhysical: 0,
    maxLogic: 0,
    maxCC: 0,
    maxCog: 0,
    maxNesting: 0,
  };
}

function finalizeAuditResult(
  filesCount: number,
  state: AuditState,
  errors: string[]
): MetricsAuditResult {
  return {
    filesCount,
    evaluatedFunctions: state.evaluatedFunctions,
    maxFileLines: state.maxFileLines,
    maxFileLinesPath: state.maxFileLinesPath,
    maxLineLength: state.maxLineLength,
    maxLineLengthPath: state.maxLineLengthPath,
    maxPhysical: state.maxPhysical,
    maxLogic: state.maxLogic,
    maxCC: state.maxCC,
    maxCog: state.maxCog,
    maxNesting: state.maxNesting,
    errors,
    ledger: state.ledger,
  };
}

export function runMetricsAudit(): MetricsAuditResult {
  const files = walkDirectory('.');
  const errors: string[] = [];
  const state = createInitialAuditState();
  files.forEach((file) => auditFile(file, state, errors));
  return finalizeAuditResult(files.length, state, errors);
}

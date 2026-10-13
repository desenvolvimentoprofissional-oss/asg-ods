import ts from 'typescript';

const IMPERATIVE_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.TryStatement,
  ts.SyntaxKind.ThrowStatement,
]);

const CC_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.ConditionalExpression,
  ts.SyntaxKind.CaseClause,
  ts.SyntaxKind.CatchClause,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
]);

const CC_BINARY_OPS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.QuestionQuestionToken,
]);

const COGNITIVE_STRUCT_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.ConditionalExpression,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.CatchClause,
]);

const NESTING_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.TryStatement,
  ts.SyntaxKind.SwitchStatement,
]);

const EXECUTABLE_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
]);

export function isExecutableNode(node: ts.Node): boolean {
  return EXECUTABLE_KINDS.has(node.kind);
}

export function isDeclarativeAST(sourceFile: ts.SourceFile): boolean {
  let hasImperative = false;
  function visit(node: ts.Node) {
    if (hasImperative) return;
    if (IMPERATIVE_KINDS.has(node.kind)) {
      hasImperative = true;
      return;
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(sourceFile, visit);
  return !hasImperative;
}

export function getCyclomaticComplexity(rootNode: ts.Node): number {
  let cc = 1;
  function visit(node: ts.Node) {
    if (node !== rootNode && isExecutableNode(node)) return;
    if (CC_KINDS.has(node.kind)) {
      cc++;
    } else if (ts.isBinaryExpression(node) && CC_BINARY_OPS.has(node.operatorToken.kind)) {
      cc++;
    }
    ts.forEachChild(node, visit);
  }
  const body = (rootNode as { body?: ts.Node }).body || rootNode;
  visit(body);
  return cc;
}

interface CogContext {
  score: number;
}

function visitIf(
  node: ts.IfStatement,
  nesting: number,
  ctx: CogContext,
  visit: (n: ts.Node, l: number, op: ts.SyntaxKind | null) => void
): void {
  ctx.score += 1 + nesting;
  visit(node.expression, nesting, null);
  visit(node.thenStatement, nesting + 1, null);
  if (!node.elseStatement) return;

  if (ts.isIfStatement(node.elseStatement)) {
    visit(node.elseStatement, nesting, null);
  } else {
    ctx.score += 1;
    visit(node.elseStatement, nesting + 1, null);
  }
}

function visitBinary(node: ts.BinaryExpression, prevOp: ts.SyntaxKind | null, ctx: CogContext): ts.SyntaxKind | null {
  const op = node.operatorToken.kind;
  if (op !== ts.SyntaxKind.AmpersandAmpersandToken && op !== ts.SyntaxKind.BarBarToken) {
    return prevOp;
  }
  if (op !== prevOp) ctx.score += 1;
  return op;
}

export function getCognitiveComplexity(rootNode: ts.Node): number {
  const ctx: CogContext = { score: 0 };

  function visit(node: ts.Node, nesting: number, prevOp: ts.SyntaxKind | null) {
    if (node !== rootNode && isExecutableNode(node)) return;
    let nextNesting = nesting;
    let currentOp = prevOp;

    if (ts.isIfStatement(node)) {
      visitIf(node, nesting, ctx, visit);
      return;
    }

    if (COGNITIVE_STRUCT_KINDS.has(node.kind)) {
      ctx.score += 1 + nesting;
      nextNesting = nesting + 1;
    } else if (ts.isBinaryExpression(node)) {
      currentOp = visitBinary(node, prevOp, ctx);
    }

    ts.forEachChild(node, (c) => visit(c, nextNesting, currentOp));
  }

  const body = (rootNode as { body?: ts.Node }).body || rootNode;
  visit(body, 0, null);
  return ctx.score;
}

function isSignatureBraceLine(trimmed: string): boolean {
  if (!trimmed.endsWith('{')) return false;
  const pre = trimmed.slice(0, -1).trim();
  const sigIndicators = [')', '=>', ':', 'function', '>'];
  return sigIndicators.some((ind) => pre.endsWith(ind) || pre.includes(ind));
}

function isComment(trimmed: string): boolean {
  return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
}

function isOpeningBraceLine(trimmed: string): boolean {
  return /^[\{\(\[]$/.test(trimmed) || isSignatureBraceLine(trimmed);
}

function isSkippableLogicLine(trimmed: string, isStart: boolean): boolean {
  if (!trimmed || isComment(trimmed)) return true;
  if (isStart && isOpeningBraceLine(trimmed)) return true;
  return /^[\}\)\];,]+$/.test(trimmed);
}

export function getLogicLines(node: ts.Node, sourceFile: ts.SourceFile): number {
  const body = (node as { body?: ts.Node }).body;
  if (!body) return 0;

  const start = sourceFile.getLineAndCharacterOfPosition(body.getStart(sourceFile)).line;
  const end = sourceFile.getLineAndCharacterOfPosition(body.getEnd()).line;
  const lines = sourceFile.text.split('\n');

  let count = 0;
  for (let i = start; i <= end; i++) {
    if (!isSkippableLogicLine(lines[i].trim(), i === start)) {
      count++;
    }
  }
  return count;
}

export function checkNesting(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  file: string,
  depth: number,
  errors: string[],
  tracker?: { max: number }
): void {
  const isNesting = NESTING_KINDS.has(node.kind);
  const currentDepth = isNesting ? depth + 1 : depth;
  if (tracker && currentDepth > tracker.max) tracker.max = currentDepth;
  if (isNesting && currentDepth > 3) {
    const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
    errors.push(`${file}:${line} - Aninhamento excessivo (${currentDepth} > 3)`);
  }
  ts.forEachChild(node, (child) => checkNesting(child, sourceFile, file, currentDepth, errors, tracker));
}

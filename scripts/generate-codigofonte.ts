import fs from 'node:fs';
import path from 'node:path';

const BINARY_EXTENSIONS = new Set([
  '.webp', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.bmp',
  '.tiff', '.pdf', '.zip', '.tar', '.gz', '.woff', '.woff2',
  '.ttf', '.eot',
]);

const ALLOWED_ROOT_FILES = new Set([
  '.firebaserc',
  '.gitignore',
  'AGENTS.MD',
  'RELATORIO-CONFORMIDADE-METRICAS.md',
  'firebase-blueprint.json',
  'firebase.json',
  'firestore.rules',
  'index.html',
  'metadata.json',
  'package.json',
  'server.ts',
  'tsconfig.json',
  'vite.config.ts',
]);

const ALLOWED_DIRECTORIES = new Set(['src', 'scripts', 'tests', 'public']);

const FORBIDDEN_FILE_PATTERNS = [
  /credential/i,
  /secret/i,
  /\.env/i,
  /token/i,
  /\.pem$/i,
  /\.key$/i,
];

const SENSITIVE_CONTENT_PATTERNS = [
  /-----BEGIN (?:[A-Z0-9_-]+ )?PRIVATE KEY-----/i,
  /AIza[0-9A-Za-z-_]{35}/,
  /"private_key":\s*"-----BEGIN/i,
  /(?:password|passwd|api[_-]?key|secret[_-]?key)\s*[:=]\s*["'][^"']+["']/i,
];

function hasSensitiveContent(content: string): boolean {
  return SENSITIVE_CONTENT_PATTERNS.some((pattern) => pattern.test(content));
}

function isValidFile(entryName: string): boolean {
  const isForbiddenName = FORBIDDEN_FILE_PATTERNS.some((p) => p.test(entryName));
  if (isForbiddenName) return false;
  const ext = path.extname(entryName).toLowerCase();
  return !BINARY_EXTENSIONS.has(ext);
}

function collectDirectoryFiles(dir: string): string[] {
  let results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isSymbolicLink() || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative('.', full);

    if (entry.isDirectory()) {
      results = results.concat(collectDirectoryFiles(full));
      continue;
    }
    if (entry.isFile() && isValidFile(entry.name)) {
      results.push(rel);
    }
  }
  return results;
}

export function getProjectFiles(): string[] {
  let fileList: string[] = [];

  for (const rootFile of ALLOWED_ROOT_FILES) {
    if (fs.existsSync(rootFile)) {
      fileList.push(rootFile);
    }
  }

  for (const targetDir of ALLOWED_DIRECTORIES) {
    if (fs.existsSync(targetDir)) {
      fileList = fileList.concat(collectDirectoryFiles(targetDir));
    }
  }

  return fileList.sort();
}

export function buildCodigoFonte(): void {
  const files = getProjectFiles();
  let output = '';

  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    if (hasSensitiveContent(content)) {
      console.warn(`[CODIGOFONTE] Ignorando arquivo por conteúdo sensível: ${f}`);
      continue;
    }
    output += `ARQUIVO: ${f}\n${content}\n============================================================\n`;
  }

  fs.writeFileSync('CODIGOFONTE.txt', output, 'utf8');
  console.log(`CODIGOFONTE.txt gerado com sucesso: ${files.length} arquivos texto incluídos (0 binários).`);
}

buildCodigoFonte();

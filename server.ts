import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { Firestore } from 'firebase-admin/firestore';
import { LeadRegistrationInputSchema } from './src/types/leads.ts';
import type { LeadRegistrationInput } from './src/types/leads.ts';
import { writeLeadToBucket, sanitizeErrorMessage, getEmailHash } from './src/server/leadBucketService.ts';
import { applySecurityHeaders } from './src/server/securityHeaders.ts';
import { buildVaultRecord, buildOperationalRecord } from './src/server/vaultService.ts';

export { sanitizeErrorMessage, MAX_BUCKET_BYTES } from './src/server/leadBucketService.ts';
export { applySecurityHeaders } from './src/server/securityHeaders.ts';

function loadConfigFile(): { projectId?: string; firestoreDatabaseId?: string } {
  try {
    return JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
  } catch {
    return {};
  }
}

function readFirebaseConfig(): { projectId: string; dbId?: string } {
  const cfg = loadConfigFile();
  const envDb = process.env.FIRESTORE_DATABASE_ID;
  const projectId = process.env.FIREBASE_PROJECT_ID || cfg.projectId || 'asg-ods';
  const dbId = envDb && envDb !== '(default)' ? envDb : cfg.firestoreDatabaseId || envDb;
  return { projectId, dbId };
}

function initFirestoreInstance(): Firestore | null {
  try {
    const { projectId, dbId } = readFirebaseConfig();
    const app = getApps().length ? getApps()[0] : initializeApp({ projectId });
    return dbId && dbId !== '(default)' ? getFirestore(app, dbId) : getFirestore(app);
  } catch (e) {
    console.error('Falha ao inicializar Firestore Admin:', e);
    return null;
  }
}

export let db = initFirestoreInstance();

export function setFirestoreInstance(instance: Firestore | null): void {
  db = instance;
}
export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(applySecurityHeaders);
app.use(express.json({ limit: '1mb' }));

export function handleJsonSyntaxError(err: unknown, _req: Request, res: Response, next: NextFunction): void {
  const isSyntax = err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400;
  if (isSyntax) {
    res.status(400).json({ error: 'INVALID_ARGUMENT', message: 'Payload JSON malformado.' });
    return;
  }
  const isTooLarge = (err as { type?: string })?.type === 'entity.too.large';
  if (isTooLarge) {
    res.status(413).json({ error: 'PAYLOAD_TOO_LARGE', message: 'Payload excede limite permitido.' });
    return;
  }
  next(err);
}

app.use(handleJsonSyntaxError);

export const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
export const WINDOW_MS = 60 * 1000;
export const MAX_REQUESTS_PER_WINDOW = 10;
export const MAX_MAP_ENTRIES = 5000;

export function cleanupExpiredRateLimits(now: number): void {
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}

export function pruneOldestEntries(targetRemaining: number, preserveIp: string): void {
  const pruneCount = Math.max(0, rateLimitMap.size - targetRemaining);
  const keysToDelete = Array.from(rateLimitMap.keys()).slice(0, pruneCount);
  for (const oldKey of keysToDelete) {
    if (oldKey !== preserveIp) rateLimitMap.delete(oldKey);
  }
}

export function ensureMapCapacity(now: number, currentIp: string): void {
  if (rateLimitMap.size < MAX_MAP_ENTRIES) return;
  cleanupExpiredRateLimits(now);
  if (rateLimitMap.size >= MAX_MAP_ENTRIES) pruneOldestEntries(1000, currentIp);
}

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  ensureMapCapacity(now, ip);

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Muitas requisições. Aguarde um minuto antes de tentar novamente.',
    });
    return;
  }

  entry.count += 1;
  next();
}

export function generateDocId(): string {
  return `lead_${crypto.randomUUID()}`;
}

export function buildLeadRecord(data: LeadRegistrationInput, docId: string) {
  return buildOperationalRecord(data, docId, getEmailHash(data.email));
}

async function executeLeadCreation(data: LeadRegistrationInput) {
  try {
    const docId = generateDocId();
    const hash = getEmailHash(data.email);
    const opRecord = buildOperationalRecord(data, docId, hash);
    const vaultRecord = buildVaultRecord(data, docId);
    const fbRes = await writeLeadToBucket(db, opRecord, data.email, vaultRecord);
    if (fbRes.duplicate) {
      return { status: 409, body: { error: 'DUPLICATE', message: 'E-mail ou registro já cadastrado.' } };
    }
    if (!fbRes.success) {
      return {
        status: 503,
        body: {
          error: 'SERVICE_UNAVAILABLE',
          message: 'Serviço de persistência temporariamente indisponível. Tente novamente mais tarde.',
        },
      };
    }
    return {
      status: 201,
      body: { success: true, message: 'Interesse registrado com sucesso!', id: fbRes.docId || docId },
    };
  } catch (err: unknown) {
    console.error('[SECURITY_VAULT_ERROR]', sanitizeErrorMessage((err as Error)?.message || 'Erro'));
    return { status: 500, body: { error: 'INTERNAL_ERROR', message: 'Erro interno ao processar requisição.' } };
  }
}

export async function persistLead(body: unknown) {
  const validation = LeadRegistrationInputSchema.safeParse(body);
  if (!validation.success) {
    return {
      status: 400,
      body: { error: 'INVALID_ARGUMENT', message: 'Dados inválidos.', details: validation.error.format() },
    };
  }
  return executeLeadCreation(validation.data);
}

function serveWellKnown(req: Request, res: Response): void {
  const rawFile = Array.isArray(req.params.file) ? req.params.file[0] : req.params.file;
  const safeFile = path.basename(rawFile || '');
  const dir = path.join(process.cwd(), 'public', '.well-known');
  if (fs.existsSync(path.join(dir, safeFile))) {
    res.type('application/json').sendFile(safeFile, { root: dir });
    return;
  }
  res.status(404).json({ error: 'NOT_FOUND', message: 'Manifesto não encontrado.' });
}

app.get('/.well-known/:file', serveWellKnown);

app.post('/api/registrar-interesse', rateLimiter, async (req: Request, res: Response) => {
  const result = await persistLead(req.body);
  return res.status(result.status).json(result.body);
});

function configureProductionRoutes(): void {
  app.use(express.static('dist', { dotfiles: 'ignore' }));
  app.use((req: Request, res: Response) => {
    if (
      req.path.startsWith('/api/') ||
      req.path.startsWith('/.well-known/') ||
      req.path.startsWith('/assets/')
    ) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Recurso não encontrado.' });
    }
    res.sendFile('dist/index.html', { root: process.cwd() });
  });
}

async function configureDevRoutes(port: number): Promise<void> {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      port,
      host: '0.0.0.0',
      allowedHosts: ['.ai.studio', '.run.app', 'localhost', '127.0.0.1'],
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

async function startServer() {
  const port = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    configureProductionRoutes();
  } else {
    await configureDevRoutes(port);
  }

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const safeMsg = sanitizeErrorMessage(String((err as Error)?.message || 'Erro interno'));
    console.warn('[SERVER_ERROR]', safeMsg);
    res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Erro interno no servidor.' });
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em https://asg-ods.ai.studio (porta ${port})`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

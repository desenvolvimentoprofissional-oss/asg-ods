import fs from 'node:fs';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { LeadRegistrationInputSchema } from '../src/types/leads';
import { registrarManifestacaoInteresse, DuplicateLeadError } from '../src/api/leadsService';
import {
  app, rateLimitMap, cleanupExpiredRateLimits, pruneOldestEntries,
  sanitizeErrorMessage, MAX_MAP_ENTRIES, MAX_BUCKET_BYTES, setFirestoreInstance,
} from '../server';
import { buildBucketPayload } from '../src/server/leadBucketService';

process.env.HMAC_PEPPER_KEY = process.env.HMAC_PEPPER_KEY || 'test_pepper_key_cra_sp_2026';
process.env.VAULT_ENCRYPTION_KEY = process.env.VAULT_ENCRYPTION_KEY || 'test_vault_key_cra_sp_32b_secret!';

const originalFetch = globalThis.fetch;

const validPayload = {
  nome: 'Prof. Carlos Silva', email: 'carlos.silva@universidade.edu.br', telefone: '(11) 98765-4321',
  instituicao: 'Universidade Federal de Ituverava', campus: 'Campus Central', cargo: 'Coordenador de Curso',
  curso: 'Administração', previsaoSemestre: '1º Semestre de 2027', observacoes: 'Gostaria de materiais adicionais.',
};

describe('1. Validação do Esquema Zod', () => {
  it('deve normalizar e-mail e aprovar dados válidos', () => {
    const raw = { ...validPayload, email: '  CARLOS.SILVA@UNIVERSIDADE.EDU.BR  ' };
    const parsed = LeadRegistrationInputSchema.parse(raw);
    expect(parsed.email).toBe('carlos.silva@universidade.edu.br');
    expect(parsed.nome).toBe('Prof. Carlos Silva');
  });

  it('deve rejeitar campos injetados não declarados', () => {
    const res = LeadRegistrationInputSchema.safeParse({ ...validPayload, campoInjetado: 'x' });
    expect(res.success).toBe(false);
  });

  it('deve rejeitar e-mail inválido ou campos vazios', () => {
    expect(LeadRegistrationInputSchema.safeParse({ email: 'invalido' }).success).toBe(false);
    expect(LeadRegistrationInputSchema.safeParse({ ...validPayload, nome: '' }).success).toBe(false);
  });
});

describe('2. Thin Client Sucesso', () => {
  beforeEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deve processar status 201', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ success: true, message: 'Interesse registrado com sucesso!' }),
    } as unknown as Response);

    const res = await registrarManifestacaoInteresse(validPayload);
    expect(res.success).toBe(true);
    expect(res.message).toContain('sucesso');
  });
});

describe('3. Thin Client Erros', () => {
  beforeEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deve lançar DuplicateLeadError para status 409', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => ({ error: 'DUPLICATE' }),
    } as unknown as Response);
    await expect(registrarManifestacaoInteresse(validPayload)).rejects.toThrow(DuplicateLeadError);
  });

  it('deve lançar Error genérico para status 500', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Erro interno' }),
    } as unknown as Response);
    await expect(registrarManifestacaoInteresse(validPayload)).rejects.toThrow(/Erro interno/);
  });
});

describe('3.1 Thin Client Integridade de Resposta', () => {
  it('deve rejeitar resposta HTTP 200 que não contenha success: true (anti-falso sucesso)', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ unexpected: 'not_json_or_empty' }),
    } as unknown as Response);
    await expect(registrarManifestacaoInteresse(validPayload)).rejects.toThrow();
  });
});

describe('4. Backend Validação e Status', () => {
  beforeEach(() => {
    rateLimitMap.clear();
  });

  it('deve responder 400 para dados inválidos', async () => {
    const res = await request(app).post('/api/registrar-interesse').send({ nome: 'Incompleto' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_ARGUMENT');
  });

  it('deve retornar 400 para JSON malformado sem vazar dados no erro', async () => {
    const res = await request(app)
      .post('/api/registrar-interesse')
      .set('Content-Type', 'application/json')
      .send('{ "nome": "Prof. Teste", malformed ');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('INVALID_ARGUMENT');
  });

  it('deve responder 503 quando persistência não estiver disponível (sem falso 201)', async () => {
    setFirestoreInstance(null);
    const res = await request(app).post('/api/registrar-interesse').send(validPayload);
    expect(res.status).toBe(503);
    expect(res.body.error).toBe('SERVICE_UNAVAILABLE');
  });
});

describe('4.1 Limite de Tráfego e Descoberta ARD', () => {
  beforeEach(() => {
    rateLimitMap.clear();
  });

  it('deve responder 429 quando limite for excedido', async () => {
    const ip = '192.168.1.100';
    rateLimitMap.set(ip, { count: 15, resetAt: Date.now() + 60000 });
    const res = await request(app).post('/api/registrar-interesse')
      .set('X-Forwarded-For', ip).send({ nome: 'Incompleto' });
    expect(res.status).toBe(429);
  });

  it('deve servir manifesto ARD válido em /.well-known/ard.json com JSON', async () => {
    const res = await request(app).get('/.well-known/ard.json');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.body.entries).toBeInstanceOf(Array);
  });
});

describe('5. Rate Limiter e Sanitização', () => {
  beforeEach(() => {
    rateLimitMap.clear();
  });

  it('deve conter mapa e expirar entradas', () => {
    const now = Date.now();
    rateLimitMap.set('expirado', { count: 1, resetAt: now - 1000 });
    cleanupExpiredRateLimits(now);
    expect(rateLimitMap.has('expirado')).toBe(false);
    expect(MAX_MAP_ENTRIES).toBe(5000);
  });

  it('deve preservar IP da requisição atual durante a poda de contenção', () => {
    const currentIp = '10.0.0.99';
    for (let i = 0; i < 50; i++) {
      rateLimitMap.set(`ip-${i}`, { count: 1, resetAt: Date.now() + 60000 });
    }
    rateLimitMap.set(currentIp, { count: 1, resetAt: Date.now() + 60000 });
    pruneOldestEntries(10, currentIp);
    expect(rateLimitMap.has(currentIp)).toBe(true);
    expect(rateLimitMap.size).toBeLessThanOrEqual(11);
  });

  it('deve sanitizar e-mail e documento de identificação em logs de erro', () => {
    const raw = 'Erro leads_adesao/doc-123 para carlos@ies.edu.br tel (11) 98765-4321';
    const sanitized = sanitizeErrorMessage(raw);
    expect(sanitized).not.toContain('carlos@ies.edu.br');
    expect(sanitized).not.toContain('doc-123');
    expect(sanitized).toContain('[REDACTED_EMAIL]');
    expect(sanitized).toContain('[REDACTED_PHONE]');
    expect(sanitized).toContain('leads_adesao/[REDACTED_DOC]');
  });
});

describe('6. Padrão Normativo CRA-SP (Bucket Pattern parteN e Limite de 90%)', () => {
  it('deve respeitar a cota de 90% de 1 MiB (943.718 bytes)', () => {
    expect(MAX_BUCKET_BYTES).toBe(943718);
    expect(MAX_BUCKET_BYTES).toBe(Math.floor(1024 * 1024 * 0.9));
  });

  it('deve montar estrutura de agregação parte1 com manifestações', () => {
    const lead = { nome: 'Prof. Exemplo', email: 'ex@ies.edu.br' };
    const bucket = buildBucketPayload(1, null, lead);
    expect(bucket.numeroParte).toBe(1);
    expect(bucket.totalRegistros).toBe(1);
    expect(bucket.manifestacoes).toHaveLength(1);
    expect(bucket.manifestacoes[0]).toEqual(lead);
    expect(bucket.tamanhoAproximadoBytes).toBeGreaterThan(0);
  });

  it('deve incrementar manifestações mantendo data de criação original', () => {
    const lead1 = { nome: 'Prof. 1', email: 'p1@ies.edu.br' };
    const lead2 = { nome: 'Prof. 2', email: 'p2@ies.edu.br' };
    const b1 = buildBucketPayload(1, null, lead1);
    const b2 = buildBucketPayload(1, b1, lead2);
    expect(b2.numeroParte).toBe(1);
    expect(b2.totalRegistros).toBe(2);
    expect(b2.criadoEm).toBe(b1.criadoEm);
    expect(b2.manifestacoes).toHaveLength(2);
  });
});

describe('7. Cabeçalhos de Segurança HTTP (Mozilla Observatory)', () => {
  it('deve aplicar todos os cabeçalhos de segurança obrigatórios e omitir x-powered-by', async () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const res = await request(app).post('/api/registrar-interesse').send({});
    process.env.NODE_ENV = prev;
    expect(res.headers['strict-transport-security']).toBe(
      'max-age=63072000; includeSubDomains; preload'
    );
    expect(res.headers['cross-origin-opener-policy']).toBe('same-origin-allow-popups');
    expect(res.headers['cross-origin-embedder-policy']).toBe('credentialless');
    expect(res.headers['content-security-policy']).toContain("frame-ancestors 'self'");
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['referrer-policy']).toBe('no-referrer');
    expect(res.headers['content-security-policy']).toContain("object-src 'none'");
    expect(res.headers['content-security-policy']).toContain("base-uri 'self'");
    expect(res.headers['content-security-policy']).toContain("form-action 'self'");
    expect(res.headers['content-security-policy']).toContain("upgrade-insecure-requests");
    expect(res.headers['cross-origin-resource-policy']).toBe('same-origin');
    expect(res.headers['permissions-policy']).toContain('camera=()');
    expect(res.headers['x-powered-by']).toBeUndefined();
    expect(res.headers['content-security-policy']).not.toMatch(/(^|;\s*)style-src\s+[^;]*'unsafe-inline'/);
    expect(res.headers['content-security-policy']).toContain('vlibras.gov.br');
  });

  it('deve validar Subresource Integrity (SRI sha384) nos assets de dist/index.html', () => {
    if (!fs.existsSync('dist/index.html')) return;
    const html = fs.readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('integrity="sha384-');
  });
});

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { resolveDatabaseId, resolveProjectId } from '../src/server/firestoreClient.ts';
import { CSP_HEADER, DEV_CSP_HEADER, VLIBRAS_UNITY_CSP } from '../src/server/securityHeaders.ts';

const VLIBRAS_PATH = 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@v7.12.2/';

describe('4. Auditoria de Segurança das Regras do Firestore (firestore.rules)', () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8');

  it('não deve conter permissões públicas abertas ou condicionais permissivas', () => {
    expect(rules).not.toMatch(/allow\s+(read|write|read,\s*write)\s*:\s*if\s+true/i);
    expect(rules).not.toMatch(/allow\s+read\s*:\s*if\s+request\.time\s*!=\s*null/i);
    expect(rules).not.toMatch(/allow\s+(create|update|delete|get|list)/i);
    const allowMatches = rules.match(/\ballow\b[^;]+;/g) || [];
    expect(allowMatches).toHaveLength(1);
    expect(allowMatches[0]?.trim()).toBe('allow read, write: if false;');
  });

  it('deve conter deny-by-default estrito para todos os documentos do cliente', () => {
    const matchBlocks = rules.match(/\bmatch\s+\/\S+/g) || [];
    expect(matchBlocks).toEqual(['match /databases/{database}/documents', 'match /{document=**}']);
    expect(rules).toContain('match /{document=**}');
    expect(rules).toContain('allow read, write: if false;');
  });
});

describe('5. Precedência de Banco e Restrição de CSP (AGENTS.MD)', () => {
  it('deve priorizar FIRESTORE_DATABASE_ID e FIREBASE_PROJECT_ID sobre o config', () => {
    process.env.FIRESTORE_DATABASE_ID = 'env-db-id';
    process.env.FIREBASE_PROJECT_ID = 'env-proj-id';
    expect(resolveDatabaseId('cfg-db-id')).toBe('env-db-id');
    expect(resolveProjectId('cfg-proj-id')).toBe('env-proj-id');
    delete process.env.FIRESTORE_DATABASE_ID;
    delete process.env.FIREBASE_PROJECT_ID;
    expect(resolveDatabaseId('cfg-db-id')).toBe('cfg-db-id');
    expect(resolveProjectId('cfg-proj-id')).toBe('cfg-proj-id');
  });

  it('deve restringir CSP ao caminho do VLibras no jsDelivr e vedar PostHog', () => {
    for (const csp of [CSP_HEADER, DEV_CSP_HEADER, VLIBRAS_UNITY_CSP]) {
      expect(csp).not.toContain('posthog.com');
      expect(csp).toContain(VLIBRAS_PATH);
      expect(csp).not.toMatch(/https:\/\/cdn\.jsdelivr\.net(?![/a-zA-Z0-9@._-])/);
    }
  });
});


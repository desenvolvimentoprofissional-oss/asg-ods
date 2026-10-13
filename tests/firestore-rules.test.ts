import { describe, it, expect } from 'vitest';
import fs from 'node:fs';

describe('4. Auditoria de Segurança das Regras do Firestore (firestore.rules)', () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8');

  it('não deve conter permissões públicas abertas ou condicionais permissivas', () => {
    expect(rules).not.toMatch(/allow\s+(read|write|read,\s*write)\s*:\s*if\s+true/i);
    expect(rules).not.toMatch(/allow\s+read\s*:\s*if\s+request\.time\s*!=\s*null/i);
    expect(rules).not.toMatch(/allow\s+create/i);
    expect(rules).not.toMatch(/allow\s+update/i);
  });

  it('deve conter deny-by-default estrito para todos os documentos do cliente', () => {
    expect(rules).toContain('match /{document=**}');
    expect(rules).toContain('allow read, write: if false;');
  });
});

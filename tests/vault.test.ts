import { describe, it, expect } from 'vitest';
import {
  encryptVaultField, decryptVaultField, buildVaultRecord, buildOperationalRecord,
} from '../src/server/vaultService';
import { getEmailHash } from '../src/server/leadBucketService';

describe('8.1 Auditoria de Ausência de Segredos Hardcoded', () => {
  it('deve lançar erro fatal se variáveis obrigatórias estiverem ausentes', () => {
    delete process.env.HMAC_PEPPER_KEY;
    delete process.env.VAULT_ENCRYPTION_KEY;
    expect(() => getEmailHash('teste@ies.edu.br')).toThrow(/HMAC_PEPPER_KEY ausente/);
    expect(() => encryptVaultField('Nome Teste')).toThrow(/VAULT_ENCRYPTION_KEY ausente/);
  });
});

describe('8.2 Auditoria Criptográfica AES-256-GCM e HMAC-SHA256', () => {
  const pepper = 'pepper_teste_hmac_secret_key_2026';
  const vaultKey = 'chave_teste_vault_secret_32bytes_!';

  it('deve cifrar e decifrar PII sensível com tag de autenticação e IV aleatório', () => {
    process.env.VAULT_ENCRYPTION_KEY = vaultKey;
    const textoOriginal = 'Prof. Carlos Eduardo da Silva';
    const c1 = encryptVaultField(textoOriginal);
    const c2 = encryptVaultField(textoOriginal);

    expect(c1).toMatch(/^v1:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/);
    expect(c1).not.toBe(c2);
    expect(c1).not.toContain(textoOriginal);
    expect(decryptVaultField(c1)).toBe(textoOriginal);
  });

  it('deve utilizar HMAC-SHA256 alimentado por chave secreta para índice de unicidade', () => {
    process.env.HMAC_PEPPER_KEY = pepper;
    const email = 'carlos.silva@universidade.edu.br';
    const hash = getEmailHash(email);
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hash).toBe(getEmailHash('  CARLOS.SILVA@UNIVERSIDADE.EDU.BR  '));
  });
});

describe('8.3 Auditoria de Segregação de Cofre e Pseudonimização', () => {
  it('deve segregar PII no cofre e pseudonimizar registros operacionais no bucket', () => {
    process.env.VAULT_ENCRYPTION_KEY = 'chave_teste_vault_secret_32bytes_!';
    process.env.HMAC_PEPPER_KEY = 'pepper_teste_hmac_secret_key_2026';
    const raw = {
      nome: 'Prof. Carlos', email: 'carlos@ies.edu.br', telefone: '(11) 98765-4321',
      instituicao: 'Universidade X', campus: 'Central', cargo: 'Coordenador',
      curso: 'Adm', previsaoSemestre: '1/2027', observacoes: 'Dados sigilosos',
    };
    const docId = 'lead_uuid_123';
    const vault = buildVaultRecord(raw, docId);
    const hash = getEmailHash(raw.email);
    const op = buildOperationalRecord(raw, docId, hash);

    expect(vault.nome).toMatch(/^v1:/);
    expect(vault.email).toMatch(/^v1:/);
    expect(vault.telefone).toMatch(/^v1:/);
    expect(vault.observacoes).toMatch(/^v1:/);
    expect(op).not.toHaveProperty('nome');
    expect(op).not.toHaveProperty('email');
    expect(op).not.toHaveProperty('telefone');
    expect(op).not.toHaveProperty('observacoes');
    expect(op.temObservacoes).toBe(true);
    expect(op.emailHash).toBe(hash);
    expect(op.vaultRef).toBe('vault_leads/lead_uuid_123');
  });
});

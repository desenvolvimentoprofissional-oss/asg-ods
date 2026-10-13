import crypto from 'node:crypto';

function getVaultKey(): Buffer {
  const secret = process.env.VAULT_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error('Variável obrigatória de segurança VAULT_ENCRYPTION_KEY ausente.');
  }
  return crypto.createHash('sha256').update(secret).digest();
}

export function encryptVaultField(text: string): string {
  if (!text) return '';
  const key = getVaultKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64')}:${tag.toString('base64')}:${enc.toString('base64')}`;
}

export function decryptVaultField(cipherText: string): string {
  if (!cipherText || !cipherText.startsWith('v1:')) return cipherText;
  try {
    const parts = cipherText.split(':');
    if (parts.length !== 4) return cipherText;
    const [, ivB64, tagB64, encB64] = parts;
    const key = getVaultKey();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    return decipher.update(Buffer.from(encB64, 'base64')) + decipher.final('utf8');
  } catch {
    return '[ENCRYPTED_VAULT_PAYLOAD]';
  }
}

export function buildVaultRecord(
  data: { nome: string; email: string; telefone: string; observacoes?: string },
  docId: string
) {
  const now = new Date().toISOString();
  return {
    leadId: docId,
    nome: encryptVaultField(data.nome),
    email: encryptVaultField(data.email),
    telefone: encryptVaultField(data.telefone),
    observacoes: encryptVaultField(data.observacoes || ''),
    criadoEm: now,
    vaultEncrypted: true,
  };
}

export function buildOperationalRecord(
  data: {
    email: string;
    instituicao: string;
    campus: string;
    cargo: string;
    curso: string;
    previsaoSemestre: string;
    observacoes?: string;
  },
  docId: string,
  emailHash: string
) {
  const now = new Date().toISOString();
  return {
    leadId: docId,
    emailHash,
    instituicao: data.instituicao,
    campus: data.campus,
    cargo: data.cargo,
    curso: data.curso,
    previsaoSemestre: data.previsaoSemestre,
    temObservacoes: Boolean(data.observacoes?.trim()),
    origem: 'portal_cra_sp',
    status: 'pendente_analise',
    criadoEm: now,
    vaultRef: `vault_leads/${docId}`,
  };
}

import crypto from 'node:crypto';
import type { Firestore } from 'firebase-admin/firestore';

export const MAX_BUCKET_BYTES = 943718;

export interface BucketData {
  numeroParte: number;
  criadoEm: string;
  atualizadoEm: string;
  totalRegistros: number;
  tamanhoAproximadoBytes: number;
  manifestacoes: Record<string, unknown>[];
}

export function getEmailHash(email: string): string {
  const pepper = process.env.HMAC_PEPPER_KEY;
  if (!pepper) {
    throw new Error('Variável obrigatória de segurança HMAC_PEPPER_KEY ausente.');
  }
  return crypto.createHmac('sha256', pepper).update(email.toLowerCase().trim()).digest('hex');
}

export function sanitizeErrorMessage(rawMsg: string): string {
  return rawMsg
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
    .replace(/\(?\d{2}\)?\s?\d{4,5}-?\d{4}/g, '[REDACTED_PHONE]')
    .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[REDACTED_CPF]')
    .replace(/leads_adesao\/[a-zA-Z0-9_-]+/g, 'leads_adesao/[REDACTED_DOC]');
}

export function buildBucketPayload(
  partNum: number,
  bucket: BucketData | null,
  lead: Record<string, unknown>
): BucketData {
  const now = new Date().toISOString();
  const manifestacoes = bucket ? [...(bucket.manifestacoes || []), lead] : [lead];
  return {
    numeroParte: partNum,
    criadoEm: bucket?.criadoEm || now,
    atualizadoEm: now,
    totalRegistros: manifestacoes.length,
    tamanhoAproximadoBytes: Buffer.byteLength(JSON.stringify(manifestacoes), 'utf8'),
    manifestacoes,
  };
}

function checkBucketFit(
  bucket: BucketData,
  emailHash: string,
  leadBytes: number
): { isDup: boolean; canFit: boolean } {
  const isDup = (bucket.manifestacoes || []).some(
    (m) => ((m?.emailHash as string) || '') === emailHash
  );
  if (isDup) return { isDup: true, canFit: false };
  const curSize = Buffer.byteLength(JSON.stringify(bucket), 'utf8');
  return { isDup: false, canFit: curSize + leadBytes <= MAX_BUCKET_BYTES };
}

function writeDualRecords(
  tx: FirebaseFirestore.Transaction,
  refs: {
    indexRef: FirebaseFirestore.DocumentReference;
    docRef: FirebaseFirestore.DocumentReference;
    vaultRef: FirebaseFirestore.DocumentReference;
  },
  data: {
    indexData: Record<string, unknown>;
    vaultLead: Record<string, unknown> | null;
    bucketPayload: BucketData;
  }
): void {
  tx.set(refs.indexRef, data.indexData);
  if (data.vaultLead) tx.set(refs.vaultRef, data.vaultLead);
  tx.set(refs.docRef, data.bucketPayload);
}

interface SavePartParams {
  partNum: number;
  opLead: Record<string, unknown>;
  vaultLead: Record<string, unknown> | null;
  email: string;
  leadBytes: number;
}

interface BucketDocRefs {
  indexRef: FirebaseFirestore.DocumentReference;
  docRef: FirebaseFirestore.DocumentReference;
  vaultRef: FirebaseFirestore.DocumentReference;
}

function handleExistingBucket(
  tx: FirebaseFirestore.Transaction,
  refs: BucketDocRefs,
  p: SavePartParams,
  snap: FirebaseFirestore.DocumentSnapshot,
  meta: { docId: string; hash: string; leadId: string }
): { done: boolean; success: boolean; duplicate: boolean; docId: string } {
  const { isDup, canFit } = checkBucketFit(snap.data() as BucketData, meta.hash, p.leadBytes);
  if (isDup) {
    const existing = (snap.data()?.manifestacoes || []).find(
      (m: Record<string, unknown>) => ((m?.emailHash as string) || '') === meta.hash
    );
    const existingLeadId = (existing?.leadId as string) || meta.leadId;
    tx.set(refs.indexRef, { criadoEm: new Date().toISOString(), parte: meta.docId, leadId: existingLeadId });
    return { done: true, success: false, duplicate: true, docId: existingLeadId };
  }
  if (canFit) {
    const bucketPayload = buildBucketPayload(p.partNum, snap.data() as BucketData, p.opLead);
    const indexData = { criadoEm: new Date().toISOString(), parte: meta.docId, leadId: meta.leadId };
    writeDualRecords(tx, refs, { indexData, vaultLead: p.vaultLead, bucketPayload });
    return { done: true, success: true, duplicate: false, docId: meta.leadId };
  }
  return { done: false, success: false, duplicate: false, docId: '' };
}

async function trySaveLeadInPart(
  db: Firestore,
  p: SavePartParams
): Promise<{ done: boolean; success: boolean; duplicate: boolean; docId: string }> {
  const docId = `parte${p.partNum}`;
  const docRef = db.collection('leads_adesao').doc(docId);
  const hash = getEmailHash(p.email);
  const indexRef = db.collection('leads_unicidade').doc(hash);
  const leadId = (p.opLead.leadId as string) || (p.opLead.id as string) || `lead_${crypto.randomUUID()}`;
  const refs = { indexRef, docRef, vaultRef: db.collection('vault_leads').doc(leadId) };

  return db.runTransaction(async (tx) => {
    if ((await tx.get(indexRef)).exists) {
      return { done: true, success: false, duplicate: true, docId: '' };
    }
    const snap = await tx.get(docRef);
    if (!snap.exists) {
      const bucketPayload = buildBucketPayload(p.partNum, null, p.opLead);
      const indexData = { criadoEm: new Date().toISOString(), parte: docId, leadId };
      writeDualRecords(tx, refs, { indexData, vaultLead: p.vaultLead, bucketPayload });
      return { done: true, success: true, duplicate: false, docId: leadId };
    }
    return handleExistingBucket(tx, refs, p, snap, { docId, hash, leadId });
  });
}

export async function writeLeadToBucket(
  db: Firestore | null,
  operationalLead: Record<string, unknown>,
  email: string,
  vaultLead: Record<string, unknown> | null = null
): Promise<{ success: boolean; duplicate: boolean; docId: string }> {
  if (!db) return { success: false, duplicate: false, docId: '' };
  const targetEmail = email.toLowerCase();
  try {
    const leadBytes = Buffer.byteLength(JSON.stringify(operationalLead), 'utf8');
    let partNum = 1;

    while (true) {
      const res = await trySaveLeadInPart(db, {
        partNum, opLead: operationalLead, vaultLead, email: targetEmail, leadBytes,
      });
      if (res.done) {
        return { success: res.success, duplicate: res.duplicate, docId: res.docId };
      }
      partNum += 1;
    }
  } catch (err: unknown) {
    const raw = String((err as Error)?.message || '');
    console.warn('[FIREBASE_WARN] Falha ao gravar no bucket do Firestore:', sanitizeErrorMessage(raw));
    return { success: false, duplicate: false, docId: '' };
  }
}

import fs from 'node:fs';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, runTransaction } from 'firebase/firestore';
import type {
  Firestore as ClientFirestore,
  DocumentReference,
  WithFieldValue,
  DocumentData,
} from 'firebase/firestore';
export type { DocumentReference };

export interface FirestoreTx {
  get(ref: DocumentReference): Promise<{ exists: boolean; data(): Record<string, unknown> | undefined }>;
  set(ref: DocumentReference, data: object): void;
}

export interface FirestoreDb {
  collection(name: string): {
    doc(id: string): DocumentReference;
  };
  runTransaction<T>(fn: (tx: FirestoreTx) => Promise<T>): Promise<T>;
}

export function loadFirebaseConfigFile(): { projectId?: string; firestoreDatabaseId?: string } {
  try {
    return JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
  } catch {
    return {};
  }
}

export function createFirestoreClient(clientDb: ClientFirestore): FirestoreDb {
  return {
    collection: (colName: string) => ({
      doc: (docId: string) => doc(clientDb, colName, docId),
    }),
    runTransaction: async <T>(updateFunction: (tx: FirestoreTx) => Promise<T>): Promise<T> => {
      return runTransaction(clientDb, async (rawTx) => {
        const wrappedTx: FirestoreTx = {
          get: async (ref) => {
            const snap = await rawTx.get(ref);
            return {
              exists: snap.exists(),
              data: () => snap.data() as Record<string, unknown> | undefined,
            };
          },
          set: (ref, data) => {
            rawTx.set(ref, data as WithFieldValue<DocumentData>);
          },
        };
        return updateFunction(wrappedTx);
      });
    },
  };
}

function resolveProjectId(cfgId?: string): string {
  if (process.env.FIREBASE_PROJECT_ID) return process.env.FIREBASE_PROJECT_ID;
  if (cfgId) return cfgId;
  return 'asg-ods';
}

const DEFAULT_DB_ID = 'ai-studio-componenteasgods-8ee576da-afbc-43cb-932c-778d3594fd2f';

function resolveDatabaseId(cfgDbId?: string): string {
  if (cfgDbId && cfgDbId !== '(default)') return cfgDbId;
  const env = process.env.FIRESTORE_DATABASE_ID;
  if (env && env !== '(default)') return env;
  return DEFAULT_DB_ID;
}

function getOrInitApp(projectId: string, cfg: Record<string, unknown>) {
  const existing = getApps();
  if (existing.length > 0) return existing[0];
  return initializeApp({ ...cfg, projectId });
}

export function initFirestoreClient(): FirestoreDb | null {
  try {
    const cfg = loadFirebaseConfigFile();
    const projectId = resolveProjectId(cfg.projectId);
    const dbId = resolveDatabaseId(cfg.firestoreDatabaseId);
    const app = getOrInitApp(projectId, cfg);
    const clientDb = dbId ? getFirestore(app, dbId) : getFirestore(app);
    return createFirestoreClient(clientDb);
  } catch (err) {
    console.error('Falha ao inicializar Firestore Client:', err);
    return null;
  }
}

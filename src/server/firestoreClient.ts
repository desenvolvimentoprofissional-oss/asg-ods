import fs from 'node:fs';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { Firestore, Transaction, DocumentReference } from 'firebase-admin/firestore';

export type { Firestore as FirestoreDb, Transaction as FirestoreTx, DocumentReference };

export function loadFirebaseConfigFile(): { projectId?: string; firestoreDatabaseId?: string } {
  try {
    return JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
  } catch {
    return {};
  }
}

export function resolveProjectId(cfgId?: string): string {
  if (process.env.FIREBASE_PROJECT_ID) return process.env.FIREBASE_PROJECT_ID;
  if (cfgId) return cfgId;
  return 'asg-ods';
}

export function resolveDatabaseId(cfgDbId?: string): string | undefined {
  const env = process.env.FIRESTORE_DATABASE_ID;
  if (env && env !== '(default)') return env;
  if (cfgDbId && cfgDbId !== '(default)') return cfgDbId;
  return undefined;
}

function getOrInitApp(projectId: string) {
  const existing = getApps();
  if (existing.length > 0) return existing[0];
  return initializeApp({ projectId });
}

export function initFirestoreClient(): Firestore | null {
  try {
    const cfg = loadFirebaseConfigFile();
    const projectId = resolveProjectId(cfg.projectId);
    const dbId = resolveDatabaseId(cfg.firestoreDatabaseId);
    const app = getOrInitApp(projectId);
    return dbId ? getFirestore(app, dbId) : getFirestore(app);
  } catch (err) {
    console.error('Falha ao inicializar Firebase Admin:', err);
    return null;
  }
}

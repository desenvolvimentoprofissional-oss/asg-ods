import type { LeadRegistrationInput } from '../types/leads';

export interface LeadSubmissionResult {
  success: boolean;
  message: string;
}

export class DuplicateLeadError extends Error {
  code = 'DUPLICATE';
  constructor(
    message: string = 'Esta instituição/e-mail já possui manifestação de interesse registrada.'
  ) {
    super(message);
    this.name = 'DuplicateLeadError';
  }
}

function validateLeadResponse(response: Response, body: Record<string, unknown> | null): void {
  if (response.status === 409) {
    const msg = typeof body?.message === 'string' ? body.message : undefined;
    throw new DuplicateLeadError(msg);
  }
  if (!response.ok || !body || body.success !== true) {
    const msg = typeof body?.message === 'string' ? body.message : 'Erro ao enviar manifestação.';
    throw new Error(msg);
  }
}

export async function registrarManifestacaoInteresse(
  data: LeadRegistrationInput
): Promise<LeadSubmissionResult> {
  const response = await fetch('/api/registrar-interesse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  validateLeadResponse(response, body);

  return {
    success: true,
    message: typeof body?.message === 'string' ? body.message : 'Manifestação registrada com sucesso.',
  };
}

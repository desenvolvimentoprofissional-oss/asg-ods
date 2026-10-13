import {
  registrarManifestacaoInteresse,
  DuplicateLeadError,
} from '../../api/leadsService';
import type { LeadRegistrationInput } from '../../types/leads';

export const inputClass =
  'border border-gray-300 text-gray-900 px-3.5 py-2.5 w-full outline-none rounded-lg ' +
  'focus:border-[#172554] focus:ring-1 focus:ring-[#172554] transition-all bg-gray-50 ' +
  'hover:bg-white focus:bg-white text-sm';

export const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

export function formatPhone(val: string): string {
  const clean = val.replace(/\D/g, '').slice(0, 11);
  if (clean.length <= 2) return clean ? `(${clean}` : '';
  if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
  if (clean.length <= 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
}

export async function submitInterestPayload(
  payload: LeadRegistrationInput,
  onSuccess: (data: { nome: string; instituicao: string }) => void
): Promise<void> {
  await registrarManifestacaoInteresse(payload);
  onSuccess({ nome: payload.nome, instituicao: payload.instituicao });
}

export function handleInterestError(err: unknown): string {
  if (err instanceof DuplicateLeadError || (err as { code?: string })?.code === 'DUPLICATE') {
    return 'Esta manifestação já foi cadastrada anteriormente para este e-mail institucional.';
  }
  return (err as Error)?.message || 'Erro ao enviar manifestação. Tente novamente em instantes.';
}

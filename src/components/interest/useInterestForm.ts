import { useState } from 'react';
import type { FormEvent } from 'react';
import { handleInterestError } from './interestFormUtils';
import { registrarManifestacaoInteresse } from '../../api/leadsService';

export interface InterestFields {
  nome: string;
  cargo: string;
  instituicao: string;
  campus: string;
  email: string;
  telefone: string;
  curso: string;
  previsao: string;
  observacoes: string;
}

const EMPTY_FIELDS: InterestFields = {
  nome: '',
  cargo: '',
  instituicao: '',
  campus: '',
  email: '',
  telefone: '',
  curso: '',
  previsao: '',
  observacoes: '',
};

export function isPhoneValid(telefone: string): boolean {
  const digits = telefone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

export function isFormValid(f: InterestFields): boolean {
  return Boolean(
    f.nome.trim() &&
    f.email.trim() &&
    isPhoneValid(f.telefone) &&
    f.instituicao.trim() &&
    f.campus.trim() &&
    f.previsao.trim()
  );
}

export function buildPayload(f: InterestFields) {
  return {
    nome: f.nome.trim(),
    email: f.email.trim(),
    telefone: f.telefone.trim(),
    instituicao: f.instituicao.trim(),
    campus: f.campus.trim(),
    cargo: f.cargo,
    curso: f.curso,
    previsaoSemestre: f.previsao,
    observacoes: f.observacoes.trim(),
  };
}

export function getFormValidationError(f: InterestFields): string {
  if (isFormValid(f)) return '';
  if (f.telefone.trim() && !isPhoneValid(f.telefone)) {
    return 'Telefone deve conter DDD e 8 ou 9 dígitos.';
  }
  return 'Por favor, preencha todos os campos obrigatórios.';
}

export function useInterestForm(props: {
  onSuccess: (data: { nome: string; instituicao: string }) => void;
}) {
  const [f, setF] = useState<InterestFields>(EMPTY_FIELDS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key: keyof InterestFields, val: string) => {
    setF((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const valError = getFormValidationError(f);
    if (valError) return setError(valError);

    try {
      setIsLoading(true);
      setError('');
      await registrarManifestacaoInteresse(buildPayload(f));
      props.onSuccess({ nome: f.nome, instituicao: f.instituicao });
    } catch (err: unknown) {
      setError(handleInterestError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { f, update, isLoading, error, handleSubmit };
}

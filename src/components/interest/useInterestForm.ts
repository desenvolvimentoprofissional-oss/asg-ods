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

export function isFormValid(f: InterestFields): boolean {
  return Boolean(
    f.nome.trim() &&
    f.email.trim() &&
    f.telefone.trim() &&
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
    if (!isFormValid(f)) {
      return setError('Por favor, preencha todos os campos obrigatórios.');
    }
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

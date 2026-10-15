import { z } from 'zod';

export const LeadRegistrationInputSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(2, 'O nome deve conter pelo menos 2 caracteres.')
      .max(150, 'O nome deve conter no máximo 150 caracteres.'),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Endereço de e-mail institucional inválido.')
      .max(150, 'O e-mail deve conter no máximo 150 caracteres.'),
    telefone: z
      .string()
      .trim()
      .regex(/^\D*(?:\d\D*){10,11}$/, 'Telefone deve conter DDD e 8 ou 9 dígitos.')
      .max(30, 'Telefone deve conter no máximo 30 caracteres.'),
    instituicao: z
      .string()
      .trim()
      .min(2, 'A instituição deve conter pelo menos 2 caracteres.')
      .max(200, 'A instituição deve conter no máximo 200 caracteres.'),
    campus: z
      .string()
      .trim()
      .min(1, 'O campus é obrigatório.')
      .max(100, 'O campus deve conter no máximo 100 caracteres.'),
    cargo: z
      .string()
      .trim()
      .max(100, 'O cargo deve conter no máximo 100 caracteres.')
      .optional()
      .default(''),
    curso: z
      .string()
      .trim()
      .max(100, 'O curso deve conter no máximo 100 caracteres.')
      .optional()
      .default(''),
    previsaoSemestre: z
      .string()
      .trim()
      .min(1, 'A previsão de implementação é obrigatória.')
      .max(100, 'A previsão deve conter no máximo 100 caracteres.'),
    observacoes: z
      .string()
      .trim()
      .max(1000, 'As observações devem conter no máximo 1000 caracteres.')
      .optional()
      .default(''),
  })
  .strict();

export type LeadRegistrationInput = z.infer<typeof LeadRegistrationInputSchema>;

export interface LeadRegistrationRecord extends LeadRegistrationInput {
  origem: string;
  criadoEm: unknown;
}

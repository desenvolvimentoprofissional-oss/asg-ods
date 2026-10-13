import { InstitutionFields } from './InstitutionFields';
import { ContactFields } from './ContactFields';
import { CourseFields } from './CourseFields';
import { useInterestForm } from './useInterestForm';
import type { InterestFields } from './useInterestForm';

interface InterestFormProps {
  onSuccess: (data: { nome: string; instituicao: string }) => void;
}

export function FormErrorNotice({ error }: { error: string }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={
        'form-error-notice mb-4 p-3 bg-red-50 border border-red-200 text-red-700 ' +
        'text-xs rounded-lg font-medium'
      }
    >
      {error}
    </div>
  );
}

export function OrgAndContactInputs({
  f,
  update,
}: {
  f: InterestFields;
  update: (key: keyof InterestFields, val: string) => void;
}) {
  return (
    <>
      <InstitutionFields
        instituicao={f.instituicao}
        setInstituicao={(v) => update('instituicao', v)}
        campus={f.campus}
        setCampus={(v) => update('campus', v)}
      />
      <ContactFields
        nome={f.nome}
        setNome={(v) => update('nome', v)}
        cargo={f.cargo}
        setCargo={(v) => update('cargo', v)}
        email={f.email}
        setEmail={(v) => update('email', v)}
        telefone={f.telefone}
        setTelefone={(v) => update('telefone', v)}
      />
    </>
  );
}

export function AcademicInputs({
  f,
  update,
}: {
  f: InterestFields;
  update: (key: keyof InterestFields, val: string) => void;
}) {
  return (
    <CourseFields
      curso={f.curso}
      setCurso={(v) => update('curso', v)}
      previsao={f.previsao}
      setPrevisao={(v) => update('previsao', v)}
      observacoes={f.observacoes}
      setObservacoes={(v) => update('observacoes', v)}
    />
  );
}

export function InterestFormInputs({
  f,
  update,
}: {
  f: InterestFields;
  update: (key: keyof InterestFields, val: string) => void;
}) {
  return (
    <>
      <OrgAndContactInputs f={f} update={update} />
      <AcademicInputs f={f} update={update} />
    </>
  );
}

export function FormSubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="w-full mt-6 overflow-visible">
      <button
        type="submit"
        disabled={isLoading}
        className={
          'w-full min-h-[48px] bg-[#172554] text-white py-3.5 px-6 rounded-full font-semibold ' +
          'text-sm leading-normal hover:bg-blue-900 transition-all cursor-pointer shadow-sm disabled:opacity-70 ' +
          'whitespace-normal break-words flex items-center justify-center text-center'
        }
      >
        <span>{isLoading ? 'Registrando...' : 'Confirmar Interesse na Implementação'}</span>
      </button>
    </div>
  );
}

export function InterestForm({ onSuccess }: InterestFormProps) {
  const { f, update, isLoading, error, handleSubmit } = useInterestForm({ onSuccess });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Manifestação de Interesse</h2>
      </div>
      <FormErrorNotice error={error} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <InterestFormInputs f={f} update={update} />
        <FormSubmitButton isLoading={isLoading} />
      </form>
    </>
  );
}

import { inputClass, labelClass } from './interestFormUtils';

interface InstitutionFieldsProps {
  instituicao: string;
  setInstituicao: (val: string) => void;
  campus: string;
  setCampus: (val: string) => void;
}

export function IesInput(props: {
  instituicao: string;
  setInstituicao: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor="ies" className={labelClass}>Instituição de Educação (IES) *</label>
      <input
        id="ies"
        type="text"
        required
        value={props.instituicao}
        onChange={(e) => props.setInstituicao(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function CampusInput(props: {
  campus: string;
  setCampus: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor="campus" className={labelClass}>Campus / Unidade *</label>
      <input
        id="campus"
        type="text"
        required
        value={props.campus}
        onChange={(e) => props.setCampus(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function InstitutionFields(props: InstitutionFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <IesInput instituicao={props.instituicao} setInstituicao={props.setInstituicao} />
      <CampusInput campus={props.campus} setCampus={props.setCampus} />
    </div>
  );
}

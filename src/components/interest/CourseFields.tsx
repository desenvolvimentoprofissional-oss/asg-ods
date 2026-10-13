import { inputClass, labelClass } from './interestFormUtils';
import { CURSO_OPTIONS } from '../../constants/courses';

interface CourseFieldsProps {
  curso: string;
  setCurso: (val: string) => void;
  previsao: string;
  setPrevisao: (val: string) => void;
  observacoes: string;
  setObservacoes: (val: string) => void;
}

export function CourseSelect({ curso, setCurso }: { curso: string; setCurso: (v: string) => void }) {
  return (
    <div>
      <label htmlFor="curso" className={labelClass}>Curso Principal</label>
      <select
        id="curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        className={`${inputClass} ${!curso ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value="" disabled className="text-gray-400">Selecione...</option>
        {CURSO_OPTIONS.map((c) => (
          <option key={c} value={c} className="text-gray-900">{c}</option>
        ))}
      </select>
    </div>
  );
}

export function SemesterSelect({ previsao, setPrevisao }: { previsao: string; setPrevisao: (v: string) => void }) {
  return (
    <div>
      <label htmlFor="previsao" className={labelClass}>Pretende implementar em *</label>
      <select
        id="previsao"
        required
        value={previsao}
        onChange={(e) => setPrevisao(e.target.value)}
        className={`${inputClass} ${!previsao ? 'text-gray-400' : 'text-gray-900 font-semibold'}`}
      >
        <option value="" disabled className="text-gray-400">Selecione...</option>
        <option value="1º Semestre de 2027" className="text-gray-900">1º Semestre de 2027</option>
        <option value="2º Semestre de 2027" className="text-gray-900">2º Semestre de 2027</option>
      </select>
    </div>
  );
}

export function CourseAndSemesterRow(props: {
  curso: string;
  setCurso: (v: string) => void;
  previsao: string;
  setPrevisao: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CourseSelect curso={props.curso} setCurso={props.setCurso} />
      <SemesterSelect previsao={props.previsao} setPrevisao={props.setPrevisao} />
    </div>
  );
}

export function ObservationsRow({
  observacoes,
  setObservacoes,
}: {
  observacoes: string;
  setObservacoes: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor="obs" className={labelClass}>Observações adicionais (opcional)</label>
      <textarea
        id="obs"
        rows={2}
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
        className={`${inputClass} resize-none`}
      />
    </div>
  );
}

export function CourseFields(props: CourseFieldsProps) {
  return (
    <>
      <CourseAndSemesterRow
        curso={props.curso}
        setCurso={props.setCurso}
        previsao={props.previsao}
        setPrevisao={props.setPrevisao}
      />
      <ObservationsRow observacoes={props.observacoes} setObservacoes={props.setObservacoes} />
    </>
  );
}

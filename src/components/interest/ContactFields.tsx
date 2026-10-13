import { inputClass, labelClass, formatPhone } from './interestFormUtils';
import { CARGO_OPTIONS } from '../../constants/courses';

interface ContactFieldsProps {
  nome: string;
  setNome: (val: string) => void;
  cargo: string;
  setCargo: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  telefone: string;
  setTelefone: (val: string) => void;
}

export function NameInput({ nome, setNome }: { nome: string; setNome: (v: string) => void }) {
  return (
    <div>
      <label htmlFor="nome" className={labelClass}>Nome Completo *</label>
      <input
        id="nome"
        type="text"
        required
        autoComplete="name"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function CargoSelect({ cargo, setCargo }: { cargo: string; setCargo: (v: string) => void }) {
  return (
    <div>
      <label htmlFor="cargo" className={labelClass}>Cargo / Função</label>
      <select
        id="cargo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        className={`${inputClass} ${!cargo ? 'text-gray-400' : 'text-gray-900'}`}
      >
        <option value="" disabled className="text-gray-400">Selecione...</option>
        {CARGO_OPTIONS.map((c) => (
          <option key={c} value={c} className="text-gray-900">{c}</option>
        ))}
      </select>
    </div>
  );
}

export function PersonInfoRow(props: {
  nome: string;
  setNome: (v: string) => void;
  cargo: string;
  setCargo: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NameInput nome={props.nome} setNome={props.setNome} />
      <CargoSelect cargo={props.cargo} setCargo={props.setCargo} />
    </div>
  );
}

export function EmailInput({ email, setEmail }: { email: string; setEmail: (v: string) => void }) {
  return (
    <div>
      <label htmlFor="email" className={labelClass}>E-mail Institucional *</label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function PhoneInput({ telefone, setTelefone }: { telefone: string; setTelefone: (v: string) => void }) {
  return (
    <div>
      <label htmlFor="telefone" className={labelClass}>Telefone / Celular *</label>
      <input
        id="telefone"
        type="tel"
        required
        autoComplete="tel"
        value={telefone}
        onChange={(e) => setTelefone(formatPhone(e.target.value))}
        maxLength={15}
        className={inputClass}
      />
    </div>
  );
}

export function ContactInfoRow(props: {
  email: string;
  setEmail: (v: string) => void;
  telefone: string;
  setTelefone: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EmailInput email={props.email} setEmail={props.setEmail} />
      <PhoneInput telefone={props.telefone} setTelefone={props.setTelefone} />
    </div>
  );
}

export function ContactFields(props: ContactFieldsProps) {
  return (
    <>
      <PersonInfoRow
        nome={props.nome}
        setNome={props.setNome}
        cargo={props.cargo}
        setCargo={props.setCargo}
      />
      <ContactInfoRow
        email={props.email}
        setEmail={props.setEmail}
        telefone={props.telefone}
        setTelefone={props.setTelefone}
      />
    </>
  );
}

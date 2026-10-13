import { Phone, Mail } from 'lucide-react';

function ContactPhone() {
  return (
    <a
      href="tel:+551130873200"
      className={
        'flex items-center gap-[8px] text-base font-semibold ' +
        'hover:opacity-80 transition-opacity text-[#bfdbfe]'
      }
    >
      <span className="text-[#bfdbfe]">Telefone</span>
      <Phone className="w-5 h-[20px] text-[#bfdbfe]" aria-hidden="true" />
      <span className="text-[#bfdbfe]">(11) 3087-3200</span>
    </a>
  );
}

function ContactEmail() {
  return (
    <a
      href="mailto:desenvolvimentoprofissional@crasp.gov.br"
      className={
        'flex items-center gap-[8px] text-base font-semibold ' +
        'hover:opacity-80 transition-opacity text-[#bfdbfe]'
      }
    >
      <Mail className="w-5 h-[20px] text-[#bfdbfe]" aria-hidden="true" />
      <span className="text-[#bfdbfe]">
        desenvolvimento<span className="text-white font-bold">profissional</span>@crasp.gov.br
      </span>
    </a>
  );
}

function ContactOuvidoria() {
  return (
    <a
      href="https://crasp.gov.br/fale-conosco/ouvidoria/"
      target="_blank"
      rel="noopener noreferrer"
      className={
        'flex items-center gap-[8px] text-base font-semibold ' +
        'hover:opacity-80 transition-opacity text-[#bfdbfe]'
      }
    >
      <span className="text-[#bfdbfe]">Ouvidoria</span>
      <Phone className="w-5 h-[20px] shrink-0 text-[#bfdbfe]" aria-hidden="true" />
      <span className="text-[#bfdbfe]">Clique Aqui</span>
    </a>
  );
}

function FadingDividerLine() {
  return (
    <div
      className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      aria-hidden="true"
    />
  );
}

export function FooterContactBar() {
  const containerCls =
    'crasp-page-container py-4 flex flex-col md:flex-row ' +
    'items-center justify-between gap-4 md:gap-0';

  return (
    <div className="w-full bg-[#172554] text-[#bfdbfe]">
      <FadingDividerLine />
      <div className={containerCls}>
        <ContactPhone />
        <div className="hidden md:block w-px h-6 bg-white/20" aria-hidden="true" />
        <ContactEmail />
        <div className="hidden md:block w-px h-6 bg-white/20" aria-hidden="true" />
        <ContactOuvidoria />
      </div>
    </div>
  );
}

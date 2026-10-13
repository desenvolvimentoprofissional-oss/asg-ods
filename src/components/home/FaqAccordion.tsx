import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from './FaqItem';

export interface FaqDataEntry {
  q: string;
  a: string;
  itens?: readonly string[];
}

interface FaqAccordionProps {
  titulo?: string;
  faqs: readonly FaqDataEntry[];
}

function FaqExpandButton({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  const btnClass =
    'flex items-center justify-center rounded-full bg-[rgba(239,246,255,0.5)] border border-[#dbeafe] ' +
    'py-[10px] px-6 text-sm font-medium text-[#1e40af] transition-colors hover:bg-[#eff6ff] ' +
    'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400';
  const iconClass = `w-4 h-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`;

  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        className={btnClass}
        aria-expanded={isExpanded}
        aria-controls="faq-accordion-list"
      >
        <span>{isExpanded ? 'Ver menos' : 'Ver mais perguntas'}</span>
        <ChevronDown className={iconClass} aria-hidden="true" />
      </button>
    </div>
  );
}

function FaqList({
  faqs,
  openIndex,
  onSelect,
}: {
  faqs: readonly FaqDataEntry[];
  openIndex: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div id="faq-accordion-list">
      {faqs.map((faq, index) => (
        <FaqItem
          key={`faq-item-${index}`}
          id={index + 1}
          index={index}
          question={faq.q}
          answer={faq.a}
          itens={faq.itens}
          isOpen={openIndex === index}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

function useFaqState(totalFaqs: number) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const showExpandBtn = totalFaqs > 3;

  const handleToggle = () => {
    if (isExpanded) setOpenIndex(null);
    setIsExpanded(!isExpanded);
  };

  const handleSelect = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return { openIndex, isExpanded, showExpandBtn, handleToggle, handleSelect };
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  titulo = 'Perguntas Frequentes',
  faqs = [],
}) => {
  const { openIndex, isExpanded, showExpandBtn, handleToggle, handleSelect } =
    useFaqState(faqs.length);

  const visibleFaqs = showExpandBtn && !isExpanded ? faqs.slice(0, 3) : faqs;

  const cardCls =
    'bg-[#ffffff] border border-[#f3f4f6] rounded-[16px] shadow-sm p-6 md:p-8 flex flex-col justify-between w-full';

  return (
    <section
      id="perguntas"
      aria-labelledby="faq-heading"
      className="w-full bg-[#f9fafb] py-16 md:py-24 min-h-[500px]"
    >
      <div className="crasp-page-container">
        <h2 id="faq-heading" className="text-xl font-bold text-[#111827] mb-6">
          {titulo}
        </h2>
        <div className={cardCls}>
          <FaqList faqs={visibleFaqs} openIndex={openIndex} onSelect={handleSelect} />
          {showExpandBtn && <FaqExpandButton isExpanded={isExpanded} onToggle={handleToggle} />}
        </div>
      </div>
    </section>
  );
};

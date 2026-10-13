import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItemProps {
  id: number | string;
  index: number;
  question: string;
  answer: string;
  itens?: readonly string[];
  isOpen: boolean;
  onClick: () => void;
}

function FaqBulletList({ itens }: { itens: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#4b5563] leading-[1.625] pl-1">
      {itens.map((item, idx) => (
        <li key={idx} className="marker:text-[#1e40af]">
          <span className="text-[#374151]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FaqChevronIcon({ isOpen }: { isOpen: boolean }) {
  const iconClass =
    'w-5 h-[20px] text-[#6b7280] group-hover:text-blue-800 transition-transform duration-300 ' +
    (isOpen ? 'rotate-180' : '');

  return (
    <div
      className={
        'w-8 h-8 rounded-full bg-[#f9fafb] group-hover:bg-[#eff6ff] ' +
        'flex items-center justify-center shrink-0'
      }
    >
      <ChevronDown className={iconClass} aria-hidden="true" />
    </div>
  );
}

function FaqButtonLabel({ id, question }: { id: number | string; question: string }) {
  return (
    <span className="text-base font-semibold text-[#111827] pr-4 group-hover:text-blue-800 transition-colors">
      {id}. {question}
    </span>
  );
}

function FaqItemButton(props: {
  id: number | string;
  triggerId: string;
  panelId: string;
  question: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const btnClass =
    'flex items-center justify-between w-full py-6 group text-left cursor-pointer ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-lg';

  return (
    <button
      id={props.triggerId}
      type="button"
      onClick={props.onClick}
      className={btnClass}
      aria-expanded={props.isOpen}
      aria-controls={props.panelId}
    >
      <FaqButtonLabel id={props.id} question={props.question} />
      <FaqChevronIcon isOpen={props.isOpen} />
    </button>
  );
}

function FaqAnswerBody({ answer, itens }: { answer: string; itens?: readonly string[] }) {
  return (
    <>
      <p className="text-sm text-[#4b5563] leading-[1.625] whitespace-pre-line">{answer}</p>
      {itens && itens.length > 0 && <FaqBulletList itens={itens} />}
    </>
  );
}

function FaqItemContent(props: {
  panelId: string;
  triggerId: string;
  isOpen: boolean;
  answer: string;
  itens?: readonly string[];
}) {
  const bodyClass =
    'transition-all duration-300 overflow-hidden ' +
    (props.isOpen ? 'max-h-[40rem] opacity-100 pb-6' : 'max-h-0 opacity-0');

  return (
    <div
      id={props.panelId}
      role="region"
      aria-labelledby={props.triggerId}
      aria-hidden={!props.isOpen}
      className={bodyClass}
    >
      <FaqAnswerBody answer={props.answer} itens={props.itens} />
    </div>
  );
}

export const FaqItem: React.FC<FaqItemProps> = ({ id, index, question, answer, itens, isOpen, onClick }) => {
  const safeValue = String(id).replace(/[^a-zA-Z0-9_-]/g, '_') || 'item';
  const triggerId = `faq-trigger-${index}-${safeValue}`;
  const panelId = `faq-panel-${index}-${safeValue}`;

  return (
    <div className="border-b border-[#e5e7eb] last:border-b-0">
      <FaqItemButton
        id={id}
        triggerId={triggerId}
        panelId={panelId}
        question={question}
        isOpen={isOpen}
        onClick={onClick}
      />
      <FaqItemContent
        panelId={panelId}
        triggerId={triggerId}
        isOpen={isOpen}
        answer={answer}
        itens={itens}
      />
    </div>
  );
};

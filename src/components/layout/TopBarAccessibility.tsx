import { forwardRef, type RefObject } from 'react';
import { Cookie } from 'lucide-react';
import { TopBarFontSizeButtons } from './TopBarFontSizeButtons';

interface TopBarAccessibilityProps {
  fontSizeScale: number;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onResetFontSize?: () => void;
  onPrivacyClick: () => void;
  privacyButtonRef: RefObject<HTMLButtonElement | null>;
}

export function ContrastIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="crasp-a11y-icon w-3.5 h-3.5 sm:w-4 sm:h-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10V2z" />
    </svg>
  );
}

export function ContrastButton({
  isHighContrast,
  onToggle,
}: {
  isHighContrast: boolean;
  onToggle: () => void;
}) {
  const base =
    'crasp-a11y-circle-btn crasp-a11y-btn-contrast w-7 h-7 sm:w-[30px] sm:h-[30px] rounded-full ' +
    'inline-flex items-center justify-center text-inherit transition-all cursor-pointer ' +
    'focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shrink-0';

  const stateClass = isHighContrast
    ? 'bg-current/20 shadow-[inset_0_0_0_2px_currentColor]'
    : 'border border-current/35 bg-current/14 hover:bg-current/22 hover:border-current/50';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`${base} ${stateClass}`}
      aria-label="Alto contraste"
      aria-pressed={isHighContrast}
      title="Alternar modo de alto contraste"
    >
      <ContrastIcon />
    </button>
  );
}

export const PrivacyButton = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  function PrivacyButton({ onClick }, ref) {
    const cls =
      'inline-flex items-center transition hover:opacity-80 focus-visible:outline-2 ' +
      'focus-visible:outline-white focus-visible:outline-offset-2 shrink-0 cursor-pointer';

    return (
      <button
        ref={ref}
        type="button"
        className={cls}
        aria-label="Gerenciamento de Cookies e Privacidade"
        title="Privacidade e Cookies"
        onClick={onClick}
      >
        <Cookie className="h-5 w-5 text-white" strokeWidth={2.2} aria-hidden="true" />
      </button>
    );
  }
);

export function TopBarAccessibility(props: TopBarAccessibilityProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div
        className="crasp-accessibility-toolbar flex shrink-0 flex-nowrap items-center gap-1.5 sm:gap-2"
        role="toolbar"
        aria-label="Ferramentas de acessibilidade"
      >
        <span className="crasp-a11y-label hidden text-xs font-medium sm:inline sm:text-sm">
          Acessibilidade
        </span>
        <div className="crasp-a11y-actions flex shrink-0 flex-nowrap items-center gap-1 sm:gap-1.5">
          <ContrastButton isHighContrast={props.isHighContrast} onToggle={props.onToggleHighContrast} />
          <TopBarFontSizeButtons
            scale={props.fontSizeScale}
            onIncreaseFontSize={props.onIncreaseFontSize}
            onDecreaseFontSize={props.onDecreaseFontSize}
            onResetFontSize={props.onResetFontSize}
          />
        </div>
      </div>
      <PrivacyButton ref={props.privacyButtonRef} onClick={props.onPrivacyClick} />
    </div>
  );
}

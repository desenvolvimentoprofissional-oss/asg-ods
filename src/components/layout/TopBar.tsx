import React, { useState, useRef } from 'react';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibilitySync } from '../../hooks/useAccessibilitySync';
import { TopBarAccessibility } from './TopBarAccessibility';
import { TopBarSocial } from './TopBarSocial';
import { PrivacyDialog } from './PrivacyDialog';

const BASE_BTN_CLASS =
  'topbar-auth-btn bg-yellow-500 text-blue-900 rounded-full py-2 min-w-[134px] sm:min-w-[154px] ' +
  'text-sm font-semibold flex items-center justify-center gap-2 ' +
  'hover:bg-yellow-400 transition-colors shadow-xs cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-blue-900 no-underline';

export function TopBarActionBtn() {
  return (
    <Link
      to="/login"
      onClick={() => window.scrollTo(0, 0)}
      aria-label="Entrar"
      className={BASE_BTN_CLASS}
    >
      <LogIn className="w-4 h-4" aria-hidden="true" />
      <span>Entrar</span>
    </Link>
  );
}

export function TopBarRightSection() {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <TopBarSocial />
      <div className="hidden md:block w-px h-6 bg-blue-800" aria-hidden="true" />
      <TopBarActionBtn />
    </div>
  );
}

export function TopBarInnerContainer({
  acc,
  privacyButtonRef,
  onOpenPrivacy,
}: {
  acc: ReturnType<typeof useAccessibilitySync>;
  privacyButtonRef: React.RefObject<HTMLButtonElement | null>;
  onOpenPrivacy: () => void;
}) {
  return (
    <div
      className={
        'max-w-[1152px] mx-auto py-2 px-3 sm:px-4 flex flex-wrap ' +
        'justify-between items-center gap-2 text-sm'
      }
    >
      <TopBarAccessibility
        fontSizeScale={acc.fontSizeScale}
        isHighContrast={acc.isHighContrast}
        onToggleHighContrast={acc.toggleHighContrast}
        onIncreaseFontSize={acc.increaseFontSize}
        onDecreaseFontSize={acc.decreaseFontSize}
        onResetFontSize={acc.resetFontSize}
        onPrivacyClick={onOpenPrivacy}
        privacyButtonRef={privacyButtonRef}
      />
      <TopBarRightSection />
    </div>
  );
}

export function TopBarRegion(props: {
  acc: ReturnType<typeof useAccessibilitySync>;
  privacyButtonRef: React.RefObject<HTMLButtonElement | null>;
  onOpenPrivacy: () => void;
}) {
  return (
    <div
      role="region"
      aria-label="Barra de Acessibilidade e Identificação Institucional"
      className="w-full bg-blue-900 border-b border-blue-800 text-blue-100"
    >
      <TopBarInnerContainer
        acc={props.acc}
        privacyButtonRef={props.privacyButtonRef}
        onOpenPrivacy={props.onOpenPrivacy}
      />
    </div>
  );
}

export const TopBar: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const privacyButtonRef = useRef<HTMLButtonElement | null>(null);
  const acc = useAccessibilitySync();

  return (
    <>
      <TopBarRegion
        acc={acc}
        privacyButtonRef={privacyButtonRef}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />
      <PrivacyDialog
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        triggerRef={privacyButtonRef}
      />
    </>
  );
};

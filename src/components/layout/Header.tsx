import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CraspLogo } from './CraspLogo';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileMenu } from './HeaderMobileMenu';

export function HeaderMobileActions({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex md:hidden items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        className={
          'w-9 h-9 rounded-full bg-white border border-[#e5e7eb] hover:border-[#1e40af] ' +
          'shadow-xs flex items-center justify-center text-[#374151] transition-colors ' +
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e40af]'
        }
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#374151]" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5 text-[#374151]" strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white relative z-40 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1152px] mx-auto py-4 px-4 flex justify-between items-center gap-3">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
          <Link
            to="/"
            aria-label="CRA-SP - Página inicial"
            className={
              'bg-transparent border-0 p-0 cursor-pointer text-left flex items-center ' +
              'no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e40af] rounded-lg'
            }
          >
            <CraspLogo className="crasp-logo w-auto h-[40px] lg:h-[2.75rem]" />
          </Link>
          <HeaderDesktopNav />
        </div>
        <HeaderMobileActions
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>
      <HeaderMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

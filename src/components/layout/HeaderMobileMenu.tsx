import { Link, useLocation } from 'react-router-dom';
import { headerNavigation } from '../../constants/navigation';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuItem({
  item,
  onClose,
}: {
  item: { name: string; path: string };
  onClose: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const cls =
    'block rounded-full px-4 py-2.5 text-base font-normal transition-colors cursor-pointer no-underline ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e40af] ' +
    (isActive ? 'bg-[#f9fafb] text-[#1e40af]' : 'text-[#374151] hover:bg-[#f9fafb] hover:text-[#1e40af]');

  if (item.path !== '#') {
    return (
      <Link
        to={item.path}
        className={cls}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClose}
      >
        {item.name}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClose}>
      {item.name}
    </button>
  );
}

export function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <nav
      id="mobile-navigation-menu"
      className="md:hidden border-t border-[#f3f4f6] bg-white py-3 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
      aria-label="Menu Mobile"
    >
      <div className="flex flex-col gap-1">
        {headerNavigation.map((item) => (
          <MobileMenuItem key={item.name} item={item} onClose={onClose} />
        ))}
      </div>
    </nav>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { headerNavigation } from '../../constants/navigation';

export function HeaderDesktopNav() {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-1 lg:gap-3" aria-label="Navegação Principal">
      {headerNavigation.map((item) => {
        const isActive = location.pathname === item.path;
        const cls =
          'block rounded-full px-4 py-3 text-base font-normal transition-colors cursor-pointer no-underline ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e40af] ' +
          (isActive ? 'bg-[#f9fafb] text-[#1e40af]' : 'text-[#374151] hover:bg-[#f9fafb] hover:text-[#1e40af]');

        return item.path !== '#' ? (
          <Link
            key={item.name}
            to={item.path}
            aria-current={isActive ? 'page' : undefined}
            className={cls}
          >
            {item.name}
          </Link>
        ) : (
          <button key={item.name} type="button" className={cls}>
            {item.name}
          </button>
        );
      })}
    </nav>
  );
}

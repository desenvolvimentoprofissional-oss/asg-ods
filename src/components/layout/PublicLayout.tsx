import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { Footer } from './Footer';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Início | Componente Curricular de ASG e ODS | CRA-SP',
  '/chancela': 'Chancela Institucional | CRA-SP',
  '/metodologia': 'Metodologia e Diretrizes | CRA-SP',
  '/trilha': 'Trilha de Aprendizagem | CRA-SP',
  '/registro-interesse': 'Manifestação de Interesse | CRA-SP',
};

export const PublicLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || 'Componente Curricular de ASG e ODS | CRA-SP';
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900 flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

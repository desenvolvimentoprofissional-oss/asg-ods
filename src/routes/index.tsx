import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Home } from '../pages/Home';

const Metodologia = lazy(() => import('../pages/Metodologia').then((m) => ({ default: m.Metodologia })));
const Chancela = lazy(() => import('../pages/Chancela').then((m) => ({ default: m.Chancela })));
const Trilha = lazy(() => import('../pages/Trilha').then((m) => ({ default: m.Trilha })));
const InterestRegistrationPage = lazy(() =>
  import('../pages/InterestRegistrationPage').then((m) => ({ default: m.InterestRegistrationPage }))
);

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50" aria-busy="true">
    <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/registro-interesse" element={<InterestRegistrationPage />} />
        <Route path="/login" element={<Navigate to="/registro-interesse" replace />} />
        <Route path="/cadastro" element={<Navigate to="/registro-interesse" replace />} />
        <Route path="/area-docente/*" element={<Navigate to="/registro-interesse" replace />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/chancela" element={<Chancela />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};


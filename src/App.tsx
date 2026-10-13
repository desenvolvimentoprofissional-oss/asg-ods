import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useAccessibilitySync } from './hooks/useAccessibilitySync';

const PresentationMode = lazy(() =>
  import('./components/presentation/PresentationMode').then((m) => ({ default: m.PresentationMode }))
);
const VLibrasWidget = lazy(() =>
  import('./components/accessibility/VLibrasWidget').then((m) => ({ default: m.VLibrasWidget }))
);

function AccessibilitySyncHost() {
  useAccessibilitySync();
  return null;
}

function ScrollToTopHost() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopHost />
      <AccessibilitySyncHost />
      <AppRoutes />
      <Suspense fallback={null}>
        <PresentationMode />
        <VLibrasWidget />
      </Suspense>
    </BrowserRouter>
  );
}

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { HomeLogosBar } from './HomeLogosBar';

function HeroResponsivePicture() {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="/imgs/image2.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/imgs/image1.webp"
        type="image/webp"
      />
      <img
        src="/imgs/image1.webp"
        alt=""
        className="h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width="1600"
        height="600"
      />
    </picture>
  );
}

export function HomeHeroBackground() {
  const overlayClass =
    'absolute inset-0 z-[5] pointer-events-none ' +
    'bg-gradient-to-r from-black/25 via-black/5 to-transparent';

  return (
    <div className="absolute inset-0">
      <HeroResponsivePicture />
      <div className={overlayClass} aria-hidden="true" />
    </div>
  );
}

function HomeHeroTitle() {
  return (
    <h1 className="text-5xl leading-tight text-white sm:text-6xl drop-shadow-md">
      <span className="font-bold sm:font-[750]">
        Componente<br />Curricular de<br />
      </span>
      <span className="font-black sm:font-extrabold">
        ASG e ODS
      </span>
    </h1>
  );
}

function HomeHeroCta() {
  const ctaClass =
    'main-banner-cta inline-flex items-center gap-2 rounded-full bg-blue-800 ' +
    'px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 ' +
    'cursor-pointer no-underline';

  return (
    <Link
      to="/registro-interesse"
      onClick={() => window.scrollTo(0, 0)}
      className={ctaClass}
    >
      Registrar interesse
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}

export function HomeHeroContent() {
  return (
    <div className="max-w-2xl space-y-4">
      <Badge variant="primary">Lançamento Oficial</Badge>
      <HomeHeroTitle />
      <p className="w-4/5 text-lg text-gray-200 drop-shadow">
        Integre à sua matriz um componente curricular gratuito, totalmente estruturado e elaborado por
        instituições de referência no país.
      </p>
      <HomeHeroCta />
    </div>
  );
}

export function HomeHero() {
  return (
    <section aria-label="Banner Principal" className="relative h-[600px] w-full overflow-hidden bg-gray-100">
      <HomeHeroBackground />
      <div className="crasp-page-container relative flex h-full items-center py-10 pb-16 z-10">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <HomeHeroContent />
        </div>
      </div>
      <HomeLogosBar />
    </section>
  );
}

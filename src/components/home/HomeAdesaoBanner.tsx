import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function AdesaoBannerBackground() {
  return (
    <div className="absolute inset-0">
      <img
        alt="Componente Curricular de ASG e ODS"
        loading="lazy"
        decoding="async"
        className="crasp-evento-img absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 40%' }}
        src="/imgs/image3.webp"
        width="1600"
        height="679"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
    </div>
  );
}

export function AdesaoCtaButton() {
  return (
    <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-3">
      <Link
        to="/registro-interesse"
        onClick={() => window.scrollTo(0, 0)}
        className={
          'inline-flex items-center gap-2 rounded-full bg-blue-800 px-6 py-3 ' +
          'text-sm font-semibold text-white transition hover:bg-blue-900 cursor-pointer ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 no-underline'
        }
      >
        <span>Registrar interesse</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

export function HomeAdesaoBanner() {
  const contentCls =
    'crasp-evento-content relative flex flex-col items-center justify-center ' +
    'gap-3 py-6 px-3 sm:px-6 md:py-8 md:px-6 lg:py-10 lg:px-8 text-center text-white';

  return (
    <section aria-label="COMPONENTE CURRICULAR DE ASG E ODS" className="bg-white">
      <div className="crasp-page-container py-12">
        <div className="adesao-banner-card relative overflow-hidden rounded-2xl">
          <AdesaoBannerBackground />
          <div className={contentCls}>
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              COMPONENTE CURRICULAR DE ASG E ODS
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold max-w-5xl leading-snug">
              Conteúdo de excelência, pronto para
              <br className="hidden sm:inline" /> o seu Ambiente Virtual de Aprendizagem
            </h2>
            <AdesaoCtaButton />
          </div>
        </div>
      </div>
    </section>
  );
}

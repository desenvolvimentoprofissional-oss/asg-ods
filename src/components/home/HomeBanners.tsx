import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function BannerTextContent({
  titleTop,
  titleBottom,
  subtitle,
}: {
  titleTop: string;
  titleBottom: string;
  subtitle: string;
}) {
  return (
    <>
      <h2 className="relative z-10 mb-4 w-4/5 text-3xl font-bold">
        {titleTop}<br />{titleBottom}
      </h2>
      <span className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold">
        {subtitle}
        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </>
  );
}

export function ChancelaCard() {
  return (
    <Link
      className={
        'card-chancela-banner group relative flex flex-col justify-between ' +
        'overflow-visible rounded-2xl bg-blue-900 p-10 text-white transition hover:bg-blue-950'
      }
      to="/chancela"
    >
      <BannerTextContent
        titleTop="Chancela"
        titleBottom="Institucional"
        subtitle="Do Manifesto ao Componente Curricular"
      />
      <img
        alt=""
        loading="lazy"
        width="200"
        height="200"
        className={
          'absolute bottom-0 right-0 md:right-4 z-0 object-contain object-bottom ' +
          'object-right md:scale-[1.03] origin-bottom-right'
        }
        src="/imgs/card-chancela.webp"
        referrerPolicy="no-referrer"
      />
    </Link>
  );
}

export function MetodologiaCard() {
  return (
    <Link
      className={
        'card-metodologia-banner group relative flex flex-col justify-between ' +
        'overflow-visible rounded-2xl bg-gray-900 p-10 text-white transition hover:bg-gray-950'
      }
      to="/metodologia"
    >
      <BannerTextContent
        titleTop="Metodologia"
        titleBottom="Dinâmica"
        subtitle="Videoaulas, Podcasts e muito mais"
      />
      <img
        alt=""
        loading="lazy"
        width="200"
        height="200"
        className={
          'absolute bottom-0 right-0 md:right-4 z-0 object-contain object-bottom ' +
          'object-right brightness-[1.15] md:scale-[1.075] origin-bottom-right'
        }
        src="/imgs/card-metodologia.webp"
        referrerPolicy="no-referrer"
      />
    </Link>
  );
}

export function HomeBanners() {
  return (
    <section className="bg-white">
      <div className="crasp-page-container py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChancelaCard />
          <MetodologiaCard />
        </div>
      </div>
    </section>
  );
}

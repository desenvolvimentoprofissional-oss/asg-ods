import { lazy, Suspense } from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeBanners } from '../components/home/HomeBanners';
import { faqsData } from '../constants/content';

const HomeModules = lazy(() =>
  import('../components/home/HomeModules').then((m) => ({ default: m.HomeModules }))
);
const HomeAdesaoBanner = lazy(() =>
  import('../components/home/HomeAdesaoBanner').then((m) => ({ default: m.HomeAdesaoBanner }))
);
const FaqAccordion = lazy(() =>
  import('../components/home/FaqAccordion').then((m) => ({ default: m.FaqAccordion }))
);
const PartnerNames = lazy(() =>
  import('../components/PartnerNames').then((m) => ({ default: m.PartnerNames }))
);

export function Home() {
  return (
    <>
      <HomeHero />
      <HomeBanners />
      <Suspense fallback={<div className="min-h-12" aria-hidden="true" />}>
        <HomeModules />
        <HomeAdesaoBanner />
        <FaqAccordion faqs={faqsData} />
        <PartnerNames disableCarousel={true} />
      </Suspense>
    </>
  );
}

export default Home;

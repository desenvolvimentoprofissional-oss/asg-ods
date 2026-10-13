import { PartnerNamesStaticList } from './partners/PartnerNamesStaticList';
import { PartnerNamesMarquee } from './partners/PartnerNamesMarquee';

interface PartnerNamesProps {
  disableCarousel?: boolean;
}

function PartnerGlowOrbs() {
  const orb1Class =
    'absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600 rounded-full opacity-20 blur-[100px]';
  const orb2Class =
    'absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-950 rounded-full opacity-50 blur-[120px]';

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className={orb1Class} />
      <div className={orb2Class} />
    </div>
  );
}

export const PartnerNames = ({ disableCarousel = false }: PartnerNamesProps) => {
  return (
    <section className="partner-names-section bg-[#172554] pt-10 md:pt-14 pb-16 md:pb-20 relative overflow-hidden">
      <PartnerGlowOrbs />
      <div className="crasp-page-container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-blue-100/90 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Uma rede de instituições de excelência comprometida <br className="hidden md:block" />
            com a formação de líderes para um futuro sustentável.
          </p>
        </div>
      </div>
      {disableCarousel ? <PartnerNamesStaticList /> : <PartnerNamesMarquee />}
    </section>
  );
};

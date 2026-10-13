import { partners } from '../../constants/partners';
import { PartnerLogoItem } from './PartnerLogoItem';

export function PartnerNamesMarquee() {
  const maskStyle =
    'relative flex overflow-hidden w-full z-10 py-4 -my-4 ' +
    '[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]';

  return (
    <div className={maskStyle}>
      <div className="flex w-max animate-marquee">
        {[...Array(4)].map((_, setIdx) => (
          <div key={setIdx} className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20">
            {partners.map((partner, idx) => (
              <div key={idx} className="min-w-[120px]">
                <PartnerLogoItem partner={partner} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

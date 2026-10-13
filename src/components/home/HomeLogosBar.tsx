import { partners } from '../../constants/partners';
import type { Partner } from '../../constants/partners';

export function HomeMarqueeLogoItem({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center justify-center min-w-[120px]">
      <img
        src={partner.img}
        alt={partner.title}
        width={120}
        height={40}
        className={
          'max-h-8 md:max-h-10 max-w-[120px] object-contain transition-all ' +
          `duration-500 ${partner.scaleClass || ''}`
        }
        style={{ filter: partner.baseFilter || 'none' }}
        onMouseEnter={(e) => {
          if (partner.hoverFilter) e.currentTarget.style.filter = partner.hoverFilter;
        }}
        onMouseLeave={(e) => {
          if (partner.baseFilter) e.currentTarget.style.filter = partner.baseFilter;
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export function HomeLogosBar() {
  return (
    <div
      className={
        'logos-carousel-bar absolute bottom-0 left-0 w-full overflow-hidden ' +
        'py-3 bg-black/10 backdrop-blur-sm border-t border-white/10 z-20'
      }
    >
      <div className="relative flex overflow-hidden mx-auto max-w-7xl">
        <div className="flex w-max animate-marquee">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20">
              {partners.map((partner, idx) => (
                <HomeMarqueeLogoItem key={idx} partner={partner} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

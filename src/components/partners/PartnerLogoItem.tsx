import type { Partner } from '../../constants/partners';

export function PartnerLogoItem({ partner }: { partner: Partner }) {
  return (
    <div className="group flex items-center justify-center transition-transform duration-500 hover:-translate-y-2">
      <img
        src={partner.img}
        alt={partner.title}
        width={140}
        height={40}
        className={
          'partner-logo-img max-h-12 md:max-h-14 max-w-[165px] md:max-w-[180px] ' +
          `object-contain transition-all duration-500 ${partner.scaleClass || ''}`
        }
        style={{ filter: 'brightness(0) invert(1) opacity(0.55)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter =
            'brightness(0) invert(1) opacity(1) drop-shadow(0 4px 12px rgba(255,255,255,0.1))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(0.55)';
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

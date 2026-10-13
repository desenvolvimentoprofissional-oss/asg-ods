import { partners } from '../../constants/partners';
import { PartnerLogoItem } from './PartnerLogoItem';

export function PartnerNamesStaticList() {
  return (
    <div className="crasp-page-container relative z-10">
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 py-2">
        {partners.map((partner, idx) => (
          <PartnerLogoItem key={idx} partner={partner} />
        ))}
      </div>
    </div>
  );
}

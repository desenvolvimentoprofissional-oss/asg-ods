import { ChancelaSvgFilters } from '../components/chancela/ChancelaSvgFilters';
import { ChancelaBanner } from '../components/chancela/ChancelaBanner';
import { ChancelaManifesto } from '../components/chancela/ChancelaManifesto';
import { SignatoriesCarousel } from '../components/presentation/SignatoriesCarousel';

export function Chancela() {
  return (
    <div className="flex-1 flex flex-col w-full">
      <ChancelaSvgFilters />
      <ChancelaBanner />
      <ChancelaManifesto />
      <section className="bg-gray-50 py-16">
        <div className="crasp-page-container">
          <SignatoriesCarousel />
        </div>
      </section>
    </div>
  );
}

export default Chancela;

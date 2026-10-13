import { MetodologiaBanner } from '../components/metodologia/MetodologiaBanner';
import { MetodologiaPillars } from '../components/metodologia/MetodologiaPillars';
import { MetodologiaFormats } from '../components/metodologia/MetodologiaFormats';
import { MetodologiaImplementation } from '../components/metodologia/MetodologiaImplementation';

export function Metodologia() {
  return (
    <div className="flex-1 flex flex-col w-full">
      <MetodologiaBanner />
      <MetodologiaPillars />
      <MetodologiaFormats />
      <MetodologiaImplementation />
    </div>
  );
}

export default Metodologia;

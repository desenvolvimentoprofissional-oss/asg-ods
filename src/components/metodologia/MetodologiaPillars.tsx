import { metodologiaData } from '../../constants/metodologia';
import { Card } from '../ui/Card';

type PillarItem = (typeof metodologiaData.pillars)[number];

export function PillarCard({ pillar }: { pillar: PillarItem }) {
  return (
    <Card hoverable className="p-6 flex flex-col">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-800 mb-6">
        <pillar.icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{pillar.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{pillar.desc}</p>
    </Card>
  );
}

export function MetodologiaPillars() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="crasp-page-container">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">{metodologiaData.intro.title}</h2>
          </div>
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            {metodologiaData.intro.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metodologiaData.pillars.map((pillar, idx) => (
              <PillarCard key={idx} pillar={pillar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

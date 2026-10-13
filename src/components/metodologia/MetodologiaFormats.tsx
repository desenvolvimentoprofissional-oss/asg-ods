import { metodologiaData } from '../../constants/metodologia';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

type FormatItem = (typeof metodologiaData.formats.items)[number];

export function FormatItemCard({ format }: { format: FormatItem }) {
  return (
    <Card hoverable className="p-6 flex flex-col bg-gray-50">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-800 mb-6">
        <format.icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{format.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{format.desc}</p>
      <div className="mt-6 flex justify-end">
        <Badge variant="blue-light">{format.duration}</Badge>
      </div>
    </Card>
  );
}

export function MetodologiaFormats() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="crasp-page-container">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">{metodologiaData.formats.title}</h2>
          </div>
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            {metodologiaData.formats.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metodologiaData.formats.items.map((format, idx) => (
              <FormatItemCard key={idx} format={format} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

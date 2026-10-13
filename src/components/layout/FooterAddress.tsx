import { MapPin } from 'lucide-react';

function AddressDetails() {
  return (
    <div className="space-y-1 text-sm text-[#dbeafe]">
      <p className="font-semibold text-white">Endereço</p>
      <p>Rua Estados Unidos, 889</p>
      <p>Jardim América, CEP: 01427-001</p>
      <p>São Paulo/SP</p>
    </div>
  );
}

export function FooterAddress() {
  const mapUrl =
    'https://www.google.com/maps/dir//Rua+Estados+Unidos,+889+-+Jardim+Am%C3%A9rica,+S%C3%A3o+Paulo+-+SP';
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white">CRA-SP</h3>
      <p className="text-sm text-[#dbeafe] leading-relaxed">
        O Conselho Regional de Administração de São Paulo é responsável pela regulamentação e
        fiscalização da profissão de Administrador no estado de São Paulo.
      </p>
      <AddressDetails />
      <div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            'footer-map-btn inline-flex items-center justify-center gap-2 rounded-full ' +
            'bg-white py-2 px-4 text-sm font-semibold text-[#1e3a8a] transition hover:bg-gray-100'
          }
        >
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span>Como chegar</span>
        </a>
      </div>
    </div>
  );
}

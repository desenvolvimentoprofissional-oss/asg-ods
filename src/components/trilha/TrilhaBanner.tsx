import { trilhaData } from '../../constants/trilha';

export function TrilhaBannerBg() {
  return (
    <div className="absolute inset-0">
      <img
        alt="Background"
        loading="lazy"
        decoding="async"
        className="object-cover object-left w-full h-full scale-150 md:scale-100 transition-transform duration-500"
        src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?w=1600&auto=format&fit=crop&q=75"
        referrerPolicy="no-referrer"
      />
      <div
        className={
          'absolute inset-0 bg-gradient-to-r from-black/75 via-black/[0.55] ' +
          'to-transparent md:via-black/[0.35] mix-blend-multiply'
        }
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/[0.65] via-black/[0.35] to-transparent" />
    </div>
  );
}

export function TrilhaBannerText() {
  return (
    <div className="crasp-page-container relative py-8">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl drop-shadow-md">
          {trilhaData.header.title}
        </h1>
        <p className="w-4/5 text-lg text-gray-200 drop-shadow leading-relaxed">
          {trilhaData.header.subtitle}
        </p>
      </div>
    </div>
  );
}

export function TrilhaBanner() {
  return (
    <section
      className={
        'page-header-banner relative overflow-hidden bg-gray-900 ' +
        'min-h-[380px] md:min-h-[388px] flex items-center'
      }
    >
      <TrilhaBannerBg />
      <TrilhaBannerText />
    </section>
  );
}

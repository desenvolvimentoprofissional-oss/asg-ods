export function ChancelaBannerBg() {
  return (
    <div className="absolute inset-0">
      <img
        alt="Background Chancela"
        loading="lazy"
        decoding="async"
        className="object-cover object-left w-full h-full scale-150 md:scale-100 transition-transform duration-500"
        src="/imgs/chancela-banner.webp"
        referrerPolicy="no-referrer"
      />
      <div
        className={
          'absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 ' +
          'to-transparent md:via-black/30 mix-blend-multiply'
        }
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
    </div>
  );
}

export function ChancelaBannerText() {
  return (
    <div className="crasp-page-container relative py-8">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl drop-shadow-md">
          Chancela Institucional
        </h1>
        <p className="w-4/5 text-lg text-gray-200 drop-shadow leading-relaxed">
          Uma aliança inédita entre as principais instituições do país para entregar e chancelar uma disciplina
          de excelência em ASG e ODS.
        </p>
      </div>
    </div>
  );
}

export function ChancelaBanner() {
  return (
    <section
      className={
        'page-header-banner relative overflow-hidden bg-gray-900 ' +
        'min-h-[380px] md:min-h-[388px] flex items-center'
      }
    >
      <ChancelaBannerBg />
      <ChancelaBannerText />
    </section>
  );
}

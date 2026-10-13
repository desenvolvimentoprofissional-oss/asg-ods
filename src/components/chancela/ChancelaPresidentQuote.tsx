export function QuoteAuthorAvatar() {
  return (
    <div
      className={
        'relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-900 ' +
        'shadow-sm bg-blue-100 flex items-center justify-center shrink-0'
      }
    >
      <img
        src="/imgs/alberto-whitaker.webp"
        alt="Adm. Alberto Whitaker"
        className="w-full h-full object-cover relative z-10"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center font-bold text-blue-900 text-sm">
        AW
      </span>
    </div>
  );
}

export function QuoteAuthorFooter() {
  return (
    <footer className="flex items-center gap-4">
      <QuoteAuthorAvatar />
      <div>
        <div className="font-bold text-gray-900">Adm. Alberto Whitaker</div>
        <div className="text-sm text-gray-600">Presidente do CRA-SP</div>
      </div>
    </footer>
  );
}

export function ChancelaPresidentQuote() {
  return (
    <blockquote
      className={
        'my-10 mx-auto w-[95%] md:w-[90%] border-l-4 border-blue-900 ' +
        'bg-blue-50 p-6 md:p-8 rounded-r-lg'
      }
    >
      <p className="text-xl italic text-gray-800 mb-6">
        "Quando lançamos o manifesto, sabíamos que as ações precisavam falar mais alto que as palavras. Hoje,
        estamos entregando uma ferramenta de transformação para apoiar as Instituições de Educação Superior na
        formação de gestores mais conscientes, éticos e preparados para liderar com propósito."
      </p>
      <QuoteAuthorFooter />
    </blockquote>
  );
}

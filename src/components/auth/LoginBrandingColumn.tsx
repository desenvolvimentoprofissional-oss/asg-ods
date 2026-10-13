import { Leaf } from 'lucide-react';

function LoginGlowOrbs() {
  const orb1Class =
    'absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600 rounded-full opacity-20 blur-[100px]';
  const orb2Class =
    'absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-950 rounded-full opacity-50 blur-[120px]';

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className={orb1Class} />
      <div className={orb2Class} />
    </div>
  );
}

function LoginBrandingContent() {
  const badgeClass =
    'w-16 h-16 rounded-[16px] bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-md ' +
    'border border-white/20 mb-8 shadow-lg';
  const titleClass = 'text-3xl xl:text-4xl font-bold tracking-tight text-white mb-4 leading-tight';

  return (
    <div className="relative z-10 flex flex-col h-full justify-center p-12 lg:p-16 xl:p-24">
      <div className="w-full max-w-lg mx-auto">
        <div className={badgeClass}>
          <Leaf className="w-8 h-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h1 className={titleClass}>
          <span className="block font-bold text-blue-200">Componente Curricular de ASG e ODS</span>
        </h1>
        <p className="text-sm text-blue-100/80 leading-relaxed max-w-md">
          Adesão gratuita e irrestrita para Instituições de Educação Superior.
          Conteúdo completo, chancelado e pronto para o seu AVA.
        </p>
      </div>
    </div>
  );
}

export function LoginBrandingColumn() {
  return (
    <div className="hidden lg:block lg:w-1/2 relative bg-[#172554] overflow-hidden">
      <LoginGlowOrbs />
      <LoginBrandingContent />
    </div>
  );
}

export default LoginBrandingColumn;

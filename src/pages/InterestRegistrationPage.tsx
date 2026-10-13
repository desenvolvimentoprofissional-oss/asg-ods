import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { LoginBrandingColumn } from '../components/auth/LoginBrandingColumn';
import { InterestForm } from '../components/interest/InterestForm';

export function SuccessHomeButton() {
  return (
    <div className="pt-4">
      <Link
        to="/"
        className={
          'inline-flex items-center justify-center px-8 py-3 bg-[#172554] hover:bg-blue-900 ' +
          'text-white rounded-lg font-semibold text-sm transition-colors no-underline'
        }
      >
        Voltar à Página Principal
      </Link>
    </div>
  );
}

export function InterestSuccessView({ nome }: { nome: string; instituicao?: string }) {
  const primeiroNome = nome.trim().split(/\s+/)[0] || '';
  return (
    <div className="text-center py-10 space-y-4">
      <div
        className={
          'form-success-icon w-16 h-16 bg-green-100 text-green-700 rounded-full ' +
          'flex items-center justify-center mx-auto'
        }
      >
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Interesse Registrado!</h2>
      <p className="text-base sm:text-lg text-gray-700 max-w-lg mx-auto leading-relaxed">
        Olá <strong className="text-blue-900">{primeiroNome}</strong>, agradecemos o interesse! Assim que os
        conteúdos estiverem disponíveis, a equipe do CRA-SP entrará em contato para disponibilizar
        as orientações de adesão.
      </p>
      <SuccessHomeButton />
    </div>
  );
}

export function BackToHomeLink() {
  return (
    <Link
      to="/"
      aria-label="Voltar ao início"
      className={
        'inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors ' +
        'font-medium px-3 py-2 rounded-lg hover:bg-gray-100 text-sm mb-6 self-start no-underline'
      }
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar ao início</span>
    </Link>
  );
}

export function InterestRegistrationPage() {
  const [submittedData, setSubmittedData] = useState<{
    nome: string;
    instituicao: string;
  } | null>(null);

  useEffect(() => {
    document.title = 'Manifestação de Interesse | CRA-SP';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
      <LoginBrandingColumn />
      <main
        className={
          'w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-10 xl:px-14 ' +
          'py-10 min-h-screen overflow-y-auto'
        }
      >
        <div className="w-full max-w-xl mx-auto">
          <BackToHomeLink />
          {submittedData ? (
            <InterestSuccessView nome={submittedData.nome} instituicao={submittedData.instituicao} />
          ) : (
            <InterestForm onSuccess={(data) => setSubmittedData(data)} />
          )}
        </div>
      </main>
    </div>
  );
}

export default InterestRegistrationPage;

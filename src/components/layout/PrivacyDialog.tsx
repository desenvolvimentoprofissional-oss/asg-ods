import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

function PrivacyDialogHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <h2 id="privacy-dialog-title" className="text-lg font-bold text-gray-900 leading-tight">
          Diretrizes de Governança e Privacidade
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar diálogo de governança e privacidade"
        className={
          'p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer'
        }
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}

function PrivacyDialogDescription() {
  return (
    <div id="privacy-dialog-description" className="space-y-4 text-sm text-gray-600 leading-relaxed">
      <p>
        As preferências de tamanho de fonte e alto contraste deste portal são persistidas localmente
        pela chave <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-blue-900 font-mono">
          crasp_a11y_state
        </code>.
      </p>
      <p>
        Este armazenamento local tem a finalidade exclusiva de preservar a usabilidade e as configurações de
        acessibilidade selecionadas pelo usuário durante sua navegação neste dispositivo.
      </p>
      <p>
        Para informações institucionais ou requisições de titulares, consulte os canais oficiais do Conselho
        Regional de Administração de São Paulo disponíveis no rodapé deste portal.
      </p>
    </div>
  );
}

function PrivacyDialogActions({ onClose }: { onClose: () => void }) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={onClose}
        className={
          'px-5 py-2.5 bg-[#172554] text-white rounded-lg font-semibold text-sm hover:bg-blue-900 ' +
          'transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ' +
          'focus-visible:ring-blue-600'
        }
      >
        Entendido
      </button>
    </div>
  );
}

function useNativeDialog(
  isOpen: boolean,
  onClose: () => void,
  triggerRef: React.RefObject<HTMLButtonElement | null>
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleClose = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    onClose();
    triggerRef.current?.focus();
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleClose();
  };

  return { dialogRef, handleClose, handleCancel };
}

export function PrivacyDialog({ isOpen, onClose, triggerRef }: PrivacyDialogProps) {
  const { dialogRef, handleClose, handleCancel } = useNativeDialog(isOpen, onClose, triggerRef);

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      aria-labelledby="privacy-dialog-title"
      aria-describedby="privacy-dialog-description"
      className={
        'backdrop:bg-black/60 rounded-2xl p-6 sm:p-8 max-w-lg w-full bg-white shadow-2xl ' +
        'border border-gray-200 text-gray-800 m-auto'
      }
    >
      <PrivacyDialogHeader onClose={handleClose} />
      <PrivacyDialogDescription />
      <PrivacyDialogActions onClose={handleClose} />
    </dialog>
  );
}

import { useEffect, useRef, useState, type MutableRefObject } from 'react';

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
  }
}

export const VLIBRAS_VERSION = '7.12.2';
export const VLIBRAS_URL = 'https://vlibras.gov.br/app';
export const VLIBRAS_SCRIPT_URL = 'https://vlibras.gov.br/app/vlibras-plugin.js';
export const VLIBRAS_SRI_HASH =
  'sha384-SCil2fuOCOLYO4bxpOW27F/feaFLCHDhc5HDDad0feHUHd0Q6+Wye9e/8Lq09Vqj';

function instantiateVLibrasWidget(): boolean {
  const isWrapperPresent = document.getElementById('vlibras-access-wrapper') !== null;
  if (window.VLibras && !isWrapperPresent) {
    new window.VLibras.Widget(VLIBRAS_URL);
    return true;
  }
  return Boolean(window.VLibras && isWrapperPresent);
}

function createScriptTag(
  src: string,
  onLoad: () => void,
  onErr: () => void
) {
  const script = document.createElement('script');
  script.id = 'vlibras-script';
  script.src = src;
  script.setAttribute('data-version', VLIBRAS_VERSION);
  script.integrity = VLIBRAS_SRI_HASH;
  script.crossOrigin = 'anonymous';
  script.async = true;
  script.onload = onLoad;
  script.onerror = onErr;
  return script;
}

function injectVLibrasScript(onReady: () => void, onError: () => void) {
  if (instantiateVLibrasWidget()) {
    onReady();
    return;
  }
  const existing = document.getElementById('vlibras-script');
  if (existing) {
    existing.remove();
  }
  const handleLoad = () => {
    if (instantiateVLibrasWidget()) onReady();
    else onError();
  };
  const script = createScriptTag(VLIBRAS_SCRIPT_URL, handleLoad, onError);
  document.body.appendChild(script);
}

type TimeoutHandle = ReturnType<typeof setTimeout> | null;

function clearVlibrasTimers(
  attemptTimerRef: MutableRefObject<TimeoutHandle>,
  retryTimerRef: MutableRefObject<TimeoutHandle>
) {
  if (attemptTimerRef.current) {
    clearTimeout(attemptTimerRef.current);
    attemptTimerRef.current = null;
  }
  if (retryTimerRef.current) {
    clearTimeout(retryTimerRef.current);
    retryTimerRef.current = null;
  }
}

function scheduleVlibrasRetry(
  isMountedRef: MutableRefObject<boolean>,
  retryCountRef: MutableRefObject<number>,
  retryTimerRef: MutableRefObject<TimeoutHandle>,
  runAttempt: () => void,
  setLoadFailed: (failed: boolean) => void
) {
  if (!isMountedRef.current) return;
  if (retryCountRef.current < 3) {
    const delay = Math.pow(2, retryCountRef.current + 1) * 1000;
    retryCountRef.current += 1;
    retryTimerRef.current = setTimeout(() => {
      if (isMountedRef.current) runAttempt();
    }, delay);
  } else {
    setLoadFailed(true);
  }
}

function performVlibrasAttempt(
  isMountedRef: MutableRefObject<boolean>,
  retryCountRef: MutableRefObject<number>,
  attemptTimerRef: MutableRefObject<TimeoutHandle>,
  retryTimerRef: MutableRefObject<TimeoutHandle>,
  runAttempt: () => void,
  setLoadFailed: (failed: boolean) => void
) {
  if (!isMountedRef.current) return;
  clearVlibrasTimers(attemptTimerRef, retryTimerRef);

  attemptTimerRef.current = setTimeout(() => {
    if (isMountedRef.current && !window.VLibras) {
      clearVlibrasTimers(attemptTimerRef, retryTimerRef);
      scheduleVlibrasRetry(isMountedRef, retryCountRef, retryTimerRef, runAttempt, setLoadFailed);
    }
  }, 8000);

  injectVLibrasScript(
    () => {
      if (isMountedRef.current) clearVlibrasTimers(attemptTimerRef, retryTimerRef);
    },
    () => {
      if (isMountedRef.current) {
        clearVlibrasTimers(attemptTimerRef, retryTimerRef);
        scheduleVlibrasRetry(isMountedRef, retryCountRef, retryTimerRef, runAttempt, setLoadFailed);
      }
    }
  );
}

function useVLibrasEffect(setLoadFailed: (failed: boolean) => void) {
  const isMountedRef = useRef(true);
  const attemptTimerRef = useRef<TimeoutHandle>(null);
  const retryTimerRef = useRef<TimeoutHandle>(null);
  const retryCountRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;
    const run = () => {
      performVlibrasAttempt(
        isMountedRef, retryCountRef, attemptTimerRef, retryTimerRef, run, setLoadFailed
      );
    };
    run();
    return () => {
      isMountedRef.current = false;
      clearVlibrasTimers(attemptTimerRef, retryTimerRef);
    };
  }, [setLoadFailed]);
}

export function VLibrasWidget() {
  const [loadFailed, setLoadFailed] = useState(false);
  useVLibrasEffect(setLoadFailed);

  return (
    <div {...{ vw: 'true' }} className="enabled" role="region" aria-label="Acessibilidade em Libras">
      <div {...{ 'vw-access-button': 'true' }} className="active" />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
      {loadFailed && (
        <span className="sr-only" role="status" aria-live="polite">
          Widget VLibras temporariamente indisponível.
        </span>
      )}
    </div>
  );
}

export default VLibrasWidget;

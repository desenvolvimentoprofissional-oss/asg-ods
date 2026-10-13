import { useEffect } from 'react';
import { useAccessibilityStore } from '../store/useAccessibilityStore';

export function useAccessibilitySync() {
  const acc = useAccessibilityStore();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.fontScale = String(acc.fontSizeScale);
    root.classList.toggle('alto-contraste', acc.isHighContrast);
  }, [acc.fontSizeScale, acc.isHighContrast]);

  return acc;
}

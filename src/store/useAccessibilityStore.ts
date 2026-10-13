import { useSyncExternalStore } from 'react';

export interface AccessibilityState {
  fontSizeScale: number;
  isHighContrast: boolean;
}

const STORAGE_KEY = 'crasp_a11y_state';

const DEFAULT_STATE: AccessibilityState = {
  fontSizeScale: 1.0,
  isHighContrast: false,
};

function parseFontSize(val: unknown): number {
  const n = Number(val);
  return Number.isFinite(n) && n >= 1.0 && n <= 1.2 ? n : 1.0;
}

function parseStoredState(raw: string | null): AccessibilityState {
  if (!raw) return DEFAULT_STATE;
  try {
    const p = JSON.parse(raw);
    return {
      fontSizeScale: parseFontSize(p.fontSizeScale),
      isHighContrast: Boolean(p.isHighContrast),
    };
  } catch (err: unknown) {
    console.warn('[ACCESSIBILITY_PARSE_WARN]', err);
    return DEFAULT_STATE;
  }
}

function loadInitialState(): AccessibilityState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    return parseStoredState(localStorage.getItem(STORAGE_KEY));
  } catch (err: unknown) {
    console.warn('[ACCESSIBILITY_LOAD_WARN]', err);
    return DEFAULT_STATE;
  }
}

let currentState: AccessibilityState = loadInitialState();
const listeners = new Set<() => void>();

function persistState(state: AccessibilityState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err: unknown) {
    console.warn('[ACCESSIBILITY_PERSIST_WARN]', err);
  }
}

function emitChange(nextState: AccessibilityState): void {
  currentState = nextState;
  listeners.forEach((listener) => listener());
  persistState(nextState);
}

export const accessibilityStore = {
  getState(): AccessibilityState {
    return currentState;
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  toggleHighContrast(): void {
    emitChange({
      ...currentState,
      isHighContrast: !currentState.isHighContrast,
    });
  },
  increaseFontSize(): void {
    const next = Math.min(1.2, +(currentState.fontSizeScale + 0.1).toFixed(1));
    emitChange({ ...currentState, fontSizeScale: next });
  },
  decreaseFontSize(): void {
    const next = Math.max(1.0, +(currentState.fontSizeScale - 0.1).toFixed(1));
    emitChange({ ...currentState, fontSizeScale: next });
  },
  resetFontSize(): void {
    emitChange({ ...currentState, fontSizeScale: 1.0 });
  },
};

export function useAccessibilityStore() {
  const state = useSyncExternalStore(
    accessibilityStore.subscribe,
    accessibilityStore.getState,
    accessibilityStore.getState
  );
  return {
    ...state,
    toggleHighContrast: accessibilityStore.toggleHighContrast,
    increaseFontSize: accessibilityStore.increaseFontSize,
    decreaseFontSize: accessibilityStore.decreaseFontSize,
    resetFontSize: accessibilityStore.resetFontSize,
  };
}

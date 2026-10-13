import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PRESENTATION_PAGES = [
  { path: '/', label: 'Início' },
  { path: '/chancela', label: 'Chancela Institucional' },
  { path: '/metodologia', label: 'Metodologia Dinâmica' },
  { path: '/trilha', label: 'Objetivos de Aprendizagem' },
];

export async function toggleFullscreenAction() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (err: unknown) {
    console.warn('[PRESENTATION_FULLSCREEN_WARN]', err);
  }
}

export function isInputFocused(e: KeyboardEvent): boolean {
  const t = e.target as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName?.toUpperCase();
  return Boolean(
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    tag === 'BUTTON' ||
    t.isContentEditable ||
    t.closest('form')
  );
}

export function isFullscreenKey(e: KeyboardEvent): boolean {
  if (e.ctrlKey || e.metaKey) return false;
  const k = e.key.toLowerCase();
  return k === 'p' || k === 'f';
}

export function isNextKey(key: string): boolean {
  return key === 'ArrowRight' || key === 'PageDown';
}

export function isPrevKey(key: string): boolean {
  return key === 'ArrowLeft' || key === 'PageUp';
}

export function usePresentationNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = PRESENTATION_PAGES.findIndex((page) => page.path === location.pathname);

  const goToNext = useCallback(() => {
    const nextIdx = currentIndex < PRESENTATION_PAGES.length - 1 ? currentIndex + 1 : 0;
    navigate(PRESENTATION_PAGES[nextIdx].path);
  }, [currentIndex, navigate]);

  const goToPrev = useCallback(() => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : PRESENTATION_PAGES.length - 1;
    navigate(PRESENTATION_PAGES[prevIdx].path);
  }, [currentIndex, navigate]);

  return { goToNext, goToPrev };
}

export const PresentationMode: React.FC = () => {
  const location = useLocation();
  const { goToNext, goToPrev } = usePresentationNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (location.pathname === '/registro-interesse') return;
      if (isInputFocused(e)) return;
      if (isFullscreenKey(e)) {
        e.preventDefault();
        toggleFullscreenAction();
      } else if (isNextKey(e.key)) {
        e.preventDefault();
        goToNext();
      } else if (isPrevKey(e.key)) {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location.pathname, goToNext, goToPrev]);

  return null;
};

export default PresentationMode;

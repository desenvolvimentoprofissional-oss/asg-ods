import { useRef, useState, useEffect, useCallback } from 'react';

const GAP = 24;
const SCROLL_DURATION = 800;

export function calcDimensions(container: HTMLElement, itemCount: number) {
  const firstCard = container.firstElementChild as HTMLElement | null;
  const itemWidth = firstCard?.offsetWidth || 0;
  return { itemWidth, singleSetWidth: (itemWidth + GAP) * itemCount };
}

export function animateScroll(el: HTMLElement, target: number, duration: number, onEnd?: () => void) {
  const start = el.scrollLeft;
  const change = target - start;
  const t0 = performance.now();

  const frame = (t: number) => {
    if (typeof document !== 'undefined' && el.contains(document.activeElement)) {
      onEnd?.();
      return;
    }
    const p = Math.min((t - t0) / duration, 1);
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    el.scrollLeft = start + change * ease;
    if (p < 1) requestAnimationFrame(frame);
    else onEnd?.();
  };
  requestAnimationFrame(frame);
}

export function balanceScrollLoop(container: HTMLElement, singleSetWidth: number) {
  if (typeof document !== 'undefined' && container.contains(document.activeElement)) return;
  const curr = container.scrollLeft;
  if (curr >= singleSetWidth * 2 - 10) {
    container.scrollLeft = curr - singleSetWidth;
  } else if (curr <= 10) {
    container.scrollLeft = curr + singleSetWidth;
  }
}

export function ensureFocusedCardVisible(container: HTMLElement, target: HTMLElement | null) {
  const card = target
    ? (Array.from(container.children).find((c) => c.contains(target)) as HTMLElement)
    : null;
  if (!card) return;
  const cardLeft = card.offsetLeft;
  const cardRight = cardLeft + card.offsetWidth;
  if (cardLeft < container.scrollLeft) {
    container.scrollLeft = cardLeft;
  } else if (cardRight > container.scrollLeft + container.clientWidth) {
    container.scrollLeft = cardRight - container.clientWidth;
  }
}

export function useCarouselAutoLoop(
  ref: React.RefObject<HTMLDivElement | null>,
  itemCount: number,
  onTick: () => void
) {
  useEffect(() => {
    if (ref.current) {
      const { singleSetWidth } = calcDimensions(ref.current, itemCount);
      ref.current.scrollLeft = singleSetWidth;
    }
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && ref.current?.contains(document.activeElement)) return;
      onTick();
    }, 5000);
    return () => clearInterval(timer);
  }, [ref, itemCount, onTick]);
}

export function useCarouselNavigation(
  ref: React.RefObject<HTMLDivElement | null>,
  itemCount: number,
  smoothScrollTo: (t: number) => void
) {
  const scrollToDot = useCallback((idx: number) => {
    if (!ref.current) return;
    const { itemWidth, singleSetWidth } = calcDimensions(ref.current, itemCount);
    smoothScrollTo(Math.floor(ref.current.scrollLeft / singleSetWidth) * singleSetWidth + idx * (itemWidth + GAP));
  }, [ref, itemCount, smoothScrollTo]);

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!ref.current) return;
    const { itemWidth } = calcDimensions(ref.current, itemCount);
    smoothScrollTo(ref.current.scrollLeft + (itemWidth + GAP) * (dir === 'right' ? 1 : -1));
  }, [ref, itemCount, smoothScrollTo]);

  return { scrollToDot, scroll };
}

export function useSmoothScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const isScrollingRef = useRef(false);
  const smoothScrollTo = useCallback((target: number) => {
    if (!ref.current) return;
    isScrollingRef.current = true;
    animateScroll(ref.current, target, SCROLL_DURATION, () => {
      isScrollingRef.current = false;
    });
  }, [ref]);
  return { smoothScrollTo, isScrollingRef };
}

export function useScrollWatcher(
  ref: React.RefObject<HTMLDivElement | null>,
  itemCount: number,
  isScrollingRef: React.RefObject<boolean>
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { itemWidth, singleSetWidth } = calcDimensions(el, itemCount);
    if (!itemWidth) return;
    setActiveIndex(Math.round(el.scrollLeft / (itemWidth + GAP)) % itemCount);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!ref.current || isScrollingRef.current) return;
      balanceScrollLoop(ref.current, singleSetWidth);
    }, 150);
  }, [ref, itemCount, isScrollingRef]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    ensureFocusedCardVisible(ref.current, e.target as HTMLElement);
  }, [ref]);

  return { activeIndex, handleScroll, handleFocus };
}

export function useSignatoriesCarousel(itemCount: number) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { smoothScrollTo, isScrollingRef } = useSmoothScroll(scrollContainerRef);
  const { activeIndex, handleScroll, handleFocus } = useScrollWatcher(
    scrollContainerRef,
    itemCount,
    isScrollingRef
  );
  const { scrollToDot, scroll } = useCarouselNavigation(scrollContainerRef, itemCount, smoothScrollTo);

  useCarouselAutoLoop(scrollContainerRef, itemCount, useCallback(() => scroll('right'), [scroll]));

  return { scrollContainerRef, activeIndex, handleScroll, handleFocus, scrollToDot, scroll };
}

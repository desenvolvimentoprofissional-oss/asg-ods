import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { signatories } from '../../constants/chancela';
import { SignatoryCard } from './SignatoryCard';
import { SignatoriesDots } from './SignatoriesDots';
import { useSignatoriesCarousel } from './useSignatoriesCarousel';

export function SignatoriesCarouselHeader({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-10">
      <h2 className="text-xl font-bold text-blue-900">Instituições Signatárias</h2>
      <div className="hidden md:flex items-center gap-2">
        <Button variant="icon-outline" size="icon" onClick={onPrev} aria-label="Anterior">
          <ChevronLeft size={20} />
        </Button>
        <Button variant="icon-outline" size="icon" onClick={onNext} aria-label="Próximo">
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}

export const SignatoriesCarousel: React.FC = () => {
  const { scrollContainerRef, activeIndex, handleScroll, scrollToDot, scroll } =
    useSignatoriesCarousel(signatories.length);

  return (
    <div className="pb-6">
      <SignatoriesCarouselHeader onPrev={() => scroll('left')} onNext={() => scroll('right')} />
      <div className="relative flex w-full flex-col">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={
            'flex gap-6 py-4 px-1 -mx-1 overflow-x-auto ' +
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
          }
        >
          {[...signatories, ...signatories, ...signatories].map((sig, idx) => (
            <div
              key={`${sig.name}-${idx}`}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 relative"
            >
              <SignatoryCard sig={sig} />
            </div>
          ))}
        </div>
        <SignatoriesDots total={signatories.length} activeIndex={activeIndex} onSelect={scrollToDot} />
      </div>
    </div>
  );
};

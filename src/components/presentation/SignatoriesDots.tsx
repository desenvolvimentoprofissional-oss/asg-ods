interface SignatoriesDotsProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function SignatoriesDots({ total, activeIndex, onSelect }: SignatoriesDotsProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            idx === activeIndex ? 'w-8 bg-blue-900' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Ir para slide ${idx + 1}`}
        />
      ))}
    </div>
  );
}

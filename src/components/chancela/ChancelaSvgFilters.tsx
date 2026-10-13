export function IbgcFilter() {
  return (
    <filter id="colorize-ibgc">
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.05 0 0 0 0 0.15 0 0 0 0 0.40 0 0 0 1 0"
      />
    </filter>
  );
}

export function EthosFilter() {
  return (
    <filter id="colorize-ethos">
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.055 0 0 0 0 0.647 0 0 0 0 0.914 0 0 0 1 0"
      />
    </filter>
  );
}

export function ChancelaSvgFilters() {
  return (
    <svg width="0" height="0" className="sr-only" aria-hidden="true">
      <defs>
        <IbgcFilter />
        <EthosFilter />
      </defs>
    </svg>
  );
}

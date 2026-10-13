export function FontActionButton({
  label,
  onClick,
  ariaLabel,
  title,
}: {
  label: string;
  onClick: () => void;
  ariaLabel: string;
  title: string;
}) {
  const cls =
    'crasp-a11y-circle-btn w-7 h-7 sm:w-[1.875rem] sm:h-[1.875rem] rounded-full inline-flex ' +
    'items-center justify-center font-bold text-[0.625rem] sm:text-[0.6875rem] leading-none ' +
    'tracking-tight border border-current/35 bg-current/14 text-inherit ' +
    'hover:bg-current/22 hover:border-current/50 transition-all cursor-pointer ' +
    'focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shrink-0';

  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel} title={title}>
      {label}
    </button>
  );
}

export function FontSizeResetButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  const base =
    'crasp-a11y-circle-btn crasp-a11y-btn-reset w-7 h-7 sm:w-[1.875rem] sm:h-[1.875rem] rounded-full ' +
    'inline-flex items-center justify-center font-semibold text-[0.625rem] sm:text-[0.6875rem] ' +
    'leading-none tracking-tight text-inherit transition-all cursor-pointer focus-visible:outline-2 ' +
    'focus-visible:outline-white focus-visible:outline-offset-2 shrink-0';

  const stateClass = active
    ? 'crasp-a11y-reset--active bg-current/20 shadow-[inset_0_0_0_2px_currentColor]'
    : 'border border-current/35 bg-current/14 hover:bg-current/22 hover:border-current/50';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${stateClass}`}
      aria-label="Tamanho de fonte normal"
      title="Voltar ao tamanho de fonte normal"
    >
      A
    </button>
  );
}

export function TopBarFontSizeButtons({
  scale,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onResetFontSize,
}: {
  scale: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onResetFontSize?: () => void;
}) {
  return (
    <>
      <FontActionButton
        label="A+"
        onClick={onIncreaseFontSize}
        ariaLabel="Aumentar tamanho da fonte"
        title="Aumentar fonte"
      />
      <FontActionButton
        label="A-"
        onClick={onDecreaseFontSize}
        ariaLabel="Diminuir tamanho da fonte"
        title="Diminuir fonte"
      />
      {onResetFontSize && (
        <FontSizeResetButton
          active={scale === 1}
          onClick={onResetFontSize}
        />
      )}
    </>
  );
}

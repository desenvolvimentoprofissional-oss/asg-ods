import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  linkUrl?: string;
  linkClassName?: string;
  className?: string;
  titleClassName?: string;
  onLinkClick?: () => void;
  children?: React.ReactNode;
}

export function SectionHeaderAnimatedLink({
  linkUrl,
  linkText,
  linkClassName,
}: {
  linkUrl: string;
  linkText: string;
  linkClassName: string;
}) {
  return (
    <a
      href={linkUrl}
      className={
        'group inline-flex items-center gap-1 text-sm font-semibold ' +
        `text-blue-800 hover:text-blue-900 ${linkClassName}`.trim()
      }
    >
      <span className="leading-none">{linkText}</span>
      <span className="flex items-center relative top-[1px] animate-pulse-chevron" aria-hidden="true">
        <ChevronRight size={16} />
      </span>
    </a>
  );
}

export function SectionHeaderAction({
  linkText,
  linkUrl,
  linkClassName = '',
  onLinkClick,
}: {
  linkText?: string;
  linkUrl?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
}) {
  if (!linkText) return null;
  if (!linkUrl) {
    return (
      <Button variant="ghost" className={linkClassName} onClick={onLinkClick}>
        {linkText}
      </Button>
    );
  }
  return (
    <SectionHeaderAnimatedLink
      linkUrl={linkUrl}
      linkText={linkText}
      linkClassName={linkClassName}
    />
  );
}

export const SectionHeader = ({
  title,
  linkText,
  linkUrl,
  linkClassName = '',
  className = 'mb-6',
  titleClassName = 'text-gray-900',
  onLinkClick,
  children,
}: SectionHeaderProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`.trim()}>
      <h2 className={`text-xl font-bold ${titleClassName}`}>{title}</h2>
      <div className="flex items-center gap-4">
        {children}
        <SectionHeaderAction
          linkText={linkText}
          linkUrl={linkUrl}
          linkClassName={linkClassName}
          onLinkClick={onLinkClick}
        />
      </div>
    </div>
  );
};

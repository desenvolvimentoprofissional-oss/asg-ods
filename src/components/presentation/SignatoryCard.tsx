import React from 'react';
import type { Signatory } from '../../constants/chancela';

export interface SignatoryCardProps {
  sig: Signatory;
}

export const SignatoryCard: React.FC<SignatoryCardProps> = ({ sig }) => {
  return (
    <div className="h-full bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-16 mb-5 flex items-center justify-center">
        <img
          src={sig.logo}
          alt={`Logo ${sig.name}`}
          className={`object-contain ${sig.imgClass || 'max-h-full max-w-[160px]'}`}
          style={sig.filterStyle ? { filter: sig.filterStyle } : undefined}
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed text-center">
        {sig.description}
      </p>
    </div>
  );
};

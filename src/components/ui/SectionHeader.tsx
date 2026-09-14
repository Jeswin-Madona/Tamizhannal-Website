import React from 'react';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  titleTa: string;
  subtitleTa?: string;
  icon?: LucideIcon;
  actionHref?: string;
  actionTextTa?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleTa,
  subtitleTa,
  icon: Icon,
  actionHref,
  actionTextTa = 'அனைத்தும் காண்க',
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#c59b27]/30 mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[#4a1014]">
          {Icon && <Icon className="w-5 h-5 text-[#c59b27] flex-shrink-0" />}
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
            {titleTa}
          </h2>
        </div>
        {subtitleTa && (
          <p className="font-sans text-sm text-[#544843] leading-relaxed">
            {subtitleTa}
          </p>
        )}
      </div>

      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#701a1e] hover:text-[#4a1014] hover:underline transition-colors flex-shrink-0"
        >
          <span>{actionTextTa}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
};

import React from 'react';
import Link from 'next/link';
import { QuillLogo } from '@/components/ui/QuillLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#3E171B] !text-[#F5EFE4] relative overflow-hidden border-t border-[#B08D57]/40 shadow-inner">
      {/* Top Subtle Hairline Gold Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#B08D57]/20 via-[#E5C170] to-[#B08D57]/20" />

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Heritage Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <QuillLogo size={40} />
              <h3 className="font-serif text-2xl font-bold !text-[#F5EFE4] tracking-wide">
                தமிழண்ணல்
              </h3>
            </div>
            <p className="text-xs text-[#E5C170] uppercase tracking-widest font-bold">
              Thamizhannal Heritage Archive
            </p>
            <p className="text-sm text-[#F5EFE4]/90 leading-relaxed font-normal">
              தமிழ்ப் பேராசிரியை, ஆய்வாளர், உரையாசிரியர் முனைவர் தமிழண்ணல் (12.08.1928 – 29.12.2015) அவர்களின் வாழ்நாள் சாதனைகள் மற்றும் 86+ தமிழ் படைப்புகளின் டிஜிட்டல் காப்பகம்.
            </p>
          </div>

          {/* Column 2: Quick Links — High Contrast Text */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold !text-[#E5C170] border-b border-[#B08D57]/40 pb-2">
              முதன்மைப் பிரிவுகள்
            </h4>
            <ul className="grid grid-cols-2 gap-3 text-sm font-medium">
              <li>
                <Link href="/" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  முகப்பு
                </Link>
              </li>
              <li>
                <Link href="/tamil-vaazhvu" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  தமிழ்வாழ்வு
                </Link>
              </li>
              <li>
                <Link href="/books" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  நூல்கள்
                </Link>
              </li>
              <li>
                <Link href="/articles" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  கட்டுரை
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  ஒளிப்படங்கள்
                </Link>
              </li>
              <li>
                <Link href="/ninaivendhal" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  நினைவேந்தல்
                </Link>
              </li>
              <li>
                <Link href="/contact" className="!text-[#F5EFE4] hover:!text-[#E5C170] transition-colors underline-offset-4 hover:underline">
                  தொடர்பு
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Literary Quote */}
          <div className="space-y-3 bg-[#2E0F12] p-5 rounded-lg border border-[#B08D57]/40 shadow-sm">
            <p className="font-serif text-sm italic !text-[#F5EFE4] leading-relaxed">
              &quot;தமிழைச் சரியாகப் பேசுவோம்; பிழையின்றி எழுதுவோம்; தமிழ்மொழியின் மரபையும் தொன்மையையும் போற்றி வளர்ப்போம்.&quot;
            </p>
            <p className="text-xs font-bold text-[#E5C170] text-right">
              — முனைவர் தமிழண்ணல்
            </p>
          </div>

        </div>

        {/* Archival Hairline Separator */}
        <div className="h-px bg-[#B08D57]/35 my-6" />

        {/* Copyright Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5EFE4]/90 gap-2 font-sans font-medium">
          <p>© {new Date().getFullYear()} தமிழண்ணல் — Thamizhannal Tamil Development Foundation. All rights reserved.</p>
          <p className="font-bold text-[#E5C170]">தமிழ் மரபுக் காப்பகம் • Digital Archive</p>
        </div>

      </div>
    </footer>
  );
};


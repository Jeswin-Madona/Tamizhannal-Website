'use client';

import React, { useState } from 'react';
import { ScrollText, ZoomIn, FileText } from 'lucide-react';
import remembranceData from '@/data/remembrance.json';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LightboxModal } from '@/components/ui/LightboxModal';

export default function NinaivendhalPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 max-w-7xl">
      
      {/* Page Header */}
      <SectionHeader
        titleTa="நினைவேந்தல் ஆவணங்கள்"
        subtitleTa="முனைவர் தமிழண்ணல் அவர்களின் நினைவாகப் பத்திரிகைக் செய்திகள், விழா அழைப்பிதழ்கள் மற்றும் அறிஞர்களின் புகழஞ்சலி ஆவணங்கள்."
        icon={ScrollText}
      />

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {remembranceData.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="archive-card p-5 cursor-pointer group flex flex-col justify-between hover:border-[#B08D57]/60 bg-[#FDFBF7]"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] bg-[#FAF5EA] rounded overflow-hidden border border-[#B08D57]/20 flex items-center justify-center">
                {!failedImages[item.id] ? (
                  <img
                    src={item.imageUrl}
                    alt={item.titleTa || 'Remembrance Document'}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center font-serif text-xl font-bold">
                    <FileText className="w-6 h-6 text-[#5A1F24]" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-[#3E171B]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F5EFE4] backdrop-blur-2xs">
                  <div className="p-2 rounded-full bg-[#B08D57] text-[#3E171B] shadow-md flex items-center gap-1 text-xs font-semibold px-3 py-1.5">
                    <ZoomIn className="w-4 h-4" />
                    <span>ஆவணம் காண்க</span>
                  </div>
                </div>
              </div>

              <span className="badge-archival text-[0.75rem]">{item.categoryTa}</span>

              <h3 className="font-serif text-xl font-bold text-[#5A1F24] group-hover:text-[#70262C] transition-colors leading-snug">
                {item.titleTa}
              </h3>

              {item.descriptionTa && (
                <p className="text-xs text-[#6B625C] leading-relaxed line-clamp-3">
                  {item.descriptionTa}
                </p>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-[#B08D57]/20 flex justify-between items-center text-xs font-semibold text-[#5A1F24]">
              <span>ஆண்டு: {item.year || '2015'}</span>
              <span className="group-hover:translate-x-1 transition-transform">ஆவணத்தைக் காண்க →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={remembranceData}
        currentIndex={lightboxIndex || 0}
        onSelectIndex={setLightboxIndex}
      />

    </div>
  );
}


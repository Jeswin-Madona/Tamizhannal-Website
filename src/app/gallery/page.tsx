'use client';

import React, { useState, useMemo } from 'react';
import { Camera, ZoomIn, Image as ImageIcon, Filter, ChevronDown, Layers, Check } from 'lucide-react';
import galleryData from '@/data/gallery.json';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LightboxModal } from '@/components/ui/LightboxModal';

// Required exact order for the 11 categories
const ORDERED_CATEGORIES = [
  'ஆரம்பகால வாழ்வு',
  'கல்லூரி வாழ்வு',
  'சப்பான் பயணம்',
  'விருதுகள்',
  'மணி விழா',
  'அமெரிக்கா பயணம்',
  'தமிழ்வழிக் கல்வி',
  'சான்றோர் பேரவை',
  'நூல் வெளியீடுகள்',
  'உயர்விருதுகள்',
  'உலகத் தமிழ் விருது',
] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate item counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    galleryData.forEach((item) => {
      counts[item.categoryTa] = (counts[item.categoryTa] || 0) + 1;
    });
    return counts;
  }, []);

  // Numeric sorting helper to prevent lexicographical order
  const getNumericIndex = (item: (typeof galleryData)[0]) => {
    const match =
      item.imageUrl.match(/(\d+)\.[a-zA-Z]+$/) ||
      item.slug.match(/(\d+)$/) ||
      item.captionTa.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Filter & numerically sort gallery items preserving ordered category sequence
  const filteredGallery = useMemo(() => {
    const filtered = selectedCategory
      ? galleryData.filter((item) => item.categoryTa === selectedCategory)
      : [...galleryData];

    return filtered.sort((a, b) => {
      const catIndexA = ORDERED_CATEGORIES.indexOf(a.categoryTa as any);
      const catIndexB = ORDERED_CATEGORIES.indexOf(b.categoryTa as any);
      if (catIndexA !== catIndexB) {
        return catIndexA - catIndexB;
      }
      return getNumericIndex(a) - getNumericIndex(b);
    });
  }, [selectedCategory]);

  // Calculate per-category 1-based sequence numbers
  const galleryWithCategoryIndex = useMemo(() => {
    const categoryCounters: Record<string, number> = {};
    return filteredGallery.map((item) => {
      categoryCounters[item.categoryTa] = (categoryCounters[item.categoryTa] || 0) + 1;
      return {
        ...item,
        categoryIndex: categoryCounters[item.categoryTa],
      };
    });
  }, [filteredGallery]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 max-w-7xl">
      
      {/* Page Header */}
      <SectionHeader
        titleTa="ஒளிப்படங்கள்"
        subtitleTa="முனைவர் தமிழண்ணல் அவர்களின் வாழ்க்கை நிகழ்வுகள், வரலாற்றுப் புகைப்படங்கள் மற்றும் விழா நினைவுகள்."
        icon={Camera}
      />

      {/* Archival Category Selector Interface */}
      <div className="bg-[#FAF5EA] border-2 border-[#B08D57]/40 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Active Category Display Header */}
          <div className="flex items-center gap-3 text-sm md:text-base font-bold text-[#5A1F24]">
            <div className="w-9 h-9 rounded-lg bg-[#5A1F24] text-[#E5C170] flex items-center justify-center flex-shrink-0 shadow-xs border border-[#E5C170]/40">
              <Filter className="w-4 h-4 text-[#E5C170]" />
            </div>
            <div>
              <span className="text-xs text-[#6B625C] font-normal block">தேர்ந்தெடுக்கப்பட்டத் தொகுதி:</span>
              <span className="font-serif text-base md:text-lg font-bold text-[#5A1F24]">
                {selectedCategory ? selectedCategory : 'அனைத்துப் புகைப்படங்கள்'}
              </span>
              <span className="ml-2.5 text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#5A1F24] text-[#FAF5EA] border border-[#E5C170]/60 shadow-xs">
                {galleryWithCategoryIndex.length} படங்கள்
              </span>
            </div>
          </div>

          {/* Selector Controls — Quick Select Dropdown + Multi-Pill Drawer Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            
            {/* Native Styled Dropdown Selector with High Contrast Selected State */}
            <div className="relative flex-1 sm:w-72">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                aria-label="புகைப்படத் தொகுதியைத் தேர்ந்தெடுக்கவும்"
                className={`w-full appearance-none font-bold text-xs sm:text-sm pl-4 pr-9 py-2.5 rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer ${
                  selectedCategory
                    ? 'bg-[#5A1F24] text-[#FAF5EA] border-2 border-[#E5C170]'
                    : 'bg-[#FDFBF7] text-[#5A1F24] border-2 border-[#B08D57]/60'
                }`}
                style={{
                  backgroundColor: selectedCategory ? '#5A1F24' : '#FDFBF7',
                  color: selectedCategory ? '#FAF5EA' : '#5A1F24',
                }}
              >
                <option value="" className="bg-[#FDFBF7] text-[#231D1A] font-bold">
                  அனைத்துப் படங்கள் ({galleryData.length})
                </option>
                {ORDERED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#FDFBF7] text-[#231D1A] font-semibold">
                    {cat} ({categoryCounts[cat] || 0})
                  </option>
                ))}
              </select>
              <ChevronDown className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${selectedCategory ? 'text-[#E5C170]' : 'text-[#5A1F24]'}`} />
            </div>

            {/* Expandable Category Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              className={`px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all border-2 flex items-center gap-1.5 min-h-[42px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer ${
                isMenuOpen
                  ? 'bg-[#5A1F24] text-[#FAF5EA] border-[#E5C170]'
                  : 'bg-[#FDFBF7] text-[#5A1F24] border-[#B08D57]/60 hover:bg-[#F3EAD8]'
              }`}
              style={{
                backgroundColor: isMenuOpen ? '#5A1F24' : '#FDFBF7',
                color: isMenuOpen ? '#FAF5EA' : '#5A1F24',
              }}
              title="அனைத்துப் பிரிவுப் பட்டியலையும் காண்க"
            >
              <Layers className="w-4 h-4 text-[#E5C170]" />
              <span className="hidden md:inline">தொகுதி வரைபடம்</span>
            </button>

          </div>

        </div>

        {/* Archival Category Badges Grid — High Contrast Selected Category */}
        {isMenuOpen && (
          <div className="pt-3 border-t border-[#B08D57]/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 animate-fade-in">
            {/* All Images Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setIsMenuOpen(false);
              }}
              className={`px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between border-2 focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer ${
                selectedCategory === null
                  ? 'bg-[#5A1F24] text-[#FAF5EA] border-[#E5C170] shadow-md'
                  : 'bg-[#FDFBF7] text-[#231D1A] border-[#B08D57]/35 hover:bg-[#5A1F24] hover:text-[#FAF5EA] hover:border-[#5A1F24]'
              }`}
              style={{
                backgroundColor: selectedCategory === null ? '#5A1F24' : '#FDFBF7',
                color: selectedCategory === null ? '#FAF5EA' : '#231D1A',
              }}
            >
              <span className="flex items-center gap-2">
                {selectedCategory === null ? (
                  <Check className="w-4 h-4 text-[#E5C170] stroke-[3]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                )}
                <span>அனைத்துப் படங்கள்</span>
              </span>
              <span className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded bg-[#3E171B]/20 text-current">
                {galleryData.length}
              </span>
            </button>

            {/* 11 Ordered Categories */}
            {ORDERED_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between border-2 focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer ${
                    isSelected
                      ? 'bg-[#5A1F24] text-[#FAF5EA] border-[#E5C170] shadow-md'
                      : 'bg-[#FDFBF7] text-[#231D1A] border-[#B08D57]/35 hover:bg-[#5A1F24] hover:text-[#FAF5EA] hover:border-[#5A1F24]'
                  }`}
                  style={{
                    backgroundColor: isSelected ? '#5A1F24' : '#FDFBF7',
                    color: isSelected ? '#FAF5EA' : '#231D1A',
                  }}
                >
                  <span className="flex items-center gap-2">
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#E5C170] stroke-[3]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                    )}
                    <span>{cat}</span>
                  </span>
                  <span className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded bg-[#3E171B]/20 text-current">
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Archival Historical Photo Collection Grid — 4 Column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryWithCategoryIndex.map((item, idx) => (
          <article
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="archival-photo-card p-3.5 cursor-pointer group flex flex-col justify-between"
          >
            {/* Historical Photo Frame Container */}
            <div className="relative aspect-[4/3] bg-[#FAF5EA] rounded overflow-hidden mb-3 border-2 border-[#B08D57]/35 shadow-xs flex items-center justify-center">
              
              {/* Archival Top-Left Corner Number Badge (Resets per category) */}
              <div
                className="absolute top-0 left-0 z-20 bg-[#5A1F24] text-[#FAF5EA] font-serif font-bold text-xs px-2.5 py-1 shadow-md border-r border-b border-[#E5C170]/80 flex items-center gap-0.5"
                style={{
                  borderBottomRightRadius: '12px',
                  backgroundColor: '#5A1F24',
                  color: '#FAF5EA',
                }}
                aria-label={`படம் ${item.categoryIndex}`}
                title={`படம் எண் ${item.categoryIndex}`}
              >
                <span className="text-[#E5C170] font-mono text-[11px] font-extrabold">#</span>
                <span className="font-mono font-bold text-xs" style={{ color: '#FAF5EA' }}>
                  {item.categoryIndex}
                </span>
              </div>

              {!failedImages[item.id] ? (
                <img
                  src={item.imageUrl}
                  alt={`${item.categoryTa} - படம் ${item.categoryIndex}`}
                  onError={() => handleImageError(item.id)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center font-serif text-xl font-bold">
                  <ImageIcon className="w-6 h-6 text-[#5A1F24]" />
                </div>
              )}

              {/* Archival Overlay Zoom Feed */}
              <div className="absolute inset-0 bg-[#3E171B]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-[#F5EFE4] gap-1.5 backdrop-blur-2xs z-10">
                <div className="p-2.5 rounded-full bg-[#B08D57] text-[#3E171B] shadow-lg transform group-hover:scale-110 transition-transform">
                  <ZoomIn className="w-5 h-5 text-[#3E171B]" />
                </div>
                <span className="text-[11px] font-serif font-bold text-[#E5C170] tracking-wide">
                  பெரிதாக்கிப் பார்க்க
                </span>
              </div>
            </div>

            {/* Photo Content & Metadata Hierarchy — Non-repetitive Category + Year */}
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              
              {/* Category Title & Year Metadata */}
              <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-[#B08D57]/20">
                <span className="inline-flex items-center gap-1.5 font-serif font-bold text-[#5A1F24] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                  <span>{item.categoryTa}</span>
                </span>
                {item.year && (
                  <span className="font-mono text-[11px] font-bold text-[#5A1F24] bg-[#FAF5EA] px-2 py-0.5 rounded border border-[#B08D57]/30">
                    ஆண்டு: {item.year}
                  </span>
                )}
              </div>

            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal — Large Viewport Display */}
      <LightboxModal
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={galleryWithCategoryIndex}
        currentIndex={lightboxIndex || 0}
        onSelectIndex={setLightboxIndex}
      />

    </div>
  );
}

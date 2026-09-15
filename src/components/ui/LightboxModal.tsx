'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Image as ImageIcon, Maximize2, Minimize2 } from 'lucide-react';

interface LightboxItem {
  id: string;
  titleTa?: string;
  captionTa?: string;
  descriptionTa?: string;
  imageUrl: string;
  categoryTa: string;
  year?: string;
  categoryIndex?: number;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectIndex,
}) => {
  const currentItem = items[currentIndex];
  const [imageError, setImageError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  // Handle Fullscreen state listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;

    if (!document.fullscreenElement && !isFullscreen) {
      if (modalContainerRef.current.requestFullscreen) {
        modalContainerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onSelectIndex(0); // loop
    }
  }, [currentIndex, items.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    } else {
      onSelectIndex(items.length - 1); // loop
    }
  }, [currentIndex, items.length, onSelectIndex]);

  // Keyboard navigation shortcuts & ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen && !document.fullscreenElement) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev, isFullscreen]);

  if (!isOpen || !currentItem) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A0405]/94 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-5 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="ஆவணப் பெருக்கக் காட்சி"
    >
      <div
        ref={modalContainerRef}
        className={`relative bg-[#FDFBF7] flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none h-screen w-screen bg-[#0E0608]'
            : 'rounded-xl max-w-[96vw] lg:max-w-6xl xl:max-w-7xl w-full border-2 border-[#B08D57]/50 shadow-2xl max-h-[96vh]'
        }`}
      >
        
        {/* Compact Top Header Bar */}
        <div className="bg-[#3E171B] text-[#F5EFE4] px-4 py-2.5 flex items-center justify-between border-b border-[#B08D57]/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="badge-archival bg-[#E5C170] text-[#3E171B] font-extrabold border-none px-3 py-0.5 text-xs">
              {currentItem.categoryTa}
            </span>
            <span className="text-xs text-[#F5EFE4] font-mono font-bold">
              ஆவணம் #{currentItem.categoryIndex || currentIndex + 1} ({currentIndex + 1} / {items.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Fullscreen Toggle Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு' : 'முழுத்திரை'}
              title={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு (Exit Fullscreen)' : 'முழுத்திரை (Fullscreen)'}
              className="p-1.5 rounded-md text-[#FAF5EA] bg-[#5A1F24] hover:bg-[#E5C170] hover:text-[#3E171B] transition-all focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-[#E5C170]" />
              ) : (
                <Maximize2 className="w-4 h-4 text-[#E5C170]" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-[#FAF5EA] bg-[#5A1F24] hover:bg-[#E5C170] hover:text-[#3E171B] transition-all focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
              aria-label="மூடுக"
              title="மூடுக (Esc)"
            >
              <X className="w-4 h-4 text-[#FAF5EA]" />
            </button>
          </div>
        </div>

        {/* Viewport-Aware Expanded Image Display Container */}
        <div className="relative bg-[#12090B] flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[500px] md:min-h-[620px] p-2 sm:p-4 overflow-hidden select-none">
          
          {/* Previous Button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#3E171B]/90 text-[#FAF5EA] border border-[#E5C170]/70 hover:bg-[#5A1F24] hover:scale-110 transition-all shadow-2xl z-20 focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
              aria-label="முந்தைய ஆவணம்"
              title="முந்தைய ஆவணம் (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6 text-[#E5C170]" />
            </button>
          )}

          {/* Viewport-Scalable Image Rendering — Preserving Aspect Ratio */}
          {!imageError ? (
            <img
              src={currentItem.imageUrl}
              alt={currentItem.captionTa || currentItem.titleTa || `${currentItem.categoryTa} - ஆவணம் ${currentItem.categoryIndex || currentIndex + 1}`}
              onError={() => setImageError(true)}
              className="max-w-full max-h-full object-contain rounded border border-[#B08D57]/40 shadow-2xl transition-all duration-200"
              style={{
                maxHeight: isFullscreen ? 'calc(100vh - 160px)' : 'calc(80vh - 160px)',
              }}
            />
          ) : (
            <div className="w-full h-full min-h-[250px] flex flex-col items-center justify-center text-center p-6 text-[#FDFBF7]/90 border border-[#B08D57]/30 rounded bg-[#231D1A]">
              <div className="w-16 h-16 rounded-full bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center font-serif text-3xl font-bold mb-3 border border-[#B08D57]/40">
                <ImageIcon className="w-8 h-8 text-[#B08D57]" />
              </div>
              <p className="font-serif text-lg font-bold text-[#FDFBF7]">
                {currentItem.captionTa || currentItem.categoryTa}
              </p>
            </div>
          )}

          {/* Next Button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#3E171B]/90 text-[#FAF5EA] border border-[#E5C170]/70 hover:bg-[#5A1F24] hover:scale-110 transition-all shadow-2xl z-20 focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
              aria-label="அடுத்த ஆவணம்"
              title="அடுத்த ஆவணம் (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C170]" />
            </button>
          )}

        </div>

        {/* Archival Information / Caption Footer Bar */}
        <div className="bg-[#FAF5EA] border-t border-[#B08D57]/30 p-3.5 sm:p-4 space-y-2 flex-shrink-0">
          {/* Image-Specific Caption */}
          {currentItem.captionTa ? (
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#5A1F24] leading-relaxed">
              {currentItem.captionTa}
            </h3>
          ) : currentItem.titleTa ? (
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#5A1F24] leading-relaxed">
              {currentItem.titleTa}
            </h3>
          ) : null}

          {currentItem.descriptionTa && (
            <p className="text-xs sm:text-sm text-[#231D1A] leading-relaxed line-clamp-3">
              {currentItem.descriptionTa}
            </p>
          )}

          {/* Category & Year Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B625C] pt-2 border-t border-[#B08D57]/20 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-[#5A1F24]">
              <Tag className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>தொகுதி: <strong className="font-bold text-[#5A1F24]">{currentItem.categoryTa}</strong></span>
            </span>
            {currentItem.year && (
              <span className="flex items-center gap-1.5 font-bold text-[#5A1F24]">
                <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>ஆண்டு: <strong className="font-mono font-bold text-[#5A1F24]">{currentItem.year}</strong></span>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

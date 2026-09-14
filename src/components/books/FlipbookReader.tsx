'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { PageFlip } from 'page-flip';

// Set PDF.js worker URL dynamically
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

interface FlipbookReaderProps {
  pdfUrl: string;
  bookTitle: string;
  onFallbackToStandard: () => void;
}

export const FlipbookReader: React.FC<FlipbookReaderProps> = ({
  pdfUrl,
  bookTitle,
  onFallbackToStandard,
}) => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [renderedPages, setRenderedPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Handle Fullscreen state changes (Browser Native API + Fallback)
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
    if (!outerContainerRef.current) return;

    if (!document.fullscreenElement && !isFullscreen) {
      if (outerContainerRef.current.requestFullscreen) {
        outerContainerRef.current.requestFullscreen().catch(() => {
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

  // Render initial range of PDF pages into image data URLs for page-flip
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadAndRenderPdfPages = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;

        if (!isMounted) return;
        setTotalPages(pdf.numPages);

        const pageLimit = Math.min(pdf.numPages, 30);
        const imageUrls: string[] = [];

        for (let i = 1; i <= pageLimit; i++) {
          if (!isMounted) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.2 });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: ctx, canvas, viewport }).promise;
            imageUrls.push(canvas.toDataURL('image/jpeg', 0.85));
          }
        }

        if (isMounted) {
          setRenderedPages(imageUrls);
          setLoading(false);
        }
      } catch (err: unknown) {
        console.error('Flipbook page render error:', err);
        if (isMounted) {
          setError('Flipbook அனுபவத்தை உருவாக்குவதில் சிரமம் ஏற்பட்டது.');
          setLoading(false);
        }
      }
    };

    loadAndRenderPdfPages();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Initialize PageFlip instance once pages are rendered
  useEffect(() => {
    if (!loading && renderedPages.length > 0 && containerRef.current) {
      try {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

        const pageFlip = new PageFlip(containerRef.current, {
          width: isMobile ? 320 : 450,
          height: isMobile ? 460 : 600,
          size: 'stretch',
          minWidth: isMobile ? 280 : 320,
          maxWidth: isMobile ? 480 : 750,
          minHeight: isMobile ? 380 : 450,
          maxHeight: isMobile ? 650 : 950,
          maxShadowOpacity: 0.5,
          showCover: true,
          mobileScrollSupport: true,
        });

        pageFlip.loadFromImages(renderedPages);

        pageFlip.on('flip', (e: { data: number }) => {
          setCurrentPage(e.data);
        });

        pageFlipRef.current = pageFlip;
      } catch (err) {
        console.error('PageFlip initialization error:', err);
        setError('Flipbook இயக்கி தொடங்க இயலவில்லை. Standard Reader பயன்முறைக்கு மாறவும்.');
      }
    }

    return () => {
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [loading, renderedPages]);

  const flipPrev = () => {
    pageFlipRef.current?.flipPrev();
  };

  const flipNext = () => {
    pageFlipRef.current?.flipNext();
  };

  // Add keyboard arrow key navigation & ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        flipPrev();
      } else if (e.key === 'ArrowRight') {
        flipNext();
      } else if (e.key === 'Escape' && isFullscreen && !document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, renderedPages.length, isFullscreen]);

  return (
    <div
      ref={outerContainerRef}
      className={`flex flex-col bg-[#FDFBF7] border border-[#B08D57]/30 rounded-lg overflow-hidden shadow-md transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen w-screen bg-[#1A0A0C]'
          : 'h-full min-h-[650px]'
      }`}
    >
      {/* Flipbook Top Header Bar */}
      <div className="bg-[#F7F2E6] border-b border-[#B08D57]/30 p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#231D1A]">
        {/* Page Nav */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={flipPrev}
            disabled={currentPage <= 0 || loading}
            className="px-3 py-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 text-[#5A1F24] hover:bg-[#5A1F24] hover:text-[#FDFBF7] disabled:opacity-30 disabled:hover:bg-[#FDFBF7] disabled:hover:text-[#5A1F24] transition-colors flex items-center gap-1 font-serif text-xs font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            title="முந்தைய பக்கம் (Previous Page - Left Arrow)"
            aria-label="முந்தைய பக்கம்"
          >
            <ChevronLeft className="w-4 h-4 text-[#B08D57]" />
            <span className="hidden sm:inline" style={{ color: '#5A1F24' }}>முந்தைய பக்கம்</span>
          </button>

          <span className="font-serif text-xs font-bold px-3 py-1 bg-[#FAF5EA] rounded border border-[#B08D57]/30 text-[#5A1F24]">
            பக்கம் {currentPage + 1} / {renderedPages.length || totalPages}
          </span>

          <button
            type="button"
            onClick={flipNext}
            disabled={currentPage >= renderedPages.length - 1 || loading}
            className="px-3 py-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 text-[#5A1F24] hover:bg-[#5A1F24] hover:text-[#FDFBF7] disabled:opacity-30 disabled:hover:bg-[#FDFBF7] disabled:hover:text-[#5A1F24] transition-colors flex items-center gap-1 font-serif text-xs font-semibold shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
            title="அடுத்த பக்கம் (Next Page - Right Arrow)"
            aria-label="அடுத்த பக்கம்"
          >
            <span className="hidden sm:inline" style={{ color: '#5A1F24' }}>அடுத்த பக்கம்</span>
            <ChevronRight className="w-4 h-4 text-[#B08D57]" />
          </button>
        </div>

        {/* Header Right Actions: Fullscreen & Fallback to Standard */}
        <div className="flex items-center gap-2.5">
          {/* Fullscreen Control Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு' : 'முழுத்திரை'}
            title={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு (Exit Fullscreen)' : 'முழுத்திரை (Fullscreen Mode)'}
            className="px-3.5 py-1.5 rounded border border-[#E5C170] hover:bg-[#E5C170] hover:text-[#3E171B] transition-all font-serif text-xs font-bold shadow-xs flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
            style={{ backgroundColor: '#5A1F24', color: '#FAF5EA' }}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-[#E5C170]" />
                <span style={{ color: '#FAF5EA' }}>வெளியேறு (Exit Fullscreen)</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-[#E5C170]" />
                <span style={{ color: '#FAF5EA' }}>முழுத்திரை (Fullscreen)</span>
              </>
            )}
          </button>

          {/* Standard Reader Fallback Button */}
          {!isFullscreen && (
            <button
              type="button"
              onClick={onFallbackToStandard}
              className="px-3 py-1.5 rounded border border-[#B08D57]/60 hover:bg-[#5A1F24] hover:text-[#FAF5EA] transition-colors text-xs font-semibold flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#B08D57] cursor-pointer"
              style={{ backgroundColor: '#FAF5EA', color: '#5A1F24' }}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#5A1F24]" />
              <span className="hidden md:inline" style={{ color: '#5A1F24' }}>
                இயல்பு வாசிப்பு முறை (Standard Reader)
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Main Flipbook Canvas Container */}
      <div
        className={`flex-1 overflow-hidden p-4 sm:p-6 flex items-center justify-center relative transition-colors ${
          isFullscreen ? 'bg-[#150709] min-h-0' : 'bg-[#E6DED0] min-h-[550px]'
        }`}
      >
        {loading && (
          <div className="flex flex-col items-center gap-3 text-[#FDFBF7]">
            <Loader2 className="w-8 h-8 animate-spin text-[#E5C170]" />
            <p className="font-serif text-sm font-bold text-[#FDFBF7]">
              3D Flipbook பக்கங்கள் உருவாக்கப்படுகின்றன...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-[#FDFBF7] p-6 rounded-md border border-[#701a1e] max-w-md text-center space-y-4 text-[#701a1e]">
            <AlertCircle className="w-8 h-8 mx-auto text-[#5A1F24]" />
            <p className="font-serif text-sm font-semibold">{error}</p>
            <button
              type="button"
              onClick={onFallbackToStandard}
              className="px-4 py-2 bg-[#5A1F24] text-[#FDFBF7] rounded text-xs font-bold hover:bg-[#3E171B] transition-colors mx-auto"
            >
              Standard Reader பயன்முறைக்கு மாறுக
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Floating Top-Right Controls in Canvas */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு' : 'முழுத்திரை'}
                title={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு' : 'முழுத்திரை (Fullscreen)'}
                className="p-2.5 rounded-full bg-[#3E171B]/90 hover:bg-[#5A1F24] text-[#E5C170] border border-[#E5C170]/60 shadow-2xl backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-[#E5C170]" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-[#E5C170]" />
                )}
              </button>
            </div>

            {/* Previous Page Left Floating Control */}
            <button
              type="button"
              onClick={flipPrev}
              disabled={currentPage <= 0}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-3 rounded-full sm:rounded-lg bg-[#3E171B]/90 hover:bg-[#5A1F24] text-[#FAF5EA] border border-[#B08D57]/60 shadow-xl disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-md group focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
              aria-label="முந்தைய பக்கம்"
              title="முந்தைய பக்கம் (Previous Page)"
            >
              <ChevronLeft className="w-5 h-5 text-[#E5C170] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-serif text-xs font-semibold pr-1" style={{ color: '#FAF5EA' }}>முந்தைய</span>
            </button>

            {/* Flipbook Canvas */}
            <div className="w-full h-full flex items-center justify-center">
              <div ref={containerRef} className="shadow-2xl" />
            </div>

            {/* Next Page Right Floating Control */}
            <button
              type="button"
              onClick={flipNext}
              disabled={currentPage >= renderedPages.length - 1}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-3 rounded-full sm:rounded-lg bg-[#3E171B]/90 hover:bg-[#5A1F24] text-[#FAF5EA] border border-[#B08D57]/60 shadow-xl disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-md group focus:outline-none focus:ring-2 focus:ring-[#E5C170] cursor-pointer"
              aria-label="அடுத்த பக்கம்"
              title="அடுத்த பக்கம் (Next Page)"
            >
              <span className="hidden sm:inline font-serif text-xs font-semibold pl-1" style={{ color: '#FAF5EA' }}>அடுத்த</span>
              <ChevronRight className="w-5 h-5 text-[#E5C170] group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

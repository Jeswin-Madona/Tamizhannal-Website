'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Loader2, 
  AlertTriangle 
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

interface StandardPdfReaderProps {
  pdfUrl: string;
  bookTitle: string;
}

export const StandardPdfReader: React.FC<StandardPdfReaderProps> = ({ pdfUrl, bookTitle }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [rendering, setRendering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [jumpInput, setJumpInput] = useState<string>('1');
  const [theme, setTheme] = useState<'paper' | 'sepia' | 'night'>('paper');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });

    loadingTask.promise
      .then((doc) => {
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('PDF.js Document Load Error:', err);
          setError('இந்த நூலின் டிஜிட்டல் PDF ஆவணம் விரைவில் பதிவேற்றப்படும். (Book PDF Document Pending Archive Upload)');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      loadingTask.destroy();
    };
  }, [pdfUrl]);

  // Render current page onto canvas
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        setRendering(true);

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const viewport = page.getViewport({ scale });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: ctx,
          canvas,
          transform,
          viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        setRendering(false);
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
        setRendering(false);
      }
    },
    [pdfDoc, scale]
  );

  useEffect(() => {
    if (pdfDoc && pageNum >= 1 && pageNum <= numPages) {
      renderPage(pageNum);
      setJumpInput(pageNum.toString());
    }
  }, [pdfDoc, pageNum, scale, renderPage, numPages]);

  // Navigation Handlers
  const goToPrev = useCallback(() => {
    if (pageNum > 1) setPageNum((prev) => prev - 1);
  }, [pageNum]);

  const goToNext = useCallback(() => {
    if (pageNum < numPages) setPageNum((prev) => prev + 1);
  }, [pageNum, numPages]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= numPages) {
      setPageNum(parsed);
    } else {
      setJumpInput(pageNum.toString());
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));
  const resetZoom = () => setScale(1.2);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return {
          bgContainer: 'bg-[#F4ECD8]',
          bgCanvas: 'bg-[#F7F2E6]',
          border: 'border-[#B08D57]/40',
        };
      case 'night':
        return {
          bgContainer: 'bg-[#1A1918]',
          bgCanvas: 'bg-[#232120]',
          border: 'border-[#544843]',
        };
      default:
        return {
          bgContainer: 'bg-[#E6DED0]',
          bgCanvas: 'bg-[#FDFBF7]',
          border: 'border-[#B08D57]/30',
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col h-full bg-[#FDFBF7] border border-[#B08D57]/30 rounded-lg overflow-hidden shadow-md ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      
      {/* Reader Control Toolbar */}
      <div className="bg-[#F7F2E6] border-b border-[#B08D57]/30 p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#231D1A]">
        
        {/* Page Nav */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrev}
            disabled={pageNum <= 1 || loading}
            className="p-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 hover:bg-[#5A1F24] hover:text-[#FDFBF7] disabled:opacity-40 disabled:hover:bg-[#FDFBF7] disabled:hover:text-inherit transition-colors"
            title="முந்தைய பக்கம் (Previous Page - Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <span className="font-serif">பக்கம்</span>
            <input
              type="text"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-12 text-center py-1 bg-[#FDFBF7] border border-[#B08D57]/40 rounded font-semibold focus:outline-none focus:ring-1 focus:ring-[#5A1F24]"
            />
            <span className="font-serif">/ {numPages || '...'}</span>
          </form>

          <button
            type="button"
            onClick={goToNext}
            disabled={pageNum >= numPages || loading}
            className="p-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 hover:bg-[#5A1F24] hover:text-[#FDFBF7] disabled:opacity-40 disabled:hover:bg-[#FDFBF7] disabled:hover:text-inherit transition-colors"
            title="அடுத்த பக்கம் (Next Page - Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reading Themes & Zoom Controls */}
        <div className="flex items-center gap-3">
          
          {/* Reading Themes Toggle */}
          <div className="flex items-center gap-1 bg-[#FDFBF7] p-1 rounded border border-[#B08D57]/30">
            <button
              type="button"
              onClick={() => setTheme('paper')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                theme === 'paper' ? 'btn-toggle-active' : 'btn-toggle-inactive'
              }`}
            >
              ஏடு (Paper)
            </button>
            <button
              type="button"
              onClick={() => setTheme('sepia')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                theme === 'sepia' ? 'btn-toggle-active' : 'btn-toggle-inactive'
              }`}
            >
              செப்பியா (Sepia)
            </button>
            <button
              type="button"
              onClick={() => setTheme('night')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                theme === 'night' ? 'btn-toggle-active' : 'btn-toggle-inactive'
              }`}
            >
              இரவு (Night)
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.6 || loading}
              className="p-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 hover:bg-[#5A1F24] hover:text-[#FDFBF7] disabled:opacity-40 transition-colors"
              title="சிறிதாக்குக (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs font-semibold px-1">
              {Math.round(scale * 100)}%
            </span>

            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 2.5 || loading}
              className="p-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 hover:bg-[#5A1F24] hover:text-[#FDFBF7] disabled:opacity-40 transition-colors"
              title="பெரிதாக்குக (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="p-1.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 hover:bg-[#5A1F24] hover:text-[#FDFBF7] transition-colors"
              title="இயல்பு அளவு (Reset Zoom)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="btn btn-primary text-xs py-1.5 px-3"
              title="முழுத்திரை (Fullscreen)"
            >
              {isFullscreen ? 'வெளியேறு' : 'முழுத்திரை'}
            </button>
          </div>

        </div>

      </div>

      {/* Reader Canvas Viewport with Side Navigation Controls */}
      <div className={`flex-1 overflow-auto p-4 flex items-center justify-center min-h-[600px] relative transition-colors ${themeStyles.bgContainer}`}>
        
        {/* Floating Side Navigation Arrows */}
        {!loading && !error && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              disabled={pageNum <= 1}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full !bg-[#5A1F24] !text-[#FDFBF7] shadow-lg hover:!bg-[#70262C] disabled:opacity-20 disabled:pointer-events-none transition-all flex items-center gap-1 font-semibold text-xs border border-[#B08D57]/40"
              title="முந்தைய பக்கம் (Previous Page - Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 !text-[#FDFBF7]" />
              <span className="hidden md:inline pr-1 !text-[#FDFBF7]">முந்தைய</span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              disabled={pageNum >= numPages}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full !bg-[#5A1F24] !text-[#FDFBF7] shadow-lg hover:!bg-[#70262C] disabled:opacity-20 disabled:pointer-events-none transition-all flex items-center gap-1 font-semibold text-xs border border-[#B08D57]/40"
              title="அடுத்த பக்கம் (Next Page - Right Arrow)"
            >
              <span className="hidden md:inline pl-1 !text-[#FDFBF7]">அடுத்த</span>
              <ChevronRight className="w-5 h-5 !text-[#FDFBF7]" />
            </button>
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 text-[#5A1F24]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="font-serif text-sm">நூல் பக்கங்கள் ஏற்றப்படுகின்றன (Loading PDF)...</p>
          </div>
        )}

        {error && (
          <div className="bg-[#FDFBF7] p-6 rounded-md border border-[#70262C] max-w-md text-center space-y-3 text-[#70262C]">
            <AlertTriangle className="w-8 h-8 mx-auto" />
            <p className="font-serif text-sm font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className={`relative shadow-2xl border rounded-sm transition-colors ${themeStyles.border} ${themeStyles.bgCanvas}`}>
            {rendering && (
              <div className="absolute inset-0 bg-[#FDFBF7]/60 flex items-center justify-center z-10">
                <Loader2 className="w-6 h-6 animate-spin text-[#5A1F24]" />
              </div>
            )}
            <canvas ref={canvasRef} className="block mx-auto" />
          </div>
        )}

      </div>

    </div>
  );
};

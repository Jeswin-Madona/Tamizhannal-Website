'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import booksData from '@/data/books.json';
import { ReadingMode } from '@/types';
import dynamic from 'next/dynamic';

// Dynamic imports for heavy reader components
const StandardPdfReader = dynamic(
  () => import('@/components/books/StandardPdfReader').then((m) => m.StandardPdfReader),
  { ssr: false }
);

const FlipbookReader = dynamic(
  () => import('@/components/books/FlipbookReader').then((m) => m.FlipbookReader),
  { ssr: false }
);

interface ReaderPageProps {
  params: Promise<{ slug: string }>;
}

export default function BookReaderPage({ params }: ReaderPageProps) {
  const { slug } = use(params);
  const book = booksData.find((b) => b.slug === slug);
  const [readingMode, setReadingMode] = useState<ReadingMode>('standard');

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 min-h-[calc(100vh-140px)] flex flex-col max-w-7xl">
      
      {/* Top Header Bar */}
      <div className="bg-[#3E171B] text-[#F5EFE4] border border-[#B08D57]/40 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 shadow-md">
        
        {/* Left: Back, Book Icon & Title */}
        <div className="flex items-center gap-3">
          <Link
            href={`/books/${book.slug}`}
            className="group min-w-[44px] min-h-[44px] p-2.5 rounded-md bg-[#5A1F24] border-2 border-[#E5C170]/80 text-[#E5C170] hover:bg-[#E5C170] hover:text-[#3E171B] focus:outline-none focus:ring-2 focus:ring-[#E5C170] transition-all flex items-center justify-center shadow-md"
            title="நூல் விவரங்களுக்குத் திரும்புக"
            aria-label="நூல் விவரங்களுக்குத் திரும்புக"
          >
            <ArrowLeft className="w-5 h-5 text-[#E5C170] group-hover:text-[#3E171B] transition-colors stroke-[2.5]" />
          </Link>

          {/* Book Icon near Heading */}
          <div className="w-10 h-10 rounded-md bg-[#5A1F24] border border-[#B08D57]/50 flex items-center justify-center text-[#E5C170] shadow-xs flex-shrink-0">
            <BookOpen className="w-5 h-5 text-[#E5C170]" />
          </div>

          <div>
            <h1
              className="font-serif text-xl font-bold leading-snug"
              style={{ color: '#F5EFE4' }}
            >
              {book.titleTa}
            </h1>
            <div className="flex items-center gap-2 text-xs text-[#B08D57]">
              <span className="badge-archival bg-[#E5C170] text-[#3E171B] font-bold border-none px-2 py-0.5">{book.categoryTa}</span>
              <span>•</span>
              <span className="text-[#F5EFE4]">ஆன்லைன் வாசிப்பு ஆவணம்</span>
            </div>
          </div>
        </div>

        {/* Right: Mode Switcher — High Contrast Active & Inactive States */}
        <div
          className="flex items-center gap-2 bg-[#1F090C] p-1.5 rounded-lg border border-[#B08D57]/70 shadow-inner"
          role="tablist"
          aria-label="வாசிப்பு பயன்முறை (Reading Mode)"
        >
          {/* Standard PDF Reader Button */}
          <button
            type="button"
            role="tab"
            id="tab-standard"
            aria-selected={readingMode === 'standard'}
            aria-controls="reader-panel"
            onClick={() => setReadingMode('standard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs transition-all min-h-[42px] focus:outline-none focus:ring-2 focus:ring-[#E5C170] focus:ring-offset-2 focus:ring-offset-[#1F090C] cursor-pointer ${
              readingMode === 'standard'
                ? 'bg-[#E5C170] shadow-md border-2 border-[#FAF5EA] font-extrabold'
                : 'bg-[#3E171B]/90 hover:bg-[#5A1F24] border border-[#B08D57]/50 font-bold'
            }`}
            style={{
              color: readingMode === 'standard' ? '#231D1A' : '#F5EFE4',
              backgroundColor: readingMode === 'standard' ? '#E5C170' : '#3E171B',
            }}
          >
            <BookOpen
              className="w-4 h-4 shrink-0"
              style={{ color: readingMode === 'standard' ? '#231D1A' : '#E5C170' }}
            />
            <span style={{ color: readingMode === 'standard' ? '#231D1A' : '#F5EFE4' }}>
              இயல்பு வாசிப்பு
            </span>
          </button>

          {/* Flipbook Reader Button */}
          <button
            type="button"
            role="tab"
            id="tab-flipbook"
            aria-selected={readingMode === 'flipbook'}
            aria-controls="reader-panel"
            onClick={() => setReadingMode('flipbook')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs transition-all min-h-[42px] focus:outline-none focus:ring-2 focus:ring-[#E5C170] focus:ring-offset-2 focus:ring-offset-[#1F090C] cursor-pointer ${
              readingMode === 'flipbook'
                ? 'bg-[#E5C170] shadow-md border-2 border-[#FAF5EA] font-extrabold'
                : 'bg-[#3E171B]/90 hover:bg-[#5A1F24] border border-[#B08D57]/50 font-bold'
            }`}
            style={{
              color: readingMode === 'flipbook' ? '#231D1A' : '#F5EFE4',
              backgroundColor: readingMode === 'flipbook' ? '#E5C170' : '#3E171B',
            }}
          >
            <Layers
              className="w-4 h-4 shrink-0"
              style={{ color: readingMode === 'flipbook' ? '#231D1A' : '#E5C170' }}
            />
            <span style={{ color: readingMode === 'flipbook' ? '#231D1A' : '#F5EFE4' }}>
              Flipbook முறை
            </span>
          </button>
        </div>

      </div>

      {/* Reader Container */}
      <div
        id="reader-panel"
        role="tabpanel"
        aria-labelledby={readingMode === 'standard' ? 'tab-standard' : 'tab-flipbook'}
        className="flex-1"
      >
        {readingMode === 'standard' ? (
          <StandardPdfReader pdfUrl={book.pdfUrl} bookTitle={book.titleTa} />
        ) : (
          <FlipbookReader
            pdfUrl={book.pdfUrl}
            bookTitle={book.titleTa}
            onFallbackToStandard={() => setReadingMode('standard')}
          />
        )}
      </div>

    </div>
  );
}

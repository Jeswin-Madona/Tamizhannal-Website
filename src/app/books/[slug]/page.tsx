import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Download, ArrowLeft, Calendar, Building, HardDrive, Tag } from 'lucide-react';
import booksData from '@/data/books.json';

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = booksData.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-6xl">
      
      {/* Back Link — Compact & Accessible */}
      <div>
        <Link 
          href="/books" 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#5A1F24] bg-[#FAF5EA] border border-[#B08D57]/35 hover:bg-[#5A1F24] hover:text-[#FDFBF7] transition-all shadow-xs group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#B08D57] group-hover:text-[#FDFBF7] transition-colors" />
          <span>நூல்கள் (Books)</span>
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="archive-card p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-md">
        
        {/* Book Cover Frame with Real Supabase Cover Image & Spine Accent */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px] bg-[#FAF5EA] rounded-md border-l-4 border-l-[#5A1F24] border border-[#B08D57]/40 overflow-hidden shadow-lg relative group">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={book.titleTa}
                className="w-full h-auto object-cover max-h-[420px] transition-transform duration-300 group-hover:scale-[1.02] block"
              />
            ) : (
              <div className="aspect-[3/4] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center font-serif text-4xl font-bold mb-4 border border-[#5A1F24]/20">
                  {book.titleTa.charAt(0)}
                </div>
                <h2 className="font-serif text-xl font-bold text-[#5A1F24] leading-snug">
                  {book.titleTa}
                </h2>
                {book.titleEn && (
                  <p className="text-xs font-sans text-[#6B625C] italic mt-1">
                    {book.titleEn}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Details Column */}
        <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-archival bg-[#FAF5EA]">
                {book.categoryTa}
              </span>
              {book.publicationYear && (
                <span className="text-xs bg-[#FAF5EA] text-[#6B625C] px-2.5 py-1 rounded border border-[#B08D57]/20 font-semibold">
                  ஆண்டு: {book.publicationYear}
                </span>
              )}
            </div>

            <div className="space-y-1">
              {/* Primary Tamil Title */}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#5A1F24] leading-snug">
                {book.titleTa}
              </h1>

              {/* Secondary Romanized Title Aid */}
              {book.titleEn && (
                <p className="text-base font-sans text-[#6B625C] italic tracking-wide">
                  {book.titleEn}
                </p>
              )}
            </div>

            {book.descriptionTa && (
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-lg font-bold text-[#5A1F24]">நூல் குறிப்பு:</h3>
                <p className="text-base text-[#231D1A] leading-relaxed max-w-3xl">
                  {book.descriptionTa}
                </p>
              </div>
            )}

            {/* Specs Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6B625C] pt-4 border-t border-[#B08D57]/20 font-medium">
              {book.publisher && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#B08D57]" />
                  <span>பதிப்பகம்: {book.publisher}</span>
                </div>
              )}
              {book.publicationYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#B08D57]" />
                  <span>வெளியீட்டு ஆண்டு: {book.publicationYear}</span>
                </div>
              )}
              {book.fileSizeMb && (
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#B08D57]" />
                  <span>கோப்பு அளவு: {book.fileSizeMb} MB</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#B08D57]" />
                <span>வகை: {book.categoryTa}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#B08D57]/25">
            <Link
              href={`/books/${book.slug}/read`}
              className="btn btn-primary min-h-[44px] px-6 font-bold"
            >
              <BookOpen className="w-4 h-4 !text-[#FDFBF7]" />
              <span>ஆன்லைனில் படிக்க (Read Online)</span>
            </Link>

            <a
              href={book.pdfUrl}
              download
              className="btn btn-secondary min-h-[44px] px-6 font-bold"
            >
              <Download className="w-4 h-4 !text-[#5A1F24]" />
              <span>PDF பதிவிறக்க (Download PDF)</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

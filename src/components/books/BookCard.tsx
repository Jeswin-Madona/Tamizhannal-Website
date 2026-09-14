'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Calendar, HardDrive } from 'lucide-react';
import { Book } from '@/types';

interface BookCardProps {
  book: Book;
  ctaText?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, ctaText = 'படிக்க' }) => {
  const router = useRouter();

  const handleCoverDoubleClick = () => {
    router.push(`/books/${book.slug}/read`);
  };

  return (
    <article className="archive-card bg-[#FDFBF7] border border-[#B08D57]/30 rounded-md p-5 flex flex-col justify-between h-full group hover:border-[#B08D57]/60 hover:bg-[#FFFFFF] transition-all duration-200 shadow-xs">
      <div>
        {/* Book Cover Frame with Double-Click Reader Access & Spine Highlight */}
        <div 
          onDoubleClick={handleCoverDoubleClick}
          title="இரட்டைச் சொடுக்கு: வாசிக்க (Double-click to Read)"
          className="relative w-full aspect-[3/4] bg-[#FAF5EA] rounded-sm mb-4 border-l-4 border-l-[#5A1F24] border border-[#B08D57]/25 flex flex-col items-center justify-center text-center overflow-hidden shadow-xs cursor-pointer group/cover"
        >
          {book.coverImageUrl ? (
            <img 
              src={book.coverImageUrl} 
              alt={book.titleTa}
              className="w-full h-full object-cover object-center group-hover/cover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to text card if cover image fails to load
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : null}

          <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center bg-[#FAF5EA] -z-10">
            <div className="w-12 h-12 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center font-serif text-xl font-bold mb-2 border border-[#5A1F24]/20 flex-shrink-0">
              {book.titleTa.charAt(0)}
            </div>

            <h4 className="font-serif text-base font-bold text-[#5A1F24] leading-snug line-clamp-2">
              {book.titleTa}
            </h4>

            {book.titleEn && (
              <p className="text-[11px] font-sans text-[#6B625C] italic mt-0.5 line-clamp-1">
                {book.titleEn}
              </p>
            )}
          </div>

          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center text-[10px] font-sans font-bold text-[#FDFBF7] bg-[#5A1F24] px-2 py-0.5 rounded shadow-sm border border-[#B08D57]/60 leading-tight">
              {book.categoryTa}
            </span>
          </div>

          {/* Subtle Hover Hint */}
          <div className="absolute inset-x-0 bottom-0 bg-[#3E171B]/95 text-[#F5EFE4] text-[11px] font-semibold py-1.5 px-2 text-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 backdrop-blur-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>வாசிக்க (Double Click)</span>
          </div>
        </div>

        {/* Titles: Primary Tamil + Secondary Romanized / Thunglish */}
        <div className="space-y-1.5 mb-4">
          <h3 className="font-serif text-lg font-bold !text-[#5A1F24] group-hover:!text-[#70262C] transition-colors leading-snug">
            <Link href={`/books/${book.slug}`} className="!text-[#5A1F24] hover:!text-[#70262C]">
              {book.titleTa}
            </Link>
          </h3>

          {book.titleEn && (
            <p className="text-xs font-sans text-[#6B625C] italic tracking-wide">
              {book.titleEn}
            </p>
          )}

          {book.descriptionTa && (
            <p className="text-xs text-[#6B625C] line-clamp-3 leading-relaxed pt-1">
              {book.descriptionTa}
            </p>
          )}
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B625C] mb-4 pt-2.5 border-t border-[#B08D57]/20 font-medium">
          {book.publicationYear && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>ஆண்டு: {book.publicationYear}</span>
            </span>
          )}
          {book.fileSizeMb && (
            <span className="flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{book.fileSizeMb} MB</span>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons — Non-Clipping Tamil Text Layout */}
      <div className="flex items-center gap-2 pt-2">
        <Link
          href={`/books/${book.slug}/read`}
          className="btn btn-primary flex-1 text-xs px-3 justify-center min-h-[42px] min-w-0"
        >
          <BookOpen className="w-4 h-4 !text-[#FDFBF7] flex-shrink-0" />
          <span className="whitespace-nowrap font-bold">{ctaText}</span>
        </Link>
        
        <Link
          href={`/books/${book.slug}`}
          className="btn btn-secondary text-xs px-3 justify-center min-h-[42px] flex-shrink-0"
        >
          <span className="whitespace-nowrap">விவரங்கள்</span>
        </Link>
      </div>
    </article>
  );
};


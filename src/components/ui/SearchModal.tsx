'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, ArrowRight, Filter } from 'lucide-react';
import booksData from '@/data/books.json';
import { Book } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Popular quick search suggestion tags from canonical categories
const QUICK_SEARCH_TAGS = ['இலக்கியம்', 'திருக்குறள்', 'தொல்காப்பியம்', 'இலக்கணம்', 'உரை', 'ஆய்வு'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [failedCovers, setFailedCovers] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results: Book[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return (booksData as Book[]).filter((book) => {
      return (
        book.titleTa.toLowerCase().includes(q) ||
        (book.titleEn && book.titleEn.toLowerCase().includes(q)) ||
        (book.descriptionTa && book.descriptionTa.toLowerCase().includes(q)) ||
        book.categoryTa.toLowerCase().includes(q) ||
        (book.publisher && book.publisher.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const handleCoverError = (id: string) => {
    setFailedCovers((prev) => ({ ...prev, [id]: true }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-[#150709]/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="தேடல் சாளரம்"
    >
      
      {/* Modal Card */}
      <div 
        className="w-full max-w-2xl lg:max-w-3xl bg-[#FDFBF7] border-2 border-[#B08D57]/60 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar Header */}
        <div className="p-3.5 sm:p-4 bg-[#FAF5EA] border-b-2 border-[#B08D57]/40 flex items-center gap-3 shadow-xs">
          <Search className="w-5 h-5 text-[#5A1F24] stroke-[2.5] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="நூல் தலைப்பு, வகை அல்லது சொல் தேடுக..."
            className="flex-1 bg-transparent border-none text-[#231D1A] placeholder-[#6B625C] font-serif text-base sm:text-lg font-bold focus:outline-none"
            aria-label="நூல் தேடல் உள்ளீடு"
          />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#6B625C] hover:text-[#5A1F24] p-1.5 rounded-full hover:bg-[#B08D57]/15 transition-colors"
              aria-label="தேடலை அழி"
              title="அழி"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded bg-[#5A1F24] text-[#FAF5EA] hover:bg-[#70262C] transition-colors font-mono text-xs font-bold shadow-xs border border-[#E5C170]/60 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#E5C170]"
            title="மூடுக (Esc)"
          >
            <span>Esc</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {query.trim() === '' ? (
            /* Archival Intro Empty State */
            <div className="py-6 sm:py-10 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#5A1F24] text-[#E5C170] flex items-center justify-center shadow-md border-2 border-[#E5C170]/70 mx-auto">
                <BookOpen className="w-7 h-7 text-[#E5C170]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#5A1F24]">
                  தமிழண்ணல் டிஜிட்டல் காப்பகம்
                </h3>
                <p className="text-xs font-mono font-bold text-[#B08D57] tracking-wider uppercase">
                  {booksData.length} நூல்களிலிருந்து தேடுக
                </p>
                <p className="text-xs text-[#6B625C] pt-1 leading-relaxed">
                  நூல் தலைப்பு, வகை அல்லது சொல்லை உள்ளிட்டு தேடலைத் தொடங்குங்கள்.
                </p>
              </div>

              {/* Quick Search Chips */}
              <div className="pt-3 border-t border-[#B08D57]/20 space-y-2">
                <span className="text-[11px] font-serif font-bold text-[#5A1F24] block">
                  வேகமானத் தேடல் தலைப்புகள்:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {QUICK_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 rounded-full bg-[#FAF5EA] text-[#5A1F24] hover:bg-[#5A1F24] hover:text-[#FAF5EA] border border-[#B08D57]/40 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Results List */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#5A1F24] pb-2 border-b border-[#B08D57]/25">
                <span>கண்டுபிடிக்கப்பட்ட நூல்கள்:</span>
                <span className="font-mono bg-[#5A1F24] text-[#FAF5EA] px-2.5 py-0.5 rounded-full border border-[#E5C170]/50 text-[11px]">
                  {results.length} முடிவுகள்
                </span>
              </div>

              <div className="space-y-2">
                {results.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.slug}`}
                    onClick={onClose}
                    className="block p-3 sm:p-3.5 rounded-lg bg-[#FAF5EA] border border-[#B08D57]/30 hover:border-[#B08D57]/70 hover:bg-[#F3EAD8] transition-all group shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#E5C170]"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Real Book Cover Image or Fallback Circle */}
                      <div className="w-12 h-16 sm:w-14 sm:h-18 bg-[#FDFBF7] rounded border border-[#B08D57]/40 overflow-hidden shadow-xs flex-shrink-0 flex items-center justify-center">
                        {book.coverImageUrl && !failedCovers[book.id] ? (
                          <img
                            src={book.coverImageUrl}
                            alt={book.titleTa}
                            onError={() => handleCoverError(book.id)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center font-serif text-sm font-bold border border-[#5A1F24]/20">
                            {book.titleTa.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Title & Metadata Hierarchy */}
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="badge-archival bg-[#E5C170] text-[#3E171B] font-extrabold text-[10px] px-2 py-0.5 border-none">
                            {book.categoryTa}
                          </span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#5A1F24] group-hover:text-[#70262C] transition-colors truncate">
                            {book.titleTa}
                          </h4>
                        </div>

                        {book.titleEn && (
                          <p className="text-xs font-sans text-[#6B625C] italic truncate">
                            {book.titleEn}
                          </p>
                        )}

                        {book.descriptionTa && (
                          <p className="text-xs text-[#6B625C] line-clamp-1 leading-relaxed">
                            {book.descriptionTa}
                          </p>
                        )}
                      </div>

                      {/* Navigation Arrow Indicator */}
                      <ArrowRight className="w-4 h-4 text-[#5A1F24] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* Empty Results State */
            <div className="py-10 text-center space-y-3 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center mx-auto border border-[#5A1F24]/20">
                <Filter className="w-6 h-6 text-[#5A1F24]" />
              </div>
              <p className="font-serif text-base text-[#5A1F24] font-bold">
                &quot;{query}&quot; என்ற தேடலுக்கு நூல்கள் எதுவும் கிடைக்கவில்லை.
              </p>
              <p className="text-xs text-[#6B625C] leading-relaxed">
                வேறு நூல் தலைப்பு, வகை அல்லது சொல்லைப் பயன்படுத்தித் தேடவும்.
              </p>
            </div>
          )}
        </div>

        {/* Elegant Archival Search Footer */}
        <div className="px-4 py-3 bg-[#FAF5EA] border-t border-[#B08D57]/30 flex items-center justify-between text-xs text-[#6B625C] font-semibold font-serif">
          <div className="flex items-center gap-1.5 text-[#5A1F24]">
            <BookOpen className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>தமிழண்ணல் டிஜிட்டல் ஆவணக்கப்பகம்</span>
          </div>
          <span className="font-mono text-[#5A1F24] font-bold">
            {booksData.length} நூல்கள் காப்பகத்தில்
          </span>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import booksData from '@/data/books.json';
import categoriesData from '@/data/categories.json';
import { BookCard } from '@/components/books/BookCard';
import { CategoryFilter } from '@/components/books/CategoryFilter';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      // Filter by category
      if (selectedCategory && book.categoryId !== selectedCategory) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitleTa = book.titleTa.toLowerCase().includes(q);
        const matchesTitleEn = book.titleEn?.toLowerCase().includes(q) || false;
        const matchesDesc = book.descriptionTa?.toLowerCase().includes(q) || false;
        const matchesCategory = book.categoryTa.toLowerCase().includes(q);
        return matchesTitleTa || matchesTitleEn || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 max-w-7xl">
      
      {/* Page Header */}
      <SectionHeader
        titleTa="நூல்கள் காப்பகம்"
        subtitleTa="முனைவர் தமிழண்ணல் அவர்கள் எழுதிய சங்க இலக்கிய ஆய்வுகள், உரைகள், இலக்கண நூல்கள் மற்றும் இலக்கியக் கட்டுரைகளின் இணையக் காப்பகம்."
        icon={BookOpen}
      />

      {/* Filter and Search Bar */}
      <div className="space-y-4 bg-[#FAF5EA] p-5 rounded-lg border border-[#B08D57]/35 shadow-xs">
        
        {/* Search input */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="நூல் தலைப்பு அல்லது சொல் தேடுக..."
            className="w-full pl-10 pr-4 py-2.5 rounded bg-[#FDFBF7] border border-[#B08D57]/40 text-[#231D1A] placeholder-[#8A817A] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#5A1F24]" />
        </div>

        {/* Category Filter Tabs */}
        <CategoryFilter
          categories={categoriesData}
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Results Grid — 4 Column Responsive Layout */}
      <div>
        <div className="flex items-center justify-between mb-4 text-xs font-semibold text-[#6B625C]">
          <span>காண்பிக்கப்படும் நூல்கள்: {filteredBooks.length} / {booksData.length}</span>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} ctaText="படிக்க" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#FAF5EA] rounded-lg border border-[#B08D57]/30 space-y-2">
            <p className="font-serif text-lg font-bold text-[#5A1F24]">தேடலுக்குரிய நூல்கள் எதுவும் கிடைக்கவில்லை.</p>
            <p className="text-xs text-[#6B625C]">வேறு சொல் அல்லது பிரிவைத் தேர்ந்தெடுத்து தேடவும்.</p>
          </div>
        )}
      </div>

    </div>
  );
}


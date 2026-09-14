'use client';

import React from 'react';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pr-4 scrollbar-none">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2.5 rounded-md font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
          selectedCategoryId === null ? 'btn-toggle-active' : 'btn-toggle-inactive'
        }`}
      >
        அனைத்து நூல்களும்
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2.5 rounded-md font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
            selectedCategoryId === cat.id ? 'btn-toggle-active' : 'btn-toggle-inactive'
          }`}
        >
          {cat.nameTa} ({cat.bookCount})
        </button>
      ))}
    </div>
  );
};


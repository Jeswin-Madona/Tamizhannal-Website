'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { SearchModal } from '@/components/ui/SearchModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', labelTa: 'முகப்பு' },
    { href: '/tamil-vaazhvu', labelTa: 'தமிழ்வாழ்வு' },
    { href: '/books', labelTa: 'நூல்கள்' },
    { href: '/articles', labelTa: 'கட்டுரை' },
    { href: '/gallery', labelTa: 'ஒளிப்படங்கள்' },
    { href: '/ninaivendhal', labelTa: 'நினைவேந்தல்' },
    { href: '/contact', labelTa: 'தொடர்பு' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="header-bar flex items-center shadow-md bg-[#3E171B] border-b border-[#B08D57]/35">
        <div className="container flex items-center justify-between py-3">
          
          {/* 1. Brand Grouping (Left) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-[#B08D57]/40 shadow-xs bg-[#2E0F12]">
              <Image
                src="/icon.png"
                alt="தமிழண்ணல் சின்னம்"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#F5EFE4] tracking-tight group-hover:text-[#B08D57] transition-colors">
                தமிழண்ணல்
              </span>
              <span className="text-[0.62rem] font-sans text-[#B08D57] tracking-widest uppercase font-semibold">
                Digital Literary Archive
              </span>
            </div>
          </Link>

          {/* 2. Navigation Links (Middle / Horizontally Aligned) */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header-nav-link ${active ? 'active' : ''}`}
                >
                  {link.labelTa}
                </Link>
              );
            })}
          </nav>

          {/* 3. Search Button (Far Right) */}
          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="px-3.5 py-1.5 rounded-md text-[#F5EFE4] bg-[#2E0F12] hover:bg-[#5A1F24] transition-colors border border-[#B08D57]/40 flex items-center gap-2 text-xs font-semibold shadow-xs"
              aria-label="தேடல் (Search)"
              title="நூல்கள் தேடல்"
            >
              <Search className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="text-[#F5EFE4]/80">தேடுக...</span>
            </button>
          </div>

          {/* Mobile Triggers */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-md text-[#F5EFE4] hover:bg-[#5A1F24]"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#B08D57]" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#F5EFE4] hover:bg-[#5A1F24] focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#F5EFE4]" /> : <Menu className="w-6 h-6 text-[#F5EFE4]" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Out Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-[68px] inset-x-0 bg-[#3E171B] border-b border-[#B08D57]/40 px-5 py-4 space-y-2 shadow-2xl z-50 animate-fade-in">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md font-sans text-base font-semibold transition-colors ${
                    active
                      ? 'bg-[#B08D57] !text-[#3E171B] shadow-xs'
                      : '!text-[#F5EFE4] hover:bg-[#5A1F24] hover:!text-[#B08D57]'
                  }`}
                >
                  {link.labelTa}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Search Overlay Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};


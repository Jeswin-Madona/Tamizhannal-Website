import React from 'react';
import Link from 'next/link';
import { ScrollText, Calendar, User, BookOpen, Quote, ArrowRight } from 'lucide-react';
import articlesData from '@/data/articles.json';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function ArticlesPage() {
  const featuredArticle = articlesData[0];
  const paragraphs = featuredArticle ? featuredArticle.contentMarkdown.split('\n\n') : [];

  return (
    <div className="container mx-auto px-4 py-10 space-y-10 max-w-5xl">
      
      {/* Page Editorial Header */}
      <SectionHeader
        titleTa="கட்டுரை"
        subtitleTa="முனைவர் தமிழண்ணல் அவர்களின் வாழ்வும் தமிழ்ப்பணியும் குறித்த சிறப்புக் கட்டுரைகள்."
        icon={ScrollText}
      />

      {/* Featured Editorial Magazine Article Card */}
      {featuredArticle && (
        <article className="archive-card p-6 sm:p-10 bg-[#FDFBF7] border-2 border-[#B08D57]/35 shadow-md rounded-lg space-y-6 animate-fade-in relative overflow-hidden">
          {/* Subtle Corner Archival Accent */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#B08D57]/15 to-transparent pointer-events-none rounded-bl-full" />

          {/* Article Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B08D57]/20 pb-4">
              <span className="badge-archival text-xs font-semibold px-3 py-1 bg-[#5A1F24]/10 text-[#5A1F24] border-[#5A1F24]/20">
                சிறப்புக் கட்டுரை • Featured Essay
              </span>
              {featuredArticle.publishedDate && (
                <div className="flex items-center gap-1.5 text-xs text-[#6B625C] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>வெளியீடு: {featuredArticle.publishedDate}</span>
                </div>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#5A1F24] leading-snug pt-2">
              {featuredArticle.titleTa}
            </h1>

            <div className="flex items-center gap-3 text-sm font-semibold text-[#5A1F24] pt-1">
              <div className="w-9 h-9 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center border border-[#B08D57]/30 flex-shrink-0">
                <User className="w-4 h-4 text-[#5A1F24]" />
              </div>
              <div>
                <span className="block text-[#5A1F24] font-serif font-bold text-base">{featuredArticle.authorTa}</span>
                <span className="block text-xs text-[#6B625C] font-sans font-medium">{featuredArticle.authorTitleTa}</span>
              </div>
            </div>
          </div>

          {/* Editorial Highlight Quote Box */}
          <div className="bg-[#FAF5EA] p-5 rounded-md border-l-4 border-l-[#5A1F24] border border-[#B08D57]/25 my-6 flex items-start gap-3">
            <Quote className="w-6 h-6 text-[#B08D57] flex-shrink-0 mt-1" />
            <p className="font-serif text-base sm:text-lg italic text-[#5A1F24] leading-relaxed">
              &quot;தமிழண்ணல் தமிழ் ஆய்வுலகிலும், ஒப்பிலக்கியத்துறையிலும், சங்க இலக்கிய தனித் திறன் ஆய்விலும் சிறந்து விளங்கியவர்.&quot;
            </p>
          </div>

          {/* Body Article Content — Multi-paragraph with Poem Callout Blocks */}
          <div className="space-y-5 text-[#231D1A] font-sans text-base sm:text-lg leading-relaxed pt-2">
            {paragraphs.map((para, idx) => {
              const isPoem = para.includes('\n') && (para.includes('கல்யாணி') || para.includes('கொங்குதேர்') || para.includes('புறந்தூய்மை'));
              
              if (isPoem) {
                return (
                  <div key={idx} className="my-6 bg-[#FAF5EA] p-6 rounded-lg border border-[#B08D57]/30 shadow-xs font-serif text-[#5A1F24]">
                    <pre className="whitespace-pre-wrap font-serif text-base sm:text-lg italic leading-relaxed">
                      {para}
                    </pre>
                  </div>
                );
              }

              return (
                <p key={idx} className={idx === 0 ? 'drop-cap text-[#231D1A]' : 'text-[#231D1A]'}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* Article Footer & Related Link */}
          <div className="pt-6 border-t border-[#B08D57]/25 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B625C]">
              <BookOpen className="w-4 h-4 text-[#B08D57]" />
              <span>தமிழண்ணல் நினைவு அறக்கட்டளை ஆவணம்</span>
            </div>

            <Link
              href="/ninaivendhal"
              className="btn btn-secondary text-xs font-semibold inline-flex items-center gap-1.5 px-4 min-h-[40px]"
            >
              <span>நினைவேந்தல் ஆவணங்கள் காண்க</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5A1F24]" />
            </Link>
          </div>

        </article>
      )}

    </div>
  );
}


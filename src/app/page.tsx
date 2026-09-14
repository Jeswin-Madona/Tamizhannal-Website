import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Library, Video, UserCheck, Mic, Quote } from 'lucide-react';
import booksData from '@/data/books.json';
import articlesData from '@/data/articles.json';
import { BookCard } from '@/components/books/BookCard';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function HomePage() {
  // Show exactly the 4 requested canonical books on the Home page
  const featuredBookSlugs = [
    'thiruvalluvar-aruliya-thirukkural',
    'tholkappiyar',
    'nannool-ezhutthadhigaram',
    'thandiyalangaaram',
  ];
  const featuredBooks = featuredBookSlugs
    .map((slug) => booksData.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => b !== undefined);

  const featuredArticle = articlesData[0];

  return (
    <div className="space-y-16 py-6">
      
      {/* 1. Archival Hero Section with Integrated Background Image */}
      <section className="relative overflow-hidden bg-[#FAF5EA] py-14 md:py-20 px-4 sm:px-8 border-b border-[#B08D57]/30 min-h-[460px] md:min-h-[520px] flex items-center justify-center shadow-xs">
        {/* Full-width background hero image */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/images/thamizhannal-hero.webp"
            alt="முனைவர் தமிழண்ணல் - தமிழ் மரபுக் காப்பகம்"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] md:object-center opacity-100"
          />
          {/* Subtle center parchment glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,245,234,0.72)_0%,rgba(250,245,234,0.35)_45%,transparent_80%)] pointer-events-none" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 container mx-auto max-w-4xl text-center space-y-5">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDFBF7]/95 backdrop-blur-xs border border-[#B08D57]/40 text-[#5A1F24] text-xs font-semibold shadow-xs">
            <span>1928 — 2015 • தமிழ் மரபுக் காப்பகம்</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5A1F24] leading-tight drop-shadow-xs">
            முனைவர் தமிழண்ணல்
          </h1>

          <p className="font-serif text-lg md:text-xl text-[#231D1A] max-w-3xl mx-auto leading-relaxed font-medium">
            சங்க இலக்கியம், தொல்காப்பியம், திருக்குறள் மற்றும் தமிழ் உரையாசிரிய வரலாற்றில் புகழ்பெற்ற தமிழறிஞர் முனைவர் இராம. பெரியகருப்பன் (தமிழண்ணல்) அவர்களின் வாழ்நூல் காப்பகம்.
          </p>

          <div className="editorial-divider">
            <span>◆</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <Link href="/books" className="btn btn-primary shadow-md min-h-[44px] px-6">
              <BookOpen className="w-4 h-4 !text-[#FDFBF7]" />
              <span>நூல்கள் காப்பகம் (86)</span>
            </Link>
            <Link href="/tamil-vaazhvu" className="btn btn-secondary bg-[#FDFBF7]/90 backdrop-blur-xs shadow-xs min-h-[44px] px-6">
              <span>வாழ்க்கை வரலாறு</span>
              <ArrowRight className="w-4 h-4 !text-[#5A1F24]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Brief Biography Introduction */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="archive-card p-6 md:p-8 bg-[#FDFBF7] border border-[#B08D57]/30 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-3xl">
            <span className="badge-archival">தமிழ்வாழ்வு சுருக்கம்</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#5A1F24]">
              தமிழாக வாழ்ந்த அண்ணல் (12.08.1928 – 29.12.2015)
            </h2>
            <p className="text-sm md:text-base text-[#231D1A] leading-relaxed">
              மதுரை காமராசர் பல்கலைக்கழகத்தின் தமிழ்த்துறைத் தலைவராகவும், மதுரை தியாகராசர் கல்லூரிப் பேராசிரியராகவும் முப்பதாண்டுகளுக்கும் மேலாகப் பணியாற்றி 50-க்கும் மேற்பட்ட ஆய்வு நூல்களை வழங்கியவர்.
            </p>
          </div>
          <Link href="/tamil-vaazhvu" className="btn btn-secondary flex-shrink-0">
            <span>முழு வரலாறு வாசிக்க</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. Featured Books Grid — Exactly 4 Books with Redirect Button */}
      <section className="container mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeader
          titleTa="சிறப்பு நூல்கள்"
          subtitleTa="முனைவர் தமிழண்ணல் அவர்களின் முதன்மையான 4 ஆய்வு நூல்கள்"
          icon={Library}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} ctaText="படிக்க" />
          ))}
        </div>

        {/* Redirect Button to Full Books Page */}
        <div className="text-center pt-4">
          <Link
            href="/books"
            className="btn btn-primary inline-flex items-center gap-2 min-h-[46px] px-8 text-base font-bold shadow-md"
          >
            <span>அனைத்து நூல்களையும் பார்க்க</span>
            <ArrowRight className="w-4 h-4 !text-[#FDFBF7]" />
          </Link>
        </div>
      </section>

      {/* 4. Audio Archive */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="space-y-4">
          <SectionHeader
            titleTa="ஒலிவடிவக் காப்பகம்"
            subtitleTa="மதுரை வானொலியில் ஒலிபரப்பான 49 வார உரையாடல் தொடர்"
            icon={Mic}
          />
          <AudioPlayer />
        </div>
      </section>

      {/* 5. Video Archive & Featured Article */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Video Player Box */}
          <div className="archive-card p-6 flex flex-col justify-between space-y-4 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-sm h-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#5A1F24]">
                <Video className="w-5 h-5 text-[#B08D57]" />
                <h3 className="font-serif text-xl font-bold">
                  பாரிவேந்தர் பைந்தமிழ் விருது 2013
                </h3>
              </div>
              <p className="text-xs text-[#6B625C] font-semibold">
                SRM பல்கலைக்கழகத் தமிழ்ப் பேராயம் வழங்கிய மூதறிஞர் தமிழண்ணல் விருது விழா
              </p>
            </div>

            <div className="relative aspect-video w-full rounded overflow-hidden border-2 border-[#B08D57]/35 shadow-md bg-black">
              <iframe
                src="https://www.youtube.com/embed/KWmMQiGJEd0"
                title="பாரிவேந்தர் பைந்தமிழ் விருது 2013 — மூதறிஞர் தமிழண்ணல்"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <p className="text-xs text-[#6B625C] leading-relaxed pt-2 border-t border-[#B08D57]/20">
              தமிழ்ப் பேராயம் சார்பில் நடைபெற்ற மூதறிஞர் விருது வழங்கல் நிகழ்வின் வரலாற்று ஒளிப்பதிவு.
            </p>
          </div>

          {/* Featured Essay — Balanced Layout without Empty Whitespace */}
          {featuredArticle && (
            <div className="archive-card p-6 flex flex-col justify-between space-y-4 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-sm h-full">
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between border-b border-[#B08D57]/20 pb-2">
                  <div className="flex items-center gap-2 text-[#5A1F24]">
                    <UserCheck className="w-5 h-5 text-[#B08D57]" />
                    <h3 className="font-serif text-xl font-bold">
                      சிறப்புக் கட்டுரை
                    </h3>
                  </div>
                  <span className="badge-archival">நினைவுக் கட்டுரை</span>
                </div>

                <h4 className="font-serif text-xl font-bold text-[#5A1F24] leading-snug">
                  {featuredArticle.titleTa}
                </h4>

                <p className="text-xs text-[#5A1F24] font-semibold">
                  ஆசிரியர்: {featuredArticle.authorTa}
                </p>

                {/* Quote Callout Box to Fill Layout Elegantly */}
                <div className="bg-[#FAF5EA] p-3.5 rounded border-l-4 border-l-[#5A1F24] border border-[#B08D57]/25 flex items-start gap-2 my-2">
                  <Quote className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-1" />
                  <p className="font-serif text-xs italic text-[#5A1F24] leading-relaxed">
                    &quot;முனைவர் தமிழண்ணல் அவர்கள் தமிழ் உரைநடைக்கும், இலக்கணத்திற்கும், ஆய்வுலகிற்கும் ஆற்றிய பங்களிப்பு ஈடற்றது.&quot;
                  </p>
                </div>

                <p className="text-sm text-[#6B625C] leading-relaxed line-clamp-4">
                  {featuredArticle.contentMarkdown}
                </p>
              </div>

              <div className="pt-4 border-t border-[#B08D57]/20 flex justify-between items-center text-xs font-semibold">
                <span className="text-[#6B625C]">முழுமையான கட்டுரை வாசிக்க</span>
                <Link href="/articles" className="btn btn-primary text-xs py-1.5 px-4 min-h-[38px] inline-flex items-center gap-1">
                  <span>கட்டுரையைப் படிக்க</span>
                  <ArrowRight className="w-3.5 h-3.5 !text-[#FDFBF7]" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}



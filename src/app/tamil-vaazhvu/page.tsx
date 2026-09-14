import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, GraduationCap, Building2, Heart, Award, Library, Quote, UserCheck, HeartHandshake } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function TamilVaazhvuPage() {
  const sections = [
    {
      id: 'birth',
      year: '1928',
      titleTa: '1. பிறப்பு (Birth & Early Life)',
      icon: Calendar,
      contentTa: 'முனைவர் தமிழண்ணல் (இயற்பெயர்: இராம. பெரியகருப்பன்) 12 ஆகஸ்ட் 1928 அன்று சிவகங்கை மாவட்டம் நெற்குப்பை என்னும் சிற்றூரில் பிறந்தார். பெற்றோர் இராமசாமி, கல்யாணி ஆச்சி ஆவர். இளமையிலிருந்தே தமிழ் மொழி மற்றும் இலக்கியத்தின் மீது மிகுந்த ஈடுபாடு கொண்டவர்; அண்ணல் என்பது இவரது சிறப்புப் பெயராக அமைந்தது.',
    },
    {
      id: 'education',
      year: '1948 - 1969',
      titleTa: '2. கல்வி (Education & Research)',
      icon: GraduationCap,
      contentTa: 'மேலைச்சிவபுரி கணேசர் செந்தமிழ்க் கல்லூரியிலும், திருவையாறு அரசர் கல்லூரியிலும் பயின்று தமிழ் வித்துவான் பட்டம் பெற்றார் (1948). பின்னர் சென்னைப் பல்கலைக்கழகத்தில் இளங்கலை (பொருளியல் - 1948), முதுகலைத் தமிழ் (1961) பட்டங்களைப் பெற்றார். மதுரை தியாகராசர் கல்லூரியில் பணியாற்றிய காலத்தில் "சங்க இலக்கிய மரபுகள்" என்னும் பொருளில் ஆய்வு செய்து முனைவர் பட்டம் (Ph.D.) பெற்றார் (1969). முனைவர் சி.இலக்குவனாரும், முனைவர் அ.சிதம்பரநாதனாரும் இவர்தம் ஆய்வு நெறியாளர்கள்.',
    },
    {
      id: 'career',
      year: '1948 - 1989',
      titleTa: '3. ஆசிரியர் பணி (Teaching Career)',
      icon: Building2,
      contentTa: 'காரைக்குடி மீ.சு.உயர்நிலைப்பள்ளியில் தம் ஆசிரியர் பணியைத் தொடங்கி 13 ஆண்டுகள் பணிபுரிந்தார்; இங்குத் தம் கல்லூரித் தோழர் கவிஞர் முடியரசனாருடன் பணிபுரிந்தமை குறிப்பிடத்தக்கது. தொடர்ந்து மதுரை தியாகராசர் கல்லூரியில் 10 ஆண்டுகள் தமிழ்ப் பேராசிரியராகவும், 1971 முதல் மதுரை காமராசர் பல்கலைக்கழகத்தில் தமிழ்த்துறைத் தலைவராகவும் பேராசிரியராகவும் முப்பதாண்டுகளுக்கும் மேலாகப் பணியாற்றினார். இவர்தம் பணிக்காலத்தில் தமிழ்த்துறை சிறப்பு நிதியுதவித் துறையாக உயர்வுபெற்றது; நாற்பதுக்கும் மேற்பட்ட முனைவர் பட்ட ஆய்வாளர்களை உருவாக்கினார்.',
    },
    {
      id: 'family',
      year: '1954',
      titleTa: '4. குடும்பம் (Family & Heritage)',
      icon: Heart,
      contentTa: 'தமிழண்ணல் அவர்களுக்கு 1954 ஆகத்து 30 இல் திருமணம் நடைபெற்றது. இவர்களுக்குச் சோலையப்பன், கண்ணன், மணிவண்ணன் என்ற ஆண்மக்களும், கண்ணம்மை, அன்புச்செல்வி, முத்துமீனாள் என்ற பெண்மக்களும் பிறந்து வாழ்வாங்கு வாழ்ந்து வருகின்றனர். நெற்குப்பையில் குடும்ப மரபுகளைப் பேணி, வாழ்நாள் முழுதும் தமிழ் மொழி வளர்ச்சிக்கும் சமுதாயப் பணிக்கும் தங்களை அர்ப்பணித்துக் கொண்டார்.',
    },
    {
      id: 'honors',
      year: '1989 - 2013',
      titleTa: '5. பெற்ற சிறப்புகள் (Honors & Awards)',
      icon: Award,
      contentTa: 'தமிழக அரசின் திரு. வி. க. விருது, SRM பல்கலைக்கழகத்தின் பாரிவேந்தர் பைந்தமிழ் விருது (2013) உள்ளிட்ட பல உயரிய விருதுகளையும் தமிழமைப்புகளின் பட்டங்களையும் பெற்றார். மதுரையில் உலகத் தமிழ்ச் சங்கம் அமைவதற்கு முதன்மை ஒருங்கிணைப்பாளராகச் செயல்பட்டார். தமிழ் மொழிக்காக இவர் ஆற்றிய நற்பணிகள் இலக்கிய வரலாற்றில் அழியா இடம் பெற்றுள்ளன.',
    },
    {
      id: 'works',
      year: '1970 - 2015',
      titleTa: '6. தமிழண்ணல் நூல்கள் (Works & Publications)',
      icon: Library,
      contentTa: 'சங்க இலக்கியம், தொல்காப்பியம், திருக்குறள், இலக்கணம், மொழியியல், உரைநடை, ஒப்பிலக்கியம் மற்றும் ஆய்வுநெறிமுறைகளில் 86-க்கும் மேற்பட்ட தலைசிறந்த தமிழ் நூல்களையும் 500-க்கும் மேற்பட்ட ஆய்வுக் கட்டுரைகளையும் ஆக்கியுள்ளார்.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-12 max-w-6xl">
      
      {/* 1. SECTION 1: Biography Hero Banner */}
      <section className="archive-card p-6 sm:p-10 bg-[#FAF5EA] border-2 border-[#B08D57]/35 rounded-lg space-y-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B08D57]/25 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-sans text-[#B08D57] font-bold uppercase tracking-widest block">வாழ்க்கை வரலாறு • தமிழ்வாழ்வு</span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#5A1F24]">
              அவரது வாழ்க்கை — தமிழறிஞர் மற்றும் எழுத்தாளர்
            </h1>
          </div>
          <span className="badge-archival bg-[#5A1F24]/10 text-[#5A1F24] border-[#5A1F24]/20 text-xs font-semibold px-3 py-1.5">
            நன்றி: முனைவர் மு.இளங்கோவன்
          </span>
        </div>

        <p className="font-serif text-lg sm:text-xl text-[#231D1A] leading-relaxed font-medium">
          தமிழறிஞர்களால் “தமிழண்ணல்” என அழைக்கப்படும் இராம. பெரியகருப்பன் அவர்கள் இருபதாம் நூற்றாண்டின் தமிழ் ஆளுமைகளுள் குறிப்பிடத் தகுந்தவர். மதுரை காமராசர் பல்கலைக்கழகத்தின் தமிழ்த்துறைத் தலைவராக விளங்கி இவர் ஆற்றிய பெரும்பணிகள் இலக்கிய உலகில் என்றும் நினைவு கூரத்தக்கன.
        </p>
      </section>

      {/* 2. SECTION 2: Detailed Biography Card (Left Picture, Right Content) */}
      <section className="archive-card p-6 sm:p-10 bg-[#FDFBF7] border border-[#B08D57]/35 rounded-lg shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Portrait Picture */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border-2 border-[#B08D57]/40 shadow-md bg-[#FAF5EA]">
              <Image
                src="/images/hero.png"
                alt="முனைவர் தமிழண்ணல் - portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <div className="text-center bg-[#FAF5EA] p-3 rounded border border-[#B08D57]/25">
              <h3 className="font-serif text-lg font-bold text-[#5A1F24]">முனைவர் தமிழண்ணல்</h3>
              <p className="text-xs text-[#6B625C] font-semibold">12.08.1928 – 29.12.2015</p>
            </div>
          </div>

          {/* Right Column: Detailed Biography Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="border-b border-[#B08D57]/25 pb-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#5A1F24]">
                வாழ்க்கை வரலாறு
              </h2>
              <p className="font-serif text-base text-[#B08D57] font-semibold italic pt-0.5">
                தமிழுக்காக வாழ்ந்த அறிஞர்
              </p>
            </div>

            <div className="space-y-4 text-base text-[#231D1A] leading-relaxed font-sans">
              <p>
                தமிழறிஞர்களால் “தமிழண்ணல்” என அன்புடன் அழைக்கப்படும் இராம. பெரியகருப்பன் அவர்கள், இருபதாம் நூற்றாண்டின் தமிழ் ஆளுமைகளுள் குறிப்பிடத் தகுந்தவர். மதுரை காமராசர் பல்கலைக்கழகத்தின் தமிழ்த்துறைத் தலைவராக விளங்கி இவர் ஆற்றிய பெரும்பணிகள் இலக்கிய உலகில் என்றும் நினைவு கூரத்தக்கன.
              </p>

              <p>
                அவர் 12.08.1928 அன்று சிவகங்கை மாவட்டம் நெற்குப்பை என்னும் சிற்றூரில் பிறந்தார். பெற்றோர் இட்டபெயர் பெரியகருப்பன் என்பதாகும்; பெற்றோர் இராமசாமி, கல்யாணி ஆச்சியாவர்.
              </p>

              <p>
                மேலைச்சிவபுரி கணேசர் செந்தமிழ்க் கல்லூரியிலும், திருவையாறு அரசர் கல்லூரியிலும் பயின்று தமிழ் வித்துவான் பட்டம் பெற்றார் (1948). பிறகு தன்முயற்சியால் கற்று சென்னைப் பல்கலைக்கழகத்தில் இளங்கலை (பொருளியல்) (1948), முதுகலைத் தமிழ் (1961) ஆகிய பட்டங்களைப் பெற்றார். மதுரை தியாகராசர் கல்லூரியில் விரிவுரையாளராகப் பணியாற்றிய காலத்தில் “சங்க இலக்கிய மரபுகள்” என்னும் பொருளில் ஆய்வு செய்து முனைவர் பட்டம் பெற்றார் (1969). முனைவர் சி.இலக்குவனாரும், முனைவர் அ.சிதம்பரநாதனாரும் இவர்தம் ஆய்வு நெறியாளர்கள்.
              </p>

              {/* Highlight Quote Box */}
              <div className="bg-[#FAF5EA] p-4.5 rounded-md border-l-4 border-l-[#5A1F24] border border-[#B08D57]/30 my-4 flex items-center gap-3">
                <Quote className="w-6 h-6 text-[#B08D57] flex-shrink-0" />
                <p className="font-serif text-lg font-bold text-[#5A1F24] italic">
                  &quot;தமிழ் மொழியின் வளர்ச்சியே தமிழரின் பண்பாட்டு வளர்ச்சி.&quot;
                </p>
              </div>

              <p>
                தமிழண்ணல் அவர்கள் காரைக்குடி மீ.சு.உயர்நிலைப்பள்ளியில் தம் ஆசிரியர் பணியைத் தொடங்கினார்; இங்குத் தம் கல்லூரித் தோழர் கவிஞர் முடியரசனாருடன் பணிபுரிந்தமை குறிப்பிடத்தக்க ஒன்று. பதின்மூன்று ஆண்டுகள் இங்குப் பணிபுரிந்த பிறகு மதுரைத் தியாகராசர் கல்லூரியில் பத்தாண்டுகள் தமிழ்ப் பேராசிரியர் பணியாற்றினார். 1971 முதல் மதுரை காமராசர் பல்கலைக்கழகத்தில் விரிவுரையாளராகப் பணியாற்றியும் பின்னர் இணைப்பேராசிரியர், அஞ்சல்வழிக் கல்விப் பேராசிரியர், தமிழியல்துறைப் பேராசிரியர், ஒருங்கிணைப்பாளர் பணி என பல நிலைகளில் பணிபுரிந்துள்ளார். இவர்தம் பணிக்காலத்தில் மதுரை காமராசர் பல்கலைக்கழகத்தின் தமிழ்த்துறை சிறப்பு நிதியுதவித் துறையாக உயர்வுபெற்றது. இவர் மேற்பார்வையில் நாற்பதுக்கும் மேற்பட்டவர்கள் முனைவர் பட்டம் பெற்றுள்ளனர்.
              </p>

              <p>
                தமிழண்ணல் அவர்களுக்கு 1954, ஆகத்து 30 இல் திருமணம் நடைபெற்றது. இவர்களுக்குச் சோலையப்பன், கண்ணன், மணிவண்ணன் என்ற ஆண்மக்களும், கண்ணம்மை, அன்புச்செல்வி, முத்துமீனாள் என்ற பெண்மக்களும் பிறந்து வாழ்வாங்கு வாழ்ந்து வருகின்றனர்.
              </p>

              <p>
                பல தமிழ் நூல்கள் மற்றும் ஆய்வுக் கட்டுரைகளை எழுதி, தமிழ் மொழியின் பெருமையை அடுத்த தலைமுறைக்கு எடுத்துச் சென்றார். 29 டிசம்பர் 2015 அன்று அவர் மறைந்தாலும், அவரது தமிழ் பணிகள் என்றும் நிலைத்திருக்கும்.
              </p>
            </div>

            <div className="pt-4 border-t border-[#B08D57]/20 flex justify-end">
              <span className="text-xs font-semibold text-[#5A1F24] bg-[#FAF5EA] px-3 py-1 rounded border border-[#B08D57]/30">
                நன்றி: முனைவர் மு.இளங்கோவன்
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION 3: Timeline Header */}
      <SectionHeader
        titleTa="தமிழ்வாழ்வு (1928 – 2015)"
        subtitleTa="முனைவர் தமிழண்ணல் அவர்களின் 6 வரலாற்று வாழ்நாட் பிரிவுகள் மற்றும் வரலாற்று மைல்கற்கள்."
        icon={Calendar}
      />

      {/* Vertical Editorial Timeline */}
      <div className="relative border-l-2 border-[#B08D57]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10 my-8">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={sec.id} className="relative group animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* Timeline Year Circle Node */}
              <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3E171B] border-2 border-[#B08D57] text-[#F5EFE4] flex items-center justify-center shadow-md group-hover:bg-[#B08D57] group-hover:text-[#3E171B] transition-colors">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Card Container */}
              <div className="archive-card p-6 sm:p-8 bg-[#FDFBF7] border border-[#B08D57]/30 rounded-lg shadow-sm space-y-3 hover:border-[#B08D57]/60">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B08D57]/20 pb-3">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#5A1F24] leading-snug">
                    {sec.titleTa}
                  </h2>
                  <span className="badge-archival bg-[#FAF5EA] border-[#B08D57]/30 text-[#5A1F24] font-mono font-bold">
                    {sec.year}
                  </span>
                </div>

                <p className="text-base text-[#231D1A] leading-relaxed font-sans pt-1">
                  {sec.contentTa}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA to Books Archive */}
      <div className="bg-[#FAF5EA] p-8 rounded-lg text-center space-y-4 border border-[#B08D57]/35 shadow-xs">
        <h3 className="font-serif text-2xl font-bold text-[#5A1F24]">
          தமிழண்ணல் அவர்களின் நூல்களைப் படிக்க
        </h3>
        <p className="text-sm text-[#6B625C] max-w-xl mx-auto">
          86 நூல்கள் கொண்ட முழுமையான இணையக் காப்பகம்.
        </p>
        <Link href="/books" className="btn btn-primary inline-flex min-h-[44px] px-6">
          <BookOpen className="w-4 h-4 !text-[#FDFBF7]" />
          <span>நூல்கள் காப்பகத்திற்குச் செல்க</span>
        </Link>
      </div>

    </div>
  );
}



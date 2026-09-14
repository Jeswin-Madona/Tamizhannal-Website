'use client';

import React, { useState } from 'react';
import { Mail, Send, ExternalLink, ShieldCheck, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMsg(data.message || 'உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நன்றி.');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'செய்தி அனுப்புவதில் பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('இணைய இணைப்பு பிழை. தயவுசெய்து உங்கள் இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 max-w-5xl">
      
      {/* Page Header */}
      <SectionHeader
        titleTa="தொடர்பு கொள்ள (Contact & Foundation)"
        subtitleTa="தமிழண்ணல் ஆவணக்கப்பகம் மற்றும் அறக்கட்டளை பற்றிய தகவல்களுக்குத் தொடர்புகொள்ளவும்."
        icon={Mail}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="archive-card p-5 space-y-3 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-xs">
            <div className="flex items-center gap-2 text-[#5A1F24]">
              <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
              <h3 className="font-serif text-lg font-bold">தமிழண்ணல் அறக்கட்டளை</h3>
            </div>
            <p className="text-xs text-[#6B625C] leading-relaxed font-medium">
              முனைவர் தமிழண்ணல் நினைவுக் அறக்கட்டளை, மதுரைக் காமராசர் பல்கலைக்கழக தமிழியல் ஆய்வாளர்கள் மற்றும் குடும்பத்தினரால் நிர்வகிக்கப்படுகிறது.
            </p>
          </div>

          {/* Contact Details & Social Links */}
          <div className="archive-card p-5 space-y-4 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-xs">
            <h4 className="font-serif text-base font-bold text-[#5A1F24] border-b border-[#B08D57]/20 pb-2">
              தொடர்பு விவரங்கள் & சமூக ஊடகம்
            </h4>

            <div className="space-y-3 text-xs font-semibold">
              {/* Phone */}
              <a
                href="tel:08098569334"
                className="flex items-center gap-2.5 text-[#231D1A] hover:text-[#5A1F24] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF5EA] border border-[#B08D57]/30 flex items-center justify-center text-[#5A1F24] flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>080985 69334</span>
              </a>

              {/* Email */}
              <a
                href="mailto:thamizhannalfoundation@gmail.com"
                className="flex items-center gap-2.5 text-[#231D1A] hover:text-[#5A1F24] transition-colors break-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF5EA] border border-[#B08D57]/30 flex items-center justify-center text-[#5A1F24] flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
                </div>
                <span>thamizhannalfoundation@gmail.com</span>
              </a>

              {/* Facebook Icon — Archival Maroon Branding */}
              <a
                href="https://www.facebook.com/thamizhannal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#5A1F24] hover:text-[#B08D57] transition-colors pt-1 border-t border-[#B08D57]/15 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FAF5EA] border border-[#B08D57]/35 flex items-center justify-center text-[#5A1F24] group-hover:text-[#B08D57] group-hover:border-[#B08D57] transition-colors flex-shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span>முகநூல் (Official Facebook)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#B08D57]" />
              </a>

              {/* YouTube Icon — Archival Maroon Branding */}
              <a
                href="https://www.youtube.com/channel/UCkJn-wTZTL7_yk5GCFpw2Xg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#5A1F24] hover:text-[#B08D57] transition-colors pt-1 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FAF5EA] border border-[#B08D57]/35 flex items-center justify-center text-[#5A1F24] group-hover:text-[#B08D57] group-hover:border-[#B08D57] transition-colors flex-shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span>யூடியூப் (YouTube Channel)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#B08D57]" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="md:col-span-2 archive-card p-6 md:p-8 space-y-6 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-md">
          <h3 className="font-serif text-xl font-bold text-[#5A1F24] border-b border-[#B08D57]/20 pb-3">
            செய்தி அனுப்ப
          </h3>

          {status === 'success' && (
            <div className="bg-[#FAF5EA] border border-[#B08D57] p-4 rounded-md text-[#5A1F24] flex items-center gap-3 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#B08D57] flex-shrink-0" />
              <p className="font-serif text-sm font-semibold">{statusMsg}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-[#FAF5EA] border border-red-500/60 p-4 rounded-md text-[#5A1F24] flex items-center gap-3 animate-fade-in shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="font-serif text-sm font-semibold">{statusMsg}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-semibold text-[#5A1F24] uppercase tracking-wider">
                உங்கள் பெயர் (Your Name)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="எ.கா: முனைவர் பழனியப்பன்"
                className="w-full px-4 py-2.5 rounded bg-[#FAF5EA] border border-[#B08D57]/40 text-[#231D1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-[#5A1F24] uppercase tracking-wider">
                மின்னஞ்சல் முகவரி (Your Email Address)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded bg-[#FAF5EA] border border-[#B08D57]/40 text-[#231D1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className="block text-xs font-semibold text-[#5A1F24] uppercase tracking-wider">
                பொருள் (Subject)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="எ.கா: தொடர்பு படிவச் செய்தி"
                className="w-full px-4 py-2.5 rounded bg-[#FAF5EA] border border-[#B08D57]/40 text-[#231D1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="block text-xs font-semibold text-[#5A1F24] uppercase tracking-wider">
                செய்தி (Your Message)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="உங்கள் செய்தியை இங்கு பதிவு செய்யவும்..."
                className="w-full px-4 py-2.5 rounded bg-[#FAF5EA] border border-[#B08D57]/40 text-[#231D1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn btn-primary w-full min-h-[44px] justify-center text-sm font-bold shadow-md disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FDFBF7]" />
                  <span>அனுப்பப்படுகிறது...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 !text-[#FDFBF7]" />
                  <span>செய்தி அனுப்புக (Send Message)</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Clock, Mic, ListMusic } from 'lucide-react';
import audioData from '@/data/audio.json';

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const parts = audioData.parts || [];
  const currentPart = parts[selectedPartIndex] || { url: audioData.audioUrl, titleTa: 'பகுதி 1 (Part 1)' };

  const handlePartSelect = (index: number) => {
    if (index === selectedPartIndex) return;
    const wasPlaying = isPlaying;
    setSelectedPartIndex(index);
    setAudioError(false);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = parts[index]?.url || audioData.audioUrl;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAudioError(false);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
        setAudioError(true);
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="archive-card p-6 md:p-8 bg-[#FDFBF7] border border-[#B08D57]/35 shadow-md rounded-lg">
      
      {/* Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentPart.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
        preload="metadata"
      />

      {audioError && (
        <div className="bg-[#FFF5F5] border border-[#E53E3E]/40 text-[#C53030] px-4 py-2 rounded text-xs font-semibold text-center mb-4">
          ஒலிப் பதிவு ஆவணம் கிடைப்பிலில்லை.
        </div>
      )}

      <div className="space-y-6">
        
        {/* Header Badges & Audio Waveform Equalizer */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A1F24]/10 text-[#5A1F24] text-xs font-semibold border border-[#5A1F24]/20">
            <Radio className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>வானொலித் தொடர் பதிவு (மதுரை வானொலி)</span>
          </div>

          {/* Archival Waveform Equalizer Indicator */}
          <div className="flex items-center gap-2 text-xs text-[#5A1F24] font-semibold bg-[#FAF5EA] px-3.5 py-1.5 rounded border border-[#B08D57]/35 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>10 மணி நேர ஒலிவடிவம் (5 பாகங்கள்)</span>
            
            {/* Waveform Equalizer Bars — Animate ONLY when isPlaying is true */}
            <div 
              className="flex items-end gap-0.5 h-4 ml-1.5 px-1.5 py-0.5 bg-[#FDFBF7] rounded border border-[#B08D57]/30" 
              title={isPlaying ? 'ஒலிபரப்பாகிறது' : 'நிறுத்தப்பட்டுள்ளது'}
            >
              <span className={`w-0.5 bg-[#5A1F24] transition-all rounded-full ${isPlaying ? 'h-3.5 animate-pulse duration-300' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#B08D57] transition-all rounded-full ${isPlaying ? 'h-4 animate-bounce duration-500' : 'h-1.5'}`} />
              <span className={`w-0.5 bg-[#5A1F24] transition-all rounded-full ${isPlaying ? 'h-2.5 animate-pulse duration-200' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#B08D57] transition-all rounded-full ${isPlaying ? 'h-3.5 animate-bounce duration-400' : 'h-2'}`} />
              <span className={`w-0.5 bg-[#5A1F24] transition-all rounded-full ${isPlaying ? 'h-3 animate-pulse duration-300' : 'h-1'}`} />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#5A1F24]">
            {audioData.titleTa}
          </h3>
          <p className="text-sm text-[#6B625C] leading-relaxed">
            {audioData.descriptionTa}
          </p>
        </div>

        {/* Multi-Part Audio Selection Buttons */}
        {parts.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-[#B08D57]/20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5A1F24]">
              <ListMusic className="w-4 h-4 text-[#B08D57]" />
              <span>ஒலிப்பதிவுப் பகுதியைத் தேர்ந்தெடுக்கவும்:</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {parts.map((p, idx) => {
                const isSelected = selectedPartIndex === idx;
                return (
                  <button
                    key={p.part}
                    type="button"
                    onClick={() => handlePartSelect(idx)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] px-4 py-2.5 rounded-md text-xs sm:text-sm font-bold transition-all duration-200 border flex items-center justify-center gap-2 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#5A1F24] ${
                      isSelected
                        ? '!bg-[#5A1F24] !text-[#FAF5EA] border-2 border-[#B08D57] shadow-md ring-2 ring-[#B08D57]/40 scale-[1.02]'
                        : 'bg-[#FAF5EA] text-[#5A1F24] border-[#B08D57]/50 hover:bg-[#F3EAD8] hover:border-[#5A1F24] hover:text-[#5A1F24]'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#E5C170]' : 'bg-[#B08D57]/50'}`} />
                    <span>{p.titleTa}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Speakers */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5A1F24] pt-2 border-t border-[#B08D57]/20">
          <div className="flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-[#B08D57]" />
            <span>உரையாசிரியர்கள்: {audioData.speakersTa.join(' & ')}</span>
          </div>
        </div>

        {/* Interactive Play Controls & Time Scrubber */}
        <div className="space-y-3 bg-[#FAF5EA] p-4.5 sm:p-5 rounded-md border border-[#B08D57]/30 shadow-xs">
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'நிறுத்துக' : 'இயக்குக'}
              className="w-12 h-12 rounded-full !bg-[#5A1F24] !text-[#FDFBF7] flex items-center justify-center hover:!bg-[#70262C] transition-all shadow-md flex-shrink-0 border border-[#B08D57]/40 focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
              title={isPlaying ? 'நிறுத்துக' : 'இயக்குக'}
            >
              {isPlaying ? <Pause className="w-6 h-6 !text-[#FDFBF7]" /> : <Play className="w-6 h-6 ml-0.5 !text-[#FDFBF7]" />}
            </button>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#5A1F24]">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : '2:00:00'}</span>
              </div>

              {/* Scrubber Slider with Dynamic Gradient Progress Track */}
              <input
                type="range"
                min={0}
                max={duration || 7200}
                value={currentTime}
                onChange={handleSeek}
                aria-label="ஒலி முன்னேற்றக் கோடு"
                style={{
                  background: `linear-gradient(to right, #5A1F24 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #E7DACB ${duration > 0 ? (currentTime / duration) * 100 : 0}%)`
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#5A1F24] border border-[#B08D57]/20"
              />
            </div>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'ஒலியை இயக்குக' : 'ஒலியை நிறுத்துக'}
              className="p-2.5 rounded-full text-[#5A1F24] hover:bg-[#FDFBF7] transition-colors border border-[#B08D57]/25 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#5A1F24]"
              title={isMuted ? 'ஒலியை இயக்குக' : 'ஒலியை நிறுத்துக'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-[#5A1F24]" /> : <Volume2 className="w-5 h-5 text-[#5A1F24]" />}
            </button>
          </div>

          <p className="text-xs text-[#6B625C] text-center font-medium">
            {audioData.broadcastHistoryTa}
          </p>

        </div>

      </div>

    </div>
  );
};

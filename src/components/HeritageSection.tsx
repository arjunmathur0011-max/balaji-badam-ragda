import React from 'react';
import { Dumbbell, Trophy, Shield, Sparkles } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-24 sm:py-32 bg-[#12100e] text-[#FAF6ED] relative border-t border-[#B99550]/20 overflow-hidden">
      {/* Background warm earthen glow */}
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-[#493020]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Creed & Pehlwaan Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B99550]/30 bg-[#1c1815]">
              <Sparkles className="w-3.5 h-3.5 text-[#B99550]" />
              <span className="text-[11px] uppercase tracking-widest text-[#B99550] font-sans font-medium">
                The Akhaara Legacy • Bhiwani
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-[#FAF6ED] leading-[1.1]">
              DESI HERITAGE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B99550] via-[#F0E2C5] to-[#B99550]">
                TIMELESS CHARACTER.
              </span>
            </h2>

            <blockquote className="border-l-2 border-[#B99550] pl-6 py-2 my-4">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#F0E2C5] leading-snug">
                “पिएगा रगड़ा तो हो जाएगा तगड़ा!”
              </p>
              <footer className="text-xs font-sans text-[#A39276] mt-2 uppercase tracking-wider">
                — The Traditional Akhaara War-Cry of Haryana
              </footer>
            </blockquote>

            <p className="text-sm sm:text-base text-[#FAF6ED]/80 font-sans leading-relaxed">
              Bhiwani has long been revered across India as the nursery of champions—home to Olympic boxers, international wrestlers, and ancient akhaaras where discipline is forged in sacred red earth.
            </p>

            <p className="text-sm sm:text-base text-[#A39276] font-sans leading-relaxed">
              Before modern commercial protein powders and synthetic energy drinks, our pehlwaans relied on a singular morning ritual: a colossal bowl of chilled stone-ground *Badam Ragda* paired with pure desi ghee *Laddus*. That is the sacred standard Balaji continues to honor every single dawn near Old Bus Stand.
            </p>

            {/* Heritage Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#2a221b]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#B99550]">
                  <Dumbbell className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider font-semibold font-sans">Discipline</span>
                </div>
                <p className="text-xs text-[#A39276] font-sans">
                  Crafted fresh every dawn before first light.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#B99550]">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider font-semibold font-sans">Champion Fuel</span>
                </div>
                <p className="text-xs text-[#A39276] font-sans">
                  Naturally packed with dense raw almond energy.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#B99550]">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider font-semibold font-sans">Pure Bilona</span>
                </div>
                <p className="text-xs text-[#A39276] font-sans">
                  Only authentic desi ghee and unadulterated milk.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Emblem Art Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 rounded-none border border-[#B99550]/40 bg-[#161310] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center max-w-md w-full">
              {/* Outer Decorative Ring */}
              <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#B99550]/60 p-2 shadow-[0_0_40px_rgba(185,149,80,0.2)] mb-6 bg-[#10100E]">
                <img
                  src="/assets/aistudio/Screenshot_2026-10-23_164847_ab531a95.png"
                  alt="Balaji BBR Badam Ragda Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#FAF6ED] mb-1">
                BALA JI BBR
              </h3>
              <p className="text-xs font-sans uppercase tracking-widest text-[#B99550] font-semibold mb-4">
                The Power House • Near Old Bus Stand
              </p>
              <p className="text-xs text-[#A39276] font-sans leading-relaxed">
                Honoring Lord Hanuman’s strength and the tireless pehlwaans of Bhiwani. No shortcuts, no preservatives, only authentic desi stamina.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

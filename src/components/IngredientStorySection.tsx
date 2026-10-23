import React, { useState } from 'react';
import { INGREDIENT_STORIES, IngredientStory } from '../utils/menuData';
import { ShieldCheck, HeartPulse, Droplets, Sparkles } from 'lucide-react';

export const IngredientStorySection: React.FC = () => {
  const [activeStory, setActiveStory] = useState<IngredientStory>(INGREDIENT_STORIES[0]);

  return (
    <section id="craft" className="py-24 sm:py-32 bg-[#10100E] text-[#FAF6ED] relative border-t border-[#B99550]/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#493020]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B99550]/30 bg-[#1c1916] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B99550]" />
            <span className="text-[11px] uppercase tracking-widest text-[#B99550] font-sans font-medium">
              The Stone-Ground Craft
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#FAF6ED] mb-4">
            ROOTED IN TRADITION.
          </h2>
          <p className="text-lg text-[#F0E2C5]/80 font-serif italic mb-6">
            “An old-school desi favourite, presented for a new generation.”
          </p>
          <p className="text-sm text-[#A39276] font-sans leading-relaxed">
            In Bhiwani, *Badam Ragda* is not simply a beverage—it is an art of patience. Unlike factory processing that cooks away delicate vitamins with high-speed steel blades, authentic ragda is born inside a heavy stone mortar (*kundi*) with a wooden pestle (*sota*), extracting pure almond emulsion naturally.
          </p>
        </div>

        {/* Interactive Craft Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Ingredient Selector Column (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {INGREDIENT_STORIES.map((item) => {
              const isSelected = activeStory.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStory(item)}
                  className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1e1914] border-[#B99550] shadow-[0_4px_20px_rgba(185,149,80,0.15)] translate-x-2'
                      : 'bg-[#151310] border-[#29221b] hover:border-[#B99550]/40 text-[#A39276]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h4 className={`font-serif text-lg font-bold ${isSelected ? 'text-[#FAF6ED]' : 'text-[#FAF6ED]/70'}`}>
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs font-sans text-[#A39276]">
                      {item.hindi} • {item.role}
                    </p>
                  </div>
                  <span className={`text-xs font-serif italic ${isSelected ? 'text-[#B99550]' : 'text-transparent'}`}>
                    View Craft &rarr;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Story Spotlight (Right 7 cols) */}
          <div className="lg:col-span-7 bg-[#171411] border border-[#B99550]/40 p-8 sm:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 px-4 py-1.5 bg-[#B99550] text-[#10100E] text-[10px] uppercase font-bold tracking-widest font-sans">
              Handpicked Purity
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold">
                  {activeStory.role}
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF6ED] mt-1 mb-2">
                  {activeStory.name}
                </h3>
                <p className="text-sm font-sans text-[#FAF6ED]/70 italic">
                  {activeStory.hindi}
                </p>
              </div>

              <div className="h-px w-full bg-[#2a221a]" />

              <div>
                <h5 className="text-xs uppercase tracking-wider text-[#A39276] font-sans mb-2">
                  Why It Matters
                </h5>
                <p className="text-base sm:text-lg font-serif text-[#F0E2C5] leading-relaxed">
                  {activeStory.description}
                </p>
              </div>

              <div className="p-4 bg-[#201b16] border-l-2 border-[#B99550]">
                <h5 className="text-xs uppercase tracking-wider text-[#B99550] font-sans mb-1">
                  Artisanal Technique
                </h5>
                <p className="text-xs text-[#FAF6ED]/80 font-sans leading-relaxed">
                  {activeStory.visualNote}
                </p>
              </div>

              {/* Three Pillars of Purity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2a221a]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B99550]" />
                  <span className="text-xs text-[#FAF6ED]/90 font-sans">Zero Preservatives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#B99550]" />
                  <span className="text-xs text-[#FAF6ED]/90 font-sans">Stone-Friction Pure</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#B99550]" />
                  <span className="text-xs text-[#FAF6ED]/90 font-sans">Pure Dairy & Nuts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

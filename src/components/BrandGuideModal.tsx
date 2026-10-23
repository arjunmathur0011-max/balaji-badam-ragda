import React from 'react';
import { X, Sparkles, Box, Compass, Utensils, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  if (!isOpen) return null;

  const keySections = [
    {
      title: '1. Cinematic 3D Hero Experience',
      icon: <Box className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'root',
      description: 'Central photorealistic Badam Ragda bottle with radiant golden sun disc, floating natural almonds & cardamom pods, ACES tone mapping, studio PBR reflections, and collapsible camera dock.',
    },
    {
      title: '2. The Desi Collection (Laddus & Ragda)',
      icon: <Sparkles className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'collection',
      description: 'Art-directed showcase featuring authentic Chilled Badam Ragda, Pure Bilona Desi Ghee Besan & Gond Laddu, Akhaara Mawa Peda, and Gym Recovery Jars with nutritional insights.',
    },
    {
      title: '3. Stone-Ground Craft & Ingredients',
      icon: <ShieldCheck className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'craft',
      description: 'Interactive spotlight on the 45-minute cold stone-grinding (kundi-sota) process that preserves almond oils and vitamins without industrial heat degradation.',
    },
    {
      title: '4. Akhaara & Pehlwaan Heritage of Bhiwani',
      icon: <Award className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'heritage',
      description: 'Celebrates Bhiwani’s legacy as India’s "Mini Cuba" and nursery of champions. Features the official brand creed: “Piyega Ragda Toh Ho Jayega Tagda!”.',
    },
    {
      title: '5. Digital Live Menu & Ordering',
      icon: <Utensils className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'menu',
      description: 'Transparent categorization with genuine INR (₹) rates, single & family portions, and 1-click addition to the WhatsApp enquiry tray.',
    },
    {
      title: '6. Google Maps Grounded Store Locator',
      icon: <Compass className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'location',
      description: 'Live grounded directions to Near Old Bus Stand, Bhiwani (Haryana) powered by Gemini 3.8 Flash with Google Maps tool, with landmark estimates from Bhiwani Junction and Clock Tower.',
    },
    {
      title: '7. Direct WhatsApp Order & Kitchen Tray',
      icon: <HeartHandshake className="w-5 h-5 text-[#B99550]" />,
      sectionId: 'location',
      description: 'Pre-formatted wa.me order dispatch with automatic 5% Pehlwaan volume discount over ₹1000 and free local Bhiwani delivery calculations.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141210] border border-[#B99550]/60 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#2d251d] flex items-center justify-between bg-gradient-to-r from-[#241a12] via-[#171410] to-[#141210]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B99550]/40 bg-[#10100E]/80 text-[#B99550] text-[10px] uppercase font-bold tracking-widest mb-2 font-sans">
              Strategic Blueprint
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6ED]">
              Brand Architecture & Suggested Features
            </h3>
            <p className="text-xs text-[#A39276] font-sans mt-1">
              Curated for Balaji Badam Ragda — The Power House, Bhiwani
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Guide"
            className="p-2 text-[#A39276] hover:text-[#FAF6ED] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm font-sans text-[#F0E2C5] leading-relaxed">
            To position Balaji Badam Ragda as a world-class beverage icon while celebrating its authentic desi roots, we have structured the website around seven signature pillars:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keySections.map((sec, idx) => (
              <div
                key={idx}
                className="bg-[#1a1714] border border-[#2e261f] p-4 flex flex-col justify-between hover:border-[#B99550]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    {sec.icon}
                    <h4 className="font-serif text-sm font-bold text-[#FAF6ED]">
                      {sec.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#A39276] font-sans leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onNavigateSection(sec.sectionId);
                  }}
                  className="mt-3 text-[11px] text-[#B99550] hover:text-[#FAF6ED] font-sans uppercase tracking-wider font-semibold self-start"
                >
                  Jump to Section &rarr;
                </button>
              </div>
            ))}
          </div>

          {/* Color & Aesthetic Palette Confirmation */}
          <div className="p-4 bg-[#1e1a16] border border-[#3b3024] space-y-2">
            <h5 className="text-xs uppercase tracking-wider font-bold text-[#B99550] font-sans">
              Disciplined Brand Aesthetic Palette:
            </h5>
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-[#FAF6ED]/80 font-sans">
                <span className="w-3.5 h-3.5 rounded bg-[#10100E] border border-white/20" />
                <span>Matte Obsidian (#10100E)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#FAF6ED]/80 font-sans">
                <span className="w-3.5 h-3.5 rounded bg-[#B99550]" />
                <span>Antique Gold (#B99550)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#FAF6ED]/80 font-sans">
                <span className="w-3.5 h-3.5 rounded bg-[#F0E2C5]" />
                <span>Almond Cream (#F0E2C5)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#FAF6ED]/80 font-sans">
                <span className="w-3.5 h-3.5 rounded bg-[#493020]" />
                <span>Roasted Brown (#493020)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#2d251d] bg-[#161310] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED] font-sans text-xs uppercase font-bold tracking-wider transition-colors"
          >
            Explore Website
          </button>
        </div>
      </div>
    </div>
  );
};

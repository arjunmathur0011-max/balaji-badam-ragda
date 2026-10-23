import React from 'react';
import { Phone, MapPin, Instagram, Heart, ArrowUp } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0b0a] text-[#FAF6ED] border-t border-[#B99550]/20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#221c17]">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#B99550]/60 p-0.5 bg-[#141210]">
                <img
                  src="/assets/aistudio/Screenshot_2026-10-23_164847_ab531a95.png"
                  alt="Balaji Badam Ragda Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#FAF6ED] tracking-wider">
                  BALAJI BADAM RAGDA
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-[#B99550] font-sans font-semibold">
                  The Power House • Bhiwani
                </p>
              </div>
            </div>

            <p className="text-xs text-[#A39276] font-sans leading-relaxed max-w-sm">
              Rooted in the timeless pehlwaan culture of Haryana. Dedicated to pure stone-ground dry fruit beverages, bilona ghee sweets, and honest traditional nutrition.
            </p>

            <div className="pt-2">
              <span className="text-xs font-serif italic text-[#B99550]">
                “पिएगा रगड़ा तो हो जाएगा तगड़ा!”
              </span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#FAF6ED]/80">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#B99550] transition-colors"
                >
                  The Desi Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craft')}
                  className="hover:text-[#B99550] transition-colors"
                >
                  Stone-Ground Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('heritage')}
                  className="hover:text-[#B99550] transition-colors"
                >
                  Akhaara Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#B99550] transition-colors"
                >
                  Digital Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#B99550] transition-colors"
                >
                  Visit Store (Bhiwani)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold">
              Store & Enquiries
            </h4>
            <div className="space-y-2 text-xs font-sans text-[#FAF6ED]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B99550] shrink-0 mt-0.5" />
                <span>Near Old Bus Stand, Bhiwani, Haryana 127021, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B99550] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#B99550]">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#B99550] shrink-0" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B99550]"
                >
                  @balajibadamragda
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hello%20Balaji%20Badam%20Ragda,%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#1a1714] border border-[#B99550]/40 text-[#B99550] hover:bg-[#B99550] hover:text-[#10100E] text-xs font-sans uppercase font-medium transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A39276]">
          <p>
            &copy; {new Date().getFullYear()} Balaji Badam Ragda (BBR). All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 hover:text-[#B99550] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

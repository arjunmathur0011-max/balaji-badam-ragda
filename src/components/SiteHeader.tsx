import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone, MapPin } from 'lucide-react';

interface SiteHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenGuide: () => void;
  onNavigate: (sectionId: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenGuide,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Collection', id: 'collection' },
    { label: 'Craft & Ingredients', id: 'craft' },
    { label: 'Pehlwaan Heritage', id: 'heritage' },
    { label: 'Digital Menu', id: 'menu' },
    { label: 'Visit Store', id: 'location' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#10100E]/95 border-b border-[#B99550]/20 py-3 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-b from-[#10100E]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#B99550]/60 p-0.5 bg-[#141210] group-hover:border-[#FAF6ED] transition-colors shadow-[0_0_15px_rgba(185,149,80,0.25)]">
            <img
              src="/assets/aistudio/Screenshot_2026-10-23_164847_ab531a95.png"
              alt="Balaji Badam Ragda Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-[#FAF6ED] group-hover:text-[#B99550] transition-colors">
              BALAJI BADAM RAGDA
            </span>
            <span className="font-sans text-[10px] tracking-widest text-[#B99550] uppercase font-semibold">
              The Power House • Bhiwani
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="font-sans text-xs uppercase tracking-widest text-[#FAF6ED]/80 hover:text-[#B99550] transition-colors font-medium focus:outline-none"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Brand Strategy Guide Button */}
          <button
            onClick={onOpenGuide}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#B99550]/40 bg-[#161310] text-[#B99550] hover:border-[#B99550] hover:text-[#FAF6ED] text-[11px] uppercase tracking-wider font-sans font-medium transition-all"
          >
            <span>Brand Strategy</span>
          </button>
          {/* Quick WhatsApp Link */}
          <a
            href="https://wa.me/919876543210?text=Hello%20Balaji%20Badam%20Ragda,%20I%20would%20like%20to%20enquire%20about%20your%20beverages%20and%20laddus."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none border border-[#B99550]/40 text-[#FAF6ED] text-xs uppercase tracking-wider font-sans hover:border-[#B99550] hover:text-[#B99550] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#B99550]" />
            <span>Enquire</span>
          </a>

          {/* Cart Tray Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Order Tray"
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED] text-xs uppercase tracking-wider font-sans font-semibold transition-all active:scale-95 shadow-[0_2px_12px_rgba(185,149,80,0.3)]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Order Tray</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#10100E] text-[#B99550] text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="lg:hidden p-2 text-[#FAF6ED] hover:text-[#B99550] transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141210] border-b border-[#B99550]/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left font-serif text-lg text-[#FAF6ED] hover:text-[#B99550] transition-colors py-2 border-b border-[#28221c]"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="https://wa.me/919876543210?text=Hello%20Balaji%20Badam%20Ragda,%20I%20would%20like%20to%20enquire%20about%20ordering."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 border border-[#B99550] text-[#B99550] uppercase text-xs tracking-wider font-semibold"
              >
                Direct WhatsApp Chat
              </a>
              <div className="flex items-center gap-2 text-xs text-[#A39276] pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B99550]" />
                <span>Near Old Bus Stand, Bhiwani, Haryana</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

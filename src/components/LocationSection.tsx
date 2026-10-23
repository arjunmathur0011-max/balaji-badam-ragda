import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageSquare, Compass, Loader2, Sparkles, ExternalLink } from 'lucide-react';

interface Landmark {
  name: string;
  distance: string;
  note: string;
}

export const LocationSection: React.FC = () => {
  const [origin, setOrigin] = useState<string>('Bhiwani Junction Railway Station');
  const [loading, setLoading] = useState<boolean>(false);
  const [guideData, setGuideData] = useState<{
    summary: string;
    landmarks: Landmark[];
    address: string;
    groundedWithMaps?: boolean;
  }>({
    summary:
      'Balaji Badam Ragda is located right near the Old Bus Stand (Purana Bus Stand) in Bhiwani, Haryana. It is roughly 2.5 km from Bhiwani Junction Railway Station (7-10 minutes by e-rickshaw or auto). Key nearby landmarks include the historic Bhiwani Ghanta Ghar (Clock Tower) 800m away, Kirori Mal Park, and Dadri Gate.',
    landmarks: [
      { name: 'Old Bus Stand (Purana Bus Stand)', distance: '50 metres', note: 'Immediate landmark, 1-min walk' },
      { name: 'Bhiwani Junction Railway Station', distance: '2.5 km', note: '8-10 mins via Circular Road' },
      { name: 'Bhiwani Ghanta Ghar (Clock Tower)', distance: '850 metres', note: 'Central heritage hub' },
      { name: 'Kirori Mal Park', distance: '1.2 km', note: 'Major local recreation center' },
    ],
    address: 'Near Old Bus Stand, Circular Road, Bhiwani, Haryana 127021',
    groundedWithMaps: true,
  });

  const fetchDirections = async (selectedOrigin: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/maps/bhiwani-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originLocation: selectedOrigin }),
      });
      const data = await res.json();
      if (data && data.summary) {
        setGuideData({
          summary: data.summary,
          landmarks: data.landmarks || guideData.landmarks,
          address: data.address || guideData.address,
          groundedWithMaps: data.groundedWithMaps,
        });
      }
    } catch (e) {
      console.error('Failed to fetch grounded directions', e);
    } finally {
      setLoading(false);
    }
  };

  const transitPresets = [
    'Bhiwani Junction Railway Station',
    'New Bus Stand Bhiwani',
    'Clock Tower (Ghanta Ghar)',
    'Dadri Gate Chowk',
  ];

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#141210] text-[#FAF6ED] relative border-t border-[#B99550]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B99550]/30 bg-[#1c1815] mb-4">
            <Compass className="w-3.5 h-3.5 text-[#B99550]" />
            <span className="text-[11px] uppercase tracking-widest text-[#B99550] font-sans font-medium">
              Find Us in Bhiwani
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#FAF6ED] mb-3">
            VISIT THE STORE
          </h2>
          <p className="text-sm sm:text-base text-[#A39276] font-sans max-w-xl mx-auto">
            Experience the fresh stone-ground Ragda and warm desi hospitality right where the legacy lives.
          </p>
        </div>

        {/* Store Info & Maps Grounding Guide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (5 cols): Store Details & Hours */}
          <div className="lg:col-span-5 bg-[#191613] border border-[#2e261f] p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold">
                Store Location
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FAF6ED] mt-1 mb-2">
                Balaji Badam Ragda
              </h3>
              <p className="text-sm font-sans text-[#F0E2C5] flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B99550] shrink-0 mt-0.5" />
                <span>Near Old Bus Stand, Circular Road, Bhiwani, Haryana 127021, India</span>
              </p>
            </div>

            <div className="h-px bg-[#2a221a]" />

            <div>
              <span className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold">
                Opening Hours
              </span>
              <div className="flex items-center gap-3 mt-2">
                <Clock className="w-4 h-4 text-[#B99550]" />
                <div>
                  <p className="text-sm font-sans text-[#FAF6ED] font-semibold">
                    7:00 AM – 10:30 PM (Daily)
                  </p>
                  <p className="text-xs text-[#A39276] font-sans">
                    Fresh stone grinding starts at dawn for morning pehlwaans & walkers.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#2a221a]" />

            {/* Direct Contact Actions */}
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="w-full py-3 px-4 bg-[#B99550] text-[#10100E] font-sans text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-[#FAF6ED] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: +91 98765 43210</span>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hello%20Balaji%20Badam%20Ragda,%20I%20am%20visiting%20Bhiwani.%20Could%20you%20please%20share%20your%20exact%20live%20location?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 border border-[#B99550] text-[#B99550] hover:bg-[#B99550]/10 font-sans text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Live Location</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Old+Bus+Stand+Bhiwani+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#201c18] border border-[#3d3328] text-[#FAF6ED]/80 hover:text-[#B99550] font-sans text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): Google Maps Grounded Live Route Guide */}
          <div className="lg:col-span-7 bg-[#171411] border border-[#B99550]/40 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B99550]" />
                  <span className="text-[11px] uppercase tracking-widest text-[#B99550] font-sans font-semibold">
                    Google Maps Grounded Route Guide
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FAF6ED] mt-1">
                  How to Reach Us
                </h3>
              </div>

              {guideData.groundedWithMaps && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[#A39276] bg-[#221c17] px-2.5 py-1 border border-[#3b3127]">
                  <Sparkles className="w-3 h-3 text-[#B99550]" />
                  <span>Maps Grounded</span>
                </span>
              )}
            </div>

            {/* Quick Origin Presets */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#A39276] font-sans block mb-2">
                Select Starting Point:
              </label>
              <div className="flex flex-wrap gap-2">
                {transitPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setOrigin(preset);
                      fetchDirections(preset);
                    }}
                    className={`px-3 py-1.5 text-xs font-sans transition-all ${
                      origin === preset
                        ? 'bg-[#B99550] text-[#10100E] font-semibold'
                        : 'bg-[#201c18] text-[#FAF6ED]/80 hover:border-[#B99550]/50 border border-[#332a21]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Or enter city / landmark (e.g. Rohtak, Hansi, Hisar)..."
                className="flex-1 bg-[#10100E] border border-[#332a21] focus:border-[#B99550] px-4 py-2 text-xs text-[#FAF6ED] font-sans outline-none"
              />
              <button
                onClick={() => fetchDirections(origin)}
                disabled={loading}
                className="px-4 py-2 bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED] text-xs font-sans uppercase font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
                <span>Get Route</span>
              </button>
            </div>

            {/* Grounded Summary Box */}
            <div className="p-5 bg-[#1f1a16] border border-[#382d23] space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions from {origin}:</span>
              </h4>

              <p className="text-sm font-sans text-[#F0E2C5] leading-relaxed whitespace-pre-line">
                {guideData.summary}
              </p>

              {/* Landmark Distances */}
              {guideData.landmarks && guideData.landmarks.length > 0 && (
                <div className="pt-3 border-t border-[#31261d]">
                  <span className="text-[10px] uppercase tracking-wider text-[#A39276] font-sans block mb-2 font-semibold">
                    Key Nearby Landmarks in Bhiwani:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {guideData.landmarks.map((lm, idx) => (
                      <div key={idx} className="bg-[#15120f] p-2.5 border border-[#292018] flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#B99550] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-[#FAF6ED] font-sans">{lm.name}</p>
                          <p className="text-[11px] text-[#A39276] font-sans">{lm.distance} • {lm.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

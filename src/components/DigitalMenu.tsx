import React, { useState } from 'react';
import { Product, PRODUCTS } from '../utils/menuData';
import { formatINR } from '../utils/cartRules';
import { Plus, Check, MessageSquare, Utensils } from 'lucide-react';

interface DigitalMenuProps {
  onAddToCart: (product: Product) => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'beverage', label: 'Chilled Ragda Bottles' },
    { id: 'sweet', label: 'Desi Ghee Laddus & Mithai' },
    { id: 'fitness', label: 'Akhaara Gym & Family Packs' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === selectedCategory);

  const handleAdd = (item: Product) => {
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#10100E] text-[#FAF6ED] relative border-t border-[#B99550]/20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B99550]/30 bg-[#1c1815] mb-4">
            <Utensils className="w-3.5 h-3.5 text-[#B99550]" />
            <span className="text-[11px] uppercase tracking-widest text-[#B99550] font-sans font-medium">
              Daily Authentic Rates
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#FAF6ED] mb-3">
            DIGITAL MENU
          </h2>
          <p className="text-sm text-[#A39276] font-sans">
            Prepared fresh daily near Old Bus Stand, Bhiwani. Add items to your tray for store pickup or local delivery via WhatsApp.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-sans font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#B99550] text-[#10100E] font-semibold'
                    : 'bg-[#181512] text-[#A39276] hover:text-[#FAF6ED] border border-[#2b241c]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List (Refined Editorial Style) */}
        <div className="space-y-6">
          {filteredItems.map((item) => {
            const isAdded = addedIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-[#151310] border border-[#2b231c] hover:border-[#B99550]/50 p-6 sm:p-8 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF6ED]">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#B99550]/20 text-[#B99550] border border-[#B99550]/40 font-sans font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#FAF6ED]/70 font-sans">
                    {item.hindiName} • <span className="text-[#B99550]">{item.size}</span> ({item.serving})
                  </p>

                  <p className="text-xs text-[#A39276] font-sans leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.ingredients.slice(0, 4).map((ing, i) => (
                      <span key={i} className="text-[10px] text-[#A39276] bg-[#1d1915] px-2 py-0.5">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#2b231c]">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6ED]">
                    {formatINR(item.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAdd(item)}
                      className={`px-4 py-2 text-xs uppercase font-sans font-semibold tracking-wider flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-[#4e7a3f] text-[#FAF6ED]'
                          : 'bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Tray</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Balaji%20Badam%20Ragda,%20I%20would%20like%20to%20order%20${encodeURIComponent(item.name)}%20(${encodeURIComponent(item.size)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Direct WhatsApp Order"
                      className="p-2 border border-[#3b3126] text-[#A39276] hover:text-[#B99550] hover:border-[#B99550] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Authenticity */}
        <div className="mt-12 text-center text-xs text-[#A39276] font-sans border border-[#2b231c] p-4 bg-[#141210]">
          Prices are inclusive of all taxes. Bulk orders for akhaaras, weddings, and celebrations can be booked 24 hours in advance via WhatsApp.
        </div>
      </div>
    </section>
  );
};

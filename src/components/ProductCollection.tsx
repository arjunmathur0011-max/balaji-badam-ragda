import React, { useState } from 'react';
import { Product, PRODUCTS } from '../utils/menuData';
import { Plus, Check, Eye, X, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { formatINR } from '../utils/cartRules';

interface ProductCollectionProps {
  onAddToCart: (product: Product) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'beverage' | 'sweet' | 'fitness'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="collection" className="py-24 sm:py-32 bg-[#141210] text-[#FAF6ED] relative border-t border-[#B99550]/20">
      {/* Subtle ambient luxury backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B99550]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B99550]/30 bg-[#1c1916] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B99550]" />
            <span className="text-[11px] uppercase tracking-widest text-[#B99550] font-sans font-medium">
              Pure Desi Preparation
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#FAF6ED] mb-4">
            THE DESI COLLECTION
          </h2>
          <p className="text-lg text-[#F0E2C5]/80 font-serif italic max-w-xl mx-auto">
            “Tradition, crafted to be discovered.”
          </p>
          <p className="text-sm text-[#A39276] font-sans mt-3 max-w-lg mx-auto">
            From our slow stone-ground Badam Ragda to handcrafted Bilona Ghee Laddus, every creation honors North Indian akhaara culture.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Offerings' },
              { id: 'beverage', label: 'Chilled Ragda' },
              { id: 'sweet', label: 'Desi Ghee Laddus & Sweets' },
              { id: 'fitness', label: 'Akhaara Strength Packs' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-4 py-2 rounded-none text-xs font-medium tracking-wider uppercase transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#B99550] text-[#10100E] font-semibold shadow-[0_2px_12px_rgba(185,149,80,0.3)]'
                    : 'bg-[#1c1916] text-[#FAF6ED]/70 border border-[#2a241e] hover:border-[#B99550]/60 hover:text-[#FAF6ED]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer bg-[#191613] border border-[#2e261f] hover:border-[#B99550]/70 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              >
                {/* Visual Header / Art Direction Pedestal */}
                <div className={`relative h-64 w-full bg-gradient-to-b ${product.imageBg} p-6 flex flex-col justify-between overflow-hidden`}>
                  {/* Badge */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#10100E]/80 border border-[#B99550]/50 text-[#B99550] font-sans font-semibold">
                      {product.badge || product.categoryLabel}
                    </span>
                    <span className="text-xs text-[#FAF6ED]/70 font-sans">
                      {product.size}
                    </span>
                  </div>

                  {/* Visual Center Artistry */}
                  <div className="my-auto text-center transform group-hover:scale-105 transition-transform duration-500">
                    {/* Artistic Silhouette representation */}
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-[#B99550]/40 bg-[#10100E]/60 shadow-[0_0_24px_rgba(185,149,80,0.2)] mb-2">
                      {product.category === 'sweet' ? (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8a5d21] via-[#d4a34b] to-[#f4d58d] shadow-inner flex items-center justify-center border border-[#ffebaa]/60">
                          <span className="text-[10px] font-serif font-bold text-[#382103]">LADDU</span>
                        </div>
                      ) : product.category === 'fitness' ? (
                        <Flame className="w-10 h-10 text-[#B99550]" />
                      ) : (
                        <div className="w-8 h-16 rounded-t-lg rounded-b-md bg-gradient-to-b from-[#e5caa1] to-[#ba9550] border border-[#ffeedd]/50 flex items-center justify-center">
                          <span className="text-[8px] font-sans font-black text-[#10100E] rotate-90 tracking-tighter">BBR</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#FAF6ED]/70 font-sans tracking-wide">
                      {product.hindiName}
                    </p>
                  </div>

                  {/* Bottom Pedestal Glow */}
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#B99550]/50 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF6ED] group-hover:text-[#B99550] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs font-sans text-[#A39276] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2a221a] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A39276] block">
                        Serving Price
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#FAF6ED]">
                        {formatINR(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        aria-label={`View details for ${product.name}`}
                        className="p-2 border border-[#3d3328] hover:border-[#B99550] text-[#A39276] hover:text-[#FAF6ED] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => handleAdd(product, e)}
                        className={`px-4 py-2 text-xs uppercase font-sans font-semibold tracking-wider flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-[#4e7a3f] text-[#FAF6ED]'
                            : 'bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#141210] border border-[#B99550]/60 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 p-2 text-[#FAF6ED] hover:text-[#B99550] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Hero Banner */}
            <div className={`p-8 bg-gradient-to-b ${selectedProduct.imageBg} border-b border-[#B99550]/30`}>
              <div className="inline-block px-3 py-1 bg-[#10100E]/80 border border-[#B99550]/50 text-[#B99550] text-[10px] uppercase tracking-widest font-sans font-semibold mb-3">
                {selectedProduct.categoryLabel}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6ED] mb-1">
                {selectedProduct.name}
              </h3>
              <p className="text-sm font-sans text-[#FAF6ED]/80 font-medium">
                {selectedProduct.hindiName} • {selectedProduct.tagline}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold mb-2">
                  Heritage Craft & Preparation
                </h4>
                <p className="text-sm text-[#F0E2C5]/90 leading-relaxed font-sans">
                  {selectedProduct.craftProcess}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold mb-2">
                  Ingredients Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#201c18] border border-[#3d3328] text-xs text-[#FAF6ED]/80 font-sans"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition Profile */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#B99550] font-sans font-semibold mb-2">
                  Energy & Nutrition Profile ({selectedProduct.serving})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1c1815] p-4 border border-[#2a221a]">
                  <div>
                    <span className="text-[10px] uppercase text-[#A39276] block">Energy</span>
                    <span className="text-sm font-semibold text-[#FAF6ED] font-sans">{selectedProduct.nutritionPerServing.calories}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#A39276] block">Protein</span>
                    <span className="text-sm font-semibold text-[#FAF6ED] font-sans">{selectedProduct.nutritionPerServing.protein}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#A39276] block">Healthy Fats</span>
                    <span className="text-sm font-semibold text-[#FAF6ED] font-sans">{selectedProduct.nutritionPerServing.healthyFats}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#A39276] block">Carbs</span>
                    <span className="text-sm font-semibold text-[#FAF6ED] font-sans">{selectedProduct.nutritionPerServing.carbs}</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-[#2a221a] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#A39276] block font-sans">Price ({selectedProduct.size})</span>
                  <span className="text-3xl font-serif font-bold text-[#FAF6ED]">{formatINR(selectedProduct.price)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-3 bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED] font-sans text-xs uppercase font-semibold tracking-wider transition-all"
                  >
                    Add to Order Tray
                  </button>
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Balaji%20Badam%20Ragda,%20I%20would%20like%20to%20order%20${encodeURIComponent(selectedProduct.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 border border-[#B99550] text-[#B99550] hover:bg-[#B99550]/10 font-sans text-xs uppercase font-semibold tracking-wider transition-all"
                  >
                    WhatsApp Enquire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { Hero3DScene } from './components/Hero3DScene';
import { ProductCollection } from './components/ProductCollection';
import { IngredientStorySection } from './components/IngredientStorySection';
import { HeritageSection } from './components/HeritageSection';
import { DigitalMenu } from './components/DigitalMenu';
import { LocationSection } from './components/LocationSection';
import { SiteFooter } from './components/SiteFooter';
import { CartDrawer } from './components/CartDrawer';
import { BrandGuideModal } from './components/BrandGuideModal';
import { Product } from './utils/menuData';
import { CartItem } from './utils/cartRules';

export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'badam-ragda-signature',
      name: 'Balaji Signature Badam Ragda',
      price: 90,
      quantity: 2,
      size: '300 ml Glass Bottle',
    },
    {
      id: 'shahi-besan-gond-laddu',
      name: 'Shahi Desi Ghee Besan & Gond Laddu',
      price: 420,
      quantity: 1,
      size: '500g Box',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          size: product.size,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#10100E] text-[#FAF6ED] font-sans selection:bg-[#B99550] selection:text-[#10100E]">
      {/* Top Navigation */}
      <SiteHeader
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic 3D Hero Scene */}
        <Hero3DScene
          onExploreClick={() => handleNavigate('collection')}
          onOrderClick={() => setIsCartOpen(true)}
        />

        {/* 2. The Desi Collection (Badam Ragda & Laddus) */}
        <ProductCollection onAddToCart={handleAddToCart} />

        {/* 3. Craft & Ingredients Story */}
        <IngredientStorySection />

        {/* 4. Pehlwaan Akhaara Heritage */}
        <HeritageSection />

        {/* 5. Digital Menu with Daily Rates */}
        <DigitalMenu onAddToCart={handleAddToCart} />

        {/* 6. Visit The Store & Google Maps Grounded Route Guide */}
        <LocationSection />
      </main>

      {/* Footer */}
      <SiteFooter onNavigate={handleNavigate} />

      {/* Order Tray / WhatsApp Checkout Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Brand Strategy & Architectural Blueprint Guide Modal */}
      <BrandGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateSection={handleNavigate}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { CartItem, calculateOrderSummary, generateWhatsAppOrderUrl, formatINR } from '../utils/cartRules';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, MapPin, Store } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'store_pickup' | 'local_delivery'>('store_pickup');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const calc = calculateOrderSummary(items, fulfillmentType);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppOrderUrl({
      customerName,
      phone,
      fulfillmentType,
      deliveryAddress,
      specialInstructions,
      items,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141210] border-l border-[#B99550]/40 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#2b241c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B99550]" />
              <h3 className="font-serif text-xl font-bold text-[#FAF6ED]">
                Your Order Tray
              </h3>
              {calc.totalItems > 0 && (
                <span className="text-xs bg-[#B99550] text-[#10100E] font-bold px-2 py-0.5 rounded-full">
                  {calc.totalItems}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close Order Tray"
              className="p-1.5 text-[#A39276] hover:text-[#FAF6ED] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#3d3328] mx-auto" />
                <p className="font-serif text-lg text-[#FAF6ED]">Your tray is empty</p>
                <p className="text-xs text-[#A39276] font-sans max-w-xs mx-auto">
                  Add some chilled Badam Ragda or Desi Ghee Laddus to proceed with your order.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#1a1714] border border-[#2d251d] p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h4 className="font-serif text-sm font-bold text-[#FAF6ED]">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#A39276] font-sans">
                          {formatINR(item.price)} each • {item.size}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#10100E] border border-[#2d251d] px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="text-[#A39276] hover:text-[#FAF6ED] p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-[#FAF6ED] min-w-[16px] text-center font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="text-[#A39276] hover:text-[#FAF6ED] p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#FAF6ED] min-w-[50px] text-right">
                        {formatINR(item.price * item.quantity)}
                      </span>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#8a3838] hover:text-[#d9534f] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Fulfillment Preference */}
                <div className="pt-4 border-t border-[#2b241c] space-y-3">
                  <label className="text-xs uppercase tracking-wider text-[#B99550] font-sans font-semibold block">
                    Fulfillment Preference:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('store_pickup')}
                      className={`p-2.5 text-xs font-sans flex items-center justify-center gap-1.5 transition-all border ${
                        fulfillmentType === 'store_pickup'
                          ? 'bg-[#B99550] text-[#10100E] border-[#B99550] font-semibold'
                          : 'bg-[#181512] text-[#A39276] border-[#2d251d]'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Store Pickup</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType('local_delivery')}
                      className={`p-2.5 text-xs font-sans flex items-center justify-center gap-1.5 transition-all border ${
                        fulfillmentType === 'local_delivery'
                          ? 'bg-[#B99550] text-[#10100E] border-[#B99550] font-semibold'
                          : 'bg-[#181512] text-[#A39276] border-[#2d251d]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Bhiwani Delivery</span>
                    </button>
                  </div>

                  {fulfillmentType === 'store_pickup' ? (
                    <p className="text-[11px] text-[#A39276] font-sans italic bg-[#1c1814] p-2 border border-[#2a221a]">
                      Pickup at: Near Old Bus Stand, Bhiwani (Ready in 10-15 mins).
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Delivery address in Bhiwani (Colony, landmark)..."
                        className="w-full bg-[#10100E] border border-[#2d251d] focus:border-[#B99550] p-2 text-xs text-[#FAF6ED] font-sans outline-none"
                      />
                      <p className="text-[10px] text-[#A39276] font-sans">
                        Free delivery on orders over ₹500 across Bhiwani city.
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="pt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Name"
                      className="bg-[#10100E] border border-[#2d251d] focus:border-[#B99550] p-2 text-xs text-[#FAF6ED] font-sans outline-none"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="WhatsApp Mobile"
                      className="bg-[#10100E] border border-[#2d251d] focus:border-[#B99550] p-2 text-xs text-[#FAF6ED] font-sans outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Instructions (e.g. less sweet, extra chilled)..."
                    className="w-full bg-[#10100E] border border-[#2d251d] focus:border-[#B99550] p-2 text-xs text-[#FAF6ED] font-sans outline-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#2b241c] bg-[#161310] space-y-4">
              {/* Calculations Breakdown */}
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#A39276]">
                  <span>Subtotal:</span>
                  <span>{formatINR(calc.subtotal)}</span>
                </div>
                {calc.discount > 0 && (
                  <div className="flex justify-between text-[#5cb85c]">
                    <span>Pehlwaan Volume Discount (5%):</span>
                    <span>-{formatINR(calc.discount)}</span>
                  </div>
                )}
                {fulfillmentType === 'local_delivery' && (
                  <div className="flex justify-between text-[#A39276]">
                    <span>Delivery:</span>
                    <span>{calc.deliveryFee === 0 ? 'FREE' : formatINR(calc.deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-[#FAF6ED] pt-2 border-t border-[#2b241c]">
                  <span>Estimated Total:</span>
                  <span className="text-[#B99550] text-xl">{formatINR(calc.total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 bg-[#B99550] text-[#10100E] hover:bg-[#FAF6ED] font-sans text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(185,149,80,0.3)]"
              >
                <Send className="w-4 h-4" />
                <span>Send Order to WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-[#A39276] font-sans">
                Our kitchen team will confirm your order and preparation timing instantly on WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

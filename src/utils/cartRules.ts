/**
 * Pure calculation & checkout business logic for Balaji Badam Ragda.
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface OrderCalculation {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
}

export interface CheckoutDetails {
  customerName: string;
  phone: string;
  fulfillmentType: 'store_pickup' | 'local_delivery';
  deliveryAddress?: string;
  specialInstructions?: string;
  items: CartItem[];
}

/**
 * Calculates subtotal, volume discount, and final total.
 * - Free local delivery on orders >= ₹500
 * - ₹40 delivery fee on smaller local delivery orders
 * - 5% Pehlwaan loyalty discount on orders >= ₹1000
 */
export function calculateOrderSummary(
  items: CartItem[],
  fulfillmentType: 'store_pickup' | 'local_delivery' = 'store_pickup'
): OrderCalculation {
  const totalItems = items.reduce((sum, item) => sum + (item.quantity > 0 ? item.quantity : 0), 0);
  const subtotal = items.reduce((sum, item) => sum + Math.max(0, item.price) * Math.max(0, item.quantity), 0);

  let discount = 0;
  if (subtotal >= 1000) {
    discount = Math.round(subtotal * 0.05); // 5% discount
  }

  let deliveryFee = 0;
  if (fulfillmentType === 'local_delivery' && subtotal > 0) {
    deliveryFee = subtotal >= 500 ? 0 : 40;
  }

  const total = Math.max(0, subtotal - discount + deliveryFee);

  return {
    subtotal,
    discount,
    deliveryFee,
    total,
    totalItems,
  };
}

/**
 * Generates a structured WhatsApp enquiry/order link without fake checkout promises.
 */
export function generateWhatsAppOrderUrl(details: CheckoutDetails, whatsappNumber = '919876543210'): string {
  const calc = calculateOrderSummary(details.items, details.fulfillmentType);

  const lines: string[] = [
    `*राम राम जी! New Order / Enquiry for Balaji Badam Ragda (Bhiwani)*`,
    `----------------------------------------`,
  ];

  if (details.customerName) {
    lines.push(`👤 *Customer:* ${details.customerName}`);
  }
  if (details.phone) {
    lines.push(`📞 *Phone:* ${details.phone}`);
  }

  lines.push(`📦 *Fulfillment:* ${details.fulfillmentType === 'store_pickup' ? 'Store Pickup (Near Old Bus Stand)' : 'Local Bhiwani Delivery'}`);

  if (details.fulfillmentType === 'local_delivery' && details.deliveryAddress) {
    lines.push(`📍 *Delivery Address:* ${details.deliveryAddress}`);
  }

  lines.push(`----------------------------------------`);
  lines.push(`*Items Ordered:*`);

  details.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} (${item.size || 'Standard'}) x ${item.quantity} = ₹${item.price * item.quantity}`);
  });

  lines.push(`----------------------------------------`);
  lines.push(`Subtotal: ₹${calc.subtotal}`);
  if (calc.discount > 0) {
    lines.push(`Pehlwaan Volume Discount: -₹${calc.discount}`);
  }
  if (calc.deliveryFee > 0) {
    lines.push(`Delivery Fee: ₹${calc.deliveryFee}`);
  } else if (details.fulfillmentType === 'local_delivery') {
    lines.push(`Delivery: Free (Order > ₹500)`);
  }
  lines.push(`*Estimated Total: ₹${calc.total}*`);

  if (details.specialInstructions) {
    lines.push(`📝 *Note:* ${details.specialInstructions}`);
  }

  lines.push(`\n_Tagline: Piyega Ragda Toh Ho Jayega Tagda!_`);

  const encodedText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${whatsappNumber}?text=${encodedText}`;
}

/**
 * Format Indian Rupee currency standard
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

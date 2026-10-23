import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateOrderSummary, generateWhatsAppOrderUrl, formatINR } from './cartRules';

test('calculateOrderSummary handles empty cart', () => {
  const summary = calculateOrderSummary([]);
  assert.equal(summary.subtotal, 0);
  assert.equal(summary.discount, 0);
  assert.equal(summary.deliveryFee, 0);
  assert.equal(summary.total, 0);
  assert.equal(summary.totalItems, 0);
});

test('calculateOrderSummary calculates correct subtotal and applies delivery rules', () => {
  const items = [
    { id: '1', name: 'Balaji Badam Ragda Bottle', price: 90, quantity: 2, size: '300ml' }, // 180
  ];

  // Store pickup: no delivery fee
  const pickupSummary = calculateOrderSummary(items, 'store_pickup');
  assert.equal(pickupSummary.subtotal, 180);
  assert.equal(pickupSummary.deliveryFee, 0);
  assert.equal(pickupSummary.total, 180);

  // Delivery under ₹500 has ₹40 delivery fee
  const deliverySummary = calculateOrderSummary(items, 'local_delivery');
  assert.equal(deliverySummary.subtotal, 180);
  assert.equal(deliverySummary.deliveryFee, 40);
  assert.equal(deliverySummary.total, 220);
});

test('calculateOrderSummary grants free delivery over ₹500 and 5% discount over ₹1000', () => {
  const items = [
    { id: '2', name: 'Shahi Akhaara Laddu Box', price: 400, quantity: 3, size: '500g' }, // 1200
  ];

  const summary = calculateOrderSummary(items, 'local_delivery');
  assert.equal(summary.subtotal, 1200);
  assert.equal(summary.deliveryFee, 0); // Free because >= 500
  assert.equal(summary.discount, 60); // 5% of 1200
  assert.equal(summary.total, 1140);
  assert.equal(summary.totalItems, 3);
});

test('generateWhatsAppOrderUrl builds valid wa.me URL with all item lines', () => {
  const url = generateWhatsAppOrderUrl({
    customerName: 'Vikram Pehlwaan',
    phone: '9812345678',
    fulfillmentType: 'store_pickup',
    items: [{ id: '1', name: 'Badam Ragda', price: 90, quantity: 4, size: '300ml' }],
  });

  assert.match(url, /^https:\/\/wa\.me\/919876543210\?text=/);
  assert.ok(url.includes(encodeURIComponent('Vikram Pehlwaan')));
  assert.ok(url.includes(encodeURIComponent('Piyega Ragda Toh Ho Jayega Tagda!')));
});

test('formatINR formats currency in Indian Rupees format', () => {
  const formatted = formatINR(1200);
  assert.ok(formatted.includes('1,200') || formatted.includes('1200'));
});

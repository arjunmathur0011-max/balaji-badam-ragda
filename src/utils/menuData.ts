export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: 'beverage' | 'sweet' | 'fitness';
  categoryLabel: string;
  tagline: string;
  price: number;
  size: string;
  serving: string;
  description: string;
  craftProcess: string;
  badge?: string;
  ingredients: string[];
  nutritionPerServing: {
    calories: string;
    protein: string;
    healthyFats: string;
    carbs: string;
  };
  imageBg: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'badam-ragda-signature',
    name: 'Balaji Signature Badam Ragda',
    hindiName: 'बालाजी बादाम रगड़ा (स्पेशल)',
    category: 'beverage',
    categoryLabel: 'Signature Beverage',
    tagline: 'The Original Bhiwani Powerhouse',
    price: 90,
    size: '300 ml Glass Bottle',
    serving: '1 Bottle (Single Serving)',
    badge: 'Best Seller',
    description: 'Thick, creamy slow-ground almond paste infused with rich whole milk, Kashmiri kesar, green cardamom, and sun-dried rose water. Served chilled in our signature embossed glass bottle.',
    craftProcess: 'Ground for 45 minutes in stone mortar (kundi-sota) to release natural almond oils without burning nutritional enzymes.',
    ingredients: ['California Almonds (40g+)', 'Whole Buffalo Milk', 'Kashmiri Kesar', 'Chhoti Elaichi', 'Muskmelon Seeds (Magaz)', 'Rose Water', 'Natural Mishri'],
    nutritionPerServing: {
      calories: '285 kcal',
      protein: '11.5g',
      healthyFats: '16g',
      carbs: '24g',
    },
    imageBg: 'from-[#493020] via-[#241710] to-[#10100E]',
  },
  {
    id: 'badam-ragda-pehlwaan',
    name: 'Akhaara Pehlwaan Family Pack',
    hindiName: 'अखाड़ा पहलवान 1L जार',
    category: 'fitness',
    categoryLabel: 'Akhaara Heavy Pack',
    tagline: 'Designed for High-Intensity Recovery',
    price: 280,
    size: '1000 ml Heritage Jar',
    serving: '3-4 Servings',
    badge: 'Akhaara Special',
    description: 'A powerhouse double-strength formulation made specially for wrestlers, gym enthusiasts, and family gatherings. Packed with over 150 grams of crushed nuts and cooling seeds.',
    craftProcess: 'Double-concentrated stone grinding with extra white muskmelon seeds for deep electrolyte replenishment and core cooling.',
    ingredients: ['Crushed Almonds (150g)', 'Pure Boiled Milk', 'White Magaz Seeds', 'Black Pepper (Kali Mirch hints)', 'Kashmiri Saffron', 'Green Cardamom'],
    nutritionPerServing: {
      calories: '890 kcal (per jar)',
      protein: '38g (per jar)',
      healthyFats: '48g',
      carbs: '72g',
    },
    imageBg: 'from-[#3a2517] via-[#22160d] to-[#10100E]',
  },
  {
    id: 'shahi-besan-gond-laddu',
    name: 'Shahi Desi Ghee Besan & Gond Laddu',
    hindiName: 'शाही देसी घी बेसन व गोंद लड्डू',
    category: 'sweet',
    categoryLabel: 'Heritage Mithai',
    tagline: 'Bilona Cow Ghee & Edible Gond',
    price: 420,
    size: '500g Box (approx. 10 pcs)',
    serving: '2 Laddus (100g)',
    badge: 'Pure Desi Ghee',
    description: 'Golden roasted coarse gram flour slow-cooked in pure bilona desi cow ghee, blended with crunchy puffed edible gond, roasted almonds, cashew splits, and fragrant elaichi.',
    craftProcess: 'Slowly roasted on wood-fire kadhai over 2 hours for authentic deep golden nutty aroma and melt-in-mouth texture.',
    ingredients: ['Pure Bilona Desi Ghee', 'Coarse Chana Dal Besan', 'Puffed Gond (Edible Gum)', 'Crushed California Almonds', 'Cashew Bits', 'Organic Khand/Bura'],
    nutritionPerServing: {
      calories: '410 kcal',
      protein: '9g',
      healthyFats: '24g',
      carbs: '42g',
    },
    imageBg: 'from-[#543b18] via-[#2e1f0e] to-[#10100E]',
  },
  {
    id: 'bhiwani-mawa-peda',
    name: 'Akhaara Special Mawa Peda',
    hindiName: 'अखाड़ा स्पेशल शुद्ध मावा पेड़ा',
    category: 'sweet',
    categoryLabel: 'Heritage Mithai',
    tagline: 'Caramelized Slow-Cooked Khoya',
    price: 360,
    size: '400g Box (approx. 12 pcs)',
    serving: '2 Pedas (70g)',
    badge: 'Traditional Craft',
    description: 'Dense, slow-reduced fresh buffalo milk mawa caramelized to rich bronze hues, studded with hand-sliced almonds and aromatic cardamom seeds.',
    craftProcess: 'Continuous slow-reduction of 100% farm-fresh milk in heavy iron pans until natural caramelized sugars bloom.',
    ingredients: ['Pure Fresh Buffalo Milk Khoya', 'Crushed Green Cardamom', 'Hand-sliced Almonds', 'Traditional Sugar Cane Bura'],
    nutritionPerServing: {
      calories: '290 kcal',
      protein: '8.2g',
      healthyFats: '14g',
      carbs: '34g',
    },
    imageBg: 'from-[#422915] via-[#28180d] to-[#10100E]',
  },
  {
    id: 'kesar-thandai-ragda',
    name: 'Shahi Kesar Pista Thandai Ragda',
    hindiName: 'शाही केसर पिस्ता ठंडाई रगड़ा',
    category: 'beverage',
    categoryLabel: 'Chilled Special',
    tagline: 'Cooling Blend with Poppy Seeds & Pistachio',
    price: 110,
    size: '300 ml Glass Bottle',
    serving: '1 Bottle',
    badge: 'Seasonal Favorite',
    description: 'A royal summer tonic combining roasted Iranian pistachios, poppy seeds (khus khus), fennel, rose water, and rich saffron threads.',
    craftProcess: 'Overnight steeping of fennel and poppy seeds followed by silky stone friction grinding for natural cooling benefits.',
    ingredients: ['Pistachios', 'California Almonds', 'Poppy Seeds (Khus Khus)', 'Saunf (Fennel)', 'Rose Petals', 'Fresh Milk', 'Kesar'],
    nutritionPerServing: {
      calories: '270 kcal',
      protein: '10.5g',
      healthyFats: '15g',
      carbs: '22g',
    },
    imageBg: 'from-[#4d371d] via-[#2a1c0d] to-[#10100E]',
  },
  {
    id: 'akhaara-dry-fruit-panjiri',
    name: 'Royal Akhaara Dry Fruit Panjiri',
    hindiName: 'शाही अखाड़ा ड्राई फ्रूट पंजीरी',
    category: 'fitness',
    categoryLabel: 'Strength & Stamina',
    tagline: 'High-Energy Akhaara Nutrition',
    price: 490,
    size: '500g Sealed Glass Jar',
    serving: '50g Daily Fuel',
    badge: 'Pehlwaan Diet',
    description: 'Coarse roasted whole wheat flour roasted in desi ghee with foxnuts (makhana), crunchy almonds, melon seeds, dried dates (chhuara), and kamarkas.',
    craftProcess: 'Hand-stirred dry roast technique preserving crunchy texture of roasted makhanas and toasted nuts.',
    ingredients: ['Desi Ghee', 'Wheat Atta', 'Roasted Phool Makhana', 'Almonds', 'Cashews', 'Melon Seeds', 'Kamarkas', 'Chhuara Powder'],
    nutritionPerServing: {
      calories: '240 kcal',
      protein: '6.5g',
      healthyFats: '13g',
      carbs: '26g',
    },
    imageBg: 'from-[#3b2719] via-[#21150c] to-[#10100E]',
  },
];

export interface IngredientStory {
  id: string;
  name: string;
  hindi: string;
  role: string;
  description: string;
  visualNote: string;
  color: string;
}

export const INGREDIENT_STORIES: IngredientStory[] = [
  {
    id: 'almonds',
    name: 'California & Mamra Badam',
    hindi: 'चुनिंदा मीठे बादाम',
    role: 'The Core Powerhouse',
    description: 'Carefully soaked overnight and hand-peeled to remove tannic skins, yielding rich healthy fats, natural vitamin E, and clean muscle-building protein.',
    visualNote: 'Cold-ground into an ultra-creamy emulsion in stone mortar.',
    color: '#D8B273',
  },
  {
    id: 'magaz',
    name: 'Muskmelon Seeds (Magaz)',
    hindi: 'सफेद मगज बीज',
    role: 'Natural Electrolytes & Cooling',
    description: 'Traditional North Indian cooling agent packed with zinc, magnesium, and arginine that keeps the body resilient in severe summers and intense workouts.',
    visualNote: 'Lends velvety richness and smooth mouthfeel.',
    color: '#E8D5B5',
  },
  {
    id: 'cardamom',
    name: 'Idukki Green Cardamom',
    hindi: 'हरी इलायची',
    role: 'Aromatic Digestion Catalyst',
    description: 'Crushed freshly for every batch, releasing cineole and natural essential oils that enhance nutrient absorption and impart a royal fragrance.',
    visualNote: 'Vibrant green pods with aromatic dark seeds.',
    color: '#8CA06E',
  },
  {
    id: 'saffron',
    name: 'Kashmiri Mongra Kesar',
    hindi: 'कश्मीरी मोंगरा केसर',
    role: 'Golden Hue & Vitality',
    description: 'Pure red stigma threads harvested from the valleys of Pampore, providing natural antioxidant richness and a warm, regal golden color.',
    visualNote: 'Deep crimson threads blooming into liquid sunshine.',
    color: '#D97706',
  },
  {
    id: 'saunf',
    name: 'Lucknowi Fennel Seeds',
    hindi: 'मीठी लखनवी सौंफ',
    role: 'Soothing Gut Harmony',
    description: 'Hand-picked small green fennel seeds that offer sweet herbal top notes and soothe digestion after heavy pehlwaan workouts.',
    visualNote: 'Subtle sweet aroma harmonizing with milk.',
    color: '#9CB071',
  },
  {
    id: 'rose',
    name: 'Sun-Dried Rose Petals',
    hindi: 'गुलाब की पंखुड़ियां',
    role: 'Cooling Balance & Floral Grace',
    description: 'Desi Damask rose petals dried naturally under Haryana sunshine to impart delicate sweetness without artificial syrups or synthetic colors.',
    visualNote: 'Blush pink flakes providing fragrant finish.',
    color: '#C06B73',
  },
];

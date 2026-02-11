/**
 * Mock data for when DATABASE_URL is not set.
 */

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Skincare', slug: 'skincare', description: 'Cleansers, serums, moisturizers & treatments' },
  { id: 2, name: 'Makeup', slug: 'makeup', description: 'Foundation, lipstick, eyeshadow & more' },
  { id: 3, name: 'Hair Care', slug: 'hair-care', description: 'Shampoos, conditioners & styling' },
  { id: 4, name: 'Fragrance', slug: 'fragrance', description: 'Perfumes & body mists' },
  { id: 5, name: 'Body Care', slug: 'body-care', description: 'Lotions, oils & body treatments' },
];

export const MOCK_BRANDS = [
  { id: 1, name: 'Luxe Beauty', slug: 'luxe-beauty', description: 'Premium luxury skincare' },
  { id: 2, name: 'Glow Lab', slug: 'glow-lab', description: 'Science-backed skincare solutions' },
  { id: 3, name: 'Velvet Touch', slug: 'velvet-touch', description: 'Luxurious makeup essentials' },
  { id: 4, name: 'Pure Essence', slug: 'pure-essence', description: 'Natural & organic beauty' },
];

// Product reviews: product_id -> array of reviews
export const MOCK_REVIEWS = {
  1: [
    { id: 1, author: 'Mary K.', rating: 5, text: 'Amazing serum! My skin has never looked brighter.', date: '2024-01-15' },
    { id: 2, author: 'Grace W.', rating: 5, text: 'Worth every shilling. Visible results in 2 weeks.', date: '2024-01-20' },
    { id: 3, author: 'Jane M.', rating: 4, text: 'Great product, absorbs quickly. Would buy again.', date: '2024-02-01' },
  ],
  2: [
    { id: 4, author: 'Susan A.', rating: 5, text: 'Perfect match for my skin. Lasts all day!', date: '2024-01-18' },
    { id: 5, author: 'Lucy O.', rating: 4, text: 'Smooth application, good coverage.', date: '2024-01-25' },
  ],
  3: [
    { id: 6, author: 'Nancy L.', rating: 5, text: 'My hair is so soft and shiny now. Love it!', date: '2024-02-02' },
  ],
  4: [
    { id: 7, author: 'Diana R.', rating: 5, text: 'Beautiful color, very moisturizing.', date: '2024-01-22' },
    { id: 8, author: 'Emma T.', rating: 4, text: 'Great lipstick, stays on for hours.', date: '2024-01-28' },
  ],
  5: [
    { id: 9, author: 'Faith K.', rating: 5, text: 'Gentle and effective. Perfect for sensitive skin.', date: '2024-02-05' },
  ],
  6: [
    { id: 10, author: 'Angela M.', rating: 5, text: 'Smells divine! Everyone asks what I\'m wearing.', date: '2024-01-30' },
  ],
  7: [
    { id: 11, author: 'Sarah J.', rating: 5, text: 'So rich and nourishing. Best body butter ever.', date: '2024-02-03' },
  ],
  8: [
    { id: 12, author: 'Rose B.', rating: 5, text: 'Reduced my fine lines noticeably. Highly recommend!', date: '2024-02-01' },
  ],
  9: [
    { id: 13, author: 'Kate N.', rating: 4, text: 'Lengthens lashes nicely. No clumping.', date: '2024-01-27' },
  ],
  10: [
    { id: 14, author: 'Martha P.', rating: 5, text: 'Saved my damaged hair. A weekly must-have.', date: '2024-02-04' },
  ],
  11: [
    { id: 15, author: 'Lisa K.', rating: 5, text: 'Best moisturizer I\'ve used. Skin feels plump!', date: '2024-02-06' },
  ],
  12: [
    { id: 16, author: 'Anna S.', rating: 5, text: 'Beautiful pigments, blends like a dream.', date: '2024-02-05' },
  ],
  13: [
    { id: 17, author: 'Helen T.', rating: 4, text: 'Gentle on my color-treated hair.', date: '2024-02-07' },
  ],
  14: [
    { id: 18, author: 'Carla M.', rating: 5, text: 'Light and fresh. Perfect for everyday.', date: '2024-02-04' },
  ],
  15: [
    { id: 19, author: 'Patricia D.', rating: 5, text: 'Leaves skin so smooth. Love the scent.', date: '2024-02-06' },
  ],
  16: [
    { id: 20, author: 'Ruth W.', rating: 4, text: 'Helped minimize my pores.', date: '2024-02-08' },
  ],
  17: [
    { id: 21, author: 'Irene G.', rating: 5, text: 'No flashback in photos. Perfect!', date: '2024-02-03' },
  ],
  18: [
    { id: 22, author: 'Betty H.', rating: 5, text: 'Great detangler. Hair feels soft.', date: '2024-02-05' },
  ],
  19: [
    { id: 23, author: 'Dorothy L.', rating: 5, text: 'Refreshing scent. Long lasting.', date: '2024-02-07' },
  ],
  20: [
    { id: 24, author: 'Margaret F.', rating: 5, text: 'Super moisturizing without being greasy.', date: '2024-02-06' },
  ],
};

// Get reviews for a product, or default reviews for products without specific ones
export function getReviewsForProduct(productId) {
  return MOCK_REVIEWS[productId] ?? [
    { id: 0, author: 'Happy Customer', rating: 5, text: 'Great product!', date: '2024-02-01' },
  ];
}

// Get average rating for a product
export function getAverageRating(productId) {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export const MOCK_PRODUCTS = [
  { id: 1, name: 'Hydrating Vitamin C Serum', description: 'Brightening serum with 20% Vitamin C. Reduces dark spots and evens skin tone.', price: 2499, stock: 45, image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', category_id: 1, brand_id: 1 },
  { id: 2, name: 'Silk Finish Foundation', description: 'Buildable coverage with a natural matte finish. 24hr wear.', price: 3299, stock: 32, image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category_id: 2, brand_id: 3 },
  { id: 3, name: 'Nourishing Hair Oil', description: 'Argan & coconut oil blend for deep nourishment and shine.', price: 1899, stock: 58, image_url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400', category_id: 3, brand_id: 4 },
  { id: 4, name: 'Rose Gold Lipstick', description: 'Creamy, long-lasting lipstick in 12 shades.', price: 1499, stock: 67, image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category_id: 2, brand_id: 3 },
  { id: 5, name: 'Gentle Foaming Cleanser', description: 'pH-balanced cleanser for all skin types. Removes makeup gently.', price: 1199, stock: 89, image_url: 'https://images.unsplash.com/photo-1612810432636-56e3d9071caf?w=400', category_id: 1, brand_id: 2 },
  { id: 6, name: 'Eau de Parfum Bloom', description: 'Floral blend of jasmine, rose and peony. 50ml.', price: 5499, stock: 24, image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', category_id: 4, brand_id: 1 },
  { id: 7, name: 'Body Butter Soufflé', description: 'Ultra-rich body butter with shea butter. 24hr moisture.', price: 2199, stock: 41, image_url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', category_id: 5, brand_id: 4 },
  { id: 8, name: 'Retinol Night Cream', description: 'Anti-aging night cream with 0.3% retinol. Reduces fine lines.', price: 4299, stock: 28, image_url: 'https://images.unsplash.com/photo-1570194065650-d99fb4bed803?w=400', category_id: 1, brand_id: 2 },
  { id: 9, name: 'Volumizing Mascara', description: 'Lengthening mascara with nourishing bamboo extract.', price: 999, stock: 72, image_url: 'https://images.unsplash.com/photo-1565009907328-9db726421e19?w=400', category_id: 2, brand_id: 3 },
  { id: 10, name: 'Repairing Hair Mask', description: 'Weekly deep conditioning treatment. Restores damaged hair.', price: 2799, stock: 35, image_url: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400', category_id: 3, brand_id: 1 },
  { id: 11, name: 'Hyaluronic Acid Moisturizer', description: 'Deep hydration with hyaluronic acid. Plumps and smooths.', price: 2999, stock: 52, image_url: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400', category_id: 1, brand_id: 2 },
  { id: 12, name: 'Eyeshadow Palette Nude', description: '12 matte and shimmer shades. Highly pigmented.', price: 3499, stock: 38, image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', category_id: 2, brand_id: 3 },
  { id: 13, name: 'Sulfate-Free Shampoo', description: 'Gentle cleanser for color-treated hair. Adds shine.', price: 1599, stock: 64, image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', category_id: 3, brand_id: 4 },
  { id: 14, name: 'Vanilla Body Mist', description: 'Light, fresh vanilla fragrance. 100ml spray.', price: 1299, stock: 71, image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400', category_id: 4, brand_id: 1 },
  { id: 15, name: 'Exfoliating Body Scrub', description: 'Sugar and jojoba oil. Reveals silky smooth skin.', price: 1899, stock: 46, image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400', category_id: 5, brand_id: 4 },
  { id: 16, name: 'Niacinamide Toner', description: 'Pore-minimizing toner. Balances oil production.', price: 1799, stock: 43, image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400', category_id: 1, brand_id: 2 },
  { id: 17, name: 'Setting Powder Translucent', description: 'Sets makeup without flashback. Oil-free formula.', price: 2199, stock: 39, image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400', category_id: 2, brand_id: 3 },
  { id: 18, name: 'Leave-In Conditioner Spray', description: 'Detangles and adds moisture. Heat protectant.', price: 1499, stock: 55, image_url: 'https://images.unsplash.com/photo-1522338243402-2f77ef5c9b0d?w=400', category_id: 3, brand_id: 1 },
  { id: 19, name: 'Citrus Cologne Spray', description: 'Fresh citrus and wood notes. Unisex 75ml.', price: 4799, stock: 29, image_url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400', category_id: 4, brand_id: 1 },
  { id: 20, name: 'Shea Body Lotion', description: 'Intensive moisture for dry skin. Non-greasy.', price: 1199, stock: 82, image_url: 'https://images.unsplash.com/photo-1615184697985-022615e80b01?w=400', category_id: 5, brand_id: 4 },
];

// In-memory cart for mock mode (keyed by userId)
const mockCart = new Map();

export function getMockCart(userId = 1) {
  const key = String(userId);
  if (!mockCart.has(key)) mockCart.set(key, []);
  return mockCart.get(key);
}

export function addToMockCart(userId, productId, quantity = 1) {
  const cart = getMockCart(userId);
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  const existing = cart.find((i) => i.product_id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: cart.length + 1,
      product_id: productId,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
    });
  }
}

export function updateMockCartQuantity(userId, productId, quantity) {
  const cart = getMockCart(userId);
  const item = cart.find((i) => i.product_id === productId);
  if (!item) return;
  if (quantity <= 0) {
    cart.splice(cart.indexOf(item), 1);
  } else {
    item.quantity = quantity;
  }
}

export function removeFromMockCart(userId, productId) {
  const cart = getMockCart(userId);
  const idx = cart.findIndex((i) => i.product_id === productId);
  if (idx >= 0) cart.splice(idx, 1);
}

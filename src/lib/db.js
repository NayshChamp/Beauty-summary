/**
 * Database layer - uses PostgreSQL when DATABASE_URL is set,
 * otherwise falls back to mock data (no 500 errors without DB).
 */
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_BRANDS,
  getMockCart,
  addToMockCart,
  updateMockCartQuantity,
  removeFromMockCart,
} from './data.js';

let pool = null;
const USE_MOCK = !process.env.DATABASE_URL;

async function getPool() {
  if (pool) return pool;
  if (USE_MOCK) return null;
  try {
    const pkg = await import('pg');
    pool = new pkg.Pool({ connectionString: process.env.DATABASE_URL });
    return pool;
  } catch (e) {
    console.warn('PostgreSQL not available, using mock data');
    return null;
  }
}

export async function getProducts(filters = {}) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    let rows = [...MOCK_PRODUCTS];
    if (filters.categorySlug) {
      const cat = MOCK_CATEGORIES.find((c) => c.slug === filters.categorySlug);
      if (cat) rows = rows.filter((p) => p.category_id === cat.id);
    }
    if (filters.brandSlug) {
      const brand = MOCK_BRANDS.find((b) => b.slug === filters.brandSlug);
      if (brand) rows = rows.filter((p) => p.brand_id === brand.id);
    }
    return rows;
  }
  let sql = 'SELECT id, name, description, price, stock, image_url, category_id, brand_id FROM products';
  const params = [];
  if (filters.categorySlug) {
    sql += ' WHERE category_id = (SELECT id FROM categories WHERE slug = $1)';
    params.push(filters.categorySlug);
  }
  if (filters.brandSlug) {
    sql += (params.length ? ' AND' : ' WHERE') + ' brand_id = (SELECT id FROM brands WHERE slug = $' + (params.length + 1) + ')';
    params.push(filters.brandSlug);
  }
  sql += ' ORDER BY id DESC';
  const res = await p.query(sql, params);
  return res.rows;
}

export async function getCategories() {
  const p = await getPool();
  if (USE_MOCK || !p) return [...MOCK_CATEGORIES];
  const res = await p.query('SELECT id, name, slug, description FROM categories ORDER BY name ASC');
  return res.rows;
}

export async function getBrands() {
  const p = await getPool();
  if (USE_MOCK || !p) return [...MOCK_BRANDS];
  const res = await p.query('SELECT id, name, slug, description FROM brands ORDER BY name ASC');
  return res.rows;
}

export async function getCart(userId) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    return getMockCart(userId).map((i) => ({
      cart_item_id: i.id,
      product_id: i.product_id,
      name: i.name,
      price: i.price,
      image_url: i.image_url,
      quantity: i.quantity,
    }));
  }
  const res = await p.query(
    `SELECT c.id AS cart_item_id, p.id AS product_id, p.name, p.price, p.image_url, c.quantity
     FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = $1`,
    [userId]
  );
  return res.rows;
}

export async function cartAdd(userId, productId, quantity) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    addToMockCart(userId, productId, quantity);
    return;
  }
  await p.query(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
    [userId, productId, quantity]
  );
}

export async function cartUpdate(userId, productId, quantity) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    updateMockCartQuantity(userId, productId, quantity);
    return;
  }
  await p.query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [
    quantity,
    userId,
    productId,
  ]);
}

export async function cartRemove(userId, productId) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    removeFromMockCart(userId, productId);
    return;
  }
  await p.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, productId]);
}

export async function productCreate(data) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    const id = Math.max(...MOCK_PRODUCTS.map((p) => p.id), 0) + 1;
    MOCK_PRODUCTS.push({
      id,
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      stock: Number(data.stock),
      image_url: data.image_url || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      category_id: Number(data.category_id),
      brand_id: Number(data.brand_id) || 1,
    });
    return { id };
  }
  const res = await p.query(
    `INSERT INTO products (name, description, price, stock, image_url, category_id, brand_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      data.name,
      data.description || '',
      data.price,
      data.stock,
      data.image_url || null,
      data.category_id,
      data.brand_id || 1,
    ]
  );
  return { id: res.rows[0].id };
}

export async function productUpdate(id, data) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    const p = MOCK_PRODUCTS.find((x) => x.id === Number(id));
    if (p) {
      if (data.name != null) p.name = data.name;
      if (data.price != null) p.price = Number(data.price);
      if (data.stock != null) p.stock = Number(data.stock);
    }
    return;
  }
  await p.query('UPDATE products SET name = $1, price = $2, stock = $3 WHERE id = $4', [
    data.name,
    data.price,
    data.stock,
    id,
  ]);
}

export async function productDelete(id) {
  const p = await getPool();
  if (USE_MOCK || !p) {
    const idx = MOCK_PRODUCTS.findIndex((p) => p.id === Number(id));
    if (idx >= 0) MOCK_PRODUCTS.splice(idx, 1);
    return;
  }
  await p.query('DELETE FROM products WHERE id = $1', [id]);
}

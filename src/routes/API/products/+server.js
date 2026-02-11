import {
  getProducts,
  productCreate,
  productUpdate,
  productDelete,
} from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const products = await getProducts();
    return json(products);
  } catch (err) {
    console.error('Products GET error:', err);
    return json({ error: 'Failed to load products' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, price, stock, category_id, brand_id, description, image_url } = body;
    if (!name || price == null || stock == null || !category_id) {
      return json({ error: 'Missing required fields: name, price, stock, category_id' }, { status: 400 });
    }
    const { id } = await productCreate({
      name,
      price,
      stock,
      category_id,
      brand_id,
      description,
      image_url,
    });
    return json({ success: true, id });
  } catch (err) {
    console.error('Products POST error:', err);
    return json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT({ request }) {
  try {
    const body = await request.json();
    const { id, name, price, stock } = body;
    if (!id || !name || price == null || stock == null) {
      return json({ error: 'Missing required fields: id, name, price, stock' }, { status: 400 });
    }
    await productUpdate(id, { name, price, stock });
    return json({ success: true });
  } catch (err) {
    console.error('Products PUT error:', err);
    return json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE({ request }) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return json({ error: 'Missing product id' }, { status: 400 });
    await productDelete(id);
    return json({ success: true });
  } catch (err) {
    console.error('Products DELETE error:', err);
    return json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

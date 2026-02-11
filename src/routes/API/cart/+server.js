import { getCart, cartAdd, cartUpdate, cartRemove } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
  try {
    const userId = locals.user?.id ?? 1;
    const rows = await getCart(userId);
    return json(rows);
  } catch (err) {
    console.error('Cart GET error:', err);
    return json({ error: 'Failed to load cart' }, { status: 500 });
  }
}

export async function POST({ request, locals }) {
  try {
    const userId = locals.user?.id ?? 1;
    const { product_id, quantity = 1 } = await request.json();
    if (!product_id) return json({ error: 'Missing product_id' }, { status: 400 });
    await cartAdd(userId, product_id, quantity);
    return json({ success: true });
  } catch (err) {
    console.error('Cart POST error:', err);
    return json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function PUT({ request, locals }) {
  try {
    const userId = locals.user?.id ?? 1;
    const { product_id, quantity } = await request.json();
    if (!product_id || quantity == null) return json({ error: 'Missing product_id or quantity' }, { status: 400 });
    await cartUpdate(userId, product_id, quantity);
    return json({ success: true });
  } catch (err) {
    console.error('Cart PUT error:', err);
    return json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE({ request, locals }) {
  try {
    const userId = locals.user?.id ?? 1;
    const { product_id } = await request.json();
    if (!product_id) return json({ error: 'Missing product_id' }, { status: 400 });
    await cartRemove(userId, product_id);
    return json({ success: true });
  } catch (err) {
    console.error('Cart DELETE error:', err);
    return json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}

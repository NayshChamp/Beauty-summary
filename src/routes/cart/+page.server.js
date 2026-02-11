import { getCart } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
  const userId = locals.user?.id ?? 1;
  try {
    const cart = await getCart(userId);
    return { cart };
  } catch (err) {
    console.error('Error loading cart:', err);
    throw error(500, 'Failed to load cart');
  }
}

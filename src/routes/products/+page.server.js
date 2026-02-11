import { getProducts } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const products = await getProducts();
    return { products };
  } catch (err) {
    console.error('Error loading products:', err);
    throw error(500, 'Failed to load products');
  }
}

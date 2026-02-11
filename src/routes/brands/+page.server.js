import { getBrands } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const brands = await getBrands();
    return { brands };
  } catch (err) {
    console.error('Error loading brands:', err);
    throw error(500, 'Failed to load brands');
  }
}

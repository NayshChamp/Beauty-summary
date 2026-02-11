import { getCategories } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const categories = await getCategories();
    return { categories };
  } catch (err) {
    console.error('Error loading categories:', err);
    throw error(500, 'Failed to load categories');
  }
}

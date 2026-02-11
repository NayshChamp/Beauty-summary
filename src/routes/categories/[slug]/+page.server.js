import { getProducts, getCategories } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const [products, categories] = await Promise.all([
      getProducts({ categorySlug: params.slug }),
      getCategories(),
    ]);
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw error(404, 'Category not found');
    return { products, category };
  } catch (err) {
    if (err.status === 404) throw err;
    console.error('Error loading category:', err);
    throw error(500, 'Failed to load category');
  }
}

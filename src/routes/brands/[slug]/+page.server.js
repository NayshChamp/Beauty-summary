import { getProducts, getBrands } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const [products, brands] = await Promise.all([
      getProducts({ brandSlug: params.slug }),
      getBrands(),
    ]);
    const brand = brands.find((b) => b.slug === params.slug);
    if (!brand) throw error(404, 'Brand not found');
    return { products, brand };
  } catch (err) {
    if (err.status === 404) throw err;
    console.error('Error loading brand:', err);
    throw error(500, 'Failed to load brand');
  }
}

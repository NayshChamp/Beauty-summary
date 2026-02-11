import { getProducts, getCategories, getBrands, productCreate } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const [products, categories, brands] = await Promise.all([
      getProducts(),
      getCategories(),
      getBrands(),
    ]);
    return { products, categories, brands };
  } catch (err) {
    console.error('Error loading admin products:', err);
    throw error(500, 'Failed to load products');
  }
}

export const actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData();
      const name = formData.get('name');
      const price = formData.get('price');
      const stock = formData.get('stock');
      const category_id = formData.get('category_id');
      const brand_id = formData.get('brand_id') || 1;
      if (!name || !price || !stock || !category_id) {
        return { error: 'All fields are required' };
      }
      await productCreate({
        name,
        price: Number(price),
        stock: Number(stock),
        category_id: Number(category_id),
        brand_id: Number(brand_id),
      });
      return { success: true };
    } catch (err) {
      console.error('Create product error:', err);
      return { error: 'Failed to create product' };
    }
  },
};

import { writable } from 'svelte/store';
import { invalidateAll } from '$app/navigation';
import { toast } from './toast.js';

export const cart = writable([]);

export async function addToCart(product) {
  try {
    const res = await fetch('/API/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id, quantity: 1 }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      await invalidateAll();
      toast.show(`${product.name} added to cart!`, 'success');
    } else {
      toast.show(data.error || 'Failed to add to cart', 'error');
    }
  } catch (err) {
    console.error('Add to cart error:', err);
    toast.show('Failed to add to cart. Please try again.', 'error');
  }
}

export async function updateQuantity(product_id, quantity) {
  const res = await fetch('/API/cart', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id, quantity }),
  });
  if (res.ok) await invalidateAll();
}

export async function removeFromCart(product_id) {
  const res = await fetch('/API/cart', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id }),
  });
  if (res.ok) await invalidateAll();
}

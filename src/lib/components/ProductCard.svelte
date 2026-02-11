<script>
  let { product } = $props();
  import { addToCart } from '$lib/stores/cart.js';
  import { getReviewsForProduct, getAverageRating } from '$lib/data.js';

  let adding = $state(false);

  const reviews = $derived(getReviewsForProduct(product.id));
  const avgRating = $derived(getAverageRating(product.id));
  const stars = $derived(Math.round(avgRating));

  async function handleAdd() {
    if (adding) return;
    adding = true;
    await addToCart(product);
    adding = false;
  }
</script>

<article class="product-card">
  <img src={product.image_url} alt={product.name} class="product-image" />
  <div class="product-info">
    <h3>{product.name}</h3>
    <div class="rating">
      {#each Array(5) as _, i}
        <span class="star" class:filled={i < stars}>★</span>
      {/each}
      <span class="review-count">({reviews.length})</span>
    </div>
    <p class="description">{product.description}</p>
    <p class="price">KES {product.price.toLocaleString()}</p>
    <p class="stock">In stock: {product.stock}</p>
  </div>
  <button class="btn-add" onclick={handleAdd} disabled={adding}>
    {adding ? 'Adding...' : 'Add to Cart'}
  </button>
</article>

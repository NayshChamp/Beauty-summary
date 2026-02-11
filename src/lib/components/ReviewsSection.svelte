<script>
  import { MOCK_REVIEWS, MOCK_PRODUCTS } from '$lib/data.js';

  // Flatten reviews with product names for display
  const featuredReviews = $derived(
    Object.entries(MOCK_REVIEWS)
      .flatMap(([productId, reviews]) =>
        reviews.slice(0, 2).map((r) => ({
          ...r,
          productName: MOCK_PRODUCTS.find((p) => p.id === Number(productId))?.name ?? 'Product',
        }))
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
  );
</script>

<section class="reviews-section">
  <h2>What Our Customers Say</h2>
  <div class="reviews-grid">
    {#each featuredReviews as review}
      <blockquote class="review-card">
        <div class="review-stars">
          {#each Array(5) as _, i}
            <span class="star" class:filled={i < review.rating}>★</span>
          {/each}
        </div>
        <p class="review-text">"{review.text}"</p>
        <footer>
          <cite>— {review.author}</cite>
          <span class="review-product">{review.productName}</span>
        </footer>
      </blockquote>
    {/each}
  </div>
</section>

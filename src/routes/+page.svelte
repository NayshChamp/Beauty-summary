<script>
  import ReviewsSection from '$lib/components/ReviewsSection.svelte';
</script>

<div class="hero">
  <h1>Beauty Summary</h1>
  <p>Discover premium skincare, makeup, and fragrance. Curated beauty essentials for every routine.</p>
  <div class="hero-actions">
    <a href="/products" class="btn-primary">Shop All Products</a>
    <a href="/categories" class="btn-secondary">Browse by Category</a>
  </div>
</div>

<style>
  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  .btn-primary {
    padding: 0.9rem 1.75rem;
    background: var(--accent-deep);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-sm);
    font-weight: 500;
    transition: background 0.2s;
  }
  .btn-primary:hover {
    background: var(--accent-gold);
  }
  .btn-secondary {
    padding: 0.9rem 1.75rem;
    background: transparent;
    color: var(--accent-deep);
    text-decoration: none;
    border: 2px solid var(--accent-deep);
    border-radius: var(--radius-sm);
    font-weight: 500;
    transition: all 0.2s;
  }
  .btn-secondary:hover {
    background: var(--accent-deep);
    color: white;
  }
</style>

<ReviewsSection />

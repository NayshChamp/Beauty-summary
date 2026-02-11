<script>
  let { data } = $props();
  import ProductCard from '$lib/components/ProductCard.svelte';
</script>

<h1>All Products</h1>

{#if data.products.length > 0}
  <div class="product-grid">
    {#each data.products as product (product.id)}
      <ProductCard {product} />
    {/each}
  </div>
{:else}
  <p class="empty">No products found.</p>
{/if}

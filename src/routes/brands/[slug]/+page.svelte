<script>
  let { data } = $props();
  import ProductCard from '$lib/components/ProductCard.svelte';
</script>

<h1>{data.brand.name}</h1>
<p class="brand-intro">{data.brand.description}</p>

{#if data.products.length > 0}
  <div class="product-grid">
    {#each data.products as product (product.id)}
      <ProductCard {product} />
    {/each}
  </div>
{:else}
  <p class="empty">No products from this brand yet.</p>
{/if}

<script>
  let { data } = $props();
  import ProductCard from '$lib/components/ProductCard.svelte';
</script>

<h1>{data.category.name}</h1>
<p class="category-intro">{data.category.description}</p>

{#if data.products.length > 0}
  <div class="product-grid">
    {#each data.products as product (product.id)}
      <ProductCard {product} />
    {/each}
  </div>
{:else}
  <p class="empty">No products in this category yet.</p>
{/if}

<script>
  let { data } = $props();
</script>

<h1>Shop by Brand</h1>

<ul class="brand-list">
  {#each data.brands as brand (brand.id)}
    <li>
      <a href={`/brands/${brand.slug}`} class="brand-link">
        <span class="brand-name">{brand.name}</span>
        <span class="brand-desc">{brand.description}</span>
      </a>
    </li>
  {/each}
</ul>

<script>
  let { data } = $props();
</script>

<h1>Shop by Category</h1>

<ul class="category-list">
  {#each data.categories as category (category.id)}
    <li>
      <a href={`/categories/${category.slug}`} class="category-link">
        <span class="category-name">{category.name}</span>
        <span class="category-desc">{category.description}</span>
      </a>
    </li>
  {/each}
</ul>

<script>
  let { data } = $props();
  import { invalidateAll } from '$app/navigation';
  import { enhance } from '$app/forms';

  let editingProduct = $state(null);
  let name = $state('');
  let price = $state('');
  let stock = $state('');
  let errorMessage = $state('');

  function startEdit(product) {
    editingProduct = product.id;
    name = product.name;
    price = String(product.price);
    stock = String(product.stock);
  }

  async function saveEdit(id) {
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, price: Number(price), stock: Number(stock) }),
      });
      if (!res.ok) {
        errorMessage = 'Failed to update product.';
        return;
      }
      editingProduct = null;
      await invalidateAll();
    } catch (err) {
      errorMessage = 'Error updating product.';
      console.error(err);
    }
  }

  async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        errorMessage = 'Failed to delete product.';
        return;
      }
      await invalidateAll();
    } catch (err) {
      errorMessage = 'Error deleting product.';
      console.error(err);
    }
  }
</script>

<h1>Manage Products</h1>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}

<h2>Add New Product</h2>
<form class="admin-form" method="POST" action="?/create" use:enhance={() => {
  return async ({ result }) => {
    if (result.type === 'success') await invalidateAll();
  };
}}>
  <input name="name" placeholder="Product name" required />
  <input name="price" type="number" placeholder="Price (KES)" required min="0" step="1" />
  <input name="stock" type="number" placeholder="Stock" required min="0" />
  <select name="category_id" required>
    <option value="">Select category</option>
    {#each data.categories ?? [] as cat}
      <option value={cat.id}>{cat.name}</option>
    {/each}
  </select>
  <select name="brand_id">
    <option value="">Select brand (optional)</option>
    {#each data.brands ?? [] as brand}
      <option value={brand.id}>{brand.name}</option>
    {/each}
  </select>
  <button type="submit">Add Product</button>
</form>

<table class="admin-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each data.products as product (product.id)}
      <tr>
        <td>
          {#if editingProduct === product.id}
            <input bind:value={name} />
          {:else}
            {product.name}
          {/if}
        </td>
        <td>
          {#if editingProduct === product.id}
            <input type="number" bind:value={price} step="1" min="0" />
          {:else}
            KES {product.price}
          {/if}
        </td>
        <td>
          {#if editingProduct === product.id}
            <input type="number" bind:value={stock} min="0" />
          {:else}
            {product.stock}
          {/if}
        </td>
        <td>
          {#if editingProduct === product.id}
            <button onclick={() => saveEdit(product.id)}>Save</button>
            <button onclick={() => (editingProduct = null)}>Cancel</button>
          {:else}
            <button onclick={() => startEdit(product)}>Edit</button>
            <button onclick={() => deleteProduct(product.id)} class="btn-delete">Delete</button>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

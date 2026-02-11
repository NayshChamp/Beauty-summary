<script>
  let { form } = $props();
</script>

<section class="auth-page">
  <h1>Welcome back to Beauty Summary</h1>
  <p class="auth-subtitle">Sign in to manage your cart and orders.</p>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form method="POST" class="auth-form">
    <label>
      Name
      <input name="name" type="text" required value={form?.name ?? ''} />
    </label>
    <label>
      Email
      <input name="email" type="email" required value={form?.email ?? ''} />
    </label>
    <button type="submit" class="btn-auth">Login</button>
  </form>
  <p class="auth-subtitle">
    New here?
    <a href="/signup" class="auth-link">Create an account</a>
  </p>
</section>


<script>
  let { form } = $props();
</script>

<section class="auth-page">
  <h1>Create your Beauty Summary account</h1>
  <p class="auth-subtitle">Sign up to start saving your favourites and orders.</p>

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
    <button type="submit" class="btn-auth">Sign up</button>
  </form>
</section>


<script>
  import { page } from '$app/stores';
</script>

<div class="error-page">
  <h1>{$page.status ?? 500}</h1>
  <p>{$page.error?.message ?? 'Something went wrong'}</p>
  <a href="/">Return Home</a>
</div>

<style>
  .error-page {
    text-align: center;
    padding: 4rem 2rem;
  }
  .error-page h1 {
    font-size: 4rem;
    margin: 0 0 0.5rem;
    color: var(--accent-deep);
  }
  .error-page p {
    color: var(--text-muted);
    margin: 0 0 1.5rem;
  }
  .error-page a {
    color: var(--accent-deep);
    font-weight: 500;
  }
</style>

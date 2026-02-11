<script>
  import '../app.css';
  import { page } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';
  import Toast from '$lib/components/Toast.svelte';

  let { children } = $props();
  const path = $derived($page.url.pathname);
  const user = $derived($page.data.user);
</script>

<Toast />
<nav class="navbar">
  <ul>
    <li class:active={path === '/'}>
      <a href="/" class="brand">
        <img
          src="/beauty-summary-logo.png"
          alt="Beauty Summary - Limited Edition Collection"
          class="brand-logo"
        />
        <span class="sr-only">Beauty Summary</span>
      </a>
    </li>
    <li class:active={path.startsWith('/products')}>
      <a href="/products">Products</a>
    </li>
    <li class:active={path.startsWith('/categories')}>
      <a href="/categories">Categories</a>
    </li>
    <li class:active={path.startsWith('/brands')}>
      <a href="/brands">Brands</a>
    </li>
    <li class:active={path.startsWith('/admin')}>
      <a href="/admin/products">Admin</a>
    </li>
    <li class="nav-spacer"></li>
    <li class:active={path.startsWith('/cart')}>
      <a href="/cart" class="cart-link">
        <span class="cart-icon" aria-hidden="true"></span>
        <span>Cart</span>
      </a>
    </li>
    {#if user}
      <li class="auth-item">
        <span class="auth-name">Hi, {user.name}</span>
        <form method="POST" action="/logout">
          <button type="submit" class="auth-link">Logout</button>
        </form>
      </li>
    {:else}
      <li class:active={path.startsWith('/login')}>
        <a href="/login" class="auth-link">Login</a>
      </li>
      <li class:active={path.startsWith('/signup')}>
        <a href="/signup" class="auth-link">Sign up</a>
      </li>
    {/if}
  </ul>
</nav>

<main>
  {@render children()}
</main>
<Footer />

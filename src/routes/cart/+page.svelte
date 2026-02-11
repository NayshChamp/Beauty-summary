<script>
  let { data } = $props();
  import { invalidateAll } from '$app/navigation';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/stores/toast.js';

  const cartItems = $derived(data.cart);
  const total = $derived(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));

  let showMpesa = $state(false);
  let phone = $state('');
  let processing = $state(false);
  let mpesaStatus = $state(''); // 'pending' | 'success' | 'error'

  async function updateQuantity(product_id, newQty) {
    if (newQty < 1) {
      await removeItem(product_id);
      return;
    }
    const res = await fetch('/API/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, quantity: newQty }),
    });
    if (res.ok) await invalidateAll();
  }

  async function removeItem(product_id) {
    const res = await fetch('/API/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id }),
    });
    if (res.ok) await invalidateAll();
  }

  function openMpesaModal() {
    showMpesa = true;
    mpesaStatus = '';
    phone = '';
  }

  function closeMpesaModal() {
    if (!processing) {
      showMpesa = false;
    }
  }

  async function confirmMpesaPay() {
    const ph = phone.replace(/\D/g, '');
    if (ph.length < 9) {
      mpesaStatus = 'Please enter a valid M-Pesa phone number (e.g. 0712345678)';
      return;
    }
    processing = true;
    mpesaStatus = 'pending';
    try {
      const res = await fetch('/API/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total, phone: ph }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        mpesaStatus = 'success';
        await new Promise((r) => setTimeout(r, 1500));
        await invalidateAll();
        showMpesa = false;
        toast.show('Thank you for your purchase and your loyalty.', 'success');
        goto('/');
      } else {
        mpesaStatus = json.error || 'Payment failed. Please try again.';
      }
    } catch (err) {
      mpesaStatus = 'Network error. Please try again.';
    } finally {
      processing = false;
    }
  }
</script>

<h1>Your Cart</h1>

{#if cartItems.length > 0}
  <div class="cart-items">
    {#each cartItems as item (item.product_id)}
      <div class="cart-item">
        <img src={item.image_url} alt={item.name} class="cart-image" />
        <div class="cart-info">
          <h3>{item.name}</h3>
          <p class="cart-price">KES {item.price.toLocaleString()}</p>
          <div class="qty-controls">
            <button onclick={() => updateQuantity(item.product_id, item.quantity - 1)} aria-label="Decrease">−</button>
            <span class="qty">{item.quantity}</span>
            <button onclick={() => updateQuantity(item.product_id, item.quantity + 1)} aria-label="Increase">+</button>
          </div>
        </div>
        <p class="item-total">KES {(item.price * item.quantity).toLocaleString()}</p>
        <button class="btn-remove" onclick={() => removeItem(item.product_id)}>Remove</button>
      </div>
    {/each}
  </div>
  <div class="cart-footer">
    <p class="grand-total">Total: KES {total.toLocaleString()}</p>
    <button class="btn-checkout" onclick={openMpesaModal}>Pay with M-Pesa (Sandbox)</button>
  </div>

  {#if showMpesa}
    <div class="modal-overlay" onclick={closeMpesaModal} role="button" tabindex="0" onkeydown={(e) => e.key === 'Escape' && closeMpesaModal()}>
      <div class="modal-mpesa" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-labelledby="mpesa-title" tabindex="-1">
        <h2 id="mpesa-title">M-Pesa Checkout (Sandbox)</h2>
        <p class="modal-total">Amount: KES {total.toLocaleString()}</p>
        <p class="modal-hint">Enter your M-Pesa phone number. In sandbox mode, any number works.</p>
        <input
          type="tel"
          placeholder="07XX XXX XXX"
          bind:value={phone}
          class="modal-input"
          disabled={processing}
        />
        {#if mpesaStatus === 'pending'}
          <div class="mpesa-pending">
            <span class="spinner"></span>
            <p>Simulating STK Push... Check your phone</p>
          </div>
        {:else if mpesaStatus === 'success'}
          <div class="mpesa-success">✓ Payment successful!</div>
        {:else if mpesaStatus && mpesaStatus !== 'pending'}
          <p class="mpesa-error">{mpesaStatus}</p>
        {/if}
        <div class="modal-actions">
          <button class="btn-cancel" onclick={closeMpesaModal} disabled={processing}>Cancel</button>
          <button class="btn-confirm" onclick={confirmMpesaPay} disabled={processing}>
            {processing ? 'Processing...' : 'Pay KES ' + total.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  {/if}
{:else}
  <p class="cart-empty">Your cart is empty. <a href="/products">Browse products</a></p>
{/if}

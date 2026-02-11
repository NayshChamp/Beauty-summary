<script>
  import { toast } from '$lib/stores/toast.js';
</script>

{#if $toast}
  <div class="toast toast-{$toast.type}" role="alert">
    {$toast.message}
  </div>
{/if}

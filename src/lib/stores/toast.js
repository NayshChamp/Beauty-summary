import { writable } from 'svelte/store';

function createToast() {
  const { subscribe, set } = writable(null);

  return {
    subscribe,
    show: (message, type = 'success') => {
      set({ message, type });
      setTimeout(() => set(null), 3000);
    },
    clear: () => set(null),
  };
}

export const toast = createToast();

<script>
  import { slide } from 'svelte/transition';

  // Svelte 5 props
  let { isDarkMode = $bindable(true), scrollProgress = 0 } = $props();

  let isMobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
  <nav class="container max-w-6xl flex items-center justify-between py-4">
    
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 font-extrabold tracking-tight text-slate-950 dark:text-white hover:opacity-85 transition">
      <span class="text-base tracking-wide">Leonardo Pool</span>
    </a>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex items-center gap-8 text-sm font-medium">
      <li><a href="/blog#top" class="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition">Inicio</a></li>
      <li><a href="/blog#popular" class="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition">Temas</a></li>
      <li><a href="/blog#editors" class="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition">Selección del editor</a></li>
    </ul>

    <!-- Right Icons / Actions -->
    <div class="flex items-center gap-4">
      <!-- Social Icons -->
      <div class="hidden sm:flex items-center gap-3">
        <a aria-label="GitHub" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition" href="https://github.com">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5A12 12 0 0 0 0 12.6c0 5.3 3.4 9.7 8.2 11.3.6.1.8-.3.8-.6v-2c-3.3.7-4-1.5-4-1.5-.6-1.5-1.5-2-1.5-2-1.2-.8 0-.8 0-.8 1.3.1 2 .9 2 .9 1.2 2 3.2 1.4 4 .9.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.7.1-3.5 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.3-1.6 3.4-1.3 3.4-1.3.7 1.8.3 3.2.2 3.5.8.9 1.2 2 1.2 3.4 0 4.8-2.8 5.9-5.6 6.2.5.4.9 1.2.9 2.5v3.8c0 .3.2.7.8.6A12 12 0 0 0 24 12.6 12 12 0 0 0 12 .5z"/></svg>
        </a>
        <a aria-label="Twitter" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition" href="https://x.com">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 4.8c-.8.4-1.7.7-2.6.8a4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.8 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 3 3.8a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.5v.1a4.5 4.5 0 0 0 3.6 4.4 4.6 4.6 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 2 19a12.7 12.7 0 0 0 6.9 2c8.3 0 12.9-6.9 12.9-12.9v-.6A9 9 0 0 0 23 4.8z"/></svg>
        </a>
      </div>

      <!-- Theme Toggle -->
      <button 
        onclick={() => isDarkMode = !isDarkMode} 
        class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-amber-400 transition" 
        aria-label="Alternar modo oscuro/claro"
      >
        {#if isDarkMode}
          <!-- Sun -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        {:else}
          <!-- Moon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <!-- Mobile menu button -->
      <button 
        onclick={() => isMobileMenuOpen = !isMobileMenuOpen} 
        class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition" 
        aria-label="Abrir menú"
      >
        {#if isMobileMenuOpen}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        {/if}
      </button>
    </div>
  </nav>

  <!-- Reading progress indicator -->
  <div class="h-0.5 w-full bg-slate-100 dark:bg-slate-900">
    <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-75" style="width: {scrollProgress}%"></div>
  </div>

  <!-- Mobile Navigation Drawer -->
  {#if isMobileMenuOpen}
    <div transition:slide class="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div class="container py-4 flex flex-col gap-3 text-sm font-medium">
        <a onclick={() => isMobileMenuOpen = false} class="block py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition" href="/blog#top">Inicio</a>
        <a onclick={() => isMobileMenuOpen = false} class="block py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition" href="/blog#popular">Temas</a>
        <a onclick={() => isMobileMenuOpen = false} class="block py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition" href="/blog#editors">Editor’s Pick</a>
        <div class="flex gap-4 pt-3 border-t border-slate-100 dark:border-slate-900 mt-2">
          <a aria-label="GitHub" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" href="https://github.com"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5A12 12 0 0 0 0 12.6c0 5.3 3.4 9.7 8.2 11.3.6.1.8-.3.8-.6v-2c-3.3.7-4-1.5-4-1.5-.6-1.5-1.5-2-1.5-2-1.2-.8 0-.8 0-.8 1.3.1 2 .9 2 .9 1.2 2 3.2 1.4 4 .9.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.7.1-3.5 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.3-1.6 3.4-1.3 3.4-1.3.7 1.8.3 3.2.2 3.5.8.9 1.2 2 1.2 3.4 0 4.8-2.8 5.9-5.6 6.2.5.4.9 1.2.9 2.5v3.8c0 .3.2.7.8.6A12 12 0 0 0 24 12.6 12 12 0 0 0 12 .5z"/></svg></a>
          <a aria-label="Twitter" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" href="https://x.com"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 4.8c-.8.4-1.7.7-2.6.8a4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.8 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 3 3.8a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.5v.1a4.5 4.5 0 0 0 3.6 4.4 4.6 4.6 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 2 19a12.7 12.7 0 0 0 6.9 2c8.3 0 12.9-6.9 12.9-12.9v-.6A9 9 0 0 0 23 4.8z"/></svg></a>
        </div>
      </div>
    </div>
  {/if}
</header>

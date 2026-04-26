<script>
  import { activePage } from '$lib/store.js';
  import About from '$lib/about.svelte';
  import Resume from '$lib/resume.svelte';
  import Portfolio from '$lib/portfolio.svelte';
  import Blog from '$lib/blog.svelte';
  import Contact from '$lib/contact.svelte';
</script>

{#if $activePage === 'about'}
  <About />
{:else if $activePage === 'resume'}
  <Resume />
{:else if $activePage === 'portfolio'}
  <Portfolio />
{:else if $activePage === 'blog'}
  <Blog />
{:else if $activePage === 'contact'}
  <Contact />
{/if}

<script>
  import { activePage } from '$lib/store.js';

  const pages = [
    { name: 'about', text: 'Sobre mi' },
    { name: 'resume', text: 'Currículum' },
    { name: 'portfolio', text: 'Portafolio' },
    { name: 'blog', text: 'Blog' },
    { name: 'contact', text: 'Contacto' }
  ];
</script>

<nav class="navbar">
  <ul class="navbar-list">
    {#each pages as page}
      <li class="navbar-item">
        <button
          class="navbar-link"
          class:active={$activePage === page.name}
          on:click={() => activePage.set(page.name)}
        >
          {page.text}
        </button>
      </li>
    {/each}
  </ul>
</nav>
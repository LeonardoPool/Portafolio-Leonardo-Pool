<script>
  import { activePage } from '$lib/store.js';
  import { spring } from 'svelte/motion';

  const pages = [
    { name: 'about', text: 'Sobre mi' },
    { name: 'resume', text: 'Currículum' },
    { name: 'portfolio', text: 'Portafolio' },
    { name: 'blog', text: 'Blog' },
    { name: 'documentacion', text: 'Documentación' },
    { name: 'contact', text: 'Contacto' }
  ];

  // Create a single spring store for the array of scale factors
  const scales = spring(pages.map(() => 1.0), { stiffness: 0.15, damping: 0.8 });

  let panelEl;

  function handleMouseMove(e) {
    if (!panelEl) return;
    const mouseX = e.clientX;
    const distance = 150; // Distance of influence in pixels
    const maxScale = 1.35; // Maximum magnification scale

    const newScales = pages.map((page, i) => {
      const button = panelEl.children[i];
      if (!button) return 1.0;
      const rect = button.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const dist = mouseX - centerX;
      const absDist = Math.abs(dist);

      let targetScale = 1.0;
      if (absDist < distance) {
        const t = 1 - absDist / distance;
        targetScale = 1.0 + (maxScale - 1.0) * t;
      }
      return targetScale;
    });

    scales.set(newScales);
  }

  function handleMouseLeave() {
    scales.set(pages.map(() => 1.0));
  }
</script>

<nav class="navbar" aria-label="Menú de navegación">
  <div
    class="dock-panel"
    bind:this={panelEl}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    role="toolbar"
    tabindex="-1"
  >
    {#each pages as page, i}
      <button
        class="dock-item"
        class:active={$activePage === page.name}
        style="--scale: {$scales[i]}"
        on:click={() => activePage.set(page.name)}
      >
        {page.text}
      </button>
    {/each}
  </div>
</nav>

<style>
  .dock-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 8px 16px;
    width: max-content;
    min-width: 100%;
    margin: auto;
  }

  .dock-item {
    position: relative;
    background: transparent;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    color: var(--light-gray);
    font-size: var(--fs-8);
    font-family: var(--ff-poppins);
    font-weight: var(--fw-400);
    cursor: pointer;
    outline: none;
    transition: color 0.2s ease, background-color 0.2s ease;
    transform-origin: bottom center;
    transform: scale(var(--scale, 1));
    will-change: transform;
  }

  @media (max-width: 580px) {
    .dock-panel {
      gap: 6px;
      padding: 8px 12px;
    }

    .dock-item {
      padding: 6px 10px;
    }
  }

  /* On desktop, since the navbar is at the top right of the card, we scale from the top center */
  @media (min-width: 1024px) {
    .dock-item {
      transform-origin: top center;
      font-weight: var(--fw-500);
    }
  }

  .dock-item.active {
    color: var(--orange-yellow-crayola);
    background-color: var(--onyx);
  }

  .dock-item:hover {
    color: var(--white-1);
  }
</style>
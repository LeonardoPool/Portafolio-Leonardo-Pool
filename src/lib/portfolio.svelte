<script>
  import { activePage } from '$lib/store.js';

  import destImg from '../assets/images/Web/Destlanding.png';
  import gmtImg from '../assets/images/Web/GMTlanding.png';
  import motorImg from '../assets/images/Web/Motor.png';
  import tallerImg from '../assets/images/Web/taller.png';
  import BorderGlow from './BorderGlow.svelte';

  let selectedCategory = 'Web development';

  const filterButtons = ['Web development'];

  const projects = [
    {
      category: 'Web development',
      image: tallerImg,
      alt: 'sistema de gestion de taller',
      title: 'Sistema de Gestión de Taller',
      href: '#'
    },
    {
      category: 'Web development',
      image: gmtImg,
      alt: 'gmt landing page',
      title: 'GMT Landing Page',
      href: 'https://www.gmtmayorista.com/'
    },
    {
      category: 'Web development',
      image: destImg,
      alt: 'Landing Page Destpoint',
      title: 'Landing Page Destpoint',
      href: 'https://destpoint-landing.vercel.app/'
    },
    {
      category: 'Web development',
      image: motorImg,
      alt: 'motor de reservas',
      title: 'Motor de Reservas',
      href: 'https://search-engine-gmt.vercel.app/'
    },
  ];

  $: filteredProjects = projects.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  function setCategory(category) {
    selectedCategory = category;
  }
</script>

<article class="portfolio" data-page="portfolio" class:active={$activePage === 'portfolio'}>

  <header>
    <h2 class="h2 article-title">Portfolio</h2>
  </header>

  <section class="projects">

    <ul class="filter-list">
      {#each filterButtons as category}
        <li class="filter-item">
          <button
            class:active={selectedCategory === category}
            on:click={() => setCategory(category)}
          >
            {category}
          </button>
        </li>
      {/each}
    </ul>

    <div class="filter-select-box">
      <select class="filter-select" on:change={(e) => setCategory(e.currentTarget.value)}>
        {#each filterButtons as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>

    <ul class="project-list">
      {#each filteredProjects as project}
        <li class="project-item active" data-category={project.category}>
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="45 100% 72%"
              backgroundColor="#1e1e1f"
              borderRadius={16}
              glowRadius={25}
              glowIntensity={0.8}
              coneSpread={20}
              colors={['#f5c26b', '#ebaa38', '#fce2a6']}
              style="margin-bottom: 15px; width: 100%;"
            >
              <figure class="project-img" style="margin-bottom: 0; width: 100%; height: 100%;">
                <div class="project-item-icon-box">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img src={project.image} alt={project.alt} loading="lazy" />
              </figure>
            </BorderGlow>
            <h3 class="project-title">{project.title}</h3>
            <p class="project-category">{project.category}</p>
          </a>
        </li>
      {/each}
    </ul>

  </section>

</article>
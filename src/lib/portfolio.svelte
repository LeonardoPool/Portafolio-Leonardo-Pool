<script>
  import { activePage } from '$lib/store.js';

  import project1 from '../assets/images/project-1.jpg';
  import project2 from '../assets/images/project-2.png';
  import project3 from '../assets/images/project-3.jpg';
  import project4 from '../assets/images/project-4.png';
  import project5 from '../assets/images/project-5.png';
  import project6 from '../assets/images/project-6.png';
  import project7 from '../assets/images/project-7.png';
  import project8 from '../assets/images/project-8.jpg';
  import project9 from '../assets/images/project-9.png';

  let selectedCategory = 'All';

  const filterButtons = ['All', 'Web design', 'Applications', 'Web development'];

  const projects = [
    {
      category: 'Web development',
      image: project1,
      alt: 'finance',
      title: 'Finance',
    },
    {
      category: 'Web development',
      image: project2,
      alt: 'orizon',
      title: 'Orizon',
    },
    {
      category: 'Web design',
      image: project3,
      alt: 'fundo',
      title: 'Fundo',
    },
    {
      category: 'Applications',
      image: project4,
      alt: 'brawlhalla',
      title: 'Brawlhalla',
    },
    {
      category: 'Web design',
      image: project5,
      alt: 'dsm.',
      title: 'DSM.',
    },
    {
      category: 'Web design',
      image: project6,
      alt: 'metaspark',
      title: 'MetaSpark',
    },
    {
      category: 'Web development',
      image: project7,
      alt: 'summary',
      title: 'Summary',
    },
    {
      category: 'Applications',
      image: project8,
      alt: 'task manager',
      title: 'Task Manager',
    },
    {
      category: 'Web development',
      image: project9,
      alt: 'arrival',
      title: 'Arrival',
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
          <div>
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
              <img src={project.image} alt={project.alt} loading="lazy" />
            </figure>
            <h3 class="project-title">{project.title}</h3>
            <p class="project-category">{project.category}</p>
          </div>
        </li>
      {/each}
    </ul>

  </section>

</article>
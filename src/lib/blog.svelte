<script>
  import { activePage } from '$lib/store.js';

  import blog1 from '../assets/images/blog-1.jpg';
  import blog2 from '../assets/images/blog-2.jpg';
  import blog3 from '../assets/images/blog-3.jpg';
  import blog4 from '../assets/images/blog-4.jpg';
  import blog5 from '../assets/images/blog-5.jpg';
  import blog6 from '../assets/images/blog-6.jpg';

  const blogs = [
    {
      href: "https://dev.to/azure/10-github-repos-to-become-a-10x-developer-2l5l",
      image: blog1,
      alt: "10 GitHub Repos to Become a 10x Developer",
      category: "Desarrollo",
      date: "2022-02-23",
      title: "10 GitHub Repos to Become a 10x Developer",
      text: "Repositorios de GitHub que te ayudarán a convertirte en un mejor desarrollador."
    },
    {
      href: "https://dev.to/theguardians/15-free-resources-to-learn-ethical-hacking-in-2024-443p",
      image: blog2,
      alt: "15 Free Resources to Learn Ethical Hacking in 2024",
      category: "Hacking",
      date: "2022-02-23",
      title: "15 Free Resources to Learn Ethical Hacking in 2024",
      text: "Recursos gratuitos para aprender Hacking Ético en 2024."
    },
    {
      href: "https://dev.to/coderamrin/top-10-programming-languages-to-learn-in-2024-mbj",
      image: blog3,
      alt: "Top 10 Programming Languages to Learn in 2024",
      category: "Lenguajes",
      date: "2022-02-23",
      title: "Top 10 Programming Languages to Learn in 2024",
      text: "Los 10 mejores lenguajes de programación para aprender en 2024."
    },
    {
      href: "https://dev.to/aws-builders/aws-amplify-hosting-now-supports-automatic-subdomain-creation-for-your-branches-3355",
      image: blog4,
      alt: "AWS Amplify Hosting Now Supports Automatic Subdomain Creation",
      category: "AWS",
      date: "2022-02-23",
      title: "AWS Amplify Hosting Now Supports Automatic Subdomain Creation",
      text: "Creación automática de subdominios para tus ramas en AWS Amplify Hosting."
    },
    {
      href: "https://dev.to/bhaumikm/this-is-how-you-can-get-rid-of-if-else-statements-538a",
      image: blog5,
      alt: "This Is How You Can Get Rid of If-Else Statements",
      category: "Código Limpio",
      date: "2022-02-23",
      title: "This Is How You Can Get Rid of If-Else Statements",
      text: "Cómo deshacerte de las sentencias if-else y escribir código más limpio."
    },
    {
      href: "https://dev.to/wasp/7-projects-you-can-build-to-learn-a-new-programming-language-4o5l",
      image: blog6,
      alt: "7 Projects You Can Build to Learn a New Programming Language",
      category: "Proyectos",
      date: "2022-02-23",
      title: "7 Projects You Can Build to Learn a New Programming Language",
      text: "7 proyectos que puedes construir para aprender un nuevo lenguaje de programación."
    }
  ];
</script>

<article class="blog" data-page="blog" class:active={$activePage === 'blog'}>

  <header class="blog-header-section">
    <h2 class="h2 article-title">Blog</h2>
    
    <!-- Premium Promo Card for the new Svelte Blog -->
    <div class="lens-promo-card">
      <div class="lens-promo-glow"></div>
      <div class="lens-promo-content">
        <div class="lens-badge">NUEVO</div>
        <h3 class="lens-title">Mi Blog Técnico</h3>
        <p class="lens-description">
          ¡He rediseñado y migrado mi blog a Svelte! Visita mi nuevo espacio interactivo con buscador en tiempo real, filtros dinámicos, modo oscuro y visor de lectura inmersivo.
        </p>
        <a href="/blog" class="lens-action-btn">
          <span>Explorar Blog Técnico</span>
          <ion-icon name="rocket-outline"></ion-icon>
        </a>
      </div>
    </div>
  </header>

  <section class="blog-posts">
    <h3 class="h3 section-subtitle">Publicaciones Externas</h3>
    <ul class="blog-posts-list">
      {#each blogs as blog}
        <li class="blog-post-item">
          <a href={blog.href} target="_blank" rel="noopener noreferrer">
            <figure class="blog-banner-box">
              <img src={blog.image} alt={blog.alt} loading="lazy">
            </figure>

            <div class="blog-content">
              <div class="blog-meta">
                <p class="blog-category">{blog.category}</p>
                <span class="dot"></span>
                <time datetime={blog.date}>{new Date(blog.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              </div>
              <h3 class="h3 blog-item-title">{blog.title}</h3>
              <p class="blog-text">{blog.text}</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</article>

<style>
  .blog-header-section {
    margin-bottom: 30px;
  }

  .section-subtitle {
    margin-bottom: 20px;
    color: var(--white-2);
    font-size: var(--fs-3);
  }

  /* Lens Promo Banner Style */
  .lens-promo-card {
    position: relative;
    margin-top: 25px;
    padding: 24px;
    border-radius: 16px;
    background: var(--border-gradient-onyx);
    border: 1px solid var(--jet);
    overflow: hidden;
    z-index: 1;
    box-shadow: var(--shadow-3);
  }

  .lens-promo-card::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: var(--bg-gradient-jet);
    border-radius: inherit;
    z-index: -1;
  }

  .lens-promo-glow {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, hsla(45, 100%, 72%, 0.15) 0%, transparent 70%);
    filter: blur(20px);
    pointer-events: none;
    z-index: 0;
  }

  .lens-promo-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .lens-badge {
    background: var(--text-gradient-yellow);
    color: var(--smoky-black);
    font-size: 10px;
    font-weight: var(--fw-600);
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }

  .lens-title {
    color: var(--white-1);
    font-size: var(--fs-2);
    font-weight: var(--fw-600);
    margin-bottom: 8px;
    font-family: var(--ff-poppins);
  }

  .lens-description {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.5;
    margin-bottom: 16px;
    max-width: 90%;
  }

  .lens-action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--text-gradient-yellow);
    color: var(--smoky-black);
    padding: 10px 20px;
    border-radius: 10px;
    font-size: var(--fs-6);
    font-weight: var(--fw-600);
    transition: var(--transition-1);
    box-shadow: 0 4px 12px rgba(253, 211, 80, 0.2);
  }

  .lens-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(253, 211, 80, 0.35);
    filter: brightness(1.05);
  }

  .lens-action-btn ion-icon {
    font-size: 16px;
  }
</style>

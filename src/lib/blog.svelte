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

  <header>
    <h2 class="h2 article-title">Blog</h2>
  </header>

  <section class="blog-posts">

    <ul class="blog-posts-list">

      {#each blogs as blog}
        <li class="blog-post-item">
          <a href={blog.href}>
            <figure class="blog-banner-box">
              <img src={blog.image} alt={blog.alt} loading="lazy">
            </figure>

            <div class="blog-content">
              <div class="blog-meta">
                <p class="blog-category">{blog.category}</p>
                <span class="dot"></span>
                <time datetime={blog.date}>{new Date(blog.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
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

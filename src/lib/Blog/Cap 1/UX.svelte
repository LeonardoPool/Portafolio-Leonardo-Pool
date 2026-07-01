<script>
  import { onMount } from 'svelte';
  import Header from '../Header.svelte';
  import cubesImg from '../../../assets/images/cubes-2492013.jpg';
  import sampleImg from '../../../assets/images/sample 2.jpg';

  // State
  let isDarkMode = $state(true);
  let scrollProgress = $state(0);
  let readTime = $state('8 min');
  let copiedText = $state('Copiar enlace');

  // Monitor scroll for reading progress
  function handleScroll() {
    const article = document.getElementById('article');
    if (!article) return;
    const total = article.offsetHeight - window.innerHeight + 200;
    const scrolled = Math.min(Math.max((window.scrollY - article.offsetTop + 100), 0), total);
    scrollProgress = total > 0 ? (scrolled / total) * 100 : 0;
  }

  // Copy article link to clipboard
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copiedText = '¡Copiado!';
      setTimeout(() => {
        copiedText = 'Copiar enlace';
      }, 1500);
    } catch {
      alert('No se pudo copiar el enlace');
    }
  }

  // Estimate reading time dynamically
  onMount(() => {
    const savedTheme = localStorage.getItem('blog-theme');
    if (savedTheme === 'light') {
      isDarkMode = false;
    } else if (savedTheme === 'dark') {
      isDarkMode = true;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const text = document.getElementById('article')?.innerText || '';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 220));
    readTime = minutes + ' min';

    return () => window.removeEventListener('scroll', handleScroll);
  });

  // Persist theme changes
  $effect(() => {
    localStorage.setItem('blog-theme', isDarkMode ? 'dark' : 'light');
  });
</script>

<div class:dark={isDarkMode} class="font-sans antialiased min-h-screen transition-colors duration-300">
  <div class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
    
    <!-- Shared Blog Header -->
    <Header bind:isDarkMode={isDarkMode} scrollProgress={scrollProgress} />

    <!-- Hero Section -->
    <section class="w-full relative overflow-hidden">
      <div class="absolute inset-0 bg-slate-950/40 z-10"></div>
      <img class="hero-img w-full object-cover" src={cubesImg} alt="Cubes background" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent z-15"></div>
      <div class="absolute inset-0 flex items-center z-20">
        <div class="container max-w-5xl px-4">
          <div class="max-w-2xl text-white">
            <div class="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
              <span class="px-2 py-1 rounded bg-white/10 ring-1 ring-white/20">Destacado</span>
              <span class="opacity-80">Percepción</span>
            </div>
            <h1 class="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              La importancia de la percepción en el diseño web - Colores
            </h1>
            <p class="mt-2 text-white/90 text-sm sm:text-base leading-relaxed">
              Fotografía computacional, perfiles de color y trucos para un look realista.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Meta + Cuerpo -->
    <main class="container max-w-5xl pb-16">
      <article id="article" class="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
        
        <!-- Meta lateral (en desktop va a la izquierda) -->
        <aside class="lg:col-span-3 order-1 lg:order-none text-slate-500 dark:text-slate-400">
          <ul class="text-xs space-y-2 border-l border-slate-200 dark:border-slate-800 pl-4 py-1">
            <li>Fecha: <span class="font-semibold text-slate-800 dark:text-slate-200">08.03.2025</span></li>
            <li>Lectura: <span class="font-semibold text-slate-800 dark:text-slate-200">{readTime}</span></li>
          </ul>
        </aside>

        <!-- Contenido -->
        <div class="lg:col-span-9 order-2 lg:order-none">
          <div class="leading-relaxed text-[15px] md:text-[16px] text-slate-700 dark:text-slate-300 space-y-6">
            <p>
              El diseño web es mucho más que organizar elementos en una pantalla. Se trata de transmitir <strong>emociones</strong> y generar <strong>confianza</strong>, guiar al usuario a través de una experiencia visualmente coherente. Uno de los factores más influyentes en esta percepción es la elección de la paleta de colores.
            </p>
            <p>
              Como señala Hallock (2003), <em>“el color es un lenguaje visual que comunica más rápido que las palabras”</em>. En el entorno digital, donde los usuarios deciden en segundos si permanecer o abandonar un sitio, esta afirmación cobra aún más relevancia.
            </p>

            <!-- Galería 2 columnas -->
            <div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <figure class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm">
                <img class="w-full object-cover rounded-t-2xl aspect-[4/3]" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop" alt="Detalle de cámara" />
                <figcaption class="p-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                  EXIF/LUTs: expón anclas y no sacrifiques espacios de color.
                </figcaption>
              </figure>
              <figure class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm">
                <img class="w-full object-cover rounded-t-2xl aspect-[4/3]" src={sampleImg} alt="Ventana y planta" />
                <figcaption class="p-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                  White balance consistente y matching de iluminación.
                </figcaption>
              </figure>
            </div>

            <blockquote class="my-8 border-l-4 border-amber-500 pl-4 text-amber-800 dark:text-amber-400 text-lg italic bg-amber-500/5 py-4 pr-4 rounded-r-xl">
              “Monotonectally seize superior mindshare rather than efficient technology.”
            </blockquote>

            <p>
              Define un <strong>lookbook</strong> con LUTs y límites de exposición para mantener coherencia entre escenas. Documenta UDIMs y normal maps (OpenGL/DirectX) y valida metadatos antes del render final.
            </p>

            <!-- Tags -->
            <div class="mt-8 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <span class="text-xs text-slate-500 dark:text-slate-450 font-semibold">Etiquetas:</span>
              <a href="/blog?tag=rendering" class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 transition">rendering</a>
              <a href="/blog?tag=color" class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 transition">color</a>
              <a href="/blog?tag=diseno" class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 transition">diseño</a>
            </div>

            <!-- Autor + Social -->
            <div class="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-slate-200 dark:border-slate-850 pt-8">
              <div class="flex items-center gap-4">
                <div class="h-12 w-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center font-outfit text-sm">LP</div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white">by Leonardo Pool</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">Desarrollador Web</p>
                </div>
              </div>
              
              <!-- Share buttons -->
              <div class="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                <button 
                  onclick={copyLink} 
                  class="inline-flex items-center gap-2 text-sm hover:text-slate-900 dark:hover:text-white cursor-pointer transition font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 7 0l1 1a5 5 0 1 1-7 7l-1-1"/><path d="M14 11a5 5 0 0 1-7 0l-1-1a5 5 0 1 1 7-7l1 1"/></svg>
                  {copiedText}
                </button>
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/intent/tweet?text=Gran+lectura&url={encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}" aria-label="X" class="hover:text-slate-900 dark:hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.8c-.8.4-1.7.7-2.6.8a4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.8 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 3 3.8a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.5v.1a4.5 4.5 0 0 0 3.6 4.4 4.6 4.6 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 2 19a12.7 12.7 0 0 0 6.9 2c8.3 0 12.9-6.9 12.9-12.9v-.6A9 9 0 0 0 23 4.8z"/></svg>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}" aria-label="Facebook" class="hover:text-slate-900 dark:hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.1C22 6.5 17.5 2 12 2S2 6.5 2 12.1c0 5 3.7 9.1 8.5 9.9v-7H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 3h-2.2V22C18.3 21.2 22 17.1 22 12.1z"/></svg>
                </a>
              </div>
            </div>


          </div>
        </div>
      </article>
    </main>

    <!-- Related Posts -->
    <section class="bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900 py-16 transition-colors">
      <div class="container max-w-5xl">
        <h3 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Publicaciones relacionadas</h3>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          <!-- Related Card 1 -->
          <a href="/blog" class="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img class="card-img w-full transform scale-100 group-hover:scale-[1.05] transition-transform duration-500" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop" alt="" />
            </div>
            <div class="p-4 flex-grow flex flex-col">
              <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">08.02.2025</p>
              <h4 class="mt-2 font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                Time to leave before visiting cave in Germany
              </h4>
            </div>
          </a>

          <!-- Related Card 2 -->
          <a href="/blog" class="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img class="card-img w-full transform scale-100 group-hover:scale-[1.05] transition-transform duration-500" src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop" alt="" />
            </div>
            <div class="p-4 flex-grow flex flex-col">
              <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">08.02.2025</p>
              <h4 class="mt-2 font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                With Smith vibrant work collab with Nata Dana
              </h4>
            </div>
          </a>

          <!-- Related Card 3 -->
          <a href="/blog" class="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img class="card-img w-full transform scale-100 group-hover:scale-[1.05] transition-transform duration-500" src="https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=1600&auto=format&fit=crop" alt="" />
            </div>
            <div class="p-4 flex-grow flex flex-col">
              <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">08.02.2025</p>
              <h4 class="mt-2 font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                La importancia de la percepción en el diseño web - Colores
              </h4>
            </div>
          </a>

        </div>
      </div>
    </section>

  </div>
</div>

<style>
  /* Centrar contenedores */
  .container {
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  /* Resets locales para corregir la ausencia de Preflight en Tailwind */
  ul {
    list-style: none !important;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none !important;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none !important;
    color: inherit;
  }

  button {
    font-family: inherit;
    background: none;
    border: none;
    padding: 0;
  }

  /* Aspect ratios y utilidades del original */
  .card-img { 
    aspect-ratio: 16 / 10; 
    object-fit: cover; 
  }
  
  .hero-img { 
    aspect-ratio: 16 / 6; 
    object-fit: cover; 
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Aplicación segura de fuentes de Google */
  :global(.font-sans) {
    font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
  }

  :global(.font-outfit) {
    font-family: 'Poppins', sans-serif !important;
  }
</style>

<script>
  import { fade, slide, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { onMount } from 'svelte';
  import Header from './Header.svelte';

  // State using Svelte 5 Runes
  let activeCategory = $state('all');
  let searchQuery = $state('');
  let isDarkMode = $state(true);
  let emailInput = $state('');
  let newsletterSubscribed = $state(false);
  let selectedPost = $state(null);
  let scrollProgress = $state(0);
  let showBackToTop = $state(false);

  // Monitor scroll for reading progress and back-to-top button
  function handleScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      scrollProgress = (window.scrollY / totalHeight) * 100;
    }
    showBackToTop = window.scrollY > 400;
  }

  onMount(() => {
    const savedTheme = localStorage.getItem('blog-theme');
    if (savedTheme === 'light') {
      isDarkMode = false;
    } else if (savedTheme === 'dark') {
      isDarkMode = true;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  $effect(() => {
    localStorage.setItem('blog-theme', isDarkMode ? 'dark' : 'light');
  });

  // Categories
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'ai', name: 'AI' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'devops', name: 'DevOps' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'ux', name: 'UX/UI' }
  ];

  // Blog Posts Data
  const blogs = [
    {
      id: 1,
      category: 'ai',
      categoryLabel: 'AI',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1600&auto=format&fit=crop',
      title: 'Crear asistentes con contextos privados y RAG en producción',
      text: 'Del prompt a la realidad: vector DB, chunking, evaluaciones y costos.',
      date: '2026-05-28',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">La implementación de Retrieval-Augmented Generation (RAG) se ha convertido en el estándar de la industria para dotar a los Modelos de Lenguaje Grande (LLMs) de conocimiento privado, actualizado y específico de un dominio sin incurrir en los enormes costos de re-entrenamiento o fine-tuning.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">1. La base de RAG: Chunking y Embeddings</h4>
        <p class="mb-4">El primer paso consiste en segmentar tus documentos en pedazos manejables (chunks). No todos los chunks son iguales: usar divisiones basadas puramente en caracteres suele romper la cohesión semántica. Se recomienda utilizar fragmentadores recursivos que mantengan párrafos u oraciones intactas, con un solapamiento (overlap) de alrededor del 10% al 20%.</p>
        <p class="mb-4">Una vez fragmentado el texto, cada chunk es convertido en un vector numérico denso utilizando modelos de embeddings como text-embedding-3-small de OpenAI o modelos locales basados en HuggingFace. Estos vectores representan el significado semántico del texto.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">2. Base de Datos Vectorial e Indexación</h4>
        <p class="mb-4">Para buscar eficientemente entre millones de vectores en milisegundos, requerimos una base de datos vectorial dedicada. Opciones populares en producción incluyen Pinecone, Supabase (con pgvector), Weaviate y Qdrant. La indexación por proximidad, usando algoritmos como HNSW (Hierarchical Navigable Small World), permite búsquedas veloces de vecinos más cercanos utilizando similitud coseno.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">3. El pipeline de consulta y generación</h4>
        <p class="mb-4">Cuando el usuario hace una pregunta, esta se convierte al vuelo en un embedding. La base de datos vectorial recupera los top-k chunks más similares. Finalmente, estos chunks contextuales se inyectan en el prompt del LLM junto con la pregunta original, instruyendo al modelo a responder estrictamente basándose en la información proporcionada.</p>
      `
    },
    {
      id: 2,
      category: 'frontend',
      categoryLabel: 'Frontend',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1600&auto=format&fit=crop',
      title: 'La importancia de la percepción en el diseño web - Colores',
      text: 'Cómo los colores, formas y sensaciones visuales en un sitio web influyen en la confianza del usuario y en la decisión final de compra.',
      date: '2026-05-24',
      author: 'Leonardo Pool',
      url: '/blog/la-importancia-de-la-percepcion',
      content: `
        <p class="mb-4">El diseño visual no es solo estética; es psicología aplicada. En los primeros 90 segundos de interacción con un producto digital, los usuarios emiten un juicio subconsciente. Entre el 60% y el 90% de esa evaluación inicial se basa únicamente en el color.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">1. Psicología del Color en el Desarrollo de Interfaces</h4>
        <p class="mb-4">Diferentes colores disparan respuestas biológicas y emocionales específicas en el cerebro humano:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Azul:</strong> Transmite confianza, seguridad y estabilidad. Es el color predilecto para bancos, redes sociales e instituciones de salud.</li>
          <li><strong>Rojo:</strong> Evoca urgencia, pasión y excitación. Excelente para llamadas a la acción (CTAs) de liquidación o alertas críticas, pero debe usarse con moderación para evitar fatiga cognitiva.</li>
          <li><strong>Verde:</strong> Relacionado con la naturaleza, el crecimiento y la salud. También se asocia con el éxito financiero y la aprobación ("apto para proceder").</li>
        </ul>
        <h4 class="text-xl font-bold mt-6 mb-3">2. Accesibilidad (WCAG) y Contraste</h4>
        <p class="mb-4">Un diseño premium debe ser inclusivo. La relación de contraste entre el texto y el fondo debe cumplir al menos con el estándar AA de las pautas de accesibilidad para el contenido web (WCAG 2.1), requiriendo una proporción de 4.5:1 para texto normal. El uso de herramientas de diseño con Tailwind facilita la verificación y el cumplimiento de estas guías usando colores contrastantes.</p>
      `
    },
    {
      id: 3,
      category: 'mobile',
      categoryLabel: 'Mobile',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
      title: 'Kotlin + Flutter: cuándo elegir cada stack en apps híbridas',
      text: 'Rendimiento, tiempo de salida y mantenibilidad real.',
      date: '2026-05-18',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">El debate entre desarrollo nativo y frameworks multiplataforma continúa evolucionando. En 2026, la decisión ya no es puramente tecnológica, sino estratégica y de recursos.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">Flutter: El rey de la velocidad de desarrollo</h4>
        <p class="mb-4">Flutter de Google, impulsado por Dart, compila directamente a código nativo de ARM, lo que le da un excelente rendimiento de renderizado gracias a su motor gráfico Impeller. Su mayor fortaleza es la consistencia visual píxel por píxel entre Android e iOS y el maravilloso ciclo de feedback instantáneo con Hot Reload.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">Kotlin Multiplatform (KMP): Lógica compartida, UI Nativa</h4>
        <p class="mb-4">Kotlin Multiplatform ofrece un enfoque diferente. En lugar de compartir la interfaz de usuario, KMP permite compartir la lógica de negocio (red, base de datos local, algoritmos de cálculo) escrita en Kotlin, mientras construyes la UI de forma 100% nativa usando Jetpack Compose en Android y SwiftUI en iOS. Esto preserva la experiencia y el look and feel oficial de cada plataforma sin compromisos de rendimiento.</p>
      `
    },
    {
      id: 4,
      category: 'cloud',
      categoryLabel: 'Cloud',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
      title: 'De Firebase a Supabase: migración sin tiempos muertos',
      text: 'Estrategias de datos, auth y storage multiambiente.',
      date: '2026-05-12',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">Firebase ha sido el Backend-as-a-Service (BaaS) predilecto por años. Sin embargo, su naturaleza propietaria NoSQL y los costos crecientes de lectura/escritura a escala han empujado a muchos equipos a migrar hacia Supabase, una alternativa de código abierto construida sobre PostgreSQL.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">1. Transición de NoSQL a Relacional</h4>
        <p class="mb-4">El mayor desafío no es el código, sino los datos. Pasar del modelo JSON anidado de Firestore a tablas relacionales con restricciones y llaves foráneas requiere una fase cuidadosa de modelado. Supabase expone directamente toda la potencia de Postgres, permitiendo realizar Joins complejos y consultas indexadas eficientemente.</p>
      `
    },
    {
      id: 5,
      category: 'devops',
      categoryLabel: 'DevOps',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
      title: 'CI/CD con GitHub Actions: monorepos y entornos preview',
      text: 'Plantillas reusables, matrices y artefactos ligeros.',
      date: '2026-05-05',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">Automatizar el ciclo de integración y entrega continua en monorepos requiere pipelines rápidos y optimizados que solo ejecuten pruebas y despliegues para los paquetes que realmente han sufrido modificaciones.</p>
        <h4 class="text-xl font-bold mt-6 mb-3">Entornos de vista previa automáticos</h4>
        <p class="mb-4">Configurar GitHub Actions para desplegar una rama en un subdominio temporal (entorno preview) al abrir un Pull Request acelera significativamente las revisiones de diseño y funcionalidad entre devs y diseñadores.</p>
      `
    },
    {
      id: 6,
      category: 'ux',
      categoryLabel: 'UX/UI',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=1600&auto=format&fit=crop',
      title: 'De wireframe a producción: handoff limpio para devs',
      text: 'Figma tokens, tipografía fluida y auditoría de accesibilidad.',
      date: '2026-04-29',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">El abismo tradicional entre diseño y desarrollo de software se puede cerrar mediante procesos de handoff bien estructurados sustentados en Design Tokens organizados.</p>
      `
    },
    {
      id: 7,
      category: 'cloud',
      categoryLabel: 'Cloud',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop',
      title: 'Observabilidad 101: logs, metrics y traces sin caos',
      text: 'OpenTelemetry, budgets y alertas accionables.',
      date: '2026-04-22',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">Entender qué ocurre en tus servidores en tiempo real es vital para mantener la alta disponibilidad. Abordaremos el estándar OpenTelemetry para centralizar métricas y trazas.</p>
      `
    },
    {
      id: 8,
      category: 'frontend',
      categoryLabel: 'Frontend',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
      title: 'Imágenes responsivas perfectas: aspect-ratio y lazyload',
      text: 'Buenas prácticas para LCP y CLS bajos en web vitals.',
      date: '2026-04-15',
      author: 'Leonardo Pool',
      content: `
        <p class="mb-4">Optimizar imágenes reduce hasta un 70% el peso de transferencia de una web. Aprende a usar picture, srcset, lazyloading nativo y aspect-ratio en CSS.</p>
      `
    }
  ];

  // Editor's Picks Data
  const editorsPicks = [
    {
      id: 9,
      category: 'backend',
      categoryLabel: 'Backend',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
      title: 'APIs idempotentes: errores que cuestan dinero',
      text: 'Diseño, retries y llaves de deduplicación en pagos.',
      date: '2026-05-30',
      author: 'Leonardo Pool',
      content: '<p class="mb-4">Asegurar que una petición HTTP POST duplicada (por ejemplo, debido a reintentos de red del cliente) no ejecute la transacción más de una vez en el servidor es vital en pasarelas de pago.</p>'
    },
    {
      id: 10,
      category: 'seguridad',
      categoryLabel: 'Seguridad',
      readTime: '11 min',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
      title: 'Secretos fuera del repo: opciones reales en 2025',
      text: 'Vaults, KMS y rotación automatizada sin fricción.',
      date: '2026-05-25',
      author: 'Leonardo Pool',
      content: '<p class="mb-4">Nunca almacenes contraseñas, llaves de API o firmas en tu repositorio de Git. Exploramos herramientas modernas como HashiCorp Vault, AWS KMS y Doppler para gestionar secretos.</p>'
    },
    {
      id: 11,
      category: 'data',
      categoryLabel: 'Data',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
      title: 'Feature stores sin dolor para equipos pequeños',
      text: 'Versionado, online/offline sync y costos.',
      date: '2026-05-20',
      author: 'Leonardo Pool',
      content: '<p class="mb-4">Feature Stores actúan como el hub centralizado para alimentar modelos de machine learning. Explicamos cómo equipos pequeños pueden implementarlo sin sobrecargar sus arquitecturas.</p>'
    }
  ];

  // Derived filtered blogs
  let filteredBlogs = $derived(
    blogs.filter(post => {
      const matchCategory = activeCategory === 'all' || post.category === activeCategory;
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
  );

  // Featured Hero Post
  const featuredHero = {
    id: 0,
    category: 'rendering',
    categoryLabel: 'Rendering',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop',
    title: 'El poder de la analítica y la experiencia de usuario',
    text: 'Descubre cómo las PyMEs pueden convertir cada clic en información valiosa y transformar los datos en decisiones que generan más clientes y ventas.',
    date: '2026-06-01',
    author: 'Leonardo Pool',
    content: `
      <p class="mb-4 font-semibold text-lg text-slate-700 dark:text-slate-300">En la economía digital, la información es la moneda de cambio más valiosa. Sin embargo, los datos en bruto no valen nada sin la capacidad de analizarlos y, lo que es más importante, sin estructurar una gran experiencia de usuario a partir de ellos.</p>
      <p class="mb-4">Para las pequeñas y medianas empresas (PyMEs), la analítica web no debería ser un panel de control intimidante con métricas vanidosas. En su lugar, debe centrarse en comprender el comportamiento real: ¿Dónde hacen clic los usuarios? ¿En qué parte del formulario abandonan el carrito? ¿Qué secciones generan mayor interacción?</p>
      <h4 class="text-xl font-bold mt-6 mb-3">Transformando Datos en Experiencias Memorables</h4>
      <p class="mb-4">Al alinear la analítica con la experiencia de usuario (UX), los negocios pueden optimizar sus tasas de conversión (CRO) sustancialmente. El diseño centrado en el usuario aprovecha los mapas de calor y grabaciones de sesiones para eliminar fricciones innecesarias y simplificar la jornada del cliente hacia la compra.</p>
    `
  };

  // Intermediate Banner Post
  const bannerPost = {
    id: 99,
    category: 'rendering',
    categoryLabel: 'Rendering',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop',
    title: 'Richard Norton photorealistic rendering as real photos',
    text: 'Guía completa con archivos fuente, perfiles de color y set de pruebas.',
    date: '2026-05-10',
    author: 'Leonardo Pool',
    content: '<p class="mb-4">Un análisis técnico exhaustivo del motor de renderizado fotorrealista de Richard Norton. Incluye perfiles de color recomendados, sets de pruebas e instrucciones paso a paso para arquitectos 3D.</p>'
  };

  // Subscribirse al boletín
  function handleSubscribe(e) {
    e.preventDefault();
    if (emailInput) {
      newsletterSubscribed = true;
      setTimeout(() => {
        emailInput = '';
      }, 3000);
    }
  }

  // Cerrar modal con escape
  function handleKeyDown(e) {
    if (e.key === 'Escape' && selectedPost) {
      selectedPost = null;
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class:dark={isDarkMode} class="font-sans antialiased min-h-screen transition-colors duration-300">
  <div class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
    
    <!-- Header -->
    <Header bind:isDarkMode={isDarkMode} scrollProgress={scrollProgress} />

    <!-- Hero / Featured Section -->
    <section class="container max-w-6xl mt-8">
      <div 
        onclick={() => selectedPost = featuredHero}
        onkeydown={(e) => e.key === 'Enter' && (selectedPost = featuredHero)}
        role="button" 
        tabindex="0"
        class="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-800/50"
      >
        <div class="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition duration-300 z-10"></div>
        <img 
          class="aspect-[16/8] sm:aspect-[16/6] w-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700" 
          src={featuredHero.image} 
          alt={featuredHero.title} 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent z-15"></div>
        <div class="absolute inset-0 flex items-end p-6 sm:p-10 z-20">
          <div class="max-w-2xl text-white">
            <div class="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
              <span class="px-2.5 py-1 rounded-md bg-indigo-600/90 text-white shadow-sm ring-1 ring-white/10">Destacado</span>
              <span class="opacity-80 backdrop-blur px-2 py-1 rounded bg-white/10">{featuredHero.categoryLabel}</span>
              <span class="opacity-75">• {featuredHero.readTime}</span>
            </div>
            <h1 class="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight group-hover:text-indigo-200 transition-colors">
              {featuredHero.title}
            </h1>
            <p class="mt-3 text-sm sm:text-base text-slate-200 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-xl">
              {featuredHero.text}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Topics & Live Search Section -->
    <section id="popular" class="container max-w-6xl mt-12 scroll-mt-20">
      
      <!-- Section header & Search -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
        <div>
          <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
            Temas populares <span class="animate-bounce">🔥</span>
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Descubre artículos técnicos, tutoriales y guías paso a paso</p>
        </div>
        
        <!-- Live Search -->
        <div class="relative w-full md:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Buscar artículos o categorías..." 
            class="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 transition" 
          />
          {#if searchQuery}
            <button 
              onclick={() => searchQuery = ''}
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              aria-label="Limpiar búsqueda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          {/if}
        </div>
      </div>

      <!-- Filters Row -->
      <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap gap-2">
          {#each categories as category}
            <button 
              onclick={() => activeCategory = category.id}
              class="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 
                {activeCategory === category.id 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'}"
            >
              {category.name}
            </button>
          {/each}
        </div>
        <div class="text-xs text-slate-400">
          Mostrando {filteredBlogs.length} de {blogs.length} artículos
        </div>
      </div>

      <!-- Grid of Cards -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredBlogs as post (post.id)}
          <div animate:flip={{ duration: 400 }}>
            {#if post.url}
              <a 
                href={post.url}
                class="group text-left w-full h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/60 hover:bg-slate-50/50 dark:hover:bg-slate-900 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-0 text-inherit no-underline"
              >
                <div class="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-800">
                  <img 
                    class="w-full h-full object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-500" 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                  />
                  <div class="absolute top-3 left-3">
                    <span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-sm">
                      {post.categoryLabel}
                    </span>
                  </div>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                  <div class="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    <time datetime={post.date}>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 class="mt-3 font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-grow leading-relaxed">
                    {post.text}
                  </p>
                </div>
              </a>
            {:else}
              <button 
                onclick={() => selectedPost = post}
                transition:fade={{ duration: 200 }}
                class="group text-left w-full h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/60 hover:bg-slate-50/50 dark:hover:bg-slate-900 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-0"
              >
                <div class="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-800">
                  <img 
                    class="w-full h-full object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-500" 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                  />
                  <div class="absolute top-3 left-3">
                    <span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-sm">
                      {post.categoryLabel}
                    </span>
                  </div>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                  <div class="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    <time datetime={post.date}>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 class="mt-3 font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-grow leading-relaxed">
                    {post.text}
                  </p>
                </div>
              </button>
            {/if}
          </div>
        {:else}
          <div transition:fade class="col-span-full py-16 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">No se encontraron artículos</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Intenta buscar con otros términos o cambia el filtro de categorías.</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Intermediate Banner Section -->
    <section class="container max-w-6xl mt-16">
      <div 
        onclick={() => selectedPost = bannerPost}
        onkeydown={(e) => e.key === 'Enter' && (selectedPost = bannerPost)}
        role="button"
        tabindex="0"
        class="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg border border-slate-200/50 dark:border-slate-800/50"
      >
        <div class="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/40 transition duration-300 z-10"></div>
        <img class="aspect-[16/8] sm:aspect-[16/5] w-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700" src={bannerPost.image} alt="Banner" />
        <div class="absolute inset-0 flex items-center justify-center p-6 text-center z-20">
          <div class="max-w-2xl text-white">
            <span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-indigo-600 text-white shadow-sm ring-1 ring-white/10">Especial</span>
            <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-indigo-200 transition-colors">
              {bannerPost.title}
            </h3>
            <p class="mt-2 text-sm sm:text-base text-slate-200/90 max-w-lg mx-auto">
              {bannerPost.text}
            </p>
            <span class="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 transition shadow-md">
              Leer ahora →
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Editor's Pick Section -->
    <section id="editors" class="container max-w-6xl mt-16 scroll-mt-20">
      <h2 class="text-2xl font-bold tracking-tight border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        Selección del editor 👑
      </h2>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {#each editorsPicks as pick}
          <button 
            onclick={() => selectedPost = pick}
            class="group text-left w-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/60 hover:bg-slate-50/50 dark:hover:bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 p-0"
          >
            <div class="overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-800">
              <img 
                class="w-full h-full object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-500" 
                src={pick.image} 
                alt={pick.title} 
                loading="lazy"
              />
            </div>
            <div class="p-5 flex flex-col flex-grow">
              <span class="text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                {pick.categoryLabel}
              </span>
              <h3 class="mt-2 font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {pick.title}
              </h3>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {pick.text}
              </p>
            </div>
          </button>
        {/each}
      </div>
    </section>

    <!-- Footer / About Section -->


    <!-- Immersive Reading Modal -->
    {#if selectedPost}
      <div 
        transition:fade={{ duration: 250 }} 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
      >
        <!-- Overlay close handler -->
        <button 
          onclick={() => selectedPost = null} 
          class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0 opacity-0"
          aria-label="Cerrar modal"
        ></button>
        
        <!-- Modal Card Content -->
        <div 
          transition:scale={{ start: 0.95, duration: 250 }} 
          class="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col"
        >
          
          <!-- Banner / Top Info -->
          <div class="relative min-h-60 sm:min-h-80 w-full shrink-0">
            <img class="absolute inset-0 w-full h-full object-cover" src={selectedPost.image} alt={selectedPost.title} />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            <!-- Floating close button -->
            <button 
              onclick={() => selectedPost = null} 
              class="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-slate-950/50 hover:bg-slate-950 text-white backdrop-blur border border-white/10 transition z-30" 
              aria-label="Cerrar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Metadata over Banner -->
            <div class="absolute bottom-6 left-6 right-6 text-white z-20">
              <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                <span class="px-2 py-0.5 rounded bg-indigo-600">{selectedPost.categoryLabel}</span>
                {#if selectedPost.readTime}
                  <span>{selectedPost.readTime}</span>
                {/if}
              </div>
              <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold mt-3 tracking-tight leading-tight">
                {selectedPost.title}
              </h2>
            </div>
          </div>

          <!-- Article Content -->
          <div class="p-6 sm:p-10 overflow-y-auto">
            <!-- Author, Date -->
            <div class="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
              <div class="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center font-outfit text-xs">LP</div>
              <div>
                <p class="font-semibold text-slate-800 dark:text-slate-200">Por {selectedPost.author || 'Leonardo Pool'}</p>
                <time datetime={selectedPost.date} class="text-xs">
                  {new Date(selectedPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
            </div>

            <!-- Content Body -->
            <div class="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
              {#if selectedPost.content}
                {@html selectedPost.content}
              {:else}
                <p>{selectedPost.text}</p>
                <p>Contenido completo del artículo disponible próximamente. Esta es una versión preliminar de la publicación técnica.</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Floating Back to Top Button -->
    {#if showBackToTop}
      <button 
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        transition:scale
        class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-600/35 transition cursor-pointer"
        aria-label="Volver arriba"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    {/if}

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
  
  .banner-img { 
    aspect-ratio: 16 / 6; 
    object-fit: cover; 
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
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


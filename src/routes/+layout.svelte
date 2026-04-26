<script>
  import { onMount } from 'svelte';
  import '../assets/css/style.css';
  import Navbar from '$lib/navbar.svelte';
  import Sidebar from '$lib/sidebar.svelte';

  onMount(async () => {
    await Promise.all([
      import('../assets/js/script.js'),
      import('$lib/firebase.js')
    ]);
  });
</script>

<main>
  <Sidebar />
  <div class="main-content">
    <Navbar />
    <slot /> <!-- Aquí se renderiza el contenido de cada página -->
  </div>
</main>

<style>
  /* Aquí puedes colocar estilos globales o importarlos desde tu CSS */
</style>

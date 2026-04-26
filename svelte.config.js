// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // <- important: genera un fallback SPA
    }),
    // paths.base: '' por defecto está bien para la mayoría de deploys
  }
};

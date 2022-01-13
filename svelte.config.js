import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({ postcss: true })],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $components: path.resolve('/src/lib/components'),
          $firebase: path.resolve('/src/lib/firebase'),
          $stores: path.resolve('/src/lib/stores'),
        },
      },
    },
  },
};

export default config;

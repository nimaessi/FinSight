import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const sourceAlias = resolve('src')
const rendererAlias = resolve('src/renderer/src')

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': sourceAlias
      }
    }
  },
  preload: {
    resolve: {
      alias: {
        '@': sourceAlias
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': sourceAlias,
        '@renderer': rendererAlias
      }
    },
    plugins: [react(), tailwindcss()]
  }
})

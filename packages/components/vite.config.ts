import reactPlugin from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  plugins: [reactPlugin()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@tehik/react-components',
      fileName: 'index',
      formats: ['es'],
    },
    sourcemap: 'inline',
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

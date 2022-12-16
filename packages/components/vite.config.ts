import reactPlugin from '@vitejs/plugin-react';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption, UserConfig } from 'vite';

// https://vitejs.dev/config/

const config: UserConfig = {
  define: {
    'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
  },
  mode: 'production',
  plugins: [
    reactPlugin(),
    visualizer({
      filename: '../../dist/bundle-stats.html',
      title: '@tehik/react-components bundle stats',
    }) as PluginOption,
  ],
  css: {
    modules: {
      generateScopedName: '[local]-[hash:8]',
      localsConvention: undefined,
    },
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@tehik/react-components',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'next', 'dayjs'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          next: 'next',
          dayjs: 'dayjs',
        },
      },
    },
  },
};

export default defineConfig(config);

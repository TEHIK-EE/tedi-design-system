import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import reactPlugin from '@vitejs/plugin-react';
import path from 'node:path';
import { join } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

const config: UserConfig = {
  define: {
    'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
  },
  mode: 'production',
  plugins: [
    nxViteTsPaths(),
    dts({
      tsconfigPath: join(__dirname, './tsconfig.lib.json'),
    }),
    reactPlugin(),
    checker({
      overlay: false,
      eslint: {
        lintCommand: 'eslint "./libs/react-components/src/**/*.{ts,tsx}"',
      },
      typescript: {
        root: join(__dirname),
        tsconfigPath: 'tsconfig.lib.json',
      },
    }),
    visualizer({
      filename: './dist/bundle-stats.html',
      title: '@tehik-ee/tedi-design-system bundle stats',
    }) as PluginOption,
  ],
  css: {
    modules: {
      generateScopedName: '[local]-[hash:8]',
      localsConvention: undefined,
    },
  },
  build: {
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    outDir: '../../dist',
    emptyOutDir: true,
    lib: {
      entry: {
        community: path.resolve(__dirname, 'src/community/index.ts'),
        tedi: path.resolve(__dirname, 'src/tedi/index.ts'),
      },
      name: '@tehik-ee/tedi-design-system',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['next', 'react', 'react/jsx-runtime', 'react-dom', 'dayjs', 'lodash-es', 'classnames'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || '';
        },
        manualChunks: (id) => {
          if (id.includes('community')) {
            return 'community';
          }
          if (id.includes('tedi')) {
            return 'tedi';
          }
          return undefined;
        },
      },
    },
  },
};

export default defineConfig(config);

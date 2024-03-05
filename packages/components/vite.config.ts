import reactPlugin from '@vitejs/plugin-react';
import path from 'node:path';
import { join } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

const config: UserConfig = {
  define: {
    'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
  },
  mode: 'production',
  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    dts({
      tsConfigFilePath: join(__dirname, './tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
    reactPlugin(),
    checker({
      overlay: false,
      eslint: {
        lintCommand: 'eslint "./packages/components/src/**/*.{ts,tsx}"',
      },
      // e.g. use TypeScript check
      typescript: {
        root: join(__dirname),
        tsconfigPath: 'tsconfig.lib.json',
      },
    }),
    visualizer({
      filename: './dist/bundle-stats.html',
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
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@tehik/react-components',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['next', 'react', 'react/jsx-runtime', 'react-dom', 'dayjs'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || '';
        },
      },
    },
  },
};

export default defineConfig(config);

import react from '@vitejs/plugin-react';
import { join, resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import packageJson from './package.json' assert { type: 'json' };

const config: UserConfig = {
  define: {
    'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
  },
  mode: 'production',
  plugins: [
    dts({
      tsconfigPath: join(__dirname, './tsconfig.lib.json'),
      entryRoot: join(__dirname, 'src'),
      outDir: join(__dirname, 'dist/src'),
    }),
    react(),
    checker({
      overlay: false,
      typescript: {
        root: join(__dirname),
        tsconfigPath: 'tsconfig.lib.json',
      },
      eslint: {
        lintCommand: 'eslint "src/**/*.{ts,tsx}"',
      },
    }),
    visualizer({
      filename: './dist/bundle-stats.html',
      title: '@tehik-ee/tedi-react bundle stats',
    }),
    viteStaticCopy({
      targets: [
        {
          src: ['package.json', 'README.md'],
          dest: './',
        },
        {
          src: '../tedi-core/public/fonts',
          dest: './',
        },
      ],
    }),
  ],
  css: {
    modules: {
      generateScopedName: '[local]-[hash:8]',
      localsConvention: undefined,
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  build: {
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: {
        community: resolve(__dirname, 'src/community/index.ts'),
        tedi: resolve(__dirname, 'src/tedi/index.ts'),
      },
      name: '@tehik-ee/tedi-react',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName.replace(/node_modules\//g, 'external/')}.${format}.js`,
    },
    rollupOptions: {
      external: (id) =>
        Object.keys(packageJson.peerDependencies).some((pkg) => id === pkg || id.startsWith(`${pkg}/`)) ||
        id === 'react/jsx-runtime',
      output: {
        preserveModules: true,
        dir: resolve(__dirname, 'dist'),
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || '';
        },
      },
    },
  },
};

export default defineConfig(config);

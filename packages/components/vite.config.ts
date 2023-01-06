import reactPlugin from '@vitejs/plugin-react';
import path from 'node:path';
import { join } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption, UserConfig } from 'vite';
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
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@emotion/react',
        '@emotion/styled',
        '@floating-ui/react',
        '@mui/material',
        '@mui/x-date-pickers',
        '@mui/x-date-pickers/AdapterDayjs',
        '@mui/x-date-pickers/LocalizationProvider',
        '@mui/x-date-pickers/locales/utils/pickersLocaleTextApi',
        '@mui/x-date-pickers/internals',
        '@mui/x-date-pickers/internals/models',
        '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation',
        '@tanstack/react-table',
        'classnames',
        'dayjs',
        'dayjs/locale/et',
        'dayjs/plugin/weekday',
        'dayjs/plugin/updateLocale',
        'debounce',
        'draft-js',
        'draftjs-md-converter',
        'formik',
        'jw-paginate',
        // 'material-symbols',
        'next',
        'react',
        'react-is',
        'react/jsx-runtime',
        'react-animate-height',
        'react-dom',
        'react-select',
        'react-select/async',
        'react-test-renderer',
        'react-toastify',
        'what-input',
        'yup',
      ],
    },
  },
};

export default defineConfig(config);

import { withoutVitePlugins } from '@storybook/builder-vite';
import { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';
import checker from 'vite-plugin-checker';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootMain from '../../../../.storybook/main';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core },
  stories: [
    '../src/docs/_welcome.mdx',
    '../src/docs/getStarted.mdx',
    '../src/docs/colors/colorTokens.mdx',
    '../src/docs/colors/colorGuidelines.mdx',
    '../src/docs/scale-layout/spacing.mdx',
    '../src/docs/scale-layout/grid.mdx',
    '../src/docs/labels/labels.mdx',
    '../src/docs/printing.mdx',
    '../src/docs/changelog.mdx',
    '../src/**/**/*.stories.tsx',
    '../src/**/**/*.mdx',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {},
  },
  addons: rootMain.addons || [],
  async viteFinal(config, { configType }) {
    return {
      ...config,
      define: {
        // Fix to process.env variables not being defined with vite
        'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      plugins: await withoutVitePlugins(
        [
          config.plugins,
          checker({
            overlay: false,

            ...(configType === 'DEVELOPMENT'
              ? {
                  eslint: {
                    lintCommand: 'eslint "./**/*.{ts,tsx}"',
                    dev: {
                      logLevel: ['error'], // show only eslint errors
                    },
                  },
                }
              : {}),
            typescript: {
              root: join(__dirname),
            },
          }),
        ],
        ['vite:dts']
      ),
    };
  },
};

export default config;

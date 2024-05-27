import { withoutVitePlugins } from '@storybook/builder-vite';
import { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';
import checker from 'vite-plugin-checker';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootMain from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core },
  stories: [
    '../shared/docs/_welcome.mdx',
    '../shared/docs/getStarted.mdx',
    '../shared/docs/changelog.mdx',
    '../community/src/docs/colors/colorTokens.mdx',
    '../community/src/docs/colors/colorGuidelines.mdx',
    '../community/src/docs/scale-layout/spacing.mdx',
    '../community/src/docs/scale-layout/grid.mdx',
    '../community/src/docs/labels/labels.mdx',
    '../community/src/docs/printing.mdx',
    '../tedi/src/**/**/*.stories.tsx',
    '../tedi/src/**/**/*.mdx',
    '../community/src/**/**/*.stories.tsx',
    '../community/src/**/**/*.mdx',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
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

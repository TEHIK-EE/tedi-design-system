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
    '../src/shared/docs/_welcome.mdx',
    '../src/shared/docs/getStarted.mdx',
    '../src/shared/docs/changelog.mdx',
    '../src/shared/docs/colors/tedi-colors.mdx',
    '../src/community/docs/colors/colorTokens.mdx',
    '../src/community/docs/colors/colorGuidelines.mdx',
    '../src/community/docs/scale-layout/spacing.mdx',
    '../src/community/docs/scale-layout/grid.mdx',
    '../src/community/docs/labels/labels.mdx',
    '../src/community/docs/printing.mdx',
    '../src/tedi/**/**/*.stories.tsx',
    '../src/tedi/**/**/*.mdx',
    '../src/community/**/**/*.stories.tsx',
    '../src/community/**/**/*.mdx',
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

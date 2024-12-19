import { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';
import { withoutVitePlugins } from '@storybook/builder-vite';
import checker from 'vite-plugin-checker';

const config: StorybookConfig = {
  stories: [
    '../src/shared/docs/_welcome.mdx',
    '../src/shared/docs/getStarted.mdx',
    '../src/shared/docs/changelog.mdx',
    '../src/shared/docs/colors/tedi-colors.mdx',
    '../src/community/docs/scale-layout/spacing.mdx',
    '../src/community/docs/scale-layout/grid.mdx',
    '../src/tedi/**/**/*.stories.tsx',
    '../src/tedi/**/**/*.mdx',
    '../src/community/**/**/*.stories.tsx',
    '../src/community/**/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@avalane/storybook-addon-status',
    'storybook-addon-pseudo-states',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  async viteFinal(config, { configType }) {
    return {
      ...config,
      define: {
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
                      logLevel: ['error'],
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

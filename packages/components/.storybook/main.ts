import { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import rootMain from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core },
  stories: [
    ...rootMain.stories,
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
  addons: rootMain.addons || [],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      define: {
        // Fix to process.env variables not being defined with vite
        'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    });
  },
};

export default config;

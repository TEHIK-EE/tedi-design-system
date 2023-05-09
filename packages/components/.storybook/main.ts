import { StorybookConfig } from '@storybook/react-webpack5';

import rootMain from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core, builder: '@storybook/builder-webpack5' },
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
};

export default config;

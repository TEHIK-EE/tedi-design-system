import { StorybookConfig } from '@storybook/react-webpack5';

import rootMain from '../../../.storybook/main.ts';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../src/docs/_welcome.stories.tsx',
    '../src/**/**/*.stories.tsx',
    '../src/**/**/*.stories.mdx',
  ],
  addons: [...rootMain.addons],
};

export default config;

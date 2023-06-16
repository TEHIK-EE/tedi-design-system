import { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    '@nx/react/plugins/storybook',
    '@storybook/addon-a11y',
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react-webpack5',
  docs: {
    autodocs: true,
  },
};
export default config;

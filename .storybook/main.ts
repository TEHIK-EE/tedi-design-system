import { StorybookConfig } from '@storybook/react-vite';

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
  core: {
    builder: '@storybook/builder-vite',
  },
  staticDirs: ['../public'],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true,
  },
};
export default config;

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
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react-webpack5',
  docs: {
    autodocs: true,
  },
};
export default config;

import { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/tedi/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@storybook/angular',
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  docs: {
    autodocs: true,
  },
};

export default config;
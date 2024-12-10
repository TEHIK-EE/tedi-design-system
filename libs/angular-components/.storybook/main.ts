import { StorybookConfig } from '@storybook/angular';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/tedi/**/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: '@storybook/angular',
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  docs: {
    autodocs: true,
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
};

export default config;

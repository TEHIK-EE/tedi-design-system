import { dirname, join } from 'path';
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  staticDirs: ['../public'],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

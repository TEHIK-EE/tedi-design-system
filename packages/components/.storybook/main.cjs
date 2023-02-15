// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootMain = require('../../../.storybook/main.cjs');

module.exports = {
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

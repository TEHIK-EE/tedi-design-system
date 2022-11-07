const rootMain = require('../../../.storybook/main.cjs');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [...rootMain.stories, '../src/**/**/*.stories.tsx'],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
};

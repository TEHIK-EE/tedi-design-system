const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [...rootMain.stories, '../src/docs/**/*.stories.tsx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
};

const rootMain = require('../../../.storybook/main.cjs');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [...rootMain.stories, '../src/docs/_welcome.stories.tsx', '../src/**/**/*.stories.tsx'],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
};

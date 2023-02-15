module.exports = {
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
  ],
  assets: ['packages/components/public'],
  staticDirs: ['../public'],
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};

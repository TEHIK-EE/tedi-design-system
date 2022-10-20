import React from 'react';

import StorybookDecorator from './storybook-decorator';

import '../src/styles/index.scss';
import '../src/styles/storybook.scss';
import 'what-input';

export const parameters = {
  viewMode: 'docs',
  backgrounds: {
    default: 'default',
    values: [
      { name: 'default', value: '#ffffff' },
      { name: 'light', value: '#f0f0f2' },
      { name: 'dark', value: '#8f91a8' },
      { name: 'black', value: '#000000' },
    ],
  },
};

export const decorators = [
  (Story) => (
    <StorybookDecorator>
      <Story />
    </StorybookDecorator>
  ),
];

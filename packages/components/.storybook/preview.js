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
      { name: 'default', value: 'var(--color-white)' },
      { name: 'light', value: 'var(--color-background)' },
      { name: 'dark', value: 'var(--color-borders-dark)' },
      { name: 'black', value: 'var(--color-black)' },
    ],
  },
};

export const decorators = [
  (Story, options) => {
    // prevent LabelProvider for label story, because it sets its own provider
    return options.componentId === 'components-labelprovider' ? (
      <Story />
    ) : (
      <StorybookDecorator>
        <Story />
      </StorybookDecorator>
    );
  },
];

import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import { Preview } from '@storybook/react';
import React from 'react';

import StorybookDecorator from './storybook-decorator';

import '../tedi/src/styles/index.scss';
import '../community/src/styles/index.scss';
import '../tedi/src/styles/tedi-storybook-styles.scss';
import '../community/src/styles/storybook.scss';
import 'what-input';

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

const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: 'var(--color-bg-default)' },
        { name: 'muted', value: 'var(--color-bg-muted)' },
        { name: 'subtle', value: 'var(--color-bg-subtle)' },
        { name: 'disabled', value: 'var(--color-bg-disabled)' },
        { name: 'black', value: 'var(--color-black)' },
        { name: 'inverted', value: 'var(--color-bg-inverted)' },
        { name: 'inverted-contrast', value: 'var(--color-bg-inverted-contrast)' },
      ],
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
    status: {
      statuses: {
        devComponent: {
          background: '#ff8000',
          color: '#ffffff',
          description: 'This component is dev only and not found in Figma',
        },
      },
    },
  },
};

export default preview;

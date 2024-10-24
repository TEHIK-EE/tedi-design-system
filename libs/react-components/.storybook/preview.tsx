import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import { Preview } from '@storybook/react';
import React from 'react';

import StorybookDecorator from './storybook-decorator';

import '../src/tedi/styles/index.scss';
import '../src/community/styles/index.scss';
import '../src/tedi/styles/tedi-storybook-styles.scss';
import '../src/community/styles/storybook.scss';
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
        breakpointSupport: {
          background: '#308653',
          color: '#ffffff',
          description: 'This component has breakpoint support',
        },
        internalComponent: {
          background: '#fff',
          color: '#000',
          description: 'This component is only used to build other components and not being exported from library',
        },
      },
    },
  },
};

export default preview;

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import Collapse, { CollapseProps } from './collapse';

export default {
  title: 'Community/Collapse',
  component: Collapse,
  argTypes: {
    children: {
      control: {
        type: 'text',
        defaultValue: '-',
      },
      table: {
        type: { summary: '-' },
      },
    },
    title: {
      control: {
        type: 'text',
        defaultValue: '-',
      },
      table: {
        type: { summary: '-' },
      },
    },
  },
} as Meta;

const Template: StoryFn<CollapseProps> = (args) => <Collapse {...args} />;

export const Default = {
  render: Template,
  args: {
    id: 'collapse-1',
    openText: 'Näita rohkem',
    closeText: 'Näita vähem',
    title: (
      <Heading element="h5" color="muted">
        Juhtumi üldandmed
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <div>
          <Text color="muted">Laste osalus</Text>
          <p>peretüli lapse osaluseta</p>
        </div>
        <div>
          <Text color="muted">Juhtumi liigid</Text>
          <p>peretüli (lapsega)</p>
        </div>
        <div>
          <Text color="muted">Kannatanu seos vägivaldsega</Text>
          <p>tütar</p>
        </div>
      </VerticalSpacing>
    ),
  },
};

export const WithHiddenCollapseText = {
  render: Template,
  args: {
    ...Default.args,
    hideCollapseText: true,
  },
};

export const NoTitleStart = {
  args: {
    ...Default.args,
    title: undefined,
    titleRowProps: {
      justifyContent: 'start',
    },
  },
};

export const TitleRowReversed = {
  args: {
    ...Default.args,
    titleRowProps: {
      direction: 'row-reverse',
    },
  },
};

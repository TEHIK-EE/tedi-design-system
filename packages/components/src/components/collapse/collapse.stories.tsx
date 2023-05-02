import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import Collapse, { CollapseProps } from './collapse';

export default {
  title: 'components/Collapse',
  component: Collapse,
  argTypes: {
    children: {
      control: { type: 'function' },
    },
    title: {
      control: { type: 'function' },
    },
  },
} as Meta;

export const Primary = {
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
          <p className="text-secondary">Laste osalus</p>
          <p>peretüli lapse osaluseta</p>
        </div>
        <div>
          <p className="text-secondary">Juhtumi liigid</p>
          <p>peretüli (lapsega)</p>
        </div>
        <div>
          <p className="text-secondary">Kannatanu seos vägivaldsega</p>
          <p>tütar</p>
        </div>
      </VerticalSpacing>
    ),
  },
};

export const WithHiddenCollapseText = {
  args: {
    ...Primary.args,
    hideCollapseText: true,
  },
};

export const NoTitleStart = {
  args: {
    ...Primary.args,
    title: undefined,
    titleRowProps: {
      justifyContent: 'start',
    },
  },
};

export const TitleRowReversed = {
  args: {
    ...Primary.args,
    titleRowProps: {
      direction: 'row-reverse',
    },
  },
};

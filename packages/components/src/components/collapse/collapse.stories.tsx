import { Meta, Story } from '@storybook/react';
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

const Template: Story<CollapseProps> = (args) => <Collapse {...args} />;

export const Primary = Template.bind({});
Primary.args = {
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
};

export const WithHiddenCollapseText = Template.bind({});
WithHiddenCollapseText.args = {
  ...Primary.args,
  hideCollapseText: true,
};

export const NoTitleStart = Template.bind({});
NoTitleStart.args = {
  ...Primary.args,
  title: undefined,
  titleRowProps: {
    justifyContent: 'start',
  },
};

export const TitleRowReversed = Template.bind({});
TitleRowReversed.args = {
  ...Primary.args,
  titleRowProps: {
    direction: 'row-reverse',
  },
};

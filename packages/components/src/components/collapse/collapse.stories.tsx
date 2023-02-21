import { Meta, Story } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../vertical-spacing';
import Collapse, { CollapseProps } from './collapse';

export default {
  title: 'components/Collapse',
  component: Collapse,
  argTypes: {
    children: {
      control: { type: 'function' },
    },
  },
} as Meta;

const Template: Story<CollapseProps> = (args) => <Collapse {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'collapse-1',
  heading: {
    children: 'Juhtumi üldandmed',
  },
  openText: 'Näita rohkem',
  closeText: 'Näita vähem',
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
  heading: {
    children: 'Juhtumi üldandmed',
  },
};

export const WithCustomHeadingSize = Template.bind({});
WithCustomHeadingSize.args = {
  ...Primary.args,
  heading: {
    children: 'Juhtumi üldandmed',
    level: 2,
    className: 'text-small text-bold',
  },
};

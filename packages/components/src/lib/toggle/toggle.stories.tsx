import { Meta, Story } from '@storybook/react';
import React from 'react';

import Toggle, { ToggleProps } from './toggle';

export default {
  title: 'components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'State is controlled internally',
      },
    },
  },
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Insightful label text for screen reader',
};

export const ControlledToggle = Template.bind({});
ControlledToggle.args = {
  ...Default.args,
  active: false,
};

ControlledToggle.parameters = {
  docs: {
    description: {
      story: 'State is controlled externally',
    },
  },
};

import { Meta, Story } from '@storybook/react';
import React from 'react';

import Check, { CheckProps } from './check';

export default {
  title: 'components/Form/Check',
  components: Check,
} as Meta;

const Template: Story<CheckProps> = (args) => <Check {...args} label="Vali mind" value="default" />;

export const Default = Template.bind({});
Default.args = {
  id: 'default-check',
  name: 'default-check',
  defaultChecked: true,
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  id: 'hidden-label-check',
  name: 'hidden-label-check',
  hideLabel: true,
};

export const DisabledState = Template.bind({});
DisabledState.args = {
  id: 'disabled-check',
  name: 'disabled-check',
  disabled: true,
};

export const WithExtraContent = Template.bind({});
WithExtraContent.args = {
  id: 'extra-content-check',
  name: 'extra-content-check',
  extraContent: (
    <span className="text-secondary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec
      porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.
    </span>
  ),
};

export const HoverState = Template.bind({});
HoverState.args = {
  id: 'hover-check',
  name: 'hover-check',
  hover: true,
};

export const Controlled = () => {
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <Check
      id="controlled-check"
      label="Vali mind"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

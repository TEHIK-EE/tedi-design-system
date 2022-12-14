import { Meta, Story } from '@storybook/react';
import React from 'react';

import Radio, { RadioProps } from './radio';

export default {
  title: 'components/Form/Radio',
  components: Radio,
} as Meta;

const Template: Story<RadioProps> = (args) => <Radio {...args} label="Vali mind" value="default" />;

export const Default = Template.bind({});
Default.args = {
  id: 'default-radio',
  name: 'default-radio',
  defaultChecked: true,
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  id: 'hidden-label-radio',
  name: 'hidden-label-radio',
  hideLabel: true,
};

export const DisabledState = Template.bind({});
DisabledState.args = {
  id: 'disabled-radio',
  name: 'disabled-radio',
  disabled: true,
};

export const WithExtraContent = Template.bind({});
WithExtraContent.args = {
  id: 'extra-content-radio',
  name: 'extra-content-radio',
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
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Radio
      id="controlled-check"
      label="Vali mind"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

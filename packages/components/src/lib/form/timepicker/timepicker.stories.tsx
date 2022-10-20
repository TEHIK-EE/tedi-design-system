import { Meta, Story } from '@storybook/react';
import React from 'react';

import TimePicker, { TimePickerProps } from './timepicker';

export default {
  title: 'components/Form/TimePicker',
  component: TimePicker,
} as Meta;

const Template: Story<TimePickerProps> = (args) => <TimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'test',
  hideLabel: 'keep-space',
  label: 'Vali aeg',
  renderSeconds: false,
  onChange: (date) => console.log(date),
};

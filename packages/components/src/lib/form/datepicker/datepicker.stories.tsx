import { Meta, Story } from '@storybook/react';
import React from 'react';

import DatePicker, { DatePickerProps } from './datepicker';

export default {
  title: 'components/Form/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'datepicker-1',
  label: 'Vali kuupäev',
};

import { Meta, Story } from '@storybook/react';
import React from 'react';

import DateTimePicker, { DateTimePickerProps } from './datetimepicker';

export default {
  title: 'components/Form/DateTimePicker',
  component: DateTimePicker,
} as Meta;

const Template: Story<DateTimePickerProps> = (args) => <DateTimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'datepicker-1',
  dateLabel: 'Kuupäev',
  timeLabel: 'Kellaaeg',
};

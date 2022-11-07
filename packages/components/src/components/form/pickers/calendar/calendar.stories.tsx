import { Meta, Story } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';

import Calendar, { CalendarProps } from './calendar';

export default {
  title: 'components/Form/Pickers/Calendar',
  component: Calendar,
} as Meta;

const highlightedDates: Dayjs[] = [
  dayjs(new Date(2022, 9, 10)),
  dayjs(new Date(2022, 9, 22)),
  dayjs(new Date(2022, 9, 23)),
  dayjs(new Date(2022, 10, 6)),
  dayjs(new Date(2022, 10, 12)),
];

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  defaultValue: highlightedDates[0],
  disabled: true,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  defaultValue: highlightedDates[0],
  disableHighlightToday: true,
  minDate: highlightedDates[0],
  maxDate: highlightedDates[highlightedDates.length - 1],
  shouldHighlightDate: (day) => {
    return !!highlightedDates?.find((date) => date?.isSame(day));
  },
  shouldDisableDate: (day) => {
    return !highlightedDates?.find((date) => date?.isSame(day));
  },
};

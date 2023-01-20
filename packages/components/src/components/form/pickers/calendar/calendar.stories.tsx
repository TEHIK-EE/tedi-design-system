import { Meta, Story } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';

import Calendar, { CalendarProps, CalendarStatus } from './calendar';

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

const statusOnDates: Dayjs[] = [
  dayjs(new Date(2022, 9, 10)),
  dayjs(new Date(2022, 9, 16)),
  dayjs(new Date(2022, 9, 23)),
];

const statuses: { date: Dayjs; status: CalendarStatus }[] = [
  { date: dayjs(new Date(2022, 9, 10)), status: 'error' },
  { date: dayjs(new Date(2022, 9, 11)), status: 'error' },
  { date: dayjs(new Date(2022, 9, 21)), status: 'success' },
  { date: dayjs(new Date(2022, 9, 22)), status: 'success' },
  { date: dayjs(new Date(2022, 9, 23)), status: 'inactive' },
  { date: dayjs(new Date(2022, 9, 24)), status: 'inactive' },
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
  shouldShowStatusOnDate: (day) => {
    return statusOnDates.find((date) => date.isSame(day)) ? 'error' : undefined;
  },
};

export const WithStatuses = Template.bind({});
WithStatuses.args = {
  defaultValue: highlightedDates[0],
  disableHighlightToday: true,
  minDate: highlightedDates[0],
  maxDate: highlightedDates[highlightedDates.length - 1],
  shouldHighlightDate: (day) => {
    return !!highlightedDates?.find((date) => date?.isSame(day));
  },
  shouldShowStatusOnDate: (day) => {
    const value = statuses.find((value) => day?.isSame(value.date));
    return value ? value.status : undefined;
  },
};

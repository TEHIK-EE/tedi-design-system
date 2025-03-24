import { Meta, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';

import Calendar, { CalendarStatus } from './calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Community/Form/Pickers/Calendar',
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const highlightedDates: Dayjs[] = [
  dayjs('2024-10-10'),
  dayjs('2024-10-22'),
  dayjs('2024-10-23'),
  dayjs('2024-11-06'),
  dayjs('2024-11-12'),
];

const statusOnDates: Dayjs[] = [dayjs('2024-10-10'), dayjs('2024-10-16'), dayjs('2024-10-23')];

const statuses: { date: Dayjs; status: CalendarStatus }[] = [
  { date: dayjs('2024-10-10'), status: 'error' },
  { date: dayjs('2024-10-11'), status: 'error' },
  { date: dayjs('2024-10-21'), status: 'success' },
  { date: dayjs('2024-10-22'), status: 'success' },
  { date: dayjs('2024-10-23'), status: 'inactive' },
  { date: dayjs('2024-10-24'), status: 'inactive' },
];

export const Default: Story = {
  args: {
    defaultValue: dayjs('2024-10-10'),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: highlightedDates[0],
    disabled: true,
  },
};

export const Highlighted: Story = {
  args: {
    defaultValue: highlightedDates[0],
    disableHighlightToday: true,
    minDate: highlightedDates[0],
    maxDate: highlightedDates[highlightedDates.length - 1],
    shouldHighlightDate: (day) => {
      return !!highlightedDates.find((date) => date.isSame(day, 'day'));
    },
    shouldDisableDate: (day) => {
      return !highlightedDates.find((date) => date.isSame(day, 'day'));
    },
    shouldShowStatusOnDate: (day) => {
      return statusOnDates.find((date) => date.isSame(day, 'day')) ? 'error' : undefined;
    },
  },
};

export const WithStatuses: Story = {
  args: {
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
  },
};

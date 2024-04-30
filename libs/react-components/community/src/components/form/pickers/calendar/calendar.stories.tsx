import { Meta, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';

import Calendar, { CalendarStatus } from './calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Community-components/Form/Pickers/Calendar',
};

export default meta;
type Story = StoryObj<typeof Calendar>;

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

export const Default: Story = {};

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
      return !!highlightedDates?.find((date) => date?.isSame(day));
    },
    shouldDisableDate: (day) => {
      return !highlightedDates?.find((date) => date?.isSame(day));
    },
    shouldShowStatusOnDate: (day) => {
      return statusOnDates.find((date) => date.isSame(day)) ? 'error' : undefined;
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

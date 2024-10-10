import { Meta, StoryFn, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { Col, Row } from '../../../../../../tedi/src/components/grid';
import Button from '../../../button/button';
import DateTimePicker, { DateTimePickerProps } from './datetimepicker';

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  title: 'Community/Form/Pickers/DateTimePicker',
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

const Template: StoryFn<DateTimePickerProps> = (args) => <DateTimePicker {...args} label="Choose date and time" />;
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-default',
  },
};

export const Disabled: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-disabled',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-read-only',
    readOnly: true,
    defaultValue: dayjs(),
  },
};

export const ReferenceDate: Story = {
  render: Template,

  args: {
    id: 'datepicker-reference-date',
    referenceDate: dayjs().add(1, 'month'),
  },
};

export const DisableFuture: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-disable-future',
    disableFuture: true,
  },
};

export const DisablePast: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-disable-past',
    disablePast: true,
  },
};

/**
 * Can select time between 8:00-16:30 every workday.
 */
export const WithMinMaxTime: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-max-time',
    maxTime: dayjs().set('hours', 16).set('minute', 30),
    minTime: dayjs().set('hours', 8).set('minute', 0),
    shouldDisableDate: (date) => date?.weekday() === 6 || date?.weekday() === 7,
  },
};

/**
 * Can only select fridays, defaultValue is next friday and today is not highlighted.
 */
export const CustomDisabledDays: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-custom-disabled-days',
    defaultValue: dayjs().weekday(5),
    shouldDisableDate: (date) => date?.weekday() !== 5,
    disableHighlightToday: true,
  },
};

export const WithCustomFormat: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-custom-format',
    inputFormat: 'MM-DD-YYYY HH-mm',
    mask: '__-__-____ __-__',
  },
};

export const WithCustomPlaceholder: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-custom-placeholder',
    placeholder: 'PP-KK-AAAA',
  },
};

export const WithCustomViews: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-custom-views',
    views: ['day', 'hours', 'minutes', 'month', 'seconds', 'year'],
  },
};

export const InLoadingState: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-loading',
    loading: true,
  },
};

export const WithErrorHelper: Story = {
  render: Template,

  args: {
    id: 'datetimepicker-error-helper',
    defaultValue: dayjs().add(numberOne, 'day'),
    helper: { text: 'Date can not be in the future!', type: 'error' },
  },
};

export const Controlled = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  return (
    <>
      <Row>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(null)}>
            clear
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs())}>
            today
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs().add(numberOne, 'day'))}>
            tomorrow
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs().subtract(numberOne, 'hour'))}>
            last hour
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs().add(numberOne, 'month'))}>
            next month
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs().subtract(numberOne, 'year'))}>
            minus year
          </Button>
        </Col>
      </Row>
      <DateTimePicker label="Choose date and time" id="datetimepicker-controlled" value={date} onChange={setDate} />
      <p>Current date is: {date?.toString()}</p>
    </>
  );
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { Col, Row } from '../../../../../tedi/components/grid';
import Button from '../../../button/button';
import DatePicker, { DatePickerProps } from './datepicker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Community/Form/Pickers/DatePicker',
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const Template: StoryFn<DatePickerProps> = (args) => <DatePicker {...args} label="Choose date" />;
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default: Story = {
  render: Template,

  args: {
    id: 'datepicker-default',
    defaultValue: dayjs('2024-10-10'),
  },
};

export const Disabled: Story = {
  render: Template,

  args: {
    id: 'datepicker-disabled',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: Template,

  args: {
    id: 'datepicker-read-only',
    readOnly: true,
    defaultValue: dayjs('2024-10-10'),
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
    id: 'datepicker-disable-future',
    disableFuture: true,
  },
};

export const DisablePast: Story = {
  render: Template,

  args: {
    id: 'datepicker-disable-past',
    disablePast: true,
  },
};

/**
 * Can only select fridays, defaultValue is next friday and today is not highlighted.
 */
export const CustomDisabledDays: Story = {
  render: Template,

  args: {
    id: 'datepicker-custom-disabled-days',
    defaultValue: dayjs('2024-10-10').weekday(5),
    shouldDisableDate: (date) => date?.weekday() !== 4,
    disableHighlightToday: true,
  },
};

export const WithCustomFormat: Story = {
  render: Template,

  args: {
    id: 'datepicker-custom-format',
    inputFormat: 'MM-DD-YYYY',
  },
};

export const WithCustomPlaceholder: Story = {
  render: Template,

  args: {
    id: 'datepicker-custom-placeholder',
    placeholder: 'PP-KK-AAAA',
  },
};

export const WithCustomViews: Story = {
  render: Template,

  args: {
    id: 'datepicker-custom-views',
    views: ['year', 'month', 'day'],
  },
};

export const InLoadingState: Story = {
  render: Template,

  args: {
    id: 'datepicker-loading',
    loading: true,
  },
};

export const WithErrorHelper: Story = {
  render: Template,

  args: {
    id: 'datepicker-error-helper',
    defaultValue: dayjs('2024-10-10').add(numberOne, 'day'),
    helper: { text: 'Date can not be in the future!', type: 'error' },
  },
};

export const Controlled = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2024-10-10'));

  return (
    <>
      <Row>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(null)}>
            Clear
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs('2024-10-10'))}>
            today
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs('2024-10-10').add(numberOne, 'day'))}>
            tomorrow
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs('2024-10-10').add(numberOne, 'month'))}>
            next month
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setDate(dayjs('2024-10-10').subtract(numberOne, 'year'))}>
            minus year
          </Button>
        </Col>
      </Row>
      <DatePicker label="Choose date" id="datepicker-2" value={date} onChange={setDate} />
      <p>Current date is: {date?.toString()}</p>
    </>
  );
};

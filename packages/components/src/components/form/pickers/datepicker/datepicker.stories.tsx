import { Meta, StoryFn, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import Button from '../../../button/button';
import { Col, Row } from '../../../grid';
import DatePicker, { DatePickerProps } from './datepicker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const Template: StoryFn<DatePickerProps> = (args) => <DatePicker {...args} label="Choose date" />;
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default: Story = {
  render: Template,

  args: {
    id: 'datepicker-default',
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
    defaultValue: dayjs(),
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

export const CustomDisabledDays: Story = {
  render: Template,

  args: {
    id: 'datepicker-custom-disabled-days',
    defaultValue: dayjs().weekday(5),
    shouldDisableDate: (date) => date?.weekday() !== 4,
    disableHighlightToday: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Can only select fridays, defaultValue is next friday and today is not highlighted',
      },
    },
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
            Clear
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
      <DatePicker label="Choose date" id="datepicker-2" value={date} onChange={setDate} />
      <p>Current date is: {date?.toString()}</p>
    </>
  );
};

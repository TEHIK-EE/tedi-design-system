import { Meta, StoryFn, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { Col, Row } from '../../../../../tedi/components/layout/grid';
import Button from '../../../button/button';
import TimePicker, { TimePickerProps } from './timepicker';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  title: 'Community/Form/Pickers/TimePicker',
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

const Template: StoryFn<TimePickerProps> = (args) => <TimePicker {...args} label="Choose time" />;
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default: Story = {
  render: Template,

  args: {
    id: 'timepicker-default',
  },
};

export const Disabled: Story = {
  render: Template,

  args: {
    id: 'timepicker-disabled',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: Template,

  args: {
    id: 'timepicker-read-only',
    readOnly: true,
    defaultValue: dayjs(),
  },
};

/**
 * Time selected has to be over 12:00
 */
export const MinTime: Story = {
  render: Template,

  args: {
    id: 'timepicker-min-time',
    minTime: dayjs().set('h', 12).set('minute', 0),
  },
};

/**
 * Time selected has to be below 12:00
 */
export const MaxTime: Story = {
  render: Template,

  args: {
    id: 'timepicker-max-time',
    maxTime: dayjs().set('h', 11).set('minute', 59),
  },
};

export const WithCustomFormat: Story = {
  render: Template,

  args: {
    id: 'timepicker-custom-format',
    inputFormat: 'HH-mm',
  },
};

export const WithCustomPlaceholder: Story = {
  render: Template,

  args: {
    id: 'timepicker-custom-placeholder',
    placeholder: 'tt:mm',
  },
};

export const WithCustomViews: Story = {
  render: Template,

  args: {
    id: 'timepicker-custom-views',
    views: ['hours', 'minutes', 'seconds'],
    inputFormat: 'HH:mm:ss',
  },
};

export const WithErrorHelper: Story = {
  render: Template,

  args: {
    id: 'timepicker-error-helper',
    defaultValue: dayjs().add(numberOne, 'minute'),
    helper: { text: 'Time can not be in the future!', type: 'error' },
    maxTime: dayjs(),
  },
};

export const Controlled = () => {
  const [time, setTime] = React.useState<Dayjs | null>(dayjs());

  return (
    <>
      <Row>
        <Col width="auto">
          <Button visualType="link" onClick={() => setTime(null)}>
            clear
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setTime(dayjs())}>
            current
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setTime(dayjs().add(numberOne, 'hour'))}>
            next hour
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setTime(dayjs().add(numberOne, 'minute'))}>
            next minute
          </Button>
        </Col>
        <Col width="auto">
          <Button visualType="link" onClick={() => setTime(dayjs().set('hours', 0).set('minute', 0))}>
            00:00
          </Button>
        </Col>
      </Row>
      <TimePicker label="Choose time" id="timepicker-controlled" value={time} onChange={setTime} />
      <p>Current time is: {time?.format('HH:mm')}</p>
    </>
  );
};

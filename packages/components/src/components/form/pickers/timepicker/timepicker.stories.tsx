import { Meta, Story } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { Button, Col, Row } from '../../../..';
import TimePicker, { TimePickerProps } from './timepicker';

export default {
  title: 'components/Form/Pickers/TimePicker',
  component: TimePicker,
} as Meta;

const Template: Story<TimePickerProps> = (args) => <TimePicker {...args} label="Vali kellaeg" />;
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default = Template.bind({});
Default.args = {
  id: 'timepicker-default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'timepicker-disabled',
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  id: 'timepicker-read-only',
  readOnly: true,
  defaultValue: dayjs(),
};

export const MinTime = Template.bind({});
MinTime.args = {
  id: 'timepicker-min-time',
  minTime: dayjs().set('h', 12).set('minute', 0),
};
MinTime.parameters = {
  docs: {
    description: {
      story: 'Time selected has to be over 12:00',
    },
  },
};

export const MaxTime = Template.bind({});
MaxTime.args = {
  id: 'timepicker-max-time',
  maxTime: dayjs().set('h', 11).set('minute', 59),
};
MaxTime.parameters = {
  docs: {
    description: {
      story: 'Time selected has to be below 12:00',
    },
  },
};

export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
  id: 'timepicker-custom-format',
  inputFormat: 'HH-mm',
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  id: 'timepicker-custom-placeholder',
  placeholder: 'tt:mm',
};

export const WithCustomViews = Template.bind({});
WithCustomViews.args = {
  id: 'timepicker-custom-views',
  views: ['hours', 'minutes', 'seconds'],
  inputFormat: 'HH:mm:ss',
};

export const WithErrorHelper = Template.bind({});
WithErrorHelper.args = {
  id: 'timepicker-error-helper',
  defaultValue: dayjs().add(numberOne, 'minute'),
  helper: { text: 'Aeg ei tohi olla tulevikus!', type: 'error' },
  maxTime: dayjs(),
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
      <TimePicker label="Vali kellaeg" id="timepicker-controlled" value={time} onChange={setTime} />
      <p>Current time is: {time?.format('HH:mm')}</p>
    </>
  );
};

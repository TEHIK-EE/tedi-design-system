import { Meta, Story } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { Button, Col, Row } from '../../../../';
import MuiTimePicker, { MuiTimePickerProps } from './mui-timepicker';

export default {
  title: 'components/Form/Pickers/MuiTimePicker',
  component: MuiTimePicker,
} as Meta;

const Template: Story<MuiTimePickerProps> = (args) => <MuiTimePicker {...args} label="Vali kellaeg" />;
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
          <Button text="clear" type="link" onClick={() => setTime(null)} />
        </Col>
        <Col width="auto">
          <Button text="current" type="link" onClick={() => setTime(dayjs())} />
        </Col>
        <Col width="auto">
          <Button text="next hour" type="link" onClick={() => setTime(dayjs().add(numberOne, 'hour'))} />
        </Col>
        <Col width="auto">
          <Button text="next minute" type="link" onClick={() => setTime(dayjs().add(numberOne, 'minute'))} />
        </Col>
        <Col width="auto">
          <Button text="00:00" type="link" onClick={() => setTime(dayjs().set('hours', 0).set('minute', 0))} />
        </Col>
      </Row>
      <MuiTimePicker label="Vali kellaeg" id="timepicker-controlled" value={time} onChange={setTime} />
      <p>Current time is: {time?.format('HH:mm')}</p>
    </>
  );
};

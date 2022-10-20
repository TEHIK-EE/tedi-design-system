import { Meta, Story } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import Button from '../../../button/button';
import { Col, Row } from '../../../grid';
import MuiDateTimePicker, { MuiDateTimePickerProps } from './mui-datetimepicker';

export default {
  title: 'components/Form/Pickers/MuiDateTimePicker',
  component: MuiDateTimePicker,
} as Meta;

const Template: Story<MuiDateTimePickerProps> = (args) => (
  <MuiDateTimePicker {...args} label="Vali kuupäev ja kellaeg" />
);
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default = Template.bind({});
Default.args = {
  id: 'datetimepicker-default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'datetimepicker-disabled',
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  id: 'datetimepicker-read-only',
  readOnly: true,
  defaultValue: dayjs(),
};

export const DisableFuture = Template.bind({});
DisableFuture.args = {
  id: 'datetimepicker-disable-future',
  disableFuture: true,
};

export const DisablePast = Template.bind({});
DisablePast.args = {
  id: 'datetimepicker-disable-past',
  disablePast: true,
};

export const WithMinMaxTime = Template.bind({});
WithMinMaxTime.args = {
  id: 'datetimepicker-max-time',
  maxTime: dayjs().set('hours', 16).set('minute', 30),
  minTime: dayjs().set('hours', 8).set('minute', 0),
  shouldDisableDate: (date) => date?.weekday() === 5 || date?.weekday() === 6,
};
WithMinMaxTime.parameters = {
  docs: {
    description: {
      story: 'Can select time between 8:00-16:30 every workday',
    },
  },
};

export const CustomDisabledDays = Template.bind({});
CustomDisabledDays.args = {
  id: 'datetimepicker-custom-disabled-days',
  defaultValue: dayjs().weekday(4),
  shouldDisableDate: (date) => date?.weekday() !== 4,
  disableHighlightToday: true,
};
CustomDisabledDays.parameters = {
  docs: {
    description: {
      story: 'Can only select fridays, defaultValue is next friday and today is not highlighted',
    },
  },
};

export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
  id: 'datetimepicker-custom-format',
  inputFormat: 'MM-DD-YYYY HH-mm',
  mask: '__-__-____ __-__',
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  id: 'datetimepicker-custom-placeholder',
  placeholder: 'PP-KK-AAAA',
};

export const WithCustomViews = Template.bind({});
WithCustomViews.args = {
  id: 'datetimepicker-custom-views',
  views: ['day', 'hours', 'minutes', 'month', 'seconds', 'year'],
};

export const InLoadingState = Template.bind({});
InLoadingState.args = {
  id: 'datetimepicker-loading',
  loading: true,
};

export const WithErrorHelper = Template.bind({});
WithErrorHelper.args = {
  id: 'datetimepicker-error-helper',
  defaultValue: dayjs().add(numberOne, 'day'),
  helper: { text: 'Kuupäev ei tohi olla tulevikus!', type: 'error' },
};

export const Controlled = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  return (
    <>
      <Row>
        <Col width="auto">
          <Button text="clear" type="link" onClick={() => setDate(null)} />
        </Col>
        <Col width="auto">
          <Button text="today" type="link" onClick={() => setDate(dayjs())} />
        </Col>
        <Col width="auto">
          <Button text="tomorrow" type="link" onClick={() => setDate(dayjs().add(numberOne, 'day'))} />
        </Col>
        <Col width="auto">
          <Button text="last hour" type="link" onClick={() => setDate(dayjs().subtract(numberOne, 'hour'))} />
        </Col>
        <Col width="auto">
          <Button text="next month" type="link" onClick={() => setDate(dayjs().add(numberOne, 'month'))} />
        </Col>
        <Col width="auto">
          <Button text="minus year" type="link" onClick={() => setDate(dayjs().subtract(numberOne, 'year'))} />
        </Col>
      </Row>
      <MuiDateTimePicker label="Vali kuupäev" id="datetimepicker-controlled" value={date} onChange={setDate} />
      <p>Current date is: {date?.toString()}</p>
    </>
  );
};

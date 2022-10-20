import { Meta, Story } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import Button from '../../../button/button';
import { Col, Row } from '../../../grid';
import MuiDatePicker, { MuiDatePickerProps } from './mui-datepicker';

export default {
  title: 'components/Form/Pickers/MuiDatePicker',
  component: MuiDatePicker,
} as Meta;

const Template: Story<MuiDatePickerProps> = (args) => <MuiDatePicker {...args} label="Vali kuupäev" />;
const numberOne = 1; // https://github.com/storybookjs/storybook/issues/12208

export const Default = Template.bind({});
Default.args = {
  id: 'datepicker-default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'datepicker-disabled',
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  id: 'datepicker-read-only',
  readOnly: true,
  defaultValue: dayjs(),
};

export const DisableFuture = Template.bind({});
DisableFuture.args = {
  id: 'datepicker-disable-future',
  disableFuture: true,
};

export const DisablePast = Template.bind({});
DisablePast.args = {
  id: 'datepicker-disable-past',
  disablePast: true,
};

export const CustomDisabledDays = Template.bind({});
CustomDisabledDays.args = {
  id: 'datepicker-custom-disabled-days',
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
  id: 'datepicker-custom-format',
  inputFormat: 'MM-DD-YYYY',
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  id: 'datepicker-custom-placeholder',
  placeholder: 'PP-KK-AAAA',
};

export const WithCustomViews = Template.bind({});
WithCustomViews.args = {
  id: 'datepicker-custom-views',
  views: ['year', 'month', 'day'],
};

export const InLoadingState = Template.bind({});
InLoadingState.args = {
  id: 'datepicker-loading',
  loading: true,
};

export const WithErrorHelper = Template.bind({});
WithErrorHelper.args = {
  id: 'datepicker-error-helper',
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
          <Button text="next month" type="link" onClick={() => setDate(dayjs().add(numberOne, 'month'))} />
        </Col>
        <Col width="auto">
          <Button text="minus year" type="link" onClick={() => setDate(dayjs().subtract(numberOne, 'year'))} />
        </Col>
      </Row>
      <MuiDatePicker label="Vali kuupäev" id="datepicker-2" value={date} onChange={setDate} />
      <p>Current date is: {date?.toString()}</p>
    </>
  );
};

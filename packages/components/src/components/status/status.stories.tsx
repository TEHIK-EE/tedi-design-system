import { Meta, Story } from '@storybook/react';
import React from 'react';

import Status, { StatusProps } from './status';

export default {
  title: 'components/Status',
  component: Status,
} as Meta;

const Template: Story<StatusProps> = (args) => <Status {...args} />;

export const Success = Template.bind({});
Success.args = {
  children: 'Aktiivne',
  type: 'success',
};

export const Error = Template.bind({});
Error.args = {
  children: 'Error',
  type: 'error',
};

export const Inactive = Template.bind({});
Inactive.args = {
  children: 'Inactive',
  type: 'inactive',
};

import { Meta, Story } from '@storybook/react';
import React from 'react';

import FormHelper, { FormHelperProps } from './form-helper';

export default {
  title: 'components/Form/FormHelper',
  component: FormHelper,
  argTypes: {
    text: {
      type: 'string',
    },
  },
} as Meta;

const Template: Story<FormHelperProps> = (args) => <FormHelper {...args} />;

export const Helper = Template.bind({});
Helper.args = {
  text: 'I am helper Text',
};

export const Error = Template.bind({});
Error.args = {
  text: 'I am error Text',
  type: 'error',
};

export const Valid = Template.bind({});
Valid.args = {
  text: 'I am valid Text',
  type: 'valid',
};

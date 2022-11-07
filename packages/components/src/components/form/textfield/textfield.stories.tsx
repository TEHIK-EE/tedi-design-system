import { Meta, Story } from '@storybook/react';
import React from 'react';

import TextField, { TextFieldProps } from './textfield';

export default {
  title: 'components/Form/TextField',
  component: TextField,
  argTypes: {
    icon: {
      type: 'string',
    },
  },
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'example-1',
  label: 'Label',
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  helper: {
    id: 'example-3',
    text: 'Error text here',
    type: 'error',
  },
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  helper: {
    id: 'example-4',
    text: 'Success text here',
    type: 'valid',
  },
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'small',
  icon: 'search',
  placeholder: 'Otsi',
};

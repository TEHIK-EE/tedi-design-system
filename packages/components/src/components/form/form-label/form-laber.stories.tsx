import { Meta, Story } from '@storybook/react';
import React from 'react';

import FormLabel, { FormLabelProps } from './form-label';

export default {
  title: 'components/Form/FormLabel',
  component: FormLabel,
} as Meta;

const Template: Story<FormLabelProps> = (args) => <FormLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'input-id-1',
  label: 'Label of input',
};

export const Required = Template.bind({});
Required.args = {
  id: 'input-id-2',
  label: 'Label of input',
  required: true,
};

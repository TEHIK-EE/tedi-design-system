import { Meta, StoryObj } from '@storybook/react';

import FormHelper from './form-helper';

const meta: Meta<typeof FormHelper> = {
  component: FormHelper,
  title: 'TEDI-Ready/Form/FormHelper',
};

export default meta;
type Story = StoryObj<typeof FormHelper>;

export const Helper: Story = {
  args: {
    text: 'I am helper Text',
  },
};

export const Error: Story = {
  args: {
    text: 'I am error Text',
    type: 'error',
  },
};

export const Valid: Story = {
  args: {
    text: 'I am valid Text',
    type: 'valid',
  },
};

import { Meta, StoryObj } from '@storybook/react';

import { FormHelper } from './form-helper';

/**
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/67d4de-formhelper)
 */

const meta: Meta<typeof FormHelper> = {
  component: FormHelper,
  title: 'TEDI-Ready/Components/Form/FormHelper',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormHelper>;

export const Helper: Story = {
  args: {
    text: 'I am a helper Text',
  },
};

export const Error: Story = {
  args: {
    text: 'I am an error Text',
    type: 'error',
  },
};

export const Valid: Story = {
  args: {
    text: 'I am a valid Text',
    type: 'valid',
  },
};

export const PositionLeft: Story = {
  args: {
    text: 'I am a helper Text',
    position: 'left',
  },
};

export const PositionRight: Story = {
  args: {
    text: 'I am a valid Text',
    type: 'valid',
    position: 'right',
  },
};

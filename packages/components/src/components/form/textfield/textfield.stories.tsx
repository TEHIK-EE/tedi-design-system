import { Meta, StoryObj } from '@storybook/react';

import TextField from './textfield';

const meta: Meta<typeof TextField> = {
  component: TextField,
  argTypes: {
    icon: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-3',
      text: 'Error text here',
      type: 'error',
    },
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    helper: {
      id: 'example-4',
      text: 'Success text here',
      type: 'valid',
    },
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    icon: 'search',
    placeholder: 'Search',
  },
};

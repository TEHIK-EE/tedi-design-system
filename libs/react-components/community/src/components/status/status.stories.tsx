import { Meta, StoryObj } from '@storybook/react';

import Status from './status';

const meta: Meta<typeof Status> = {
  component: Status,
  title: 'Community-components/Status',
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Success: Story = {
  args: {
    children: 'Active',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    type: 'error',
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive',
    type: 'inactive',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    type: 'warning',
  },
};

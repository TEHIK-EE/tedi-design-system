import { Meta, StoryObj } from '@storybook/react';

import Spinner from './spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 24,
    strokeWidth: 4,
    color: 'default',
    label: 'Loading...',
  },
};

export const Big: Story = {
  args: {
    size: 48,
    strokeWidth: 6,
    color: 'primary',
    label: 'Loading...',
  },
};

export const Small: Story = {
  args: {
    size: 16,
    strokeWidth: 4,
    color: 'disabled',
    label: 'Loading...',
  },
};

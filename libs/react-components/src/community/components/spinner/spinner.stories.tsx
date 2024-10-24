import { Meta, StoryObj } from '@storybook/react';

import Spinner from './spinner';

/**
 * <b>Community Spinner is now deprecated</b><br/>
 * Use TEDI-Ready <a href="/docs/tedi-ready-loader-spinner--docs">Spinner</a> instead
 */

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Community/Spinner',
  parameters: {
    status: {
      type: 'deprecated',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 16,
    label: 'Loading...',
  },
};

export const Big: Story = {
  args: {
    size: 48,
    color: 'bg-disabled',
    label: 'Loading...',
  },
};

export const Inverted: Story = {
  args: {
    size: 16,
    color: 'bg-default',
    label: 'Loading...',
  },
  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

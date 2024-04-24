import { Meta, StoryObj } from '@storybook/react';

import CloseButton from './close-button';

const meta: Meta<typeof CloseButton> = {
  component: CloseButton,
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {
  args: {
    children: 'close',
  },
};

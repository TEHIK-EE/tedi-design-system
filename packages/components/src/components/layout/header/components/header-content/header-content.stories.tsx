import { Meta, StoryObj } from '@storybook/react';

import HeaderContent from './header-content';

const meta: Meta<typeof HeaderContent> = {
  component: HeaderContent,
};

export default meta;
type Story = StoryObj<typeof HeaderContent>;

export const Default: Story = {
  args: {
    children: 'Any content',
  },
};

import { Meta, StoryObj } from '@storybook/react';

import SkipLinks from './skip-links';

const meta: Meta<typeof SkipLinks> = {
  component: SkipLinks,
  title: 'Community/Layout/Header/SkipLinks',
};

export default meta;
type Story = StoryObj<typeof SkipLinks>;

export const Default: Story = {
  args: {
    links: [{ children: 'Skip to main content', href: '#main-content' }],
  },
};

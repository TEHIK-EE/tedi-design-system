import { Meta, StoryObj } from '@storybook/react';

import SkipLinks from './skip-links';

const meta: Meta<typeof SkipLinks> = {
  component: SkipLinks,
};

export default meta;
type Story = StoryObj<typeof SkipLinks>;

export const Default: Story = {
  args: {
    links: [{ children: 'Liigu edasi põhisisu juurde', href: '#main-content' }],
  },
};

import { Meta, StoryObj } from '@storybook/react';

import Legend from './legend';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=155-22926&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Legend> = {
  component: Legend,
  title: 'Community/Map components/Legend',
};

export default meta;
type Story = StoryObj<typeof Legend>;

export const Default: Story = {
  args: {
    label: 'Pärnu',
    description: 'Lorem ipsum',
  },
};

export const Color: Story = {
  args: {
    label: <div style={{ backgroundColor: 'var(--primary-600)', width: '40px', height: '26px' }}></div>,
    description: 'Lorem ipsum',
  },
};

export const Image: Story = {
  args: {
    label: <img src="logo.svg" alt="logo" />,
    description: 'Lorem ipsum',
  },
};

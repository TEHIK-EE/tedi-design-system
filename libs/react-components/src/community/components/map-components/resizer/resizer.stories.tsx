import { Meta, StoryObj } from '@storybook/react';

import Placeholder from '../../placeholder/placeholder';
import Resizer from './resizer';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=88-17734&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Resizer> = {
  component: Resizer,
  title: 'Community/Map components/Resizer',
};

export default meta;
type Story = StoryObj<typeof Resizer>;

export const ResizeRight: Story = {
  name: 'Resize from Right',
  args: {
    handlePosition: 'right',
    showIndicator: true,
    children: <Placeholder>You have no data to display.</Placeholder>,
  },
};

export const ResizeLeft: Story = {
  name: 'Resize from Left',
  args: {
    handlePosition: 'left',
    showIndicator: true,
    children: <Placeholder>You have no data to display.</Placeholder>,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const ResizeTop: Story = {
  name: 'Resize from Top',
  args: {
    handlePosition: 'top',
    showIndicator: true,
    initialHeight: 118,
    minHeight: 118,
    children: <Placeholder>You have no data to display.</Placeholder>,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '400px', alignItems: 'flex-end', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const ResizeBottom: Story = {
  name: 'Resize from Bottom',
  args: {
    handlePosition: 'bottom',
    initialHeight: 118,
    minHeight: 118,
    showIndicator: true,
    children: <Placeholder>You have no data to display.</Placeholder>,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '400px', alignItems: 'flex-start', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const DragIndicator: Story = {
  args: {
    handlePosition: 'right',
    children: <Placeholder>You have no data to display.</Placeholder>,
  },
};

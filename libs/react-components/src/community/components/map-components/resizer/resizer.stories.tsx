import { Meta, StoryObj } from '@storybook/react';

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
    initialHeight: 205,
    minHeight: 205,
    children: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
  },
};

export const ResizeLeft: Story = {
  name: 'Resize from Left',
  args: {
    handlePosition: 'left',
    initialHeight: 205,
    minHeight: 205,
    showIndicator: true,
    children: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
  },
};

export const ResizeTop: Story = {
  name: 'Resize from Top',
  args: {
    handlePosition: 'top',
    initialHeight: 205,
    minHeight: 205,
    showIndicator: true,
    children: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
  },
};

export const ResizeBottom: Story = {
  name: 'Resize from Bottom',
  args: {
    handlePosition: 'bottom',
    initialHeight: 205,
    minHeight: 205,
    showIndicator: true,
    children: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
  },
};

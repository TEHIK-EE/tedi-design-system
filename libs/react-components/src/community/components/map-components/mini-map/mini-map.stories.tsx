import { Meta, StoryObj } from '@storybook/react';

import MiniMap from './mini-map';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=179-24889&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MiniMap> = {
  component: MiniMap,
  title: 'Community/Map components/MiniMap',
};

export default meta;
type Story = StoryObj<typeof MiniMap>;

export const Default: Story = {
  args: {
    children: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="mini map" />,
  },
};

export const Closed: Story = {
  args: {
    children: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="mini map" />,
    isOpen: false,
  },
};

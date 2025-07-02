import { Meta, StoryObj } from '@storybook/react';

import MapPreview from './map-preview';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=179-24889&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MapPreview> = {
  component: MapPreview,
  title: 'Community/Map components/MapPreview',
};

export default meta;
type Story = StoryObj<typeof MapPreview>;

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

import { Meta, StoryObj } from '@storybook/react';

import ScaleBar from './scale-bar';

/**
 * <a href="?path=/docs/veera-kaardirakendus-mapattribution--docs" target="_BLANK">Part of MapAttribution component</a><br/>
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=178-24546&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof ScaleBar> = {
  component: ScaleBar,
  title: 'Community/Map components/ScaleBar',
};

export default meta;
type Story = StoryObj<typeof ScaleBar>;

export const Default: Story = {
  args: {
    zoomLevel: 0,
  },
};

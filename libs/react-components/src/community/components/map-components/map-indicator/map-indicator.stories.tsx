import { Meta, StoryObj } from '@storybook/react';

import MapIndicator from './map-indicator';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=179-24889&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MapIndicator> = {
  component: MapIndicator,
  title: 'Community/Map components/MapIndicator',
};

export default meta;
type Story = StoryObj<typeof MapIndicator>;

export const Default: Story = {};

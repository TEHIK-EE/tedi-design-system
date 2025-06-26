import { Meta, StoryObj } from '@storybook/react';

import MapSelection from '../map-selection/map-selection';
import { Slider } from './slider';

import './slider.module.scss';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=1137-88336&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Slider> = {
  title: 'Community/Map components/Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

const generateMockItems = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <MapSelection
      key={i}
      id={`map-${i}`}
      type="historical"
      title="Ajalooline kaart"
      content={<img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />}
    />
  ));

export const Default: Story = {
  render: (args) => <Slider {...args}>{generateMockItems(10)}</Slider>,
  args: {
    itemCountShown: 6,
  },
};

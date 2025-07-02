import { Meta, StoryObj } from '@storybook/react';

import BaseMapSelection from '../base-map-selection/base-map-selection';
import { Carousel } from './carousel';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=1137-88336&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Carousel> = {
  title: 'Community/Map components/Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const generateMockItems = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <BaseMapSelection
      key={i}
      id={`map-${i}`}
      type="historical"
      title="Ajalooline kaart"
      content={<img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />}
    />
  ));

export const Default: Story = {
  render: (args) => <Carousel {...args}>{generateMockItems(10)}</Carousel>,
  args: {
    itemCountShown: 6,
  },
};

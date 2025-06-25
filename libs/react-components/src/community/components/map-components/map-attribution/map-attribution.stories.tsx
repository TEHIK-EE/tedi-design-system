import { Meta, StoryObj } from '@storybook/react';

import { Link, Text, VerticalSpacing } from '../../../../tedi';
import MapAttribution from './map-attribution';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=178-24546&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MapAttribution> = {
  component: MapAttribution,
  title: 'Community/Map components/MapAttribution',
};

export default meta;
type Story = StoryObj<typeof MapAttribution>;

export const Default: Story = {
  args: {
    children: 'Eesti põhikaart 1:20 000 2016 Maa- ja Ruumiamet',
  },
  parameters: {
    backgrounds: { default: 'brand' },
  },
};

export const WithPopoverContent: Story = {
  args: {
    children: 'X: 6449200.28 Y: 47102831.38 Z: 38.28',
    popover: {
      children: (
        <VerticalSpacing>
          <Link>Autoriõiguste tekst 1</Link>
          <Link>Autoriõiguste tekst 2</Link>
          <Link>Autoriõiguste tekst 3</Link>
        </VerticalSpacing>
      ),
    },
  },
  parameters: {
    backgrounds: { default: 'brand' },
  },
};

export const LongerContent: Story = {
  args: {
    children: (
      <VerticalSpacing size={0.5}>
        <Text>X: 6449200.28 Y: 47102831.38 Z: 38.28</Text>
        <Text>B: 38.8423 L: 38.8423</Text>
        <Text>B: 59°10.3820’ L: 59°10.3820’</Text>
      </VerticalSpacing>
    ),
    popover: {
      children: (
        <VerticalSpacing>
          <Link>Autoriõiguste tekst 1</Link>
          <Link>Autoriõiguste tekst 2</Link>
          <Link>Autoriõiguste tekst 3</Link>
        </VerticalSpacing>
      ),
    },
  },
  parameters: {
    backgrounds: { default: 'brand' },
  },
};

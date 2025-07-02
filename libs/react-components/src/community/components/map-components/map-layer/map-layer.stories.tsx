import { Meta, StoryObj } from '@storybook/react';

import MapLayer, { LayerOption } from './map-layer';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=427-91631&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MapLayer> = {
  component: MapLayer,
  title: 'Community/Map components/MapLayer',
};

export default meta;
type Story = StoryObj<typeof MapLayer>;

const layers: LayerOption[] = [
  {
    id: 'boundary',
    label: 'KÜ piiripunktid',
    type: 'checkbox',
    defaultChecked: true,
    value: 'boundary',
    name: 'boundary',
  },
  {
    id: 'show-on-map',
    label: 'Kuva kaardil',
    type: 'checkbox',
    value: 'show-on-map',
    name: 'show-on-map',
    children: [
      {
        id: 'select-tunnus',
        label: '',
        type: 'select',
        placeholder: 'Tunnus',
        defaultValue: { label: 'Tunnus', value: 'tunnus' },
        options: [
          { label: 'Tunnus', value: 'tunnus' },
          { label: 'Koordinaat', value: 'koordinaat' },
          { label: 'Piir', value: 'piir' },
        ],
      },
    ],
  },
  {
    id: 'ownership',
    label: 'KÜ omandivorm',
    type: 'checkbox',
    defaultChecked: true,
    value: 'ownership',
    name: 'ownership',
  },
  {
    id: 'purpose',
    label: 'KÜ sihtotstarbe järgi',
    type: 'checkbox',
    value: 'purpose',
    name: 'purpose',
  },
];

export const Default: Story = {
  args: {
    items: layers,
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row, Text, TextProps, VerticalSpacing } from '../../../../tedi';
import MapSelection, { MapSelectionProps } from './map-selection';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=179-24836&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MapSelection> = {
  component: MapSelection,
  title: 'Community/Map components/MapSelection',
};

export default meta;
type Story = StoryObj<typeof MapSelection>;

const mapSelectionStateArray = ['Default', 'Hover', 'Focus', 'Selected'];
type TemplateMultipleProps<Type = typeof mapSelectionStateArray> = MapSelectionProps & {
  array: Type;
  titleColor: TextProps['color'];
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor } = args;

  return (
    <>
      <VerticalSpacing size={0.5}>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="display-flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <MapSelection selected={value === 'Selected'} id={value} {...args} />
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const Default: Story = {
  args: {
    title: 'Text',
    content: <img src="https://snazzy-maps-cdn.azureedge.net/assets/8097-wy.png" alt="" />,
    type: 'historical',
  },
};

export const HistoricalMapStates: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: ['Default', 'Hover', 'Focus', 'Selected'],
    type: 'historical',
    title: 'Ajalooline kaart',
    content: <img src="https://snazzy-maps-cdn.azureedge.net/assets/8097-wy.png" alt="" />,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const BaseMapStates: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: ['Default', 'Hover', 'Focus'],
    type: 'button',
    title: 'Aluskaardid',
    content: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const Stack: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: ['Default', 'Hover', 'Focus'],
    type: 'button',
    title: 'Aluskaardid',
    content: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
    multiple: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const Selection: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: ['Default', 'Hover', 'Focus'],
    type: 'selection',
    title: 'Aluskaardid',
    content: <img src="https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png" alt="" />,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

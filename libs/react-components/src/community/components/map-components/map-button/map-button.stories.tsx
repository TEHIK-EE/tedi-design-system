import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Icon, Row, Text, TextProps, VerticalSpacing } from '../../../../tedi';
import ButtonGroup, { ButtonGroupProps } from '../button-group/button-group';
import MapButton, { MapButtonProps } from './map-button';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=2-214&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof MapButton> = {
  component: MapButton,
  title: 'Community/Map components/MapButton',
};

export default meta;
type Story = StoryObj<typeof MapButton>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus', 'Selected'];
type TemplateMultipleProps<Type = typeof buttonStateArray> = MapButtonProps & {
  array: Type;
  titleColor: TextProps['color'];
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, ...buttonProps } = args;

  return (
    <>
      <VerticalSpacing size={0.5}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="display-flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <MapButton id={value} {...buttonProps} selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} {...buttonProps} iconRight="straighten" selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} {...buttonProps} selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} {...buttonProps} icon="straighten" selected={value === 'Selected'} hideLabel>
                Text
              </MapButton>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <MapButton id={value} size="small" {...buttonProps} selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton
                id={value}
                size="small"
                {...buttonProps}
                iconRight="straighten"
                selected={value === 'Selected'}
              >
                Text
              </MapButton>
              <MapButton id={value} size="small" {...buttonProps} iconLeft="edit" selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton
                id={value}
                size="small"
                {...buttonProps}
                icon="straighten"
                selected={value === 'Selected'}
                hideLabel
              >
                Text
              </MapButton>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const HideLabel: Story = {
  args: {
    children: 'Text',
    hideLabel: true,
    icon: 'straighten',
    size: 'small',
  },
};

export const WithDropdown: Story = {
  args: {
    children: 'Text',
    icon: 'straighten',
    dropdownItems: [
      {
        children: (
          <Text>
            <Icon name="radio_button_unchecked" display="inline" /> Mõõda ringina
          </Text>
        ),
        isActive: true,
        onClick: () => console.log('Item 1 clicked'),
      },
      {
        children: (
          <Text>
            <Icon name="polyline" display="inline" /> Mõõda joonena
          </Text>
        ),
        onClick: () => console.log('Item 2 clicked'),
      },
      {
        children: (
          <Text>
            <Icon name="check_box_outline_blank" display="inline" /> Mõõda ala
          </Text>
        ),
        onClick: () => console.log('Item 3 clicked'),
      },
    ],
  },
};

export const States: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

const TemplateGroup: StoryFn<ButtonGroupProps> = (args) => {
  return (
    <ButtonGroup {...args}>
      <MapButton icon="location_on">Punkt</MapButton>
      <MapButton icon="straighten">Mõõda</MapButton>
      <MapButton icon="compare">Võrdle</MapButton>
      <MapButton icon="history">Ajajoon</MapButton>
    </ButtonGroup>
  );
};

export const ButtonGroupHorizontal: StoryObj<ButtonGroupProps> = {
  render: TemplateGroup,
  args: {
    direction: 'horizontal',
  },
};

export const ButtonGroupVertical: StoryObj<ButtonGroupProps> = {
  render: TemplateGroup,
  args: {
    direction: 'vertical',
  },
};

export const ButtonGroupHorizontalSuffixAndPrefix: StoryFn<ButtonGroupProps> = (args) => {
  return (
    <VerticalSpacing>
      <ButtonGroup suffix="Suffix" ariaLabel="Example button group">
        <MapButton id="btn1" size="small" icon="location_on">
          Button 1
        </MapButton>
        <MapButton id="btn2" size="small" icon="history">
          Button 2
        </MapButton>
      </ButtonGroup>
      <ButtonGroup prefix="Prefix" ariaLabel="Example button group">
        <MapButton id="btn1" size="small" icon="location_on">
          Button 1
        </MapButton>
        <MapButton id="btn2" size="small" icon="history">
          Button 2
        </MapButton>
      </ButtonGroup>
    </VerticalSpacing>
  );
};

export const ButtonGroupHVerticalSuffixAndPrefix: StoryFn<ButtonGroupProps> = (args) => {
  return (
    <VerticalSpacing>
      <ButtonGroup suffix="0" ariaLabel="Example button group" direction="vertical">
        <MapButton id="btn1" size="small" icon="location_on">
          Button 1
        </MapButton>
        <MapButton id="btn2" size="small" icon="history">
          Button 2
        </MapButton>
      </ButtonGroup>
      <ButtonGroup prefix="0" ariaLabel="Example button group" direction="vertical">
        <MapButton id="btn1" size="small" icon="location_on">
          Button 1
        </MapButton>
        <MapButton id="btn2" size="small" icon="history">
          Button 2
        </MapButton>
      </ButtonGroup>
    </VerticalSpacing>
  );
};

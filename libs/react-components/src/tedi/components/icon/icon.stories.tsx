import { Meta, StoryFn, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { Col, Row } from '../grid';
import { Icon, IconProps } from './icon';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/28835d-icon" target="_BLANK">Zeroheight ↗</a><hr/>
 * <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_BLANK">Official Google Material Icons homepage icons ↗</a><br/>
 * <a href="https://www.figma.com/community/file/1014241558898418245/material-design-icons?searchSessionId=lvxhc4l5-a6 target="_BLANK">Material Icons Figma ↗</a><br/>
 * <a href="https://www.figma.com/community/plugin/740272380439725040/material-design-icons" target="_BLANK">Figma Material Symbols plugin ↗</a>
 */
const meta: Meta<typeof Icon> = {
  title: 'Tedi-Ready/Base/Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<TemplateMultipleProps>;

const sizeArray: IconProps['size'][] = [8, 12, 16, 18, 24, 36, 48];
const colorArray: IconProps['color'][] = [
  'primary',
  'secondary',
  'tertiary',
  'brand',
  'brand-dark',
  'success',
  'warning',
  'warning-dark',
  'danger',
  'white',
];

interface TemplateMultipleProps<
  Type = IconProps['size'] | IconProps['color'] | IconProps['type'] | IconProps['background']
> extends IconProps {
  array: Type[];
  property: keyof IconProps;
  items: {
    name: string;
    property: string;
    color: IconProps['color'];
    background: IconProps['background'];
    size: IconProps['size'];
  }[];
}

const TemplateRow: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <>
      <Row>
        <Col>Outlined</Col>
      </Row>
      <Row alignItems="center">
        {array.map((value, key) => (
          <Col md="auto" key={key}>
            <div className={classNames({ 'bg bg-primary': value === 'white' })}>
              <Icon {...iconProps} {...{ [property]: value }} />
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>Filled</Col>
      </Row>
      <Row alignItems="center">
        {array.map((value, key) => (
          <Col md="auto" key={key}>
            <div className={classNames({ 'bg bg-primary': value === 'white' })}>
              <Icon {...iconProps} {...{ [property]: value }} filled={true} />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <div className="example-list w-50">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="w-50 d-flex">
            {value?.toString()}&nbsp;{value === 24 && <small className="example-text--secondary">default</small>}
          </Col>
          <Col className="d-flex">
            <Icon {...iconProps} {...{ [property]: value }} display="inline" />
            &nbsp;
            <Icon {...iconProps} {...{ [property]: value }} display="inline" filled={true} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColumnWithMultipleVariants: StoryFn<TemplateMultipleProps> = (args) => {
  const { items } = args;

  return (
    <div className="example-list w-50">
      {items.map((item, key) => (
        <Row
          justifyContent="start"
          className={`${key === items.length - 1 ? '' : 'border-bottom'} padding-14-16`}
          key={key}
        >
          <Col className="w-50 d-flex">
            {item.size?.toString()}&nbsp;
            {item.size === 24 && <small className="example-text--secondary">default</small>}
          </Col>
          <Col className="d-flex">
            <Icon
              {...{ size: item.size, background: item.background, name: item.name, color: item.color }}
              display="inline"
            />
            &nbsp;
            <Icon
              {...{ size: item.size, background: item.background, name: item.name, color: item.color }}
              display="inline"
              filled={true}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColumnWithBackgroundCircleVarians: StoryFn<TemplateMultipleProps> = (args) => {
  return (
    <Row alignItems="center">
      <Col md={4} sm={6}>
        <Row alignItems="center">
          <Col>
            <Icon name="Vaccines" background="brand-primary" color="white" />
          </Col>
          <Col>
            <Icon name="Info" background="brand-primary" color="white" size={16} />
          </Col>
          <Col>
            <Icon name="Vaccines" background="brand-secondary" color="brand" />
          </Col>
          <Col>
            <Icon name="Info" background="brand-secondary" color="brand" size={16} />
          </Col>
        </Row>
      </Col>
      <Col md={4} sm={6}>
        <Row alignItems="center" className="bg bg-primary">
          <Col>
            <Icon name="Vaccines" background="primary" color="brand" />
          </Col>
          <Col>
            <Icon name="Info" background="primary" color="brand" size={16} />
          </Col>
          <Col>
            <Icon name="Vaccines" background="secondary" color="white" />
          </Col>
          <Col>
            <Icon name="Info" background="secondary" color="white" size={16} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    name: 'account_circle',
  },
};

export const Sizes: Story = {
  name: 'Icon Size',
  render: TemplateColumn,

  args: {
    name: 'account_circle',
    property: 'size',
    color: 'primary',
    array: sizeArray,
  },
};

export const SizesWithBackground: Story = {
  name: 'Icon size inside background',
  render: TemplateColumnWithMultipleVariants,
  args: {
    items: [
      {
        name: 'info',
        property: 'size',
        color: 'brand',
        background: 'brand-secondary',
        size: 16,
      },
      {
        name: 'vaccines',
        property: 'size',
        color: 'brand',
        background: 'brand-secondary',
        size: 24,
      },
    ],
  },
};

export const Colors: Story = {
  render: TemplateRow,
  name: 'Icon colors',

  args: {
    name: 'account_circle',
    property: 'color',
    array: colorArray,
    size: 48,
  },
};

export const Backgrounds: Story = {
  render: TemplateColumnWithBackgroundCircleVarians,
  name: 'Icon background colors',
};
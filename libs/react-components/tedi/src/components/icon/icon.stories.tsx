import { Meta, StoryFn, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { Col, Row } from '../../../../community/src/components/grid';
import { Text } from '../../../../community/src/components/typography/text/text';
import { VerticalSpacing } from '../../../../community/src/components/vertical-spacing/vertical-spacing';
import Icon, { IconProps } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Tedi-components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the icon',
      table: { defaultValue: { summary: 'AccountCircle' } },
    },
    className: {
      control: 'text',
      description: 'Additional classes.',
      table: { defaultValue: { summary: '' } },
    },
    size: {
      control: { type: 'select' },
      options: [8, 12, 16, 18, 24, 36, 48, 120],
      description: 'Size of the icon',
      table: { defaultValue: { summary: '36' } },
    },
    type: {
      control: { type: 'select' },
      options: ['outlined', 'rounded', 'sharp'],
      description: 'Type of the icon',
      table: { defaultValue: { summary: 'outlined' } },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'muted', 'disabled', 'inverted', 'positive', 'important', 'warning'],
      description:
        'Which color Icon should be. Use "positive", "important" or "warning" with caution, usually they should not be in application UI',
      table: { defaultValue: { summary: 'default' } },
    },
    background: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'distinctive-primary', 'distinctive-secondary'],
      description: 'Add a background to the icon',
      table: { defaultValue: { summary: 'default' } },
    },
    display: {
      control: 'radio',
      options: ['block', 'inline'],
      description: 'Type of display. block by default',
      table: { defaultValue: { summary: 'block' } },
    },
    filled: {
      control: 'boolean',
      description: 'Render a filled variant of the icon',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<TemplateMultipleProps>;

const sizeArray: IconProps['size'][] = [8, 12, 16, 18, 24, 36, 48, 120];
const colorArray: IconProps['color'][] = [
  'inverted',
  'primary',
  'muted',
  'disabled',
  'positive',
  'warning',
  'important',
];
const backgroundArray: IconProps['background'][] = [
  'primary',
  'secondary',
  'distinctive-primary',
  'distinctive-secondary',
];

interface TemplateMultipleProps<
  Type = IconProps['size'] | IconProps['color'] | IconProps['type'] | IconProps['background']
> extends IconProps {
  array: Type[];
  property: keyof IconProps;
}

const TemplateRow: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <Row alignItems="center" gutterX={4} gap={2}>
      {array.map((value, key) => (
        <Col width="auto" key={key} className={classNames({ 'with-background': value === 'inverted' })}>
          <Icon {...iconProps} {...{ [property]: value }} name="AccountCircle" />
        </Col>
      ))}
    </Row>
  );
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <VerticalSpacing>
      {array.map((value, key) => (
        <Row alignItems="center" gutterX={2} key={key}>
          <Col width={1}>
            <Text modifiers="capitalize">{value?.toString()}</Text>
          </Col>
          <Col width="auto" className="d-flex">
            <Icon {...iconProps} {...{ [property]: value }} name="AccountCircle" display="inline" />
            <Icon {...iconProps} {...{ [property]: value }} name="AccountCircle" display="inline" filled />
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    name: 'AccountCircle',
    size: 36,
  },
};

export const Sizes: Story = {
  render: TemplateColumn,

  args: {
    property: 'size',
    color: 'primary',
    array: sizeArray,
  },
};

export const Backgrounds: Story = {
  render: TemplateRow,

  args: {
    property: 'background',
    array: backgroundArray,
    size: 18,
  },
};

export const Colors: Story = {
  render: TemplateRow,

  args: {
    property: 'color',
    array: colorArray,
  },

  parameters: {
    docs: {
      description: {
        // eslint-disable-next-line quotes
        story: 'Use "positive", "important" or "warning" with caution, usually they should not be in application UI.',
      },
    },
  },
};

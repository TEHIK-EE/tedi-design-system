import { Meta, StoryFn, StoryObj } from '@storybook/react';

import useLayout from '../../helpers/hooks/use-layout';
import { Col, Row } from '../grid';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import { Icon, IconProps } from './icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<TemplateMultipleProps>;

const sizeArray: IconProps['size'][] = [12, 14, 16, 18, 24, 36, 48];
const colorArray: IconProps['color'][] = [
  'default',
  'primary',
  'muted',
  'subtle',
  'disabled',
  'inverted',
  'positive',
  'important',
  'warning',
];
const typeArray: IconProps['type'][] = ['outlined', 'rounded', 'sharp'];

interface TemplateMultipleProps<Type = IconProps['size'] | IconProps['color'] | IconProps['type'] | IconProps['filled']>
  extends IconProps {
  array: Type[];
  property: keyof IconProps;
}

const TemplateMultiple: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <VerticalSpacing>
      {array.map((value, key) => (
        <Row key={key} alignItems="center" gutterX={2}>
          <Col width={1}>
            <Text modifiers="capitalize">{value?.toString()}</Text>
          </Col>
          <Col width="auto">
            <Icon {...iconProps} {...{ [property]: value }} name="home" />
          </Col>
          <Col width="auto">
            <Icon {...iconProps} {...{ [property]: value }} name="arrow_drop_down" />
          </Col>
          <Col width="auto">
            <Icon {...iconProps} {...{ [property]: value }} name="star_half" />
          </Col>
          <Col width="auto">
            <Icon {...iconProps} {...{ [property]: value }} name="arrow_circle_up" />
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
    name: 'home',
    size: 36,
    label: 'Example icon',
  },
};

/**
 * It is highly recommended to only use one `type` throughout your app. This ensures that only one icon font is downloaded.
 */
export const Types: Story = {
  render: TemplateMultiple,

  args: {
    size: 36,
    property: 'type',
    array: typeArray,
  },
};

export const Filled: Story = {
  render: TemplateMultiple,

  args: {
    size: 36,
    property: 'filled',
    array: [true, false],
  },
};

export const Sizes: Story = {
  render: TemplateMultiple,

  args: {
    property: 'size',
    array: sizeArray,
  },
};

/**
 * Use "positive", "important" or "warning" with caution, usually they should not be in application UI.
 */
export const Colors: Story = {
  render: TemplateMultiple,

  args: {
    property: 'color',
    array: colorArray,
  },
};

/**
 * Aligning icons with text can be achieved in two ways:<br/>
 * 1. Use `<Row>` and `<Col>` components and place icon and text in separate columns.
 * 1. Use `inline={true}` prop and place the icon as a text sibling. (Shown in this example)
 *
 * For both methods the `size` of the icon should be manually set to visually match the text. (Take note that h1-h6 font sizes differ on desktop/mobile)
 * Icon `size` should be rounded up from text size.
 * E.g. When text has `font-size: 32px`, then the icon should have `size={36}
 */
export const InText: Story = {
  render: (args) => {
    const isMobileLayout = useLayout(['mobile']);

    return (
      <div>
        <div>
          <Heading element="h1">
            <Icon name={args.name} display="inline" size={isMobileLayout ? 24 : 36} />
            This is level 1 heading with inline{' '}
            <Icon name={args.name} display="inline" size={isMobileLayout ? 24 : 36} /> icon
          </Heading>
          <Heading element="h2">
            <Icon name={args.name} display="inline" size={isMobileLayout ? 24 : 36} />
            This is level 2 heading with inline{' '}
            <Icon name={args.name} display="inline" size={isMobileLayout ? 24 : 36} /> icon
          </Heading>
          <Heading element="h3">
            <Icon name={args.name} display="inline" size={24} />
            This is level 3 heading with inline <Icon name={args.name} display="inline" size={24} /> icon
          </Heading>
          <Heading element="h4">
            <Icon name={args.name} display="inline" size={isMobileLayout ? 18 : 24} />
            This is level 4 heading with inline{' '}
            <Icon name={args.name} display="inline" size={isMobileLayout ? 18 : 24} /> icon
          </Heading>
          <Heading element="h5">
            <Icon name={args.name} display="inline" size={isMobileLayout ? 16 : 18} />
            This is level 5 heading with inline{' '}
            <Icon name={args.name} display="inline" size={isMobileLayout ? 16 : 18} /> icon
          </Heading>
          <Heading element="h6">
            <Icon name={args.name} display="inline" size={16} />
            This is level 6 heading with inline <Icon name={args.name} display="inline" size={16} /> icon
          </Heading>
          <p>
            <Icon name={args.name} display="inline" size={16} />
            This is paragraph text with inline <Icon name={args.name} display="inline" size={16} /> icon
          </p>
          <small>
            <Icon name={args.name} display="inline" size={14} />
            This is small text with inline <Icon name={args.name} display="inline" size={14} /> icon
          </small>
        </div>
      </div>
    );
  },

  args: {
    name: 'cancel',
  },
};

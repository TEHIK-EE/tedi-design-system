import { Meta, StoryFn, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import Icon, { IconProps } from './icon';

/**
 * Icons source: [Material icons](https://mui.com/material-ui/material-icons/)<br/>
 * Documentation: [Zeroheight](https://tedi.zeroheight.com/styleguide/s/118912/p/28835d-icon)<br/>
 * Design: [Figma](https://#)<br/>
 */
const meta: Meta<typeof Icon> = {
  title: 'Tedi-components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the icon',
      table: { defaultValue: { summary: '-' } },
    },
    className: {
      control: 'text',
      description: 'Additional classes',
      table: { defaultValue: { summary: '' } },
    },
    size: {
      control: { type: 'select' },
      options: [8, 12, 16, 18, 24, 36, 48, 120],
      description: 'Size of the icon',
      table: { defaultValue: { summary: '24' } },
    },
    type: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'rounded', 'sharp'],
      description: 'Type of the icon',
      table: { defaultValue: { summary: 'outlined' } },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'white'],
      description: 'Color of the icon',
      table: { defaultValue: { summary: 'primary' } },
    },
    background: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'distinctive-primary', 'distinctive-secondary'],
      description: 'Add a background to the icon',
      table: { defaultValue: { summary: '-' } },
    },
    display: {
      control: 'radio',
      options: ['block', 'inline'],
      description: 'Type of display. Block by default',
      table: { defaultValue: { summary: 'block' } },
    },
  },
};

export default meta;
type Story = StoryObj<TemplateMultipleProps>;

const sizeArray: IconProps['size'][] = [8, 12, 16, 18, 24, 36, 48, 120];
const colorArray: IconProps['color'][] = ['white', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];
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
    <div className="row">
      {array.map((value, key) => (
        <div key={key} className={classNames({ 'with-background': value === 'white' }, 'column')}>
          <Icon {...iconProps} {...{ [property]: value }} name="AccountCircle" />
        </div>
      ))}
    </div>
  );
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <div className="example-list w-50">
      {array.map((value, key) => (
        <div className={`row ${key === array.length - 1 ? '' : 'border-bottom'}`} key={key}>
          <div className="column w-50">
            <div className="display-flex">
              {value?.toString()}&nbsp;{value === 24 && <span className="example-text--secondary">default</span>}
            </div>
          </div>
          <div className="column">
            <div className="display-flex">
              <Icon {...iconProps} {...{ [property]: value }} name="AccountCircle" display="inline" />
              &nbsp;
              <Icon {...iconProps} {...{ [property]: value }} name="AccountCircle" display="inline" type="filled" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    name: 'AccountCircle',
    size: 24,
    label: 'Example icon',
    color: 'primary',
  },
};

export const Sizes: Story = {
  name: 'Icon Size',
  render: TemplateColumn,

  args: {
    property: 'size',
    color: 'primary',
    array: sizeArray,
  },
};

export const SizesWithBackground: Story = {
  name: 'Icon with background size',
  render: TemplateColumn,

  args: {
    property: 'size',
    color: 'primary',
    background: 'distinctive-secondary',
    array: [16, 24],
  },
};

export const Backgrounds: Story = {
  render: TemplateRow,

  args: {
    property: 'background',
    array: backgroundArray,
    size: 24,
  },
  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const Colors: Story = {
  render: TemplateRow,

  args: {
    property: 'color',
    array: colorArray,
    size: 24,
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

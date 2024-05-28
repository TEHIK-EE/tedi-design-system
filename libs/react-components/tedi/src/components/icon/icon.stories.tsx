import { Meta, StoryFn, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { Icon, IconProps } from './icon';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev)<br/>
 * [Zeroheight ↗](https://tedi.zeroheight.com/styleguide/s/118912/p/28835d-icons)<hr/>
 * [Official Google Material Icons homepage icons ↗](https://fonts.google.com/icons)<br/>
 * [Figma Material Symbols plugin ↗](https://www.figma.com/community/plugin/1088610476491668236/material-symbols)
 */
const meta: Meta<typeof Icon> = {
  title: 'Tedi-components/Base/Icon',
  component: Icon,
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;
type Story = StoryObj<TemplateMultipleProps>;

const sizeArray: IconProps['size'][] = [8, 12, 16, 18, 24, 36, 48];
const colorArray: IconProps['color'][] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'white'];

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
    <div>
      <div className="row padding-14-16">Outlined</div>
      <div className="row">
        {array.map((value, key) => (
          <div key={key} className="column">
            <div className={classNames({ 'with-background': value === 'white' })}>
              <Icon {...iconProps} {...{ [property]: value }} />
            </div>
          </div>
        ))}
      </div>
      <div className="row padding-14-16">Filled</div>
      <div className="row">
        {array.map((value, key) => (
          <div key={key} className="column">
            <div className={classNames({ 'with-background': value === 'white' })}>
              <Icon {...iconProps} {...{ [property]: value }} filled={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <div className="example-list w-50">
      {array.map((value, key) => (
        <div className={`row ${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <div className="column w-50">
            <div className="display-flex">
              {value?.toString()}&nbsp;{value === 24 && <small className="example-text--secondary">default</small>}
            </div>
          </div>
          <div className="column">
            <div className="display-flex">
              <Icon {...iconProps} {...{ [property]: value }} display="inline" />
              &nbsp;
              <Icon {...iconProps} {...{ [property]: value }} display="inline" filled={true} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TemplateColumnWithMultipleVariants: StoryFn<TemplateMultipleProps> = (args) => {
  const { items } = args;

  return (
    <div className="example-list w-50">
      {items.map((item, key) => (
        <div className={`row ${key === items.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <div className="column w-50">
            <div className="display-flex">
              {item.size?.toString()}&nbsp;
              {item.size === 24 && <small className="example-text--secondary">default</small>}
            </div>
          </div>
          <div className="column">
            <div className="display-flex">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TemplateColumnWithBackgroundCircleVarians: StoryFn<TemplateMultipleProps> = (args) => {
  return (
    <div className="row w-50">
      <div className="column">
        <div className="row">
          <div className="column">
            <Icon name="vaccines" background="distinctive-primary" color="white" />
          </div>
          <div className="column">
            <Icon name="info" background="distinctive-primary" color="white" size={16} />
          </div>
          <div className="column">
            <Icon name="vaccines" background="distinctive-secondary" color="secondary" />
          </div>
          <div className="column">
            <Icon name="info" background="distinctive-secondary" color="secondary" size={16} />
          </div>
        </div>
      </div>
      <div className="column">
        <div className="row with-background">
          <div className="column">
            <Icon name="vaccines" background="primary" color="secondary" />
          </div>
          <div className="column">
            <Icon name="info" background="primary" color="secondary" size={16} />
          </div>
          <div className="column">
            <Icon name="vaccines" background="secondary" color="white" />
          </div>
          <div className="column">
            <Icon name="info" background="secondary" color="white" size={16} />
          </div>
        </div>
      </div>
    </div>
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
        color: 'secondary',
        background: 'distinctive-secondary',
        size: 16,
      },
      {
        name: 'vaccines',
        property: 'size',
        color: 'secondary',
        background: 'distinctive-secondary',
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

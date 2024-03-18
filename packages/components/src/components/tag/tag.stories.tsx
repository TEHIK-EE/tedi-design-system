import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import { VerticalSpacing } from '../vertical-spacing';
import Tag, { TagColor, TagProps, TagSize, TagStatus, TagType } from './tag';

type TagTemplateProps<Type = string | boolean> = React.ComponentProps<typeof Tag> & {
  array: Type[];
  property: keyof TagProps;
};

const TagColors: TagColor[] = ['default', 'primary', 'accent', 'positive', 'warning', 'important'];
const TagTypes: TagType[] = ['default', 'secondary', 'ghost', 'invisible'];
const TagStatuses: TagStatus[] = ['error', 'inactive', 'success'];
const TagSizes: TagSize[] = ['default', 'large'];

const Capitalize = ({ children }: { children: React.ReactNode }) => (
  <span className="text-small text-muted text-capitalize">{children}</span>
);

const Template: StoryFn<TagTemplateProps> = (args) => {
  const { array, property, ...tagProps } = args;
  return (
    <VerticalSpacing>
      <Row>
        <Col></Col>
        {TagColors.map((color) => (
          <Col key={`${color}-title`}>
            <Capitalize>{color}</Capitalize>
          </Col>
        ))}
      </Row>

      {array.map((type, key) => (
        <Row key={key}>
          <Col>
            <Capitalize>{type}</Capitalize>
          </Col>
          {TagColors.map((color, index) => (
            <Col key={`${color}-${index}`}>
              <Tag color={color} {...{ [property]: type }} {...tagProps}>
                {property === 'iconOnly' || tagProps.iconOnly ? <Icon name="add" filled size={12} /> : 'J'}
              </Tag>
            </Col>
          ))}
        </Row>
      ))}
    </VerticalSpacing>
  );
};

const meta: Meta<TagTemplateProps> = {
  component: Tag,
  argTypes: {
    array: { table: { disable: true } },
    property: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: 'More about usage of Tag can be foud <a href="/docs/components-tag--tag-usage">here</a>',
      },
    },
  },
  render: Template,
};

export default meta;
type Story = StoryObj<TagTemplateProps>;

export const Default: Story = {
  args: {
    array: TagTypes,
    property: 'type',
  },
};

export const Status: Story = {
  args: {
    array: TagStatuses,
    property: 'status',
  },
};

export const Size: Story = {
  args: {
    array: TagSizes,
    property: 'size',
  },
};

export const SizeTypeGhost: Story = {
  args: {
    array: TagSizes,
    property: 'size',
    type: 'ghost',
  },
};

export const Rounded: Story = {
  args: {
    array: TagTypes,
    property: 'type',
    rounded: true,
  },
};

export const IconOnly: Story = {
  args: {
    array: TagTypes,
    property: 'type',
    iconOnly: true,
  },
};

export const WithArrow: Story = {
  args: {
    array: TagTypes,
    property: 'type',
    hasArrow: true,
  },
};

export const Loading: Story = {
  args: {
    array: TagTypes,
    property: 'type',
    isLoading: true,
  },
};

export const LoadingRoundLarge: Story = {
  render: (args) => <Tag {...args} />,
  args: {
    children: 'J',
    isLoading: true,
    rounded: true,
    size: 'large',
    type: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    array: TagTypes,
    property: 'type',
    isDisabled: true,
  },
};

export const WithLongText: Story = {
  render: (args) => <Tag {...args} />,
  args: {
    children: 'With Long text',
  },
};

export const WithLongTextRounded: Story = {
  render: (args) => <Tag {...args} />,
  args: {
    children: 'With Long text',
    rounded: true,
  },
};

export const CustomTag: Story = {
  render: (args) => <Tag {...args} />,
  args: {
    children: <Icon name="check" size={24} />,
    size: 'large',
    isDisabled: true,
    rounded: true,
    iconOnly: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Size large, disabled and rounded example with icon',
      },
    },
  },
};

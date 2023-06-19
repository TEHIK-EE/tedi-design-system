import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import { VerticalSpacing } from '../vertical-spacing';
import Tag, { TagColor, TagProps, TagSize, TagStatus, TagType } from './tag';

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
};

export default meta;
type Story = StoryObj<TagTemplateProps>;

const TagColors: TagColor[] = ['default', 'primary', 'accent', 'positive', 'warning', 'important'];
const TagTypes: TagType[] = ['default', 'secondary', 'ghost', 'invisible'];
const TagStatuses: TagStatus[] = ['error', 'inactive', 'success'];
const TagSizes: TagSize[] = ['default', 'large'];

const Capitalize = ({ children }: { children: React.ReactNode }) => (
  <span className="text-small text-muted text-capitalize">{children}</span>
);

interface TagTemplateProps<Type = string | boolean> extends TagProps {
  array: Type[];
  property: keyof TagProps;
}

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

export const Default: Story = {
  render: Template,

  args: {
    array: TagTypes,
    property: 'type',
  },
};

export const Status: Story = {
  render: Template,

  args: {
    array: TagStatuses,
    property: 'status',
  },
};

export const Size: Story = {
  render: Template,

  args: {
    array: TagSizes,
    property: 'size',
  },
};

export const SizeTypeGhost: Story = {
  render: Template,

  args: {
    array: TagSizes,
    property: 'size',
    type: 'ghost',
  },
};

export const Rounded: Story = {
  render: Template,

  args: {
    array: TagTypes,
    property: 'type',
    rounded: true,
  },
};

export const IconOnly: Story = {
  render: Template,

  args: {
    array: TagTypes,
    property: 'type',
    iconOnly: true,
  },
};

export const WithArrow: Story = {
  render: Template,

  args: {
    array: TagTypes,
    property: 'type',
    hasArrow: true,
  },
};

export const Loading: Story = {
  render: Template,

  args: {
    array: TagTypes,
    property: 'type',
    isLoading: true,
  },
};

export const LoadingRoundLarge: Story = {
  args: {
    children: 'J',
    isLoading: true,
    rounded: true,
    size: 'large',
    type: 'secondary',
  },
};

export const Disabled: Story = {
  render: Template,

  args: {
    array: TagTypes,
    property: 'type',
    isDisabled: true,
  },
};

export const WithLongText: Story = {
  args: {
    children: 'With Long text',
  },
};

export const WithLongTextRounded: Story = {
  args: {
    children: 'With Long text',
    rounded: true,
  },
};

export const CustomTag: Story = {
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

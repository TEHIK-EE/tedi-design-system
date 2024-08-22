import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Card from '../card/card';
import CardContent from '../card/card-content/card-content';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import { Text, TextProps } from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import Tag, { TagColor, TagProps, TagSize, TagStatus, TagType } from './tag';

type TagTemplateProps<Type = string | boolean> = React.ComponentProps<typeof Tag> & {
  array: Type[];
  property: keyof TagProps;
};

const TagColors: TagColor[] = ['default', 'primary', 'accent', 'positive', 'warning', 'important'];
const TagTypes: TagType[] = ['default', 'secondary', 'ghost', 'invisible', 'borderless'];
const TagStatuses: TagStatus[] = ['error', 'inactive', 'success'];
const TagSizes: TagSize[] = ['default', 'large'];

const Capitalize = ({ children, ...rest }: TextProps) => (
  <Text element="span" modifiers={['small', 'capitalize']} color="muted" {...rest}>
    {children}
  </Text>
);

const Template: StoryFn<TagTemplateProps> = (args) => {
  const { array, property, ...tagProps } = args;
  return (
    <VerticalSpacing size={0.25}>
      <Row>
        <Col></Col>
        {TagColors.map((color) => (
          <Col key={`${color}-title`}>
            <Capitalize>{color}</Capitalize>
          </Col>
        ))}
      </Row>

      {array.map((type, key) => (
        <Card borderless padding={0.5} background={type === 'borderless' ? 'bg-inverted' : 'transparent'} key={key}>
          <CardContent>
            <Row>
              <Col>
                <Capitalize color={type === 'borderless' ? 'inverted' : undefined}>{type}</Capitalize>
              </Col>
              {TagColors.map((color, index) => (
                <Col key={`${color}-${index}`}>
                  <Tag color={color} {...{ [property]: type }} {...tagProps}>
                    {property === 'iconOnly' || tagProps.iconOnly ? <Icon name="add" filled size={12} /> : 'J'}
                  </Tag>
                </Col>
              ))}
            </Row>
          </CardContent>
        </Card>
      ))}
    </VerticalSpacing>
  );
};

/**
 * More about usage of Tag can be found <a href="/docs/components-tag--tag-usage">here</a>
 */
const meta: Meta<TagTemplateProps> = {
  component: Tag,
  title: 'Community/Tag',
  argTypes: {
    array: { table: { disable: true } },
    property: { table: { disable: true } },
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

/**
 * Size large, disabled and rounded example with icon.
 */
export const CustomTag: Story = {
  render: (args) => <Tag {...args} />,
  args: {
    children: <Icon name="check" size={24} />,
    size: 'large',
    isDisabled: true,
    rounded: true,
    iconOnly: true,
  },
};

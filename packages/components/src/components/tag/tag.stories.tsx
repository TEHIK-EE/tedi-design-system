import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import { VerticalSpacing } from '../vertical-spacing';
import Tag, { TagColor, TagProps, TagSize, TagStatus, TagType } from './tag';

export default {
  title: 'components/Tag',
  component: Tag,
  argTypes: {
    array: { table: { disable: true } },
    property: { table: { disable: true } },
  },
} as Meta;

const TagColors: TagColor[] = ['default', 'primary', 'accent', 'positive', 'warning', 'important'];
const TagTypes: TagType[] = ['default', 'secondary', 'ghost', 'invisible'];
const TagStatuses: TagStatus[] = ['error', 'inactive', 'success'];
const TagSizes: TagSize[] = ['small', 'default', 'medium'];

const Capitalize = ({ children }: { children: React.ReactNode }) => (
  <span className="text-small text-muted text-capitalize">{children}</span>
);

interface TagTemplateProps<Type = string | boolean> extends TagProps {
  array: Type[];
  property: keyof TagProps;
}

const Template: Story<TagTemplateProps> = (args) => {
  const { array, property, ...tagProps } = args;
  return (
    <VerticalSpacing>
      <Row>
        <Col></Col>
        {TagColors.map((color, index) => (
          <Col key={index}>
            <Capitalize>{color}</Capitalize>
          </Col>
        ))}
      </Row>

      {array.map((type, key) => (
        <>
          <Row key={key}>
            <Col>
              <Capitalize>{type}</Capitalize>
            </Col>
            {TagColors.map((color, index) => (
              <Col key={index}>
                <Tag color={color} {...{ [property]: type }} {...tagProps}>
                  {property === 'iconOnly' || tagProps.iconOnly ? <Icon name="circle" filled size={12} /> : 'J'}
                </Tag>
              </Col>
            ))}
          </Row>
        </>
      ))}
    </VerticalSpacing>
  );
};

const SeparateTemplate: Story<TagProps> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  array: TagTypes,
  property: 'type',
};

export const Status = Template.bind({});
Status.args = {
  array: TagStatuses,
  property: 'status',
};

export const Size = Template.bind({});
Size.args = {
  array: TagSizes,
  property: 'size',
};

export const SizeTypeGhost = Template.bind({});
SizeTypeGhost.args = {
  array: TagSizes,
  property: 'size',
  type: 'ghost',
};

export const Rounded = Template.bind({});
Rounded.args = {
  array: TagTypes,
  property: 'type',
  rounded: true,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  array: TagTypes,
  property: 'type',
  iconOnly: true,
};

export const WithArrow = Template.bind({});
WithArrow.args = {
  array: TagTypes,
  property: 'type',
  hasArrow: true,
};

export const Loading = Template.bind({});
Loading.args = {
  array: TagTypes,
  property: 'type',
  isLoading: true,
};

export const LoadingRoundMedium = SeparateTemplate.bind({});
LoadingRoundMedium.args = {
  children: 'J',
  isLoading: true,
  rounded: true,
  size: 'medium',
  type: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  array: TagTypes,
  property: 'type',
  isDisabled: true,
};

export const WithLongText = SeparateTemplate.bind({});
WithLongText.args = {
  children: 'With Long text',
};

export const CustomTag = SeparateTemplate.bind({});
CustomTag.args = {
  children: <Icon name="check" size={24} />,
  size: 'medium',
  isDisabled: true,
  rounded: true,
  iconOnly: true,
};
CustomTag.parameters = {
  docs: {
    description: {
      story: 'Size medium, disabled and rounded example with icon',
    },
  },
};

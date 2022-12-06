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

const TagColors: TagColor[] = ['default', 'primary', 'primary-accent', 'secondary', 'success', 'warning', 'important'];
const TagTypes: TagType[] = ['default', 'ghost', 'icon', 'invisible'];
const TagStatuses: TagStatus[] = ['error', 'inactive', 'success'];
const TagSizes: TagSize[] = ['small', 'default', 'medium'];

const Capitalize = ({ children }: { children: React.ReactNode }) => (
  <span className="text-small text-secondary" style={{ textTransform: 'capitalize' }}>
    {children}
  </span>
);

interface TagTemplateProps<Type = string | boolean> {
  array: Type[];
  property: keyof TagProps;
}

const Template: Story<TagTemplateProps> = (args) => (
  <VerticalSpacing>
    <Row>
      <Col></Col>
      {TagColors.map((color, index) => (
        <Col key={index}>
          <Capitalize>{color}</Capitalize>
        </Col>
      ))}
    </Row>

    {args.array.map((type, key) => (
      <>
        <Row key={key}>
          <Col>
            <Capitalize>{type}</Capitalize>
          </Col>
          {TagColors.map((color, index) => (
            <Col key={index}>
              <Tag color={color} {...{ [args.property]: type }}>
                {type === 'icon' ? <Icon name="circle" filled size={12} /> : 'J'}
              </Tag>
            </Col>
          ))}
        </Row>
        <Row>
          <Col></Col>
          {TagColors.map((color, index) => (
            <Col key={index}>
              <Tag rounded color={color} {...{ [args.property]: type }}>
                {type === 'icon' ? <Icon name="circle" filled size={12} /> : 'J'}
              </Tag>
            </Col>
          ))}
        </Row>
      </>
    ))}
  </VerticalSpacing>
);

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

export const WithArrow = Template.bind({});
WithArrow.args = {
  array: [true],
  property: 'hasArrow',
};

export const Loading = Template.bind({});
Loading.args = {
  array: [true],
  property: 'isLoading',
};

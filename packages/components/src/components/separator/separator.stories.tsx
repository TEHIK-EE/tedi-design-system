import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import Separator, { SeparatorProps } from './separator';

export default {
  title: 'components/Separator',
  component: Separator,
} as Meta;

const Template: Story<SeparatorProps> = (args) => (
  <>
    <p className="text-secondary">Some content</p>
    <Separator {...args} />
    <p className="text-secondary">Some content</p>
  </>
);

export const Default = Template.bind({});
Default.args = {};

export const ColorAccent = Template.bind({});
ColorAccent.args = { color: 'accent' };

export const PaddedEven = Template.bind({});
PaddedEven.args = { spacing: 1 };

export const PaddedUneven = Template.bind({});
PaddedUneven.args = { topSpacing: 2.5, bottomSpacing: 0.5 };

const TemplateCard: Story<SeparatorProps> = (args) => (
  <Card>
    <CardContent>
      <p className="text-secondary">Some content</p>
      <Separator {...args} />
      <p className="text-secondary">Some content</p>
    </CardContent>
  </Card>
);

export const FullWidthInsideCard = TemplateCard.bind({});
FullWidthInsideCard.args = { fullWidth: true };

const TemplateVertical: Story<SeparatorProps> = (args) => (
  <Card>
    <CardContent>
      <Row direction="row">
        <Col>
          <p>Some content</p>
        </Col>
        <Col width="auto" shrink={1}>
          <Separator {...args} />
        </Col>
        <Col>
          <p>Some Content</p>
        </Col>
      </Row>
    </CardContent>
  </Card>
);

export const Vertical = TemplateVertical.bind({});
Vertical.args = { axis: 'vertical', fullWidth: true };

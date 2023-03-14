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
      <Row>
        <Col xs="auto" md={2}>
          <p className="text-right">12.12.2012</p>
        </Col>
        <Col width="auto">
          <Separator {...args} />
        </Col>
        <Col>
          <div className="h6">Card content title</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem rem nisi quae? Rem, amet! Veritatis
            laboriosam consectetur ipsum quae. Amet voluptatibus quod eaque at nostrum id provident? Cum, maiores
            libero!
          </p>
        </Col>
      </Row>
    </CardContent>
  </Card>
);

export const Vertical = TemplateVertical.bind({});
Vertical.args = { axis: 'vertical', fullWidth: true };

export const VerticalDotted = TemplateVertical.bind({});
VerticalDotted.args = { axis: 'vertical', variant: 'dotted', color: 'accent', fullWidth: true };

export const VerticalDottedSmall = TemplateVertical.bind({});
VerticalDottedSmall.args = { axis: 'vertical', variant: 'dotted-small', color: 'accent', fullWidth: true };

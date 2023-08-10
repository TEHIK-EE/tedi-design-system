import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import { Text } from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import Separator, { SeparatorProps } from './separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

const colorArray: SeparatorProps['color'][] = ['default', 'contrast', 'accent'];

const Template: StoryFn<SeparatorProps> = (args) => (
  <>
    <Text color="muted">Some content</Text>
    <Separator {...args} />
    <Text color="muted">Other content</Text>
  </>
);

const ColorTemplate: StoryFn<SeparatorProps> = (args) => (
  <VerticalSpacing>
    {colorArray.map((color) => (
      <React.Fragment key={color}>
        <Text modifiers="capitalize" element="span">
          {color}
        </Text>
        <Separator {...args} color={color} />
      </React.Fragment>
    ))}
  </VerticalSpacing>
);

const VerticalColorTemplate: StoryFn<SeparatorProps> = (args) => (
  <Row>
    {colorArray.map((color) => (
      <Col key={color}>
        <Row>
          <Col width="auto">
            <Text modifiers="capitalize-first">{color}</Text>
          </Col>
          <Col width="auto">
            <Separator {...args} color={color} />
          </Col>
        </Row>
      </Col>
    ))}
  </Row>
);

export const Default: Story = {
  render: Template,
  args: {},
};

export const Colors: Story = {
  render: ColorTemplate,
  args: {},
};

export const VerticalColors: Story = {
  render: VerticalColorTemplate,
  args: {
    axis: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: '<p>Use <code>Row</code> & <code>Col</code> components to give spacing around vertical separator</p>',
      },
    },
  },
};

export const PaddedEven: Story = {
  render: Template,
  args: { spacing: 1 },
  parameters: {
    docs: {
      description: {
        story: '<p>Use <code>spacing</code> property to add even spacing before and after separator</p>',
      },
    },
  },
};

export const PaddedUneven: Story = {
  render: Template,
  args: { topSpacing: 2.5, bottomSpacing: 0.5 },
  parameters: {
    docs: {
      description: {
        story:
          '<p>Use <code>topSpacing</code> & <code>bottomSpacing</code> properties to add uneven spacing before and after separator</p>',
      },
    },
  },
};

const TemplateCard: StoryFn<SeparatorProps> = (args) => (
  <Card padding={1.5}>
    <CardContent>
      <Text color="muted">Some content</Text>
      <Separator {...args} />
      <Text color="muted">Some content</Text>
    </CardContent>
  </Card>
);

export const FullWidthInsideCard: Story = {
  render: TemplateCard,
  args: { fullWidth: true },
  parameters: {
    docs: {
      description: {
        story:
          '<p>Property <code>fullwidth=true</code> will allow separator to grow to border of Card taking padding of CardContent into account. Both vertically and horisontally.</p>',
      },
    },
  },
};

const TemplateVertical: StoryFn<SeparatorProps> = (args) => (
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

export const Vertical: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', fullWidth: true },
};

export const VerticalDotted: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted', color: 'accent', fullWidth: true },
};

export const VerticalDottedSmall: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted-small', color: 'accent', fullWidth: true },
};

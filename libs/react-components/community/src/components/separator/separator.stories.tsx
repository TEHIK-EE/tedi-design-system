import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../../tedi/src/components/grid';
import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Text } from '../typography/text/text';
import Separator, { SeparatorProps } from './separator';

/**
 * Used to visually separate or divide sections or content within a user interface. It helps create a clear visual
 * distinction between different elements, <br/>providing structure and improving the overall readability and organization of
 * the interface. They can be used vertically and horizontally.
 */
const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Community/Separator',
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

/**
 * Use `Row` & `Col` components to give spacing around vertical separator.
 */
export const VerticalColors: Story = {
  render: VerticalColorTemplate,
  args: {
    axis: 'vertical',
  },
};

/**
 * Use `thickness` property to make separator thicker.
 */
export const Thick: Story = {
  render: Template,
  args: { thickness: 2 },
};

/**
 * Use `spacing` property to add even spacing before and after separator.
 */
export const PaddedEven: Story = {
  render: Template,
  args: { spacing: 1 },
};

/**
 * Use `topSpacing` & `bottomSpacing` properties to add uneven spacing before and after separator.
 */
export const PaddedUneven: Story = {
  render: Template,
  args: { topSpacing: 2.5, bottomSpacing: 0.5 },
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

/**
 * Property `fullwidth=true` will allow separator to grow to border of Card taking padding of CardContent into account. Both vertically and horizontally.
 */
export const FullWidthInsideCard: Story = {
  render: TemplateCard,
  args: { fullWidth: true },
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

export const VerticalThick: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', thickness: 2, fullWidth: true },
};

export const VerticalDotted: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted', color: 'accent', fullWidth: true },
};

export const VerticalDottedSmall: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted-small', color: 'accent', fullWidth: true },
};

const TemplateCustomHeight: StoryFn<SeparatorProps> = (args) => (
  <Row alignItems="center">
    <Col xs="auto" md={2}>
      <p className="text-right">12.12.2012</p>
    </Col>
    <Col width="auto">
      <Separator {...args} />
    </Col>
    <Col>
      <Button>Button</Button>
    </Col>
  </Row>
);

/**
 * Height property can be used to set custom height of vertical separator. Mainly used when separating vertically two components. And design needs the separator follow the height of the smaller component.
 */
export const VerticalCustomHeight: Story = {
  render: TemplateCustomHeight,
  args: {
    axis: 'vertical',
    height: 1.5,
  },
};

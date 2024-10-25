import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Card } from '../../../community/components/card/card';
import { CardContent } from '../../../community/components/card/card-content/card-content';
import { Col, Row } from '../../../tedi/components/grid';
import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import { Text } from '../typography/text/text';
import Separator, { SeparatorProps } from './separator';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=3518-32729&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/01debb-separator)
 */

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'TEDI-Ready/Helpers/Separator',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

const colorArray: SeparatorProps['color'][] = ['primary', 'secondary', 'accent'];

const Template: StoryFn<SeparatorProps> = (args) => (
  <>
    <Text color="secondary">Some content</Text>
    <Separator {...args} />
    <Text color="secondary">Other content</Text>
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
};

export const Thick: Story = {
  render: Template,
  args: { thickness: 2 },
};

export const PaddedEven: Story = {
  render: Template,
  args: { spacing: 1 },
};

export const PaddedUneven: Story = {
  render: Template,
  args: { topSpacing: 2.5, bottomSpacing: 0.5 },
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
  args: { axis: 'vertical', isStretched: true },
};

export const VerticalThick: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', thickness: 2, isStretched: true },
};

export const VerticalDotted: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted', color: 'accent', isStretched: true },
};

export const VerticalDottedSmall: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted-small', color: 'accent', isStretched: true },
};

const TemplateCustomHeight: StoryFn<SeparatorProps> = (args) => (
  <Row alignItems="center">
    <Col xs="auto" md={2}>
      <p className="text-right">12.12.2012</p>
    </Col>
    <Col width="auto">
      <Separator {...args} />
    </Col>
  </Row>
);

export const VerticalCustomHeight: Story = {
  render: TemplateCustomHeight,
  args: {
    axis: 'vertical',
    height: 1.5,
  },
};

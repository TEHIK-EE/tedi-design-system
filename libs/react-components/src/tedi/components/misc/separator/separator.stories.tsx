import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Card, CardContent } from '../../cards/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator, { SeparatorProps } from './separator';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=3518-32729&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/01debb-separator" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'TEDI-Ready/Components/Helpers/Separator',
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

const ColorsAndThickness: StoryFn<SeparatorProps> = (args) => (
  <>
    {colorArray.map((color, index) => (
      <>
        <Row key={index}>
          <Col>
            <Separator color={color} thickness={1} {...args} />
          </Col>
        </Row>
        <Row key={index}>
          <Col>
            <Separator color={color} thickness={2} {...args} />
          </Col>
        </Row>
      </>
    ))}
  </>
);

const VerticalColorTemplate: StoryFn<SeparatorProps> = (args) => (
  <Row>
    {colorArray.map((color) => (
      <Col width="auto" key={color}>
        <Row>
          <Col width="auto">
            <Separator {...args} color={color} />
          </Col>
          <Col width="auto">
            <Separator {...args} thickness={2} color={color} />
          </Col>
        </Row>
      </Col>
    ))}
  </Row>
);

const DotOnlyTemplate: StoryFn<SeparatorProps> = (args) => (
  <Row>
    <Col>
      <Separator {...args} variant="dot-only" color="secondary" dotSize="extra-small" />
      <Separator {...args} variant="dot-only" color="secondary" dotSize="small" />
      <Separator {...args} variant="dot-only" color="secondary" dotSize="medium" />
      <Separator {...args} variant="dot-only" color="secondary" dotSize="large" />
    </Col>
  </Row>
);

export const Default: Story = {
  render: Template,
  args: { spacing: 1 },
};

export const HorizontalColors: Story = {
  render: ColorsAndThickness,
  args: { spacing: 1 },
};

export const VerticalColors: Story = {
  render: VerticalColorTemplate,
  args: { axis: 'vertical', height: 5 },
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

export const HorizontalDottedSeparator: Story = {
  render: () => (
    <Row>
      <Col lg={3} md={6} sm={12}>
        <VerticalSpacing size={2}>
          <Separator axis="horizontal" variant="dotted" color="accent" />
          <Separator axis="horizontal" variant="dotted-small" color="accent" />
        </VerticalSpacing>
      </Col>
    </Row>
  ),
};

export const DotOnly: Story = {
  render: DotOnlyTemplate,
  args: { spacing: 0.5 },
};

const InlineSeparatorTemplate: StoryFn<SeparatorProps> = (args) => (
  <VerticalSpacing>
    <Text>
      Lorem ipsum dolor sit, amet
      <Separator color="primary" spacing={0.5} {...args} />
      consectetur adipisicing elit.
    </Text>
    <Text>
      Lorem ipsum dolor sit, amet
      <Separator color="secondary" spacing={1} {...args} />
      consectetur adipisicing elit.
    </Text>
    <Text>
      Lorem ipsum dolor sit, amet
      <Separator color="accent" spacing={1.5} {...args} />
      consectetur adipisicing elit.
    </Text>
    <Text>
      Lorem ipsum dolor sit, amet
      <Separator {...args} color="secondary" spacing={0.5} variant="dot-only" dotSize="small" />
      consectetur adipisicing elit.
    </Text>
  </VerticalSpacing>
);

export const InlineSeparatorUsedInText: Story = {
  render: InlineSeparatorTemplate,
  args: { axis: 'vertical', display: 'inline' },
};

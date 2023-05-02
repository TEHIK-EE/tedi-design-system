import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import Separator, { SeparatorProps } from './separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

const Template: StoryFn<SeparatorProps> = (args) => (
  <>
    <p className="text-secondary">Some content</p>
    <Separator {...args} />
    <p className="text-secondary">Some content</p>
  </>
);

export const Default: Story = {
  render: Template,
  args: {},
};

export const ColorAccent: Story = {
  render: Template,
  args: { color: 'accent' },
};

export const ColorContrast: Story = {
  render: Template,
  args: { color: 'contrast' },
};

export const PaddedEven: Story = {
  render: Template,
  args: { spacing: 1 },
};

export const PaddedUneven: Story = {
  render: Template,
  args: { topSpacing: 2.5, bottomSpacing: 0.5 },
};

const TemplateCard: StoryFn<SeparatorProps> = (args) => (
  <Card>
    <CardContent>
      <p className="text-secondary">Some content</p>
      <Separator {...args} />
      <p className="text-secondary">Some content</p>
    </CardContent>
  </Card>
);

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

export const VerticalDotted: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted', color: 'accent', fullWidth: true },
};

export const VerticalDottedSmall: Story = {
  render: TemplateVertical,
  args: { axis: 'vertical', variant: 'dotted-small', color: 'accent', fullWidth: true },
};

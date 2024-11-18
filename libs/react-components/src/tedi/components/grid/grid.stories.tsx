import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Heading } from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Col } from './col';
import { Row, RowProps } from './row';

/**
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/24da19-grid) <br/>
 * [Boostrap docs ↗](https://getbootstrap.com/docs/5.1/layout/grid/) <br/>
 * Row and Col components are inspired by Bootstrap V5 Grid System. <br/> You can use different Bootstrap grid classes
 * through component props.
 */
const meta: Meta<typeof Row> = {
  title: 'Tedi-Ready/Components/Helpers/Grid',
  component: Row,
  subcomponents: { Col: Col } as never,
  parameters: {
    status: {
      type: 'devComponent',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Row>;

const Template: StoryFn<RowProps> = (args) => (
  <div>
    <Row className="example-row" {...args}>
      <Col className="example-box">Col-1</Col>
      <Col className="example-box">Col-2</Col>
      <Col className="example-box">Col-3</Col>
    </Row>
    <Row className="example-row" justifyContent="between" {...args}>
      <Col className="example-box" sm={2} lg={3}>
        Col-1
      </Col>
      <Col className="example-box" sm={2} lg={3}>
        Col-2
      </Col>
      <Col className="example-box" sm={2} lg={3}>
        Col-3
      </Col>
    </Row>
    <Row className="example-row" cols={1} md={2} lg={3} xl={{ justifyContent: 'around' }} {...args}>
      <Col className="example-box" xl={{ width: 3, order: 'last' }}>
        Col-1
      </Col>
      <Col className="example-box" xl={{ width: 3, order: 0 }}>
        Col-2
      </Col>
      <Col className="example-box" xl={{ width: 3, order: 'first' }}>
        Col-3
      </Col>
    </Row>
    <Row className="example-row" gap={5} {...args}>
      <Col className="example-box">Col-1</Col>
      <Col className="example-box">Col-2</Col>
      <Col className="example-box">Col-3</Col>
    </Row>
  </div>
);

export const Default: Story = {
  render: Template,
};

export const CustomTags: StoryFn = () => (
  <VerticalSpacing size={2}>
    <VerticalSpacing size={0.5}>
      <Heading element="h4">Label/Value pairs</Heading>
      <Row>
        <Col>
          {/* Grouped rows */}
          <dl>
            <Row>
              <Col element="dt" width={2}>
                <strong>Label</strong>
              </Col>
              <Col element="dd">Value</Col>
            </Row>
            <Row>
              <Col element="dt" width={2}>
                <strong>Label</strong>
              </Col>
              <Col element="dd">Value</Col>
            </Row>
          </dl>
        </Col>

        {/* Non grouped rows */}
        <Col>
          <Row element="dl">
            <Col element="dt" width={2}>
              <strong>Label</strong>
            </Col>
            <Col element="dd" width={10}>
              Value
            </Col>
            <Col element="dt" width={2}>
              <strong>Label</strong>
            </Col>
            <Col element="dd" width={10}>
              Value
            </Col>
          </Row>
        </Col>
      </Row>
    </VerticalSpacing>

    <VerticalSpacing size={0.5}>
      <Heading element="h4">Lists</Heading>
      <Row element="ul" direction="column">
        <Col>Item 1</Col>
        <Col>Item 2</Col>
      </Row>
    </VerticalSpacing>
  </VerticalSpacing>
);

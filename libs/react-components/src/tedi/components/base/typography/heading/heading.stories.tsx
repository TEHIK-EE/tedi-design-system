import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TextRow } from '../../../../providers/storybook-provider/storybook-provider';
import { Col, Row } from '../../../layout/grid';
import { HeadingModifiers, Text } from '../text/text';
import { Heading } from './heading';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Heading> = {
  title: 'Tedi-Ready/Base/Typography/Heading',
  component: Heading,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

const headings: HeadingModifiers[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const TemplateHeadings: StoryFn = () => (
  <div className="example-list w-100">
    <Row className="border-bottom border-bottom--3x">
      <Col>
        <Text color="primary" className="padding-14-16">
          Desktop
        </Text>
      </Col>
      <Col>
        <Text color="primary" className="padding-14-16">
          Mobile
        </Text>
      </Col>
    </Row>
    {headings.map((heading, key) => (
      <TextRow
        key={heading}
        desktopText={
          <Text element={heading} modifiers={heading}>
            Heading {heading.toUpperCase()}
          </Text>
        }
        mobileText={
          <Text element={heading} modifiers={heading}>
            Heading {heading.toUpperCase()}
          </Text>
        }
        className={key !== headings.length - 1 ? 'border-bottom' : ''}
      />
    ))}
  </div>
);

export const Default: Story = {
  args: {
    children: 'Heading',
  },
};

export const Headings: Story = {
  render: TemplateHeadings,
};

export const CustomModifier: Story = {
  render: () => (
    <>
      <Heading element="h4" modifiers={['h1', 'bold']} color="warning">
        H4 heading with H1 styles and warning color
      </Heading>
      <Heading element="h2" modifiers={['normal', 'bold']} color="brand">
        H2 heading with normal bold text and brand color
      </Heading>
      <Heading element="h1" modifiers={['normal']}>
        H1 element with normal text styles
      </Heading>
    </>
  ),
};

export const SemanticHeadings: Story = {
  render: () => (
    <>
      <Row>
        <Col>
          <h1>Heading 1</h1>
        </Col>
        <Col>
          <Heading element="h1">Heading 1</Heading>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Heading 2</h2>
        </Col>
        <Col>
          <Heading element="h2">Heading 2</Heading>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Heading 3</h3>
        </Col>
        <Col>
          <Heading element="h3">Heading 3</Heading>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Heading 4</h4>
        </Col>
        <Col>
          <Heading element="h4">Heading 4</Heading>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Heading 5</h5>
        </Col>
        <Col>
          <Heading element="h5">Heading 5</Heading>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>Heading 6</h6>
        </Col>
        <Col>
          <Heading element="h6">Heading 6</Heading>
        </Col>
      </Row>
    </>
  ),
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TextRow } from '../../../providers/storybook-provider/storybook-provider';
import { Col, Row } from '../../grid';
import { HeadingModifiers, Text } from '../text/text';
import { Heading } from './heading';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Heading> = {
  title: 'Tedi-Ready/Base/Typography/Heading',
  component: Heading,
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

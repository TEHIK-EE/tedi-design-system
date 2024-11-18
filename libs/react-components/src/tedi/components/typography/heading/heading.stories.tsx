import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { TextRow } from '../../../providers/storybook-provider/storybook-provider';
import { Col, Row } from '../../grid';
import { HeadingModifiers, Text } from '../text/text';
import { Heading } from './heading';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev)<br/>
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography)
 */

const meta: Meta<typeof Heading> = {
  title: 'Tedi-ready/Base/Typography/Heading',
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

const headings: HeadingModifiers[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const TemplateHeadings: StoryFn = (args) => (
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

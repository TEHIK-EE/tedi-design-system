import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Column, Row, TextRow } from '../../../providers/storybook-provider/storybook-provider';
import { HeadingModifiers, Text } from '../text/text';
import { Heading } from './heading';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/4651ec-typography)
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
    <Row className="border-bottom">
      <Column>
        <Text color="primary">Desktop</Text>
      </Column>
      <Column>
        <Text color="primary">Mobile</Text>
      </Column>
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

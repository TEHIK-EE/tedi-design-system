import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../../tedi/components/grid';
import Heading, { HeadingProps } from './heading';

/**
 * This component is a wrapper for the `<Text>` component. It should only be used when we want to semantically render h1-h6 tags.<br />
 * The same result can be achieved by using the `<Text element="h1">`, but using this component gives a better indicator in code that we are using semantic headings.<br/>
 * **NB!** Headings have dynamic font styles, which means that they have different font-size/font-weight/line-height values for desktop/mobile.
 */
const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'Community/Typography/Heading',
  parameters: {
    status: {
      type: ['deprecated', 'ExistsInTediReady'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

const LevelTemplate: StoryFn<typeof Heading> = () => {
  const items: HeadingProps[] = [
    { children: 'This is heading element h1', element: 'h1' },
    { children: 'This is heading element h2', element: 'h2' },
    { children: 'This is heading element h3', element: 'h3' },
    { children: 'This is heading element h4', element: 'h4' },
    { children: 'This is heading element h5', element: 'h5' },
    { children: 'This is heading element h6', element: 'h6' },
  ];

  return (
    <div>
      {items.map((args, key) => (
        <Heading key={key} {...args} />
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    children: 'This is heading',
  },
};

export const DifferentElements: Story = {
  render: LevelTemplate,
};

export const CustomModifier: Story = {
  args: {
    children: 'This is heading element h1, with looks of h4',
    modifiers: 'h4',
  },
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

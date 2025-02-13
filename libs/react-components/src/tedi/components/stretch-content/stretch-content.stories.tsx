import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from '../buttons/button/button';
import { Card, CardContent, CardHeader } from '../cards/card';
import { Col, Row } from '../grid';
import { Heading } from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import StretchContent, { StretchContentProps } from './stretch-content';

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/76550e-stretchcontent" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof StretchContent> = {
  component: StretchContent,
  title: 'TEDI-Ready/Components/Helpers/StretchContent',
  parameters: {
    status: {
      type: [
        'devComponent',
        { name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' },
      ],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StretchContent>;

const Template: StoryFn<StretchContentProps> = (args) => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <StretchContent {...args}>
        <div className="example-box">Element that gets stretched</div>
      </StretchContent>
    </div>
  );
};

export const Default: Story = {
  render: Template,
};

export const CardsExample: StoryObj<Partial<StretchContentProps>> = {
  render: (args) => {
    const lorem = (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad expedita iste itaque laborum magnam non nulla
        tempora ullam! A consequuntur dicta et incidunt nisi pariatur sapiente, temporibus unde voluptatem?
      </p>
    );

    const card = (title: string, content: JSX.Element) => {
      return (
        <Card>
          <CardHeader background="brand-primary">
            <Heading element="h2">{title}</Heading>
          </CardHeader>
          <CardContent>
            <StretchContent>
              <Row direction="column" gap={4}>
                <Col>
                  <VerticalSpacing>{content}</VerticalSpacing>
                </Col>
                <Col width="auto">
                  <Button>Click me</Button>
                </Col>
              </Row>
            </StretchContent>
          </CardContent>
        </Card>
      );
    };

    return (
      <Row>
        <Col>
          <StretchContent>
            {card(
              'Card with longer content',
              <>
                {lorem}
                {lorem}
              </>
            )}
          </StretchContent>
        </Col>
        <Col>{card('Card that is not stretched', <>{lorem}</>)}</Col>
        <Col>
          <StretchContent>{card('Card where content is also stretched', <>{lorem}</>)}</StretchContent>
        </Col>
      </Row>
    );
  },
};

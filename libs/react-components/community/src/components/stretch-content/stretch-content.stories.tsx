import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../../tedi/src/components/grid';
import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import Button from '../button/button';
import { Card } from '../card';
import CardContent from '../card/card-content/card-content';
import CardHeader from '../card/card-header/card-header';
import Heading from '../typography/heading/heading';
import StretchContent, { StretchContentProps } from './stretch-content';

/**
 * StretchContent helps with cases where parent size is not defined by its children, and you need to scale the children to take all available space.<br/>
 * A real world use-case would be multiple Cards in one row. Example for that can be found in Equal Height Card stories.
 */
const meta: Meta<typeof StretchContent> = {
  component: StretchContent,
  title: 'Community/StretchContent',
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
  render: () => {
    const lorem = (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad expedita iste itaque laborum magnam non nulla
        tempora ullam! A consequuntur dicta et incidunt nisi pariatur sapiente, temporibus unde voluptatem?
      </p>
    );

    const card = (title: string, content: JSX.Element) => {
      return (
        <Card>
          <CardHeader>
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

import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Affix, { AffixPosition } from '../affix/affix';
import Button from '../button/button';
import Card from '../card/card';
import CardContent from '../card/card-content/card-content';
import Col from '../grid/col';
import Row from '../grid/row';
import StretchContent, { StretchContentProps } from '../stretch-content/stretch-content';
import Text from '../typography/text/text';
import VerticalSpacing from '../vertical-spacing/vertical-spacing';
import { HideOnScroll, HideOnScrollProps } from './hide-on-scroll';

const meta: Meta<HideOnScrollProps> = {
  component: HideOnScroll,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<HideOnScrollProps>;

const renderTestComponent = ({ children, animationDirection, ...args }: HideOnScrollProps) => {
  let bottom: AffixPosition = 0;
  let top: AffixPosition = 'unset';
  let left: AffixPosition = 0;
  let right: AffixPosition = 0;
  let direction: StretchContentProps['direction'] = 'horizontal';

  switch (animationDirection) {
    case 'up':
      bottom = 'unset';
      top = 0;
      break;
    case 'left':
      bottom = 0;
      top = 0;
      left = 0;
      right = 'unset';
      direction = 'vertical';
      break;
    case 'right':
      bottom = 0;
      top = 0;
      left = 'unset';
      right = 0;
      direction = 'vertical';
      break;
    case 'center':
    case 'down':
    default:
      break;
  }

  return (
    <Affix position="fixed" bottom={bottom} top={top} left={left} right={right}>
      <StretchContent direction={direction}>
        <HideOnScroll {...args} animationDirection={animationDirection}>
          <StretchContent>
            <Card background="primary-highlight">
              <CardContent>
                <StretchContent direction={direction}>
                  <Row alignItems="center" justifyContent="center">
                    <Col width="auto">
                      <Button>{children ?? 'I hide on scroll'}</Button>
                    </Col>
                  </Row>
                </StretchContent>
              </CardContent>
            </Card>
          </StretchContent>
        </HideOnScroll>
      </StretchContent>
    </Affix>
  );
};

const lorem = [...Array(10).keys()].map(() => faker.lorem.paragraphs(5));

const Template: StoryFn<HideOnScrollProps> = (args) => (
  <>
    {renderTestComponent(args)}
    <VerticalSpacing>
      {lorem.map((text, key) => (
        <Text key={key}>{text}</Text>
      ))}
    </VerticalSpacing>
  </>
);

const AnimationTemplate: StoryFn<HideOnScrollProps> = (args) => (
  <>
    {renderTestComponent({ ...args, children: 'I animate up', animationDirection: 'up' })}
    {renderTestComponent({ ...args, children: 'I animate left', animationDirection: 'left' })}
    {renderTestComponent({ ...args, children: 'I animate right', animationDirection: 'right' })}
    {renderTestComponent({ ...args, children: 'I animate down', animationDirection: 'down' })}
    <VerticalSpacing>
      {lorem.map((text, key) => (
        <Text key={key}>{text}</Text>
      ))}
    </VerticalSpacing>
  </>
);

export const Default: Story = {
  render: Template,
};

export const AnimationDirection: Story = {
  render: AnimationTemplate,
};

export const ScrollDirection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The component can also hide content for upwards scroll direction.',
      },
    },
  },
  render: AnimationTemplate,
  args: {
    scrollDirection: 'up',
  },
};

import { Meta, Story } from '@storybook/react';

import { Col, Row } from '../grid';
import Heading from '../heading/heading';
import Separator from '../separator/separator';
import { Card, CardProps } from './card';
import CardContent, { CardContentProps } from './card-content/card-content';
import CardHeader, { CardHeaderProps } from './card-header/card-header';

export default {
  title: 'components/Card',
  component: Card,
  subcomponents: { CardContent, CardHeader },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

export interface CardStory {
  card: CardProps;
  cardContent: CardContentProps;
  cardHeader: CardHeaderProps | boolean;
  cardContent2?: CardContentProps | boolean;
  splitContent?: boolean;
}

const Template: Story<CardStory> = (args) => {
  const getSplitContent = () => (
    <CardContent padding="none">
      <Row gutter={0}>
        <Col width={4}>
          <Card type="borderless">
            <CardContent>
              <p>Left</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis mollis augue, vitae aliquet elit
                congue a. Donec vitae sagittis odio, et maximus nulla. Quisque metus augue, euismod non auctor sed,
                consequat in ligula. Pellentesque consectetur, justo in luctus sagittis, metus justo ultricies leo, et
                mollis enim ipsum id erat. Pellentesque congue ante metus, ut tempor tortor lobortis non. Proin in
                ligula sed ante accumsan viverra. Ut et tempor neque.
              </p>
            </CardContent>
          </Card>
        </Col>
        <Col width={8}>
          <Card type="borderless">
            <CardContent background="background-light">right</CardContent>
          </Card>
        </Col>
      </Row>
    </CardContent>
  );

  const getDefaultContent = () => (
    <CardContent {...args.cardContent}>
      <p>Card content</p>
    </CardContent>
  );

  const getContent2 = (content: CardContentProps) => <CardContent {...content} />;

  const getCardHeader = (header: CardHeaderProps) => (
    <CardHeader {...header}>
      <Row justifyContent="between" alignItems="center">
        <Col width="auto">
          <Heading className="h3">Teated ja suunatud menetlused</Heading>
        </Col>
        <Col width="auto">
          <p>Otsing</p>
        </Col>
      </Row>
    </CardHeader>
  );

  return (
    <Card {...args.card}>
      {args.cardHeader && getCardHeader(typeof args.cardHeader === 'boolean' ? {} : args.cardHeader)}
      {args.splitContent ? getSplitContent() : getDefaultContent()}
      {args.cardContent2 && getContent2(typeof args.cardContent2 === 'boolean' ? {} : args.cardContent2)}
    </Card>
  );
};

export const Default = Template.bind({});
Default.args = {
  cardHeader: {
    style: 'default',
  },
};

export const WhiteHeader = Template.bind({});
WhiteHeader.args = {
  ...Default.args,
  cardHeader: {
    style: 'white',
  },
};

export const MultipleContent = Template.bind({});
MultipleContent.args = {
  ...Default.args,
  cardContent: {
    background: 'background-light',
  },
  cardContent2: {
    children: <p>Card content 2</p>,
  },
  cardHeader: false,
};

export const SplitCardBody = Template.bind({});
SplitCardBody.args = {
  ...Default.args,
  splitContent: true,
};

export const TypeBorderless = Template.bind({});
TypeBorderless.args = {
  ...Default.args,
  card: {
    type: 'borderless',
  },
  cardHeader: false,
};

export const TypeError = Template.bind({});
TypeError.args = {
  ...Default.args,
  card: {
    type: 'error',
  },
  cardHeader: false,
};

export const TypeWarning = Template.bind({});
TypeWarning.args = {
  ...Default.args,
  card: {
    type: 'warning',
  },
  cardHeader: false,
};

export const TypeSuccess = Template.bind({});
TypeSuccess.args = {
  ...Default.args,
  card: {
    type: 'success',
  },
  cardHeader: false,
};

export const PaddingNone = Template.bind({});
PaddingNone.args = {
  ...Default.args,
  cardHeader: false,
  cardContent: {
    padding: 'none',
  },
};

export const PaddingXSmall = Template.bind({});
PaddingXSmall.args = {
  ...Default.args,
  cardHeader: false,
  cardContent: {
    padding: 'xsmall',
  },
};

export const PaddingSmall = Template.bind({});
PaddingSmall.args = {
  ...Default.args,
  cardHeader: false,
  cardContent: {
    padding: 'small',
  },
};

export const PaddingFromCard = Template.bind({});
PaddingFromCard.args = {
  ...Default.args,
  cardHeader: false,
  card: {
    padding: 'large',
  },
};

const Timeline: Story<CardProps> = (args) => (
  <Card {...args}>
    <CardContent>
      <Row>
        <Col width={3}>
          <p>Card content</p>
        </Col>
        <Col width="auto">
          <Separator axis="vertical" color="accent" variant="dotted-small" fullWidth />
        </Col>
        <Col>
          <p>Card content</p>
        </Col>
      </Row>
    </CardContent>
  </Card>
);

export const TimelineCard = Timeline.bind({});
TimelineCard.args = {};

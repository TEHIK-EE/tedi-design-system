import { Meta, StoryFn } from '@storybook/react';

import Collapse from '../collapse/collapse';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import Separator from '../separator/separator';
import StretchContent from '../stretch-content/stretch-content';
import { CardsExample } from '../stretch-content/stretch-content.stories';
import Heading from '../typography/heading/heading';
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

const Template: StoryFn<CardStory> = (args) => {
  const getSplitContent = () => (
    <CardContent padding="none">
      <Row gutter={0}>
        <Col>
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
        <Col>
          <StretchContent>
            <Card type="borderless">
              <CardContent background="bg-muted">right</CardContent>
            </Card>
          </StretchContent>
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
          <Heading modifiers="h3">Teated ja suunatud menetlused</Heading>
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

export const Default = {
  render: Template,
  args: {},
};

export const WhiteHeader = {
  render: Template,

  args: {
    ...Default.args,
    cardHeader: {
      variant: 'white',
    },
  },
};

export const MultipleContent = {
  render: Template,

  args: {
    ...Default.args,
    cardContent: {
      background: 'background-light',
    },
    cardContent2: {
      children: <p>Card content 2</p>,
    },
    cardHeader: false,
  },
};

export const SplitCardBody = {
  render: Template,

  args: {
    ...Default.args,
    splitContent: true,
  },
};

export const TypeBorderless = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      type: 'borderless',
    },
    cardHeader: false,
  },
};

export const TypeError = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      type: 'error',
    },
    cardHeader: false,
  },
};

export const TypeWarning = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      type: 'warning',
    },
    cardHeader: false,
  },
};

export const TypeSuccess = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      type: 'success',
    },
    cardHeader: false,
  },
};

export const PaddingNone = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      padding: 'none',
    },
    cardHeader: true,
  },
};

export const PaddingXSmall = {
  render: Template,

  args: {
    ...Default.args,
    cardHeader: true,
    card: {
      padding: 'xsmall',
    },
  },
};

export const PaddingSmall = {
  render: Template,

  args: {
    ...Default.args,
    cardHeader: true,
    card: {
      padding: 'small',
    },
  },
};

export const PaddingLarge = {
  render: Template,

  args: {
    ...Default.args,
    cardHeader: {
      variant: 'white',
    },
    card: {
      padding: 'large',
    },
  },
};

export const OverridePaddingFromCard = {
  render: Template,

  args: {
    ...Default.args,
    cardContent: {
      padding: 'small',
    },
    cardHeader: true,
    card: {
      padding: 'large',
    },
  },
};

export const EqualHeight = {
  ...CardsExample,
};

const Timeline: StoryFn<CardProps> = (args) => (
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

export const TimelineCard = {
  render: Timeline,
  args: {},
};

const TwoToned: StoryFn<CardProps> = (args) => (
  <Row gutter={0}>
    <Col width="auto" className="flex">
      <Card borderRadius={{ right: false, bottom: false }}>
        <CardContent background="bg-muted">
          <Icon name="straighten" className="text-disabled"></Icon>
        </CardContent>
      </Card>
    </Col>
    <Col width="auto" className="flex">
      <Card borderRadius={{ left: false, top: false }}>
        <CardContent>
          <p className="text-bold">Some statistic: x kg</p>
          <Collapse id="collapse-1234567" openText="Näita rohkem" closeText="Näita vähem">
            <p>Some description</p>
          </Collapse>
        </CardContent>
      </Card>
    </Col>
  </Row>
);

export const TwoTonedCard = {
  render: TwoToned,
  args: {},
};

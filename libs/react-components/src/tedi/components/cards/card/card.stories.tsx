import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Col, Row } from '../../layout/grid';
import { Separator } from '../../misc/separator/separator';
import { StretchContent } from '../../misc/stretch-content/stretch-content';
import { CardsExample } from '../../misc/stretch-content/stretch-content.stories';
import {
  AlternativeCardsTemplate,
  BackgroundColorsTemplate,
  CardInfoTemplate,
  DefaultCardTemplates,
  HeaderTypesTemplate,
  SpacingTemplate,
} from './card-stories-templates';
import { Card, CardContentProps, CardNotificationProps, CardProps } from './index';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=163-19532&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/35d515-card" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'TEDI-Ready/Components/Cards/Card',
  component: Card,
  subcomponents: {
    'Card.Content': Card.Content,
    'Card.Header': Card.Header,
    'Card.Notification': Card.Notification,
  },
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replaceAll('CardContent', 'Card.Content')
            .replaceAll('CardHeader', 'Card.Header')
            .replaceAll('CardNotification', 'Card.Notification');
        },
      },
    },
  },
} as Meta;

export interface CardStory {
  card: CardProps;
  cardContent: CardContentProps | boolean;
  cardHeader: CardContentProps | boolean;
  cardNotification: CardNotificationProps | boolean;
  cardContent2?: CardContentProps | boolean;
  splitContent?: boolean;
}

type Story = StoryObj<CardStory>;

const Template: StoryFn<CardStory> = (args) => (
  <Card {...args}>
    <Card.Content>Description</Card.Content>
  </Card>
);

const GeneralTemplate: StoryFn<CardStory> = (args) => {
  const getSplitContent = () => (
    <Card.Content padding={0}>
      <Row gutter={0}>
        <Col>
          <Card borderless={true}>
            <Card.Content>
              <p>Left</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis mollis augue, vitae aliquet elit
                congue a. Donec vitae sagittis odio, et maximus nulla. Quisque metus augue, euismod non auctor sed,
                consequat in ligula. Pellentesque consectetur, justo in luctus sagittis, metus justo ultricies leo, et
                mollis enim ipsum id erat. Pellentesque congue ante metus, ut tempor tortor lobortis non. Proin in
                ligula sed ante accumsan viverra. Ut et tempor neque.
              </p>
            </Card.Content>
          </Card>
        </Col>
        <Col>
          <StretchContent>
            <Card borderless={true}>
              <Card.Content background="secondary">Right</Card.Content>
            </Card>
          </StretchContent>
        </Col>
      </Row>
    </Card.Content>
  );

  const getDefaultContent = (cardContent: CardContentProps) => (
    <Card.Content {...cardContent}>
      <p>Description</p>
    </Card.Content>
  );

  const getNotification = (notification: CardNotificationProps) => (
    <Card.Notification {...notification}>
      <p>Card notification</p>
    </Card.Notification>
  );

  const getContent2 = (content: CardContentProps) => <Card.Content {...content} />;

  const getCardHeader = (header: CardContentProps) => <Card.Header {...header}>{header.children}</Card.Header>;

  return (
    <Card {...args.card}>
      {args.cardHeader && getCardHeader(typeof args.cardHeader === 'boolean' ? {} : args.cardHeader)}
      {args.cardNotification &&
        getNotification(typeof args.cardNotification === 'boolean' ? {} : args.cardNotification)}
      {args.splitContent
        ? getSplitContent()
        : args.cardContent === false
        ? null
        : getDefaultContent(typeof args.cardContent === 'boolean' ? {} : args.cardContent)}
      {args.cardContent2 && getContent2(typeof args.cardContent2 === 'boolean' ? {} : args.cardContent2)}
    </Card>
  );
};

export const Default: Story = {
  render: Template,
};

export const HeaderTypes: Story = {
  render: HeaderTypesTemplate,
};

export const DefaultCard: Story = {
  render: DefaultCardTemplates,
};

export const CardInfo: Story = {
  render: CardInfoTemplate,
};

export const AlternativeCards: Story = {
  render: AlternativeCardsTemplate,
};

export const Spacing: Story = {
  render: SpacingTemplate,
};

export const Backgrounds: Story = {
  render: BackgroundColorsTemplate,
};

export const BorderColors: Story = {
  render: GeneralTemplate,
};

export const MultipleContent: Story = {
  render: GeneralTemplate,

  args: {
    ...Default.args,
    cardContent: {
      hasSeparator: true,
    },
    cardContent2: {
      children: <p>Description 2</p>,
    },
    cardHeader: false,
  },
};

export const SplitCardBody: Story = {
  render: GeneralTemplate,

  args: {
    ...Default.args,
    splitContent: true,
  },
};

export const Borderless: Story = {
  render: GeneralTemplate,

  args: {
    ...Default.args,
    card: {
      borderless: true,
    },
    cardHeader: false,
  },
};

export const WithoutBorderRadius: Story = {
  render: GeneralTemplate,

  args: {
    ...Default.args,
    card: {
      borderRadius: false,
    },
  },
};

export const BreakpointProps: Story = {
  render: GeneralTemplate,
  args: {
    card: {
      background: 'success-primary',
      border: 'brand-primary',
    },
    cardContent: {
      className: 'test123',
      background: undefined,
      sm: {
        background: 'brand-secondary',
        padding: 0,
      },
      md: {
        background: 'brand-tertiary',
        padding: 1,
      },
      lg: {
        background: undefined,
        padding: 1.5,
      },
    },
  },
};

export const EqualHeight = {
  ...CardsExample,
};

export const WithNotification: Story = {
  render: GeneralTemplate,
  args: {
    card: {
      padding: 0.75,
    },
    cardHeader: {
      background: 'primary',
      children: <Heading element="h3">Card title</Heading>,
    },
    cardNotification: true,
  },
};

const Timeline: StoryFn<CardProps> = (args) => (
  <Card {...args}>
    <Card.Content>
      <Row>
        <Col width={3}>
          <p>Card content</p>
        </Col>
        <Col width="auto">
          <Separator axis="vertical" color="accent" variant="dotted-small" isStretched />
        </Col>
        <Col>
          <p>Card content</p>
        </Col>
      </Row>
    </Card.Content>
  </Card>
);

export const TimelineCard: StoryObj<CardProps> = {
  render: Timeline,
  args: {},
};

const TwoToned: StoryFn<CardProps> = (_args) => (
  <Row gutter={0}>
    <Col width="auto">
      <StretchContent>
        <Card borderRadius={{ right: false, bottom: false }}>
          <Card.Content background="secondary">
            <Icon name="straighten" className="text-disabled"></Icon>
          </Card.Content>
        </Card>
      </StretchContent>
    </Col>
    <Col width="auto">
      <Card borderRadius={{ left: false, top: false }}>
        <Card.Content>
          <p className="text-bold">Some statistic: x kg</p>
          <p>Some description</p>
        </Card.Content>
      </Card>
    </Col>
  </Row>
);

export const TwoTonedCard: StoryObj<CardProps> = {
  render: TwoToned,
  args: {},
};

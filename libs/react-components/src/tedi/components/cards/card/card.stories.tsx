import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../../tedi/components/grid';
import { Icon } from '../../icon/icon';
import { Separator } from '../../separator/separator';
import { StretchContent } from '../../stretch-content/stretch-content';
import { CardsExample } from '../../stretch-content/stretch-content.stories';
import { Heading } from '../../typography/heading/heading';
import {
  AlternativeCardsTemplate,
  BackgroundColorsTemplate,
  CardInfoTemplate,
  DefaultCardTemplates,
  HeaderTypesTemplate,
  SpacingTemplate,
} from './card-stories-templates';
import {
  Card,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardNotification,
  CardNotificationProps,
  CardProps,
} from './index';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=163-19532&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/35d515-card" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'TEDI-Ready/Components/Cards/Card',
  component: Card,
  subcomponents: { CardContent, CardHeader, CardNotification },
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
} as Meta;

export interface CardStory {
  card: CardProps;
  cardContent: CardContentProps | boolean;
  cardHeader: CardHeaderProps | boolean;
  cardNotification: CardNotificationProps | boolean;
  cardContent2?: CardContentProps | boolean;
  splitContent?: boolean;
}

type Story = StoryObj<CardStory>;

const Template: StoryFn<CardStory> = (args) => {
  const getSplitContent = () => (
    <CardContent padding={0}>
      <Row gutter={0}>
        <Col>
          <Card borderless={true}>
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
            <Card borderless={true}>
              <CardContent background="secondary">right</CardContent>
            </Card>
          </StretchContent>
        </Col>
      </Row>
    </CardContent>
  );

  const getDefaultContent = (cardContent: CardContentProps) => (
    <CardContent {...cardContent}>
      <p>Description</p>
    </CardContent>
  );

  const getNotification = (notification: CardNotificationProps) => (
    <CardNotification {...notification}>
      <p>Card notification</p>
    </CardNotification>
  );

  const getContent2 = (content: CardContentProps) => <CardContent {...content} />;

  const getCardHeader = (header: CardHeaderProps) => <CardHeader {...header}>{header.children}</CardHeader>;

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
  args: {},
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
  render: Template,
};

export const MultipleContent: Story = {
  render: Template,

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
  render: Template,

  args: {
    ...Default.args,
    splitContent: true,
  },
};

export const Borderless: Story = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      borderless: true,
    },
    cardHeader: false,
  },
};

export const WithoutBorderRadius: Story = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      borderRadius: false,
    },
  },
};

export const BreakpointProps: Story = {
  render: Template,
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
  render: Template,
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
    <CardContent>
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
    </CardContent>
  </Card>
);

export const TimelineCard: StoryObj<CardProps> = {
  render: Timeline,
  args: {},
};

const TwoToned: StoryFn<CardProps> = (args) => (
  <Row gutter={0}>
    <Col width="auto">
      <StretchContent>
        <Card borderRadius={{ right: false, bottom: false }}>
          <CardContent background="secondary">
            <Icon name="straighten" className="text-disabled"></Icon>
          </CardContent>
        </Card>
      </StretchContent>
    </Col>
    <Col width="auto">
      <Card borderRadius={{ left: false, top: false }}>
        <CardContent>
          <p className="text-bold">Some statistic: x kg</p>
          <p>Some description</p>
        </CardContent>
      </Card>
    </Col>
  </Row>
);

export const TwoTonedCard: StoryObj<CardProps> = {
  render: TwoToned,
  args: {},
};
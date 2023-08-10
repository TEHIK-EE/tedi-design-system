import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Collapse from '../collapse/collapse';
import { Col, Row } from '../grid';
import Icon from '../icon/icon';
import Separator from '../separator/separator';
import StretchContent from '../stretch-content/stretch-content';
import { CardsExample } from '../stretch-content/stretch-content.stories';
import Heading from '../typography/heading/heading';
import Text from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import { Card, CardPadding, CardProps } from './card';
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

type Story = StoryObj<CardStory>;

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

export const Default: Story = {
  render: Template,
  args: {},
};

export const DefaultHeader: Story = {
  render: Template,
  args: {
    cardHeader: {
      variant: 'default',
    },
  },
};

export const WhiteHeader: Story = {
  render: Template,

  args: {
    ...Default.args,
    cardHeader: {
      variant: 'white',
    },
  },
};

export const MultipleContent: Story = {
  render: Template,

  args: {
    ...Default.args,
    cardContent: {
      background: 'bg-muted',
    },
    cardContent2: {
      children: <p>Card content 2</p>,
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

export const TypeBorderless: Story = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      borderless: true,
    },
    cardHeader: false,
  },
};

export const BorderLeftImportantActive: Story = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      border: 'left-important-active',
    },
    cardHeader: false,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Card support top and left borders, which are 2px wide and can be colored with: Brand, Border & Functional colors.',
      },
    },
  },
};

export const BorderTopPrimaryHighlight: Story = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      border: 'top-primary-highlight',
    },
    cardHeader: false,
  },
};

export const TypeSuccess: Story = {
  render: Template,

  args: {
    ...Default.args,
    card: {
      type: 'success-top',
    },
    cardHeader: false,
  },
};

const TemplatePadding: StoryFn<CardStory> = (args) => {
  const paddingArray: CardPadding[] = [0, 0.5, 0.75, 1, 1.5];

  const getCardHeader = (header: CardHeaderProps) => (
    <CardHeader {...header}>
      <Heading modifiers="h3">{header.children || 'Teated ja suunatud menetlused'}</Heading>
    </CardHeader>
  );

  return (
    <VerticalSpacing size={0.5}>
      {paddingArray.map((padding) => (
        <Card {...args.card} padding={padding} key={padding}>
          {args.cardHeader && getCardHeader(typeof args.cardHeader === 'boolean' ? {} : args.cardHeader)}

          <CardContent {...args.cardContent}>
            <p>Card padding: {padding}rem</p>
          </CardContent>
        </Card>
      ))}
      <Card {...args.card} padding={1.5}>
        {getCardHeader({ children: 'CardHeader padding: 1.5rem' })}

        <CardContent {...args.cardContent} padding={0.75}>
          <VerticalSpacing>
            <p>CardContent padding: 0.75rem</p>
            <p>Card padding is overridden by cardContent padding</p>
          </VerticalSpacing>
        </CardContent>
      </Card>
    </VerticalSpacing>
  );
};

export const Padding: Story = {
  render: TemplatePadding,

  args: {
    ...Default.args,
    cardHeader: true,
  },

  parameters: {
    docs: {
      description: {
        story: `Card padding can be set with the \`padding\` prop. The value is in rem units. The default value is 1rem. <br />
          The padding can be set for the whole card or for the card header and card content separately. If the padding is set for the whole card, it is overridden by the padding set for the card header and card content separately.`,
      },
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

export const TimelineCard: StoryObj<CardProps> = {
  render: Timeline,
  args: {},
};

const TwoToned: StoryFn<CardProps> = (args) => (
  <Row gutter={0}>
    <Col width="auto">
      <StretchContent>
        <Card borderRadius={{ right: false, bottom: false }}>
          <CardContent background="bg-muted">
            <Icon name="straighten" className="text-disabled"></Icon>
          </CardContent>
        </Card>
      </StretchContent>
    </Col>
    <Col width="auto">
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

export const TwoTonedCard: StoryObj<CardProps> = {
  render: TwoToned,
  args: {},
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../tedi/components/layout/vertical-spacing';
import Text from '../typography/text/text';
import { Button, ButtonProps } from './button';

const meta: Meta<ButtonProps> = {
  title: 'Community/Button',
  component: Button,
  parameters: {
    status: {
      type: ['deprecated', 'ExistsInTediReady'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => {
  const getRow = (name: string, rowProps?: Partial<ButtonProps>): JSX.Element => (
    <Row gutterX={5} alignItems="center">
      <Col width={1}>
        <Text color={args.color === 'inverted' ? 'inverted' : undefined}>{name}</Text>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Button {...args} {...rowProps}>
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} iconRight="north_east">
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} icon="north_east">
              Button
            </Button>
          </Col>
        </Row>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Button {...args} {...rowProps} size="small">
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} iconRight="north_east" size="small">
              Button
            </Button>
          </Col>
          <Col width="auto">
            <Button {...args} {...rowProps} icon="north_east" size="small">
              Button
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <VerticalSpacing size={0.5}>
      {getRow('Default')}
      {getRow('Active', { isActive: true })}
      {getRow('Disabled', { disabled: true })}
      {getRow('Loading', { isLoading: true })}
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
};

export const Secondary: Story = {
  render: Template,

  args: {
    visualType: 'secondary',
  },
};

export const Tertiary: Story = {
  render: Template,

  args: {
    visualType: 'tertiary',
  },
};

export const Important: Story = {
  render: Template,

  args: {
    color: 'important',
  },
};

export const ImportantSecondary: Story = {
  render: Template,

  args: {
    ...Important.args,
    visualType: 'secondary',
  },
};

export const ImportantTertiary: Story = {
  render: Template,

  args: {
    ...Important.args,
    visualType: 'tertiary',
  },
};

export const Positive: Story = {
  render: Template,

  args: {
    color: 'positive',
  },
};

export const PositiveSecondary: Story = {
  render: Template,

  args: {
    ...Positive.args,
    visualType: 'secondary',
  },
};
export const PositiveTertiary: Story = {
  render: Template,

  args: {
    ...Positive.args,
    visualType: 'tertiary',
  },
};

export const Inverted: Story = {
  render: Template,

  args: {
    color: 'inverted',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const InvertedSecondary: Story = {
  render: Template,

  args: {
    ...Inverted.args,
    visualType: 'secondary',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const InvertedTertiary: Story = {
  render: Template,

  args: {
    ...Inverted.args,
    visualType: 'tertiary',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const Link: Story = {
  render: Template,

  args: {
    visualType: 'link',
  },
};

export const InvertedLink: Story = {
  render: Template,

  args: {
    ...Link.args,
    color: 'inverted',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

const NoStyleTemplate: StoryFn<ButtonProps> = (args) => {
  return (
    <Button {...args} noStyle={true}>
      Button without styles
    </Button>
  );
};

export const NoStyle: Story = {
  render: NoStyleTemplate,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Button that stretches',
  },
};

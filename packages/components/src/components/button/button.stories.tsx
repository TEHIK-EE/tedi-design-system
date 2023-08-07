import { Meta, StoryFn } from '@storybook/react';

import { Col, Row } from '../grid';
import Text from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import { Button, ButtonProps } from './button';

export default {
  title: 'components/Button',
  component: Button,
} as Meta<ButtonProps>;

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

export const Default = {
  render: Template,
};

export const Secondary = {
  render: Template,

  args: {
    visualType: 'secondary',
  },
};

export const Tertiary = {
  render: Template,

  args: {
    visualType: 'tertiary',
  },
};

export const Important = {
  render: Template,

  args: {
    color: 'important',
  },
};

export const ImportantSecondary = {
  render: Template,

  args: {
    ...Important.args,
    visualType: 'secondary',
  },
};

export const ImportantTertiary = {
  render: Template,

  args: {
    ...Important.args,
    visualType: 'tertiary',
  },
};

export const Positive = {
  render: Template,

  args: {
    color: 'positive',
  },
};

export const PositiveSecondary = {
  render: Template,

  args: {
    ...Positive.args,
    visualType: 'secondary',
  },
};
export const PositiveTertiary = {
  render: Template,

  args: {
    ...Positive.args,
    visualType: 'tertiary',
  },
};

export const Inverted = {
  render: Template,

  args: {
    color: 'inverted',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const InvertedSecondary = {
  render: Template,

  args: {
    ...Inverted.args,
    visualType: 'secondary',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const InvertedTertiary = {
  render: Template,

  args: {
    ...Inverted.args,
    visualType: 'tertiary',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const Link = {
  render: Template,

  args: {
    visualType: 'link',
  },
};

export const InvertedLink = {
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

export const NoStyle = {
  render: NoStyleTemplate,
};

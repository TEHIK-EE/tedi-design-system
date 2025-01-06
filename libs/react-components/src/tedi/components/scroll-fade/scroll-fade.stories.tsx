import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { Text } from '../typography/text/text';
import ScrollFade from './scroll-fade';

const meta: Meta<typeof ScrollFade> = {
  component: ScrollFade,
  title: 'TEDI-Ready/Components/ScrollFade',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollFade>;

const Template: StoryFn<typeof ScrollFade> = (args) => (
  <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
    <ScrollFade {...args} />
  </div>
);

const ScrollbarTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <Text modifiers="bold">Default Scrollbar</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} scrollBar="default" />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Custom Scrollbar</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} scrollBar="custom" />
      </div>
    </Col>
  </Row>
);

const FadeSizeTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <Text modifiers="bold">No Fade (0)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={0} />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Small Fade (10)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={10} />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Large Fade (20)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={20} />
      </div>
    </Col>
  </Row>
);

const FadePositionTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <Text modifiers="bold">Top</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadePosition="top" />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Bottom</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadePosition="bottom" />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Both</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadePosition="both" />
      </div>
    </Col>
  </Row>
);

export const Default: Story = {
  render: Template,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    scrollBar: 'custom',
    fadeSize: 20,
    fadePosition: 'both',
  },
};

export const Scrollbar: Story = {
  render: ScrollbarTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

export const FadeSize: Story = {
  render: FadeSizeTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

export const FadePosition: Story = {
  render: FadePositionTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import ScrollFade from './scroll-fade';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=10758-111142&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/32b155-scrollfade" target="_BLANK">Zeroheight ↗</a>
 **/

const meta: Meta<typeof ScrollFade> = {
  component: ScrollFade,
  title: 'TEDI-Ready/Components/Helpers/ScrollFade',
  parameters: {
    status: {
      type: ['devComponent'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=10758-111142&m=dev',
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
      <Text modifiers="bold">No Fade (0%)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={0} />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Small Fade (10%)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={10} />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Large Fade (20%)</Text>
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

const NoFadeWithoutScrollbarTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '400px' }}>
        <ScrollFade {...args} />
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

export const NoFadeWithoutScrollbar: Story = {
  render: NoFadeWithoutScrollbarTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

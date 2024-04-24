import { Meta, StoryFn, StoryObj } from '@storybook/react';

import ScrollFade, { ScrollFadeProps } from './scroll-fade';
const meta: Meta<typeof ScrollFade> = {
  component: ScrollFade,
};

export default meta;
type Story = StoryObj<typeof ScrollFade>;

const Template: StoryFn<ScrollFadeProps> = (args) => (
  <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
    <ScrollFade {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris
    </ScrollFade>
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    scrollType: 'custom',
  },
};

export const SmallFade: Story = {
  render: Template,

  args: {
    scrollType: 'custom',
    fadeSize: '10',
  },
};

export const NoFade: Story = {
  render: Template,

  args: {
    scrollType: 'custom',
    fadeSize: '0',
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Affix from './affix';

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/38ad96-affix" target="_BLANK">Zeroheight ↗</a><br />
 */

const meta: Meta<typeof Affix> = {
  component: Affix,
  title: 'TEDI-Ready/Components/Helpers/Affix',
  parameters: {
    status: {
      type: ['devComponent'],
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
    layout: 'fullscreen',
    backgrounds: { default: 'subtle' },
  },
};

export default meta;

type Story = StoryObj<typeof Affix>;

const Template: StoryFn<typeof Affix> = (args) => (
  <div style={{ height: 1500 }}>
    <div style={{ height: 600, marginTop: 100, border: '1px solid red' }}>
      <Affix {...args} />
    </div>
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    children: 'This text is Sticky in its container!',
  },
};

export const StickyTop0: Story = {
  render: Template,
  args: {
    children: 'This text is Sticky in its container!',
    top: 0,
  },
};

export const FixedExample: Story = {
  render: Template,
  args: {
    children: 'This text is Fixed on bottom of page!',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 'unset',
  },
};

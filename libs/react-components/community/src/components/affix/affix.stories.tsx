import { Meta, StoryFn } from '@storybook/react';

import Affix, { AffixProps } from './affix';

/**
 * Affix is helper component to use `position: "sticky" | "fixed"` on children. By default, Affix gives Sticky behavior with top spacing of 1.5rem.<br/>
 * By default Affix also takes into account the height of the HeaderBottom and adjusts its top value relative to it.<br />
 * To see an example of a more complex use case for Affix, check [TableOfContent](/docs/components-table-of-contents--docs) component.
 */
export default {
  title: 'Community/Affix',
  component: Affix,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
    layout: 'fullscreen',
    backgrounds: { default: 'subtle' },
  },
} as Meta;

const StickyTemplate: StoryFn<AffixProps> = (args) => (
  <div style={{ height: 1500 }}>
    <div style={{ height: 600, marginTop: 100, border: '1px solid red' }}>
      <Affix {...args}>This text is Sticky in its container!</Affix>
    </div>
  </div>
);

const FixedTemplate: StoryFn<AffixProps> = (args) => (
  <div style={{ height: 1500 }}>
    <div style={{ height: 600, marginTop: 100, border: '1px solid red' }}>
      <Affix {...args}>This text is Fixed on bottom of page!</Affix>
    </div>
  </div>
);

export const Default = {
  render: StickyTemplate,
};

export const StickyTop0 = {
  render: StickyTemplate,

  args: {
    top: 0,
  },
};

export const FixedExample = {
  render: FixedTemplate,

  args: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 'unset',
  },
};

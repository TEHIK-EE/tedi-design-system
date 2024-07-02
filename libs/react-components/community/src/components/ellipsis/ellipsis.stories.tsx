import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Ellipsis, { EllipsisProps } from './ellipsis';

export default {
  title: 'Community-components/Ellipsis',
  component: Ellipsis,
} as Meta;

type Story = StoryObj<typeof Ellipsis>;

const Template: StoryFn<EllipsisProps> = (args) => (
  <div style={{ maxWidth: 200 }}>
    <Ellipsis {...args} />
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    children: (
      <span>
        Any inline <b>content (even bold)</b>, that is too long for the wrapper
        <span className="text-small"> and dont fit in x number of rows</span>
      </span>
    ),
  },
};

/**
 * Resize the window to see that the ellipsis and tooltip appear only when content doesn't fit
 */
export const ResponsiveExample: Story = {
  args: {
    lineClamp: 1,
    children: (
      <span>
        Any inline <b>content (even bold)</b>, that is too long for the wrapper
        <span className="text-small"> and dont fit in x number of rows</span>
      </span>
    ),
  },
};

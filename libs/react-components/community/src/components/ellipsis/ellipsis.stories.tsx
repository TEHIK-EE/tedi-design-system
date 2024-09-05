import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Tooltip, TooltipProvider, TooltipTrigger } from '../tooltip';
import Ellipsis, { EllipsisProps } from './ellipsis';

export default {
  title: 'Community/Ellipsis',
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

/**
 * Example when tooltip is shown even when text doesn't Ellipse.
 * Use this when you want to show tooltip always or with custom content
 */
export const ResponsiveWithCustomTooltip: Story = {
  args: {
    lineClamp: 1,
    showTooltip: false,
    children: (
      <TooltipProvider>
        <TooltipTrigger>
          <span>
            Any inline <b>content (even bold)</b>, that is too long for the wrapper
            <span className="text-small"> and dont fit in x number of rows</span>
          </span>
        </TooltipTrigger>
        <Tooltip>Custom tooltip content, shown also when text doesn&apos;t Ellipse</Tooltip>
      </TooltipProvider>
    ),
  },
};

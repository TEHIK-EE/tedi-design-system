import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../vertical-spacing';
import { Skeleton, SkeletonBlock, SkeletonProps } from '.';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  subcomponents: { SkeletonBlock: SkeletonBlock as any },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const Template: StoryFn<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <SkeletonBlock width={75} height={29} />
      <SkeletonBlock width={100} height={21} />
      <SkeletonBlock width={40} height={50} />
      <SkeletonBlock width={80} />
    </VerticalSpacing>
  </Skeleton>
);

export const Default: Story = {
  render: Template,

  args: {
    label: 'Loading something',
  },
};

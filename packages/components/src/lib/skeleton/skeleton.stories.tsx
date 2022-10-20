import { Meta, Story } from '@storybook/react';
import React from 'react';

import { VerticalSpacing } from '../vertical-spacing';
import { Skeleton, SkeletonBlock, SkeletonProps } from './';

export default {
  title: 'components/Skeleton',
  component: Skeleton,
  subcomponents: { SkeletonBlock },
} as Meta;

const Template: Story<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <SkeletonBlock width={75} height={29} />
      <SkeletonBlock width={100} height={21} />
      <SkeletonBlock width={40} height={50} />
      <SkeletonBlock width={80} />
    </VerticalSpacing>
  </Skeleton>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Loading something',
};

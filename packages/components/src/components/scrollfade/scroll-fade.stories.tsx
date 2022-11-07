import { Meta, Story } from '@storybook/react';
import React from 'react';

import ScrollFade, { ScrollFadeProps } from './scroll-fade';

export default {
  title: 'components/ScrollFade',
  component: ScrollFade,
} as Meta;

const Template: Story<ScrollFadeProps> = (args) => (
  <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
    <ScrollFade {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris
    </ScrollFade>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  scrollType: 'custom',
};

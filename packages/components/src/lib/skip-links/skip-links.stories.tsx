import { Meta, Story } from '@storybook/react';
import React from 'react';

import SkipLinks, { SkipLinksProps } from './skip-links';

export default {
  title: 'components/SkipLinks',
  component: SkipLinks,
} as Meta;

const Template: Story<SkipLinksProps> = (args) => <SkipLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [{ children: 'Liigu edasi põhisisu juurde', href: '#main-content' }],
};

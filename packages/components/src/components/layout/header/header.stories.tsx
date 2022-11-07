import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DropdownItem } from '../../dropdown/dropdown';
import Header, { HeaderProps } from './header';

export default {
  title: 'components/Layout/Header',
  component: Header,
  layout: 'fullscreen',
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <span className="text-secondary">Kaspar Suvi - Tartu Linnavalitsus</span>,
  skipLinks: {
    links: [{ children: 'Liigu edasi põhisisu juurde', href: '#main-content' }],
  },
};

Default.parameters = {
  layout: 'fullscreen',
};

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

const langOptions: DropdownItem[] = [
  { children: 'EST', isActive: false, onClick: () => console.log('Keel valitud'), href: '#' },
  { children: 'RUS', isActive: true, onClick: () => console.log('Keel valitud'), href: '#' },
  { children: 'ENG', isActive: false, onClick: () => console.log('Keel valitud'), href: '#' },
];

export const Default = Template.bind({});
Default.args = {
  languageSelection: {
    label: 'Keel:',
    dropdown: { button: { children: 'EST' }, items: langOptions },
  },
  skipLinks: {
    links: [{ children: 'Liigu edasi põhisisu juurde', href: '#main-content' }],
  },
};

Default.parameters = {
  layout: 'fullscreen',
};

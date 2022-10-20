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
  {
    label: 'EST',
    isActive: false,
    onClick: () => console.log('Keel valitud'),
    url: '#',
  },
  {
    label: 'RUS',
    isActive: true,
    onClick: () => console.log('Keel valitud'),
    url: '#',
  },
  {
    label: 'ENG',
    isActive: false,
    onClick: () => console.log('Keel valitud'),
    url: '#',
  },
];

export const Default = Template.bind({});
Default.args = {
  languageSelection: {
    label: 'Keel:',
    dropdown: {
      button: { text: 'EST' },
      items: langOptions,
    },
  },
  skipLinks: {
    links: [
      {
        children: 'Liigu edasi põhisisu juurde',
        url: '#main-content',
      },
    ],
  },
};

Default.parameters = {
  layout: 'fullscreen',
};

import { Meta, Story } from '@storybook/react';

import Sidenav, { SideNavItem, SideNavProps } from './sidenav';

export default {
  component: Sidenav,
  title: 'components/Layout/Sidenav',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const exampleNavItems: SideNavItem[] = [
  { href: '#', children: 'Avaleht', icon: 'home' },
  { href: '#', children: 'Kliendid', icon: 'account_box' },
  { href: '/', children: 'Lapsed', icon: 'child_care', isActive: true },
  { href: '#', children: 'Mingi väga pikk tekst miseimahukuidagigisiiaära', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
];

const Template: Story<SideNavProps> = (args) => <Sidenav {...args} />;

export const Default = Template.bind({});
Default.args = {
  navItems: exampleNavItems,
  ariaLabel: 'Menu title',
};

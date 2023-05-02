import { Meta, StoryObj } from '@storybook/react';

import Sidenav, { SideNavItem } from './sidenav';

const meta: Meta<typeof Sidenav> = {
  component: Sidenav,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidenav>;

const exampleNavItems: SideNavItem[] = [
  { href: '#', children: 'Avaleht', icon: 'home' },
  { href: '#', children: 'Kliendid', icon: 'account_box' },
  { href: '/', children: 'Lapsed', icon: 'child_care', isActive: true },
  { href: '#', children: 'Mingi väga pikk tekst miseimahukuidagigisiiaära', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
  { href: '#', children: 'Menetlused, mis on ka pikk tekst', icon: 'assignment' },
  { href: '#', children: 'Menetlused', icon: 'assignment' },
];

export const Default: Story = {
  args: {
    navItems: exampleNavItems,
    ariaLabel: 'Menu title',
  },
};

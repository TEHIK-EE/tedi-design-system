import { Meta, StoryObj } from '@storybook/react';

import Sidenav, { SideNavItem } from './sidenav';

const meta: Meta<typeof Sidenav> = {
  component: Sidenav,
  title: 'Community/Layout/Sidenav',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidenav>;

const exampleNavItems: SideNavItem[] = [
  { href: '#', children: 'Home', icon: 'home' },
  { href: '#', children: 'Clients', icon: 'account_box' },
  { href: '/', children: 'Children', icon: 'child_care', isActive: true },
  { href: '#', children: 'Some very long text that doest fit anything and wraps', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
  { href: '#', children: 'Assignment that is a long text', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
];

const exampleNavItemsPublic: SideNavItem[] = [
  { href: '#', children: 'Home', icon: 'dashboard', isActive: true },
  { href: '#', children: 'Health info', icon: 'health_metrics' },
  { href: '/', children: 'Portal services', icon: 'medical_services' },
  { href: '#', children: 'News', icon: 'science' },
  { href: '#', children: 'Contact and FAQ', icon: 'quiz' },
];

export const Default: Story = {
  args: {
    navItems: exampleNavItems,
    ariaLabel: 'Menu title',
  },
};

export const Public: Story = {
  args: {
    navItems: exampleNavItemsPublic,
    ariaLabel: 'Menu title',
    breakToBottomContent: ['lg', 'xl'],
    breakToHeader: ['xxl'],
  },
};

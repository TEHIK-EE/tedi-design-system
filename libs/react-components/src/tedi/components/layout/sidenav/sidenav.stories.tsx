import { Meta, StoryObj } from '@storybook/react';

import { SideNavItem } from './components/sidenav-item/sidenav-item';
import Sidenav from './sidenav';

/**
 * <a href="#" target="_BLANK">Figma ↗</a><br/>
 * <a href="#" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Sidenav> = {
  component: Sidenav,
  title: 'TEDI-Ready/Components/Layout/Sidenav',
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

const exampleNavCollapsibleItems: SideNavItem[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    href: '#',
    children: 'Clinical Management',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Vital Signs' },
      { href: '#', children: 'Assessments' },
      {
        href: '#',
        children: 'Treatments',
      },
      {
        href: '#',
        children: 'Documentation',
      },
    ],
  },
  {
    href: '#',
    children: 'Administration',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
      {
        href: '#',
        children: 'System Settings',
      },
      {
        href: '#',
        children: 'Reports & Analytics',
      },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
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
  },
};

export const Collapsible: Story = {
  args: {
    navItems: exampleNavCollapsibleItems,
    ariaLabel: 'Menu title',
  },
};

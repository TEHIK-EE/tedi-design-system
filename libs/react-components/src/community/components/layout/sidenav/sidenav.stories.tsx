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

const exampleNavCollapsableItems: SideNavItem[] = [
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
        subItems: [
          { href: '#', children: 'Active Treatments' },
          { href: '#', children: 'Treatment History' },
          { href: '#', children: 'Treatment Plans' },
          { href: '#', children: 'Clinical Protocols' },
        ],
      },
      {
        href: '#',
        children: 'Documentation',
        subItems: [
          { href: '#', children: 'Clinical Notes' },
          { href: '#', children: 'Medical Forms' },
          { href: '#', children: 'Consent Forms' },
          { href: '#', children: 'Reports' },
        ],
      },
    ],
  },
  {
    href: '#',
    children: 'Administration',
    icon: 'admin_panel_settings',
    isActive: true,
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
      {
        href: '#',
        children: 'System Settings',
        isActive: true,
        subItems: [
          { href: '#', children: 'General Settings' },
          { href: '#', children: 'User Management' },
          { href: '#', children: 'Permissions', isActive: true },
          { href: '#', children: 'Integrations' },
        ],
      },
      {
        href: '#',
        children: 'Reports & Analytics',
        subItems: [
          { href: '#', children: 'Operational Reports' },
          { href: '#', children: 'Financial Reports' },
          { href: '#', children: 'Quality Metrics' },
          { href: '#', children: 'Custom Reports' },
        ],
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
    breakToBottomContent: ['lg', 'xl'],
    breakToHeader: ['xxl'],
  },
};

export const Collapsable: Story = {
  args: {
    navItems: exampleNavCollapsableItems,
    ariaLabel: 'Menu title',
    showDividers: false,
  },
};

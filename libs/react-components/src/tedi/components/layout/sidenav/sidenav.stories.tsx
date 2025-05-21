import { Meta, StoryObj } from '@storybook/react';

import { SideNavItem } from './components/sidenav-item/sidenav-item';
import Sidenav, { SideNav } from './sidenav';

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
    children: 'Clinical Management',
    icon: 'medical_services',
    subItemGroups: [
      {
        subHeading: 'Patient Care',
        subItems: [
          { href: '#', children: 'Vital Signs' },
          { href: '#', children: 'Assessments' },
        ],
      },
      {
        subHeading: 'Documentation',
        subItems: [
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
    ],
  },
  {
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

const exampleNavCollapsibleItemsWithLinks: SideNavItem[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    href: '#',
    children: 'Clinical Management',
    icon: 'medical_services',
    subItemGroups: [
      {
        subHeading: 'Patient Care',
        subItems: [
          { href: '#', children: 'Vital Signs' },
          { href: '#', children: 'Assessments' },
        ],
      },
      {
        subHeading: 'Documentation',
        subItems: [
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

const exampleThirdLevelMenuItems: SideNavItem[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Vital Signs' },
      { href: '#', children: 'Assessments' },
      {
        children: 'Treatments',
        subItems: [
          { href: '#', children: 'Active Treatments' },
          { href: '#', children: 'Treatment History' },
          { href: '#', children: 'Treatment Plans' },
          { href: '#', children: 'Clinical Protocols' },
        ],
      },
      {
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
    children: 'Administration',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
];

const exampleThirdLevelMenuItemsLinks: SideNavItem[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
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
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
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

export const SecondLevelMenuItems: Story = {
  args: {
    navItems: exampleNavCollapsibleItems,
    ariaLabel: 'Menu title',
  },
};

export const SecondLevelMenuItemsParentsAreLinks: Story = {
  args: {
    navItems: exampleNavCollapsibleItemsWithLinks,
    ariaLabel: 'Menu title',
  },
};

export const ThirdLevelMenuItems: Story = {
  args: {
    navItems: exampleThirdLevelMenuItems,
    ariaLabel: 'Menu title',
  },
};

export const ThirdLevelMenuItemsLink: Story = {
  args: {
    navItems: exampleThirdLevelMenuItemsLinks,
    ariaLabel: 'Menu title',
  },
};

export const CollapsibleToggle: React.FC = () => {
  return <SideNav ariaLabel="Collapsible menu" navItems={exampleThirdLevelMenuItems} isCollapsed={true} />;
};

export const CollapsibleToggleSecondLevelitems: React.FC = () => {
  return <SideNav ariaLabel="Collapsible menu" navItems={exampleNavCollapsibleItems} isCollapsed={true} />;
};

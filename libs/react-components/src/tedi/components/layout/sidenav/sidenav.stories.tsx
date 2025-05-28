import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SideNavItemProps } from './components/sidenav-item/sidenav-item';
import { SideNav } from './sidenav';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=6367-171750&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="#" target="_BLANK">Zeroheight ↗</a>
 *
 * To test the mobile layout, either resize your browser window or use Storybook's built-in viewport tools.
 */

const meta: Meta<typeof SideNav> = {
  component: SideNav,
  title: 'TEDI-Ready/Components/Layout/SideNav',
  subcomponents: {
    'SideNav.Item': SideNav.Item,
    'SideNav.Toggle': SideNav.Toggle,
    'SideNav.Dropdown': SideNav.Dropdown,
    'SideNav.Mobile': SideNav.Mobile,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replaceAll('SideNavItem', 'SideNav.Item')
            .replaceAll('SideNavToggle', 'SideNav.Toggle')
            .replaceAll('SideNavDropdown', 'SideNav.Dropdown')
            .replaceAll('SideNavMobile', 'SideNav.Mobile');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=6367-171750&m=dev',
    },
    status: {
      type: 'partiallyTediReady',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

const exampleNavItems: SideNavItemProps[] = [
  { href: '#', children: 'Home', icon: 'home' },
  { href: '#', children: 'Clients', icon: 'account_box' },
  { href: '/', children: 'Children', icon: 'child_care', isActive: true },
  { href: '#', children: 'Some very long text that doest fit anything and wraps', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
  { href: '#', children: 'Assignment that is a long text', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
];

const exampleNavCollapsibleItems: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    icon: 'medical_services',
    subItemGroups: [
      {
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

const exampleDefaultOpen: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    icon: 'medical_services',
    subItemGroups: [
      {
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
    ],
  },
  {
    children: 'Administration',
    isDefaultOpen: true,
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

const exampleNavCollapsibleItemsWithLinks: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    href: '#critical-management',
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

const exampleThirdLevelMenuItems: SideNavItemProps[] = [
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

const exampleThirdLevelMenuItemsLinks: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    href: '#',
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
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SecondLevelMenuItems: Story = {
  args: {
    navItems: exampleNavCollapsibleItems,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SecondLevelMenuItemsParentsAreLinks: Story = {
  args: {
    navItems: exampleNavCollapsibleItemsWithLinks,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ThirdLevelMenuItems: Story = {
  args: {
    navItems: exampleThirdLevelMenuItems,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ThirdLevelMenuItemsParentsAreLinks: Story = {
  args: {
    navItems: exampleThirdLevelMenuItemsLinks,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CollapsibleToggle: React.FC = () => {
  return <SideNav ariaLabel="Collapsible menu" navItems={exampleThirdLevelMenuItems} isCollapsed={true} />;
};

/**
 * Works only for desktop
 */
export const DefaultOpen: Story = {
  args: {
    navItems: exampleDefaultOpen,
    ariaLabel: 'Default open menu',
  },
};

export const MobileToggle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return <SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} variant="mobile" />;
  },
};

export const MobileToggleWithNav: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} variant="mobile" />
        <SideNav ariaLabel="Collapsible menu" navItems={exampleThirdLevelMenuItems} isOpen={isOpen} />
      </>
    );
  },
};
